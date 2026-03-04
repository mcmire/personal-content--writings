import { Modal, Notice, Setting } from "obsidian";

const TIMEOUT_MS = 3 * 60 * 1000;
const POLL_INTERVAL_MS = 10 * 1000;

let isDeploymentRunning = false;

class TokenModal extends Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
    this.token = "";
    this.submitted = false;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: "Enter GitHub token" });

    new Setting(contentEl).setName("Token").addText((text) => {
      text.inputEl.type = "password";
      text.onChange((value) => {
        this.token = value;
      });
    });

    new Setting(contentEl).addButton((btn) =>
      btn
        .setButtonText("Save")
        .setCta()
        .onClick(() => {
          this.submitted = true;
          this.close();
          this.onSubmit(this.token);
        }),
    );
  }

  onClose() {
    this.contentEl.empty();
    if (!this.submitted) {
      this.onSubmit(null);
    }
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function promptForToken(app) {
  return new Promise((resolve) => new TokenModal(app, resolve).open());
}

async function makeRequest(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request failed (${response.status}): ${text}`);
  }
  if (response.status === 204) {
    return null;
  }
  return await response.json();
}

async function getToken(app) {
  let token = await app.secretStorage.getSecret("github-token");

  if (!token) {
    token = await promptForToken(app);
    if (!token) return null;
    await app.secretStorage.setSecret("github-token", token);
  }

  return token;
}

async function dispatchDeployWorkflow(environment, headers) {
  new Notice("Starting preview deployment...");

  const { workflow_run_id: runId } = await makeRequest(
    "https://api.github.com/repos/mcmire/elliotwinkler.com/actions/workflows/deploy-to-vercel.yml/dispatches",
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          "vercel-environment": environment,
        },
        return_run_details: true,
      }),
    },
  );

  return runId;
}

async function waitForWorkflow(runId, headers) {
  new Notice("Preview deployment triggered! Checking for status updates...");

  const startTime = Date.now();

  while (true) {
    await wait(POLL_INTERVAL_MS);

    if (Date.now() - startTime >= TIMEOUT_MS) {
      new Notice("Preview deployment timed out after 3 minutes.", 10000);
      return;
    }

    let run;
    try {
      run = await makeRequest(
        `https://api.github.com/repos/mcmire/elliotwinkler.com/actions/runs/${runId}`,
        { headers },
      );
    } catch {
      const message = error instanceof Error ? error.message : String(error);
      new Notice(
        `Had trouble checking for deployment status (${message}), trying again...`,
      );
      continue;
    }

    if (run.status !== "completed") {
      continue;
    }

    if (run.conclusion === "success") {
      new Notice("Preview deployment succeeded!", 10000);
    } else {
      new Notice(`Preview deployment failed (${run.conclusion}).`, 10000);
    }

    return;
  }
}

export async function deploy(app, environment) {
  if (isDeploymentRunning) {
    return;
  }

  isDeploymentRunning = true;
  try {
    const token = await getToken(app);
    if (!token) {
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    const runId = await dispatchDeployWorkflow(environment, headers);

    await waitForWorkflow(runId, headers);
  } finally {
    isDeploymentRunning = false;
  }
}
