import { deploy } from "./deploy.mjs";

export async function invoke(app) {
  await deploy(app, "production");
}
