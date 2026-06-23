var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugin/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => DragNDropPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian7 = require("obsidian");

// src/platform/codemirror/extension/editor-extension.ts
var import_view3 = require("@codemirror/view");

// src/shared/dom-selectors.ts
var ROOT_EDITOR_CLASS = "dnd-root-editor";
var MAIN_EDITOR_CONTENT_CLASS = "dnd-main-content";
var CODEMIRROR_EDITOR_CLASS = "cm-editor";
var CODEMIRROR_EDITOR_SELECTOR = `.${CODEMIRROR_EDITOR_CLASS}`;
var CODEMIRROR_CONTENT_CLASS = "cm-content";
var CODEMIRROR_CONTENT_SELECTOR = `.${CODEMIRROR_CONTENT_CLASS}`;
var CODEMIRROR_LINE_SELECTOR = ".cm-line";
var CODEMIRROR_GUTTERS_CLASS = "cm-gutters";
var CODEMIRROR_GUTTERS_SELECTOR = `.${CODEMIRROR_GUTTERS_CLASS}`;
var CODEMIRROR_GUTTER_CLASS = "cm-gutter";
var CODEMIRROR_GUTTER_SELECTOR = `.${CODEMIRROR_GUTTER_CLASS}`;
var CODEMIRROR_GUTTER_ELEMENT_CLASS = "cm-gutterElement";
var CODEMIRROR_GUTTER_ELEMENT_SELECTOR = `.${CODEMIRROR_GUTTER_ELEMENT_CLASS}`;
var CODEMIRROR_LINE_NUMBERS_CLASS = "cm-lineNumbers";
var CODEMIRROR_LINE_NUMBER_GUTTER_SELECTOR = `${CODEMIRROR_GUTTER_SELECTOR}.${CODEMIRROR_LINE_NUMBERS_CLASS}, .${CODEMIRROR_LINE_NUMBERS_CLASS}`;
var EMBED_ROOT_SELECTOR = ".cm-embed-block";
var EMBED_BLOCK_SELECTOR = ".cm-embed-block, .cm-callout, .cm-preview-code-block, .cm-math, .MathJax_Display, .callout, .MathJax, .mjx-container";
var TEXT_BLOCK_PROBE_SELECTOR = `${EMBED_BLOCK_SELECTOR}, ${CODEMIRROR_LINE_SELECTOR}`;
var TABLE_WIDGET_SELECTOR = ".cm-table-widget";
var DROP_INDICATOR_SELECTOR = ".dnd-drop-indicator";
var DROP_HIGHLIGHT_SELECTOR = ".dnd-drop-highlight";
var HIDDEN_CLASS = "dnd-hidden";
var DRAG_HANDLE_CLASS = "dnd-drag-handle";
var HANDLE_CORE_CLASS = "dnd-handle-core";
var LINE_HANDLE_CLASS = "dnd-line-handle";
var EMBED_HANDLE_CLASS = "dnd-embed-handle";
var HANDLE_GUTTER_CLASS = "cm-dnd-handle-gutter";
var HANDLE_GUTTER_MARKER_CLASS = "dnd-handle-gutter-marker";
var DROP_INDICATOR_CLASS = "dnd-drop-indicator";
var DROP_HIGHLIGHT_CLASS = "dnd-drop-highlight";
var DRAGGING_BODY_CLASS = "dnd-dragging";
var DRAG_SOURCE_LINE_CLASS = "dnd-drag-source-line";
var DRAG_SOURCE_LINE_SINGLE_CLASS = "dnd-drag-source-line-single";
var DRAG_SOURCE_LINE_FIRST_CLASS = "dnd-drag-source-line-first";
var DRAG_SOURCE_LINE_MIDDLE_CLASS = "dnd-drag-source-line-middle";
var DRAG_SOURCE_LINE_LAST_CLASS = "dnd-drag-source-line-last";
var DRAG_SOURCE_EMBED_CLASS = "dnd-drag-source-embed";
var RANGE_SELECTED_HANDLE_CLASS = "dnd-range-selected-handle";
var MOBILE_SELECTION_RESIZE_HANDLE_CLASS = "dnd-mobile-selection-resize-handle";
var MOBILE_SELECTION_RESIZE_HANDLE_TOP_CLASS = "dnd-mobile-selection-resize-handle-top";
var MOBILE_SELECTION_RESIZE_HANDLE_BOTTOM_CLASS = "dnd-mobile-selection-resize-handle-bottom";
var FILE_DROP_TARGET_CLASS = "dnd-file-drop-target";
var MOBILE_GESTURE_LOCK_CLASS = "dnd-mobile-gesture-lock";

// src/platform/codemirror/extension/active-drag-registry.ts
var activeBlockSelectionByView = /* @__PURE__ */ new WeakMap();
var knownViewRefs = /* @__PURE__ */ new Set();
function beginDragSession(source, view) {
  setActiveBlockSelection(view, source);
  activeDocument.body.classList.add(DRAGGING_BODY_CLASS);
}
function finishDragSession(view) {
  if (view) {
    clearActiveBlockSelection(view);
  } else {
    clearAllActiveBlockSelections();
  }
  if (!getActiveBlockSelectionEntry()) {
    activeDocument.body.classList.remove(DRAGGING_BODY_CLASS);
  }
  hideDropVisuals();
}
function setActiveBlockSelection(view, source) {
  if (source) {
    activeBlockSelectionByView.set(view, source);
    knownViewRefs.add(new WeakRef(view));
    return;
  }
  activeBlockSelectionByView.delete(view);
  removeWeakRef(knownViewRefs, view);
}
function getActiveBlockSelection(view) {
  var _a, _b, _c;
  if (view) {
    return (_a = activeBlockSelectionByView.get(view)) != null ? _a : null;
  }
  return (_c = (_b = getActiveBlockSelectionEntry()) == null ? void 0 : _b.source) != null ? _c : null;
}
function getActiveBlockSelectionView() {
  var _a, _b;
  return (_b = (_a = getActiveBlockSelectionEntry()) == null ? void 0 : _a.view) != null ? _b : null;
}
function getActiveBlockSelectionEntry() {
  for (const ref of knownViewRefs) {
    const view = ref.deref();
    if (!view) {
      knownViewRefs.delete(ref);
      continue;
    }
    const source = activeBlockSelectionByView.get(view);
    if (source) {
      return { view, source };
    }
  }
  return null;
}
function clearActiveBlockSelection(view) {
  activeBlockSelectionByView.delete(view);
  removeWeakRef(knownViewRefs, view);
}
function clearAllActiveBlockSelections() {
  for (const ref of knownViewRefs) {
    const v = ref.deref();
    if (v)
      activeBlockSelectionByView.delete(v);
  }
  knownViewRefs.clear();
}
function removeWeakRef(set, target) {
  for (const ref of set) {
    const v = ref.deref();
    if (!v || v === target) {
      set.delete(ref);
    }
  }
}
function hideDropVisuals(scope = activeDocument) {
  scope.querySelectorAll(DROP_INDICATOR_SELECTOR).forEach((el) => {
    el.classList.add(HIDDEN_CLASS);
  });
  scope.querySelectorAll(DROP_HIGHLIGHT_SELECTOR).forEach((el) => {
    el.classList.add(HIDDEN_CLASS);
  });
}

// src/platform/dom/table-guard.ts
function isElementInsideRenderedTableCell(view, el) {
  if (!el)
    return false;
  if (!view.dom.contains(el))
    return false;
  const tableWidget = el.closest(TABLE_WIDGET_SELECTOR);
  if (!tableWidget || !view.dom.contains(tableWidget))
    return false;
  if (el.closest("td, th, .cm-table-cell, .table-cell-wrapper"))
    return true;
  if (el.closest(CODEMIRROR_LINE_SELECTOR))
    return true;
  return true;
}
function isPointInsideRenderedTableCell(view, x, y) {
  const rawEl = activeDocument.elementFromPoint(x, y);
  const el = (rawEl == null ? void 0 : rawEl.instanceOf(HTMLElement)) ? rawEl : null;
  return isElementInsideRenderedTableCell(view, el);
}
function isPosInsideRenderedTableCell(view, pos, options) {
  const doc = view.state.doc;
  const safePos = Math.max(0, Math.min(pos, doc.length));
  try {
    const domAt = view.domAtPos(safePos);
    const node = domAt.node.instanceOf(HTMLElement) ? domAt.node : domAt.node.parentElement;
    if (isElementInsideRenderedTableCell(view, node))
      return true;
  } catch (e) {
  }
  if (options == null ? void 0 : options.skipLayoutRead)
    return false;
  let coords = null;
  try {
    coords = view.coordsAtPos(safePos);
  } catch (e) {
    return false;
  }
  if (!coords)
    return false;
  const editorRect = view.dom.getBoundingClientRect();
  const probeX = Math.min(Math.max(coords.left + 6, editorRect.left + 2), editorRect.right - 2);
  const probeY = Math.min(Math.max((coords.top + coords.bottom) / 2, editorRect.top + 2), editorRect.bottom - 2);
  return isPointInsideRenderedTableCell(view, probeX, probeY);
}

// src/platform/codemirror/transaction/move-command-applier.ts
var import_state2 = require("@codemirror/state");

// src/domain/block/block-types.ts
var BlockType = /* @__PURE__ */ ((BlockType2) => {
  BlockType2["Paragraph"] = "paragraph";
  BlockType2["Heading"] = "heading";
  BlockType2["ListItem"] = "list-item";
  BlockType2["CodeBlock"] = "code-block";
  BlockType2["Blockquote"] = "blockquote";
  BlockType2["Table"] = "table";
  BlockType2["MathBlock"] = "math-block";
  BlockType2["Callout"] = "callout";
  BlockType2["HorizontalRule"] = "hr";
  BlockType2["Unknown"] = "unknown";
  return BlockType2;
})(BlockType || {});

// src/domain/markdown/line-parser.ts
function getIndentWidthFromIndentRaw(indentRaw, tabSize) {
  const safeTabSize = tabSize > 0 ? tabSize : 4;
  let width = 0;
  for (const ch of indentRaw) {
    width += ch === "	" ? safeTabSize : 1;
  }
  return width;
}
function splitBlockquotePrefix(line) {
  const match = line.match(/^(\s*> ?)+/);
  if (!match)
    return { prefix: "", rest: line };
  return { prefix: match[0], rest: line.slice(match[0].length) };
}
function getBlockquoteDepthFromLine(line) {
  const match = line.match(/^(\s*> ?)+/);
  if (!match)
    return 0;
  const prefix = match[0];
  return (prefix.match(/>/g) || []).length;
}
function parseListLine(line, tabSize) {
  const indentMatch = line.match(/^(\s*)/);
  const indentRaw = indentMatch ? indentMatch[1] : "";
  const indentWidth = getIndentWidthFromIndentRaw(indentRaw, tabSize);
  const rest = line.slice(indentRaw.length);
  const taskMatch = rest.match(/^([-*+])\s\[[ xX]\]\s+/);
  if (taskMatch) {
    const marker = taskMatch[0];
    return { isListItem: true, indentRaw, indentWidth, marker, markerType: "task", content: rest.slice(marker.length) };
  }
  const unorderedMatch = rest.match(/^([-*+])\s+/);
  if (unorderedMatch) {
    const marker = unorderedMatch[0];
    return { isListItem: true, indentRaw, indentWidth, marker, markerType: "unordered", content: rest.slice(marker.length) };
  }
  const orderedMatch = rest.match(/^(\d+)[.)]\s+/);
  if (orderedMatch) {
    const marker = orderedMatch[0];
    return { isListItem: true, indentRaw, indentWidth, marker, markerType: "ordered", content: rest.slice(marker.length) };
  }
  return { isListItem: false, indentRaw, indentWidth, marker: "", markerType: "unordered", content: rest };
}
function parseLineWithQuote(line, tabSize) {
  const quoteInfo = splitBlockquotePrefix(line);
  const parsed = parseListLine(quoteInfo.rest, tabSize);
  return {
    text: line,
    quotePrefix: quoteInfo.prefix,
    quoteDepth: getBlockquoteDepthFromLine(line),
    rest: quoteInfo.rest,
    isListItem: parsed.isListItem,
    indentRaw: parsed.indentRaw,
    indentWidth: parsed.indentWidth,
    marker: parsed.marker,
    markerType: parsed.markerType,
    content: parsed.content
  };
}

// src/domain/block/block-guards.ts
function isHorizontalRuleLine(text) {
  if (!text)
    return false;
  const trimmed = text.trim();
  if (trimmed.length < 3)
    return false;
  return /^([-*_])(?:\s*\1){2,}$/.test(trimmed);
}
function isBlockquoteLine(text) {
  if (!text)
    return false;
  return /^(> ?)+/.test(text.trimStart());
}
function isCalloutLine(text) {
  if (!text)
    return false;
  return /^(\s*> ?)+\s*\[!/.test(text.trimStart());
}
function isTableLine(text) {
  if (!text)
    return false;
  return text.trimStart().startsWith("|");
}
function isMathFenceLine(text) {
  if (!text)
    return false;
  return text.trimStart().startsWith("$$");
}
function isCodeFenceLine(text) {
  if (!text)
    return false;
  return text.trimStart().startsWith("```");
}

// src/domain/markdown/indent-calculator.ts
var indentUnitWidthCache = /* @__PURE__ */ new WeakMap();
function normalizeTabSize(tabSize) {
  const safe = tabSize != null ? tabSize : 4;
  return safe > 0 ? safe : 4;
}
function parseLineWithQuote2(line, tabSize) {
  return parseLineWithQuote(line, normalizeTabSize(tabSize));
}
function buildIndentStringFromSample(sample, width, tabSize) {
  const safeTabSize = normalizeTabSize(tabSize);
  const safeWidth = Math.max(0, width);
  if (safeWidth === 0)
    return "";
  if (sample.includes("	")) {
    const tabs = Math.max(0, Math.floor(safeWidth / safeTabSize));
    const spaces = Math.max(0, safeWidth - tabs * safeTabSize);
    return "	".repeat(tabs) + " ".repeat(spaces);
  }
  return " ".repeat(safeWidth);
}
function getIndentUnitWidth(sample, tabSize) {
  const safeTabSize = normalizeTabSize(tabSize);
  if (sample.includes("	"))
    return safeTabSize;
  if (sample.length >= safeTabSize)
    return safeTabSize;
  return sample.length > 0 ? sample.length : safeTabSize;
}
function getIndentUnitWidthFromDoc(doc, parseLine, fallbackTabSize) {
  let best = Number.POSITIVE_INFINITY;
  let prevIndent = null;
  for (let i = 1; i <= doc.lines; i++) {
    const text = doc.line(i).text;
    const parsed = parseLine(text);
    if (!parsed.isListItem)
      continue;
    if (prevIndent !== null && parsed.indentWidth > prevIndent) {
      const delta = parsed.indentWidth - prevIndent;
      if (delta > 0 && delta < best)
        best = delta;
    }
    prevIndent = parsed.indentWidth;
  }
  if (!isFinite(best)) {
    return normalizeTabSize(fallbackTabSize);
  }
  return Math.max(2, best);
}
function getIndentUnitWidthForDoc(doc, parseLine, fallbackTabSize) {
  if (doc && typeof doc === "object") {
    const cached = indentUnitWidthCache.get(doc);
    if (typeof cached === "number") {
      return cached;
    }
  }
  const fromDoc = getIndentUnitWidthFromDoc(doc, parseLine, fallbackTabSize);
  const resolved = typeof fromDoc === "number" ? fromDoc : normalizeTabSize(fallbackTabSize);
  if (doc && typeof doc === "object") {
    indentUnitWidthCache.set(doc, resolved);
  }
  return resolved;
}

// src/domain/markdown/line-map.ts
function nowMs() {
  return typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
}
var lineMapPerfRecorder = null;
var lineMapCache = /* @__PURE__ */ new WeakMap();
var EMPTY_LINE_META = {
  isEmpty: true,
  isList: false,
  isQuote: false,
  isCallout: false,
  isTable: false,
  isHr: false,
  indentWidth: 0,
  quoteDepth: 0
};
function recordLineMapPerf(key, durationMs) {
  if (!lineMapPerfRecorder)
    return;
  if (!isFinite(durationMs) || durationMs < 0)
    return;
  lineMapPerfRecorder(key, durationMs);
}
function setLineMapPerfRecorder(recorder) {
  lineMapPerfRecorder = recorder;
}
function createLineMetaFromText(text, tabSize) {
  const parsed = parseLineWithQuote(text, tabSize);
  const isEmpty = text.trim().length === 0;
  return {
    isEmpty,
    isList: parsed.isListItem,
    isQuote: parsed.quoteDepth > 0,
    isCallout: isCalloutLine(text),
    isTable: text.trimStart().startsWith("|"),
    isHr: isHorizontalRuleLine(text),
    indentWidth: parsed.indentWidth,
    quoteDepth: parsed.quoteDepth
  };
}
function createLineMetaArray(doc, tabSize) {
  var _a;
  const lineMeta = Array(doc.lines + 1);
  lineMeta[0] = EMPTY_LINE_META;
  for (let i = 1; i <= doc.lines; i++) {
    lineMeta[i] = createLineMetaFromText((_a = doc.line(i).text) != null ? _a : "", tabSize);
  }
  return lineMeta;
}
function buildLineMapIndexes(lineMeta, totalLines) {
  var _a, _b, _c;
  const prevNonEmpty = new Int32Array(totalLines + 2);
  const nextNonEmpty = new Int32Array(totalLines + 2);
  const prevListLine = new Int32Array(totalLines + 2);
  const listParentLine = new Int32Array(totalLines + 2);
  const listSubtreeEndLine = new Int32Array(totalLines + 2);
  let previous = 0;
  let previousList = 0;
  const listStack = [];
  for (let i = 1; i <= totalLines; i++) {
    const meta = (_a = lineMeta[i]) != null ? _a : EMPTY_LINE_META;
    if (!meta.isEmpty) {
      previous = i;
    }
    prevNonEmpty[i] = previous;
    if (meta.isEmpty) {
      prevListLine[i] = previousList;
      continue;
    }
    while (listStack.length > 0) {
      const topLine = listStack[listStack.length - 1];
      const topMeta = (_b = lineMeta[topLine]) != null ? _b : EMPTY_LINE_META;
      if (meta.indentWidth > topMeta.indentWidth) {
        break;
      }
      listStack.pop();
    }
    for (const ancestorLine of listStack) {
      listSubtreeEndLine[ancestorLine] = i;
    }
    prevListLine[i] = previousList;
    if (!meta.isList) {
      continue;
    }
    listParentLine[i] = listStack.length > 0 ? listStack[listStack.length - 1] : 0;
    listSubtreeEndLine[i] = i;
    listStack.push(i);
    previousList = i;
  }
  let next = 0;
  for (let i = totalLines; i >= 1; i--) {
    const meta = (_c = lineMeta[i]) != null ? _c : EMPTY_LINE_META;
    if (!meta.isEmpty) {
      next = i;
    }
    nextNonEmpty[i] = next;
  }
  return {
    prevNonEmpty,
    nextNonEmpty,
    prevListLine,
    listParentLine,
    listSubtreeEndLine
  };
}
function createLineMapFromMeta(doc, tabSize, lineMeta) {
  const indexes = buildLineMapIndexes(lineMeta, doc.lines);
  return {
    doc,
    lineMeta,
    prevNonEmpty: indexes.prevNonEmpty,
    nextNonEmpty: indexes.nextNonEmpty,
    prevListLine: indexes.prevListLine,
    listParentLine: indexes.listParentLine,
    listSubtreeEndLine: indexes.listSubtreeEndLine,
    tabSize
  };
}
function buildLineMap(state, options) {
  const doc = state.doc;
  const tabSize = normalizeTabSize(options.tabSize);
  const lineMeta = createLineMetaArray(doc, tabSize);
  return createLineMapFromMeta(doc, tabSize, lineMeta);
}
function getCachedLineMapForDoc(doc, tabSize) {
  var _a, _b;
  if (!doc || typeof doc !== "object")
    return null;
  return (_b = (_a = lineMapCache.get(doc)) == null ? void 0 : _a.get(tabSize)) != null ? _b : null;
}
function setCachedLineMapForDoc(doc, tabSize, lineMap) {
  const byTabSize = lineMapCache.get(doc);
  if (byTabSize) {
    byTabSize.set(tabSize, lineMap);
    return;
  }
  lineMapCache.set(doc, /* @__PURE__ */ new Map([[tabSize, lineMap]]));
}
function getLineMap(state, options) {
  const startedAt = nowMs();
  const tabSize = normalizeTabSize(options.tabSize);
  if (!state || typeof state !== "object") {
    const buildStartedAt2 = nowMs();
    const built2 = buildLineMap(state, { tabSize });
    recordLineMapPerf("line_map_build", nowMs() - buildStartedAt2);
    recordLineMapPerf("line_map_get", nowMs() - startedAt);
    return built2;
  }
  const doc = state.doc;
  if (!doc || typeof doc !== "object") {
    const buildStartedAt2 = nowMs();
    const built2 = buildLineMap(state, { tabSize });
    recordLineMapPerf("line_map_build", nowMs() - buildStartedAt2);
    recordLineMapPerf("line_map_get", nowMs() - startedAt);
    return built2;
  }
  const cached = getCachedLineMapForDoc(doc, tabSize);
  if (cached) {
    recordLineMapPerf("line_map_get", nowMs() - startedAt);
    return cached;
  }
  const buildStartedAt = nowMs();
  const built = buildLineMap(state, { tabSize });
  recordLineMapPerf("line_map_build", nowMs() - buildStartedAt);
  setCachedLineMapForDoc(doc, tabSize, built);
  recordLineMapPerf("line_map_get", nowMs() - startedAt);
  return built;
}
function peekCachedLineMap(state, options) {
  const tabSize = normalizeTabSize(options.tabSize);
  if (!state || typeof state !== "object")
    return null;
  const doc = state.doc;
  if (!doc || typeof doc !== "object")
    return null;
  return getCachedLineMapForDoc(doc, tabSize);
}
function getLineMetaAt(lineMap, lineNumber) {
  var _a;
  if (lineNumber < 1 || lineNumber >= lineMap.lineMeta.length)
    return null;
  return (_a = lineMap.lineMeta[lineNumber]) != null ? _a : null;
}
function getNearestListLineAtOrBefore(lineMap, lineNumber) {
  if (lineMap.doc.lines <= 0)
    return null;
  const clamped = Math.max(1, Math.min(lineMap.doc.lines, lineNumber));
  const meta = getLineMetaAt(lineMap, clamped);
  if (meta == null ? void 0 : meta.isList)
    return clamped;
  const prevListLine = lineMap.prevListLine[clamped];
  return prevListLine > 0 ? prevListLine : null;
}

// src/domain/markdown/fence-scanner.ts
var fenceLazyScanCache = /* @__PURE__ */ new WeakMap();
function isSingleLineMathFence(lineText) {
  const trimmed = lineText.trimStart();
  if (!trimmed.startsWith("$$"))
    return false;
  return trimmed.slice(2).includes("$$");
}
function assignFenceRangeByLine(rangeByLine, startLine, endLine) {
  const range = { startLine, endLine };
  for (let i = startLine; i <= endLine; i++) {
    rangeByLine.set(i, range);
  }
}
function createFenceLazyScanState() {
  return {
    scannedUntilLine: 0,
    openCodeStartLine: 0,
    openMathStartLine: 0,
    fullyScanned: false,
    codeRangeByLine: /* @__PURE__ */ new Map(),
    mathRangeByLine: /* @__PURE__ */ new Map()
  };
}
function getFenceLazyScanState(doc) {
  const cached = fenceLazyScanCache.get(doc);
  if (cached)
    return cached;
  const created = createFenceLazyScanState();
  fenceLazyScanCache.set(doc, created);
  return created;
}
function scanFenceLine(state, lineNumber, text) {
  if (state.openCodeStartLine !== 0) {
    if (isCodeFenceLine(text)) {
      assignFenceRangeByLine(state.codeRangeByLine, state.openCodeStartLine, lineNumber);
      state.openCodeStartLine = 0;
    }
    return;
  }
  if (state.openMathStartLine !== 0) {
    if (isMathFenceLine(text)) {
      assignFenceRangeByLine(state.mathRangeByLine, state.openMathStartLine, lineNumber);
      state.openMathStartLine = 0;
    }
    return;
  }
  if (isCodeFenceLine(text)) {
    state.openCodeStartLine = lineNumber;
    return;
  }
  if (isMathFenceLine(text)) {
    if (isSingleLineMathFence(text)) {
      assignFenceRangeByLine(state.mathRangeByLine, lineNumber, lineNumber);
    } else {
      state.openMathStartLine = lineNumber;
    }
  }
}
function finalizeFenceStateAtDocEnd(state) {
  if (state.openCodeStartLine !== 0) {
    assignFenceRangeByLine(state.codeRangeByLine, state.openCodeStartLine, state.openCodeStartLine);
    state.openCodeStartLine = 0;
  }
  state.openMathStartLine = 0;
  state.fullyScanned = true;
}
function ensureFenceScanComplete(doc) {
  const state = getFenceLazyScanState(doc);
  if (state.fullyScanned)
    return state;
  let cursor = state.scannedUntilLine + 1;
  while (cursor <= doc.lines) {
    scanFenceLine(state, cursor, doc.line(cursor).text);
    cursor++;
  }
  state.scannedUntilLine = Math.max(state.scannedUntilLine, cursor - 1);
  finalizeFenceStateAtDocEnd(state);
  return state;
}
function prewarmFenceScan(doc) {
  ensureFenceScanComplete(doc);
}
function findMathBlockRange(doc, lineNumber) {
  var _a;
  if (lineNumber < 1 || lineNumber > doc.lines)
    return null;
  const state = ensureFenceScanComplete(doc);
  return (_a = state.mathRangeByLine.get(lineNumber)) != null ? _a : null;
}
function findCodeBlockRange(doc, lineNumber) {
  var _a;
  if (lineNumber < 1 || lineNumber > doc.lines)
    return null;
  const state = ensureFenceScanComplete(doc);
  return (_a = state.codeRangeByLine.get(lineNumber)) != null ? _a : null;
}

// src/domain/block/block-detector.ts
var LIST_UNORDERED_RE = /^[-*+]\s/;
var LIST_ORDERED_RE = /^\d+\.\s/;
var LIST_TASK_RE = /^[-*+]\s\[[ x]\]/;
var CODE_FENCE_RE = /^```/;
var MATH_FENCE_RE = /^\$\$/;
var BLOCKQUOTE_RE = /^>/;
var TABLE_RE = /^\|/;
function getHeadingLevel(lineText) {
  const trimmed = lineText.trimStart();
  const match = trimmed.match(/^(#{1,6})\s+/);
  if (!match)
    return null;
  return match[1].length;
}
function getHeadingSectionRange(doc, lineNumber) {
  if (lineNumber < 1 || lineNumber > doc.lines)
    return null;
  const currentHeadingLevel = getHeadingLevel(doc.line(lineNumber).text);
  if (!currentHeadingLevel)
    return null;
  let endLine = lineNumber;
  for (let i = lineNumber + 1; i <= doc.lines; i++) {
    const nextHeadingLevel = getHeadingLevel(doc.line(i).text);
    if (nextHeadingLevel !== null && nextHeadingLevel <= currentHeadingLevel) {
      break;
    }
    endLine = i;
  }
  return { startLine: lineNumber, endLine };
}
function detectBlockType(lineText) {
  const trimmed = lineText.trimStart();
  if (getHeadingLevel(lineText) !== null) {
    return "heading" /* Heading */;
  }
  if (isHorizontalRuleLine(trimmed)) {
    return "hr" /* HorizontalRule */;
  }
  if (LIST_UNORDERED_RE.test(trimmed) || LIST_ORDERED_RE.test(trimmed) || LIST_TASK_RE.test(trimmed)) {
    return "list-item" /* ListItem */;
  }
  if (CODE_FENCE_RE.test(trimmed)) {
    return "code-block" /* CodeBlock */;
  }
  if (MATH_FENCE_RE.test(trimmed)) {
    return "math-block" /* MathBlock */;
  }
  if (BLOCKQUOTE_RE.test(trimmed)) {
    return "blockquote" /* Blockquote */;
  }
  if (TABLE_RE.test(trimmed)) {
    return "table" /* Table */;
  }
  if (trimmed.length === 0) {
    return "unknown" /* Unknown */;
  }
  return "paragraph" /* Paragraph */;
}
function getIndentLevel(lineText, tabSize = 2) {
  const match = lineText.match(/^(\s*)/);
  if (!match)
    return 0;
  const spaces = match[1];
  const width = getIndentWidthWithTabSize(spaces, tabSize);
  const unit = tabSize > 0 ? tabSize : 2;
  return Math.floor(width / unit);
}
function getIndentWidthWithTabSize(indentRaw, tabSize) {
  const unit = tabSize > 0 ? tabSize : 2;
  let width = 0;
  for (const ch of indentRaw) {
    width += ch === "	" ? unit : 1;
  }
  return width;
}
function getIndentWidth(lineText, tabSize) {
  const match = lineText.match(/^(\s*)/);
  if (!match)
    return 0;
  return getIndentWidthWithTabSize(match[1], tabSize);
}
function parseListMarker(lineText, tabSize) {
  const match = lineText.match(/^(\s*)([-*+])\s\[[ xX]\]\s+/);
  if (match) {
    return { isListItem: true, indentWidth: getIndentWidthWithTabSize(match[1], tabSize) };
  }
  const unorderedMatch = lineText.match(/^(\s*)([-*+])\s+/);
  if (unorderedMatch) {
    return { isListItem: true, indentWidth: getIndentWidthWithTabSize(unorderedMatch[1], tabSize) };
  }
  const orderedMatch = lineText.match(/^(\s*)(\d+)[.)]\s+/);
  if (orderedMatch) {
    return { isListItem: true, indentWidth: getIndentWidthWithTabSize(orderedMatch[1], tabSize) };
  }
  return { isListItem: false, indentWidth: getIndentWidth(lineText, tabSize) };
}
function isCalloutHeader(restText) {
  return restText.trimStart().startsWith("[!");
}
function isInsideCalloutContainer(doc, lineNumber, depth) {
  for (let i = lineNumber; i >= 1; i--) {
    const text = doc.line(i).text;
    const lineDepth = getBlockquoteDepthFromLine(text);
    if (lineDepth === 0 || lineDepth < depth)
      break;
    const info = splitBlockquotePrefix(text);
    if (isCalloutHeader(info.rest))
      return true;
  }
  return false;
}
function getBlockquoteContainerRange(doc, lineNumber, depth) {
  let startLine = lineNumber;
  for (let i = lineNumber - 1; i >= 1; i--) {
    const d = getBlockquoteDepthFromLine(doc.line(i).text);
    if (d === 0 || d < depth)
      break;
    startLine = i;
  }
  let endLine = lineNumber;
  for (let i = lineNumber + 1; i <= doc.lines; i++) {
    const d = getBlockquoteDepthFromLine(doc.line(i).text);
    if (d === 0 || d < depth)
      break;
    endLine = i;
  }
  return { startLine, endLine };
}
function getListItemSubtreeRange(doc, lineNumber, tabSize) {
  const lineText = doc.line(lineNumber).text;
  const currentInfo = parseListMarker(lineText, tabSize);
  const currentIndent = currentInfo.indentWidth;
  let endLine = lineNumber;
  for (let i = lineNumber + 1; i <= doc.lines; i++) {
    const nextLine = doc.line(i);
    const nextText = nextLine.text;
    if (nextText.trim().length === 0) {
      const lookahead = findNextNonEmptyLine(doc, i + 1, tabSize);
      if (!lookahead || lookahead.isListItem && lookahead.indentWidth <= currentIndent || lookahead.indentWidth <= currentIndent) {
        break;
      }
      endLine = i;
      continue;
    }
    const nextInfo = parseListMarker(nextText, tabSize);
    if (nextInfo.isListItem && nextInfo.indentWidth <= currentIndent) {
      break;
    }
    const nextIndent = getIndentWidth(nextText, tabSize);
    if (nextInfo.isListItem || nextIndent > currentIndent) {
      endLine = i;
      continue;
    }
    break;
  }
  return { startLine: lineNumber, endLine };
}
function findNextNonEmptyLine(doc, fromLine, tabSize) {
  for (let i = fromLine; i <= doc.lines; i++) {
    const text = doc.line(i).text;
    if (text.trim().length === 0)
      continue;
    const info = parseListMarker(text, tabSize);
    return { isListItem: info.isListItem, indentWidth: info.indentWidth };
  }
  return null;
}
var blockDetectionCache = /* @__PURE__ */ new WeakMap();
var LIST_LINE_MAP_COLD_BUILD_MAX_LINES = 3e4;
var YAML_FENCE_RE = /^-{3}\s*$/;
var yamlFrontmatterEndLineCache = /* @__PURE__ */ new WeakMap();
function getYamlFrontmatterEndLine(doc) {
  const cached = yamlFrontmatterEndLineCache.get(doc);
  if (cached !== void 0)
    return cached;
  let endLine = 0;
  if (doc.lines >= 2 && YAML_FENCE_RE.test(doc.line(1).text)) {
    for (let i = 2; i <= doc.lines; i++) {
      if (YAML_FENCE_RE.test(doc.line(i).text)) {
        endLine = i;
        break;
      }
    }
  }
  yamlFrontmatterEndLineCache.set(doc, endLine);
  return endLine;
}
function isInsideYamlFrontmatter(doc, lineNumber) {
  const endLine = getYamlFrontmatterEndLine(doc);
  return endLine > 0 && lineNumber >= 1 && lineNumber <= endLine;
}
var detectBlockPerfRecorder = null;
function recordDetectBlockPerf(key, durationMs) {
  if (!detectBlockPerfRecorder)
    return;
  if (!isFinite(durationMs) || durationMs < 0)
    return;
  detectBlockPerfRecorder(key, durationMs);
}
function setDetectBlockPerfRecorder(recorder) {
  detectBlockPerfRecorder = recorder;
}
function detectBlockUncached(state, lineNumber, tabSize) {
  var _a, _b;
  const doc = state.doc;
  if (lineNumber < 1 || lineNumber > doc.lines) {
    return null;
  }
  if (isInsideYamlFrontmatter(doc, lineNumber)) {
    return null;
  }
  const line = doc.line(lineNumber);
  const lineText = line.text;
  let blockType = detectBlockType(lineText);
  const codeRange = findCodeBlockRange(doc, lineNumber);
  const mathRange = findMathBlockRange(doc, lineNumber);
  if (codeRange) {
    blockType = "code-block" /* CodeBlock */;
  }
  if (mathRange) {
    blockType = "math-block" /* MathBlock */;
  }
  if (blockType === "unknown" /* Unknown */) {
    return null;
  }
  let startLine = lineNumber;
  let endLine = lineNumber;
  if (blockType === "code-block" /* CodeBlock */ && codeRange) {
    startLine = codeRange.startLine;
    endLine = codeRange.endLine;
  }
  if (blockType === "math-block" /* MathBlock */ && mathRange) {
    startLine = mathRange.startLine;
    endLine = mathRange.endLine;
  }
  if (blockType === "list-item" /* ListItem */) {
    let lineMap = peekCachedLineMap(state, { tabSize });
    if (!lineMap && doc.lines <= LIST_LINE_MAP_COLD_BUILD_MAX_LINES) {
      lineMap = getLineMap(state, { tabSize });
    }
    const lineMeta = lineMap ? getLineMetaAt(lineMap, lineNumber) : null;
    const subtreeEndLine = (lineMeta == null ? void 0 : lineMeta.isList) && lineMap ? lineMap.listSubtreeEndLine[lineNumber] : 0;
    if (subtreeEndLine >= lineNumber) {
      endLine = subtreeEndLine;
    } else {
      const range = getListItemSubtreeRange(doc, lineNumber, tabSize);
      endLine = range.endLine;
    }
  }
  if (blockType === "blockquote" /* Blockquote */) {
    const quoteDepth = getBlockquoteDepthFromLine(lineText);
    const inCallout = isInsideCalloutContainer(doc, lineNumber, quoteDepth);
    if (inCallout) {
      const range = getBlockquoteContainerRange(doc, lineNumber, quoteDepth);
      startLine = range.startLine;
      endLine = range.endLine;
      blockType = "callout" /* Callout */;
    } else {
      startLine = lineNumber;
      endLine = lineNumber;
      blockType = "blockquote" /* Blockquote */;
    }
  }
  if (blockType === "table" /* Table */) {
    for (let i = lineNumber - 1; i >= 1; i--) {
      const prevLine = doc.line(i);
      if (isTableLine(prevLine.text)) {
        startLine = i;
      } else {
        break;
      }
    }
  }
  if (blockType === "table" /* Table */) {
    for (let i = lineNumber + 1; i <= doc.lines; i++) {
      const nextLine = doc.line(i);
      if (isTableLine(nextLine.text)) {
        endLine = i;
      } else {
        break;
      }
    }
  }
  const startLineObj = doc.line(startLine);
  const endLineObj = doc.line(endLine);
  const startLineText = startLineObj.text;
  let content = "";
  for (let i = startLine; i <= endLine; i++) {
    content += doc.line(i).text;
    if (i < endLine)
      content += "\n";
  }
  const from = (_a = startLineObj.from) != null ? _a : 0;
  const to = (_b = endLineObj.to) != null ? _b : from + content.length;
  return {
    type: blockType,
    startLine: startLine - 1,
    // 转为0-indexed
    endLine: endLine - 1,
    from,
    to,
    indentLevel: getIndentLevel(startLineText, tabSize),
    content
  };
}
function nowMs2() {
  return typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
}
function detectBlock(state, lineNumber, options) {
  var _a;
  const doc = state.doc;
  const tabSize = normalizeTabSize(options.tabSize);
  let cacheByTabSize = blockDetectionCache.get(doc);
  if (!cacheByTabSize) {
    cacheByTabSize = /* @__PURE__ */ new Map();
    blockDetectionCache.set(doc, cacheByTabSize);
  }
  let perDocCache = cacheByTabSize.get(tabSize);
  if (!perDocCache) {
    perDocCache = /* @__PURE__ */ new Map();
    cacheByTabSize.set(tabSize, perDocCache);
  }
  if (perDocCache.has(lineNumber)) {
    return (_a = perDocCache.get(lineNumber)) != null ? _a : null;
  }
  const startedAt = nowMs2();
  const detected = detectBlockUncached(state, lineNumber, tabSize);
  recordDetectBlockPerf("detect_block_uncached", nowMs2() - startedAt);
  perDocCache.set(lineNumber, detected);
  return detected;
}

// src/domain/rules/insertion-rules.ts
var ALL_TYPES = Object.values(BlockType);
function rejectEntries(types, slot, reason) {
  return types.map((t2) => [`${t2}|${slot}`, reason]);
}
var REJECT_RULES = new Map([
  // inside_list: only ListItem allowed
  ...rejectEntries(
    ALL_TYPES.filter((t2) => t2 !== "list-item" /* ListItem */),
    "inside_list",
    "inside_list"
  ),
  // inside_quote_run: only Blockquote allowed (not Callout)
  ...rejectEntries(
    ALL_TYPES.filter((t2) => t2 !== "blockquote" /* Blockquote */),
    "inside_quote_run",
    "inside_quote_run"
  ),
  // quote_before: Callout blocked
  ...rejectEntries(["callout" /* Callout */], "quote_before", "quote_boundary"),
  // quote_after: only Blockquote allowed
  ...rejectEntries(
    ALL_TYPES.filter((t2) => t2 !== "blockquote" /* Blockquote */),
    "quote_after",
    "quote_boundary"
  ),
  // callout_after, table_before, hr_before: block ALL source types
  ...rejectEntries(ALL_TYPES, "callout_after", "callout_after"),
  ...rejectEntries(ALL_TYPES, "table_before", "table_before"),
  ...rejectEntries(ALL_TYPES, "hr_before", "hr_before")
]);
function resolveInsertionRule(input) {
  var _a;
  const key = `${input.sourceType}|${input.slotContext}`;
  const rejectReason = (_a = REJECT_RULES.get(key)) != null ? _a : null;
  return {
    allowDrop: rejectReason === null,
    rejectReason
  };
}

// src/domain/rules/container-policy.ts
var defaultDetectBlock = (state, lineNumber, options) => detectBlock(state, lineNumber, options);
function clampInsertionLineNumber(doc, lineNumber) {
  if (lineNumber < 1)
    return 1;
  if (lineNumber > doc.lines + 1)
    return doc.lines + 1;
  return lineNumber;
}
function getImmediateLineText(doc, lineNumber) {
  if (lineNumber < 1 || lineNumber > doc.lines)
    return null;
  return doc.line(lineNumber).text;
}
function getActiveLineMap(state, options) {
  var _a;
  return (_a = options.lineMap) != null ? _a : getLineMap(state, { tabSize: options.tabSize });
}
function getPreviousNonEmptyLineNumber(doc, lineNumber, lineMap) {
  if (lineMap && lineMap.doc === doc) {
    if (doc.lines <= 0)
      return null;
    const clampedLine = Math.max(1, Math.min(doc.lines, lineNumber));
    const prev = lineMap.prevNonEmpty[clampedLine];
    return prev > 0 ? prev : null;
  }
  for (let i = lineNumber; i >= 1; i--) {
    const text = doc.line(i).text;
    if (text.trim().length === 0)
      continue;
    return i;
  }
  return null;
}
function getNextNonEmptyLineNumber(doc, lineNumber, lineMap) {
  if (lineMap && lineMap.doc === doc) {
    if (doc.lines <= 0)
      return null;
    const clampedLine = Math.max(1, Math.min(doc.lines, lineNumber));
    const next = lineMap.nextNonEmpty[clampedLine];
    return next > 0 ? next : null;
  }
  for (let i = lineNumber; i <= doc.lines; i++) {
    const text = doc.line(i).text;
    if (text.trim().length === 0)
      continue;
    return i;
  }
  return null;
}
function findEnclosingListBlock(state, lineNumber, detectBlockFn, options) {
  var _a, _b;
  const doc = state.doc;
  if (lineNumber < 1 || lineNumber > doc.lines)
    return null;
  const lineMap = getActiveLineMap(state, options);
  const activeDetectBlockFn = detectBlockFn != null ? detectBlockFn : defaultDetectBlock;
  const radius = 8;
  const minLine = Math.max(1, lineNumber - radius);
  const maxLine = Math.min(doc.lines, lineNumber + radius);
  let best = null;
  for (let ln = minLine; ln <= maxLine; ln++) {
    const meta = getLineMetaAt(lineMap, ln);
    if (meta && !meta.isList)
      continue;
    const block = activeDetectBlockFn(state, ln, { tabSize: (_b = (_a = options.lineMap) == null ? void 0 : _a.tabSize) != null ? _b : options.tabSize });
    if (!block || block.type !== "list-item" /* ListItem */)
      continue;
    const blockStart = block.startLine + 1;
    const blockEnd = block.endLine + 1;
    if (lineNumber < blockStart || lineNumber > blockEnd)
      continue;
    if (!best || block.endLine - block.startLine > best.endLine - best.startLine) {
      best = block;
    }
  }
  return best;
}
function isTableBlockStartAtLine(state, lineNumber, detectBlockFn, options) {
  if (lineNumber < 1 || lineNumber > state.doc.lines)
    return false;
  const block = detectBlockFn(state, lineNumber, options);
  return !!block && block.type === "table" /* Table */ && block.startLine + 1 === lineNumber;
}
function isHorizontalRuleAtLine(state, lineNumber, detectBlockFn, options) {
  if (lineNumber < 1 || lineNumber > state.doc.lines)
    return false;
  const block = detectBlockFn(state, lineNumber, options);
  if (block) {
    return block.type === "hr" /* HorizontalRule */ && block.startLine + 1 === lineNumber;
  }
  return isHorizontalRuleLine(state.doc.line(lineNumber).text);
}
function isCalloutAfterBoundary(state, prevImmediateLine, nextIsQuoteLike, detectBlockFn, options) {
  if (prevImmediateLine < 1 || prevImmediateLine > state.doc.lines)
    return false;
  if (nextIsQuoteLike)
    return false;
  const prevBlock = detectBlockFn(state, prevImmediateLine, options);
  return !!prevBlock && prevBlock.type === "callout" /* Callout */ && prevBlock.endLine + 1 === prevImmediateLine;
}
function resolveListContextAtInsertion(state, targetLineNumber, detectBlockFn, options) {
  const doc = state.doc;
  if (doc.lines <= 0)
    return null;
  const lineMap = getActiveLineMap(state, options);
  const candidates = [
    targetLineNumber - 1,
    targetLineNumber,
    targetLineNumber + 1,
    getPreviousNonEmptyLineNumber(doc, targetLineNumber - 1, lineMap),
    getNextNonEmptyLineNumber(doc, targetLineNumber, lineMap)
  ].filter((v) => typeof v === "number" && v >= 1 && v <= doc.lines);
  const seen = /* @__PURE__ */ new Set();
  let best = null;
  for (const line of candidates) {
    if (seen.has(line))
      continue;
    seen.add(line);
    const lineMeta = getLineMetaAt(lineMap, line);
    if (lineMeta && !lineMeta.isList)
      continue;
    const block = findEnclosingListBlock(state, line, detectBlockFn, {
      lineMap,
      tabSize: options.tabSize
    });
    if (!block)
      continue;
    const blockTopBoundary = block.startLine + 1;
    const blockBottomBoundary = block.endLine + 2;
    const isInsideContainer = targetLineNumber > blockTopBoundary && targetLineNumber < blockBottomBoundary;
    if (!isInsideContainer)
      continue;
    if (!best || block.endLine - block.startLine > best.endLine - best.startLine) {
      best = block;
    }
  }
  if (!best)
    return null;
  return { type: "list-item" /* ListItem */, block: best };
}
function resolveSlotContextAtInsertion(state, targetLineNumber, detectBlockFn, options) {
  const doc = state.doc;
  const lineMap = getActiveLineMap(state, options);
  const clampedTarget = clampInsertionLineNumber(doc, targetLineNumber);
  const prevImmediateLine = clampedTarget - 1;
  const nextImmediateLine = clampedTarget <= doc.lines ? clampedTarget : null;
  const prevMeta = getLineMetaAt(lineMap, prevImmediateLine);
  const nextMeta = nextImmediateLine === null ? null : getLineMetaAt(lineMap, nextImmediateLine);
  const prevImmediateText = prevMeta ? null : getImmediateLineText(doc, prevImmediateLine);
  const nextImmediateText = nextMeta || nextImmediateLine === null ? null : getImmediateLineText(doc, nextImmediateLine);
  const prevIsQuoteLike = prevMeta ? prevMeta.isQuote : isBlockquoteLine(prevImmediateText);
  const nextIsQuoteLike = nextMeta ? nextMeta.isQuote : isBlockquoteLine(nextImmediateText);
  const detectOptions = { tabSize: options.tabSize };
  const activeDetectBlockFn = detectBlockFn != null ? detectBlockFn : defaultDetectBlock;
  if (isCalloutAfterBoundary(state, prevImmediateLine, nextIsQuoteLike, activeDetectBlockFn, detectOptions)) {
    return "callout_after";
  }
  if (nextImmediateLine !== null && isTableBlockStartAtLine(state, nextImmediateLine, activeDetectBlockFn, detectOptions)) {
    return "table_before";
  }
  if (nextImmediateLine !== null && isHorizontalRuleAtLine(state, nextImmediateLine, activeDetectBlockFn, detectOptions)) {
    return "hr_before";
  }
  if (prevIsQuoteLike && nextIsQuoteLike) {
    return "inside_quote_run";
  }
  if (!prevIsQuoteLike && nextIsQuoteLike) {
    return "quote_before";
  }
  if (prevIsQuoteLike && !nextIsQuoteLike) {
    return "quote_after";
  }
  const listContext = resolveListContextAtInsertion(
    state,
    clampedTarget,
    activeDetectBlockFn,
    { lineMap, tabSize: options.tabSize }
  );
  if (listContext) {
    return "inside_list";
  }
  return "outside";
}
function resolveDropRuleContextAtInsertion(state, sourceBlock, targetLineNumber, detectBlockFn, options) {
  const slotContext = resolveSlotContextAtInsertion(state, targetLineNumber, detectBlockFn, options);
  const decision = resolveInsertionRule({
    sourceType: sourceBlock.type,
    slotContext
  });
  return {
    slotContext,
    decision
  };
}

// src/domain/markdown/line-target-number.ts
function clampTargetLineNumber(totalLines, lineNumber) {
  if (lineNumber < 1)
    return 1;
  if (lineNumber > totalLines + 1)
    return totalLines + 1;
  return lineNumber;
}

// src/domain/mutation/list-mutation.ts
function getListContext(doc, lineNumber, parseLineWithQuote3) {
  return getListContextNearLine(doc, lineNumber, parseLineWithQuote3);
}
function parseListContextFromLine(doc, lineNumber, parseLineWithQuote3) {
  if (lineNumber < 1 || lineNumber > doc.lines) {
    return { context: null, isBlank: true, isList: false };
  }
  const text = doc.line(lineNumber).text;
  const isBlank = text.trim().length === 0;
  const parsed = parseLineWithQuote3(text);
  if (!parsed.isListItem) {
    return { context: null, isBlank, isList: false };
  }
  return {
    context: {
      indentWidth: parsed.indentWidth,
      indentRaw: parsed.indentRaw,
      markerType: parsed.markerType
    },
    isBlank,
    isList: true
  };
}
function getListContextNearLine(doc, lineNumber, parseLineWithQuote3, options) {
  var _a, _b, _c, _d;
  const scanUp = Math.max(0, (_a = options == null ? void 0 : options.scanUp) != null ? _a : 8);
  const scanDown = Math.max(0, (_b = options == null ? void 0 : options.scanDown) != null ? _b : 3);
  const skipBlankLines = (_c = options == null ? void 0 : options.skipBlankLines) != null ? _c : true;
  const stopAtNonListContent = (_d = options == null ? void 0 : options.stopAtNonListContent) != null ? _d : true;
  const current = parseListContextFromLine(doc, lineNumber, parseLineWithQuote3);
  if (current.context)
    return current.context;
  if (!skipBlankLines && current.isBlank)
    return null;
  let stopUp = false;
  let stopDown = false;
  for (let distance = 1; distance <= Math.max(scanUp, scanDown); distance++) {
    if (!stopUp && distance <= scanUp) {
      const upLineNumber = lineNumber - distance;
      if (upLineNumber >= 1) {
        const up = parseListContextFromLine(doc, upLineNumber, parseLineWithQuote3);
        if (up.context)
          return up.context;
        if (!up.isBlank && !up.isList && stopAtNonListContent) {
          stopUp = true;
        }
      }
    }
    if (!stopDown && distance <= scanDown) {
      const downLineNumber = lineNumber + distance;
      if (downLineNumber <= doc.lines) {
        const down = parseListContextFromLine(doc, downLineNumber, parseLineWithQuote3);
        if (down.context)
          return down.context;
        if (!down.isBlank && !down.isList && stopAtNonListContent) {
          stopDown = true;
        }
      }
    }
    if (stopUp && stopDown)
      break;
  }
  return null;
}
function getSourceListBase(lines, parseLineWithQuote3) {
  for (const line of lines) {
    const parsed = parseLineWithQuote3(line);
    if (parsed.isListItem) {
      return { indentWidth: parsed.indentWidth, indentRaw: parsed.indentRaw };
    }
  }
  return null;
}
function computeListIndentPlan(params) {
  var _a;
  const {
    doc,
    sourceBase,
    targetLineNumber,
    parseLineWithQuote: parseLineWithQuote3,
    getIndentUnitWidth: getIndentUnitWidthFn,
    getListContext: getListContextFn,
    listIntent
  } = params;
  const listContextLineNumber = (_a = listIntent == null ? void 0 : listIntent.contextLineNumber) != null ? _a : targetLineNumber;
  const targetContext = getListContextFn ? getListContextFn(doc, listContextLineNumber) : getListContextNearLine(doc, listContextLineNumber, parseLineWithQuote3);
  const indentSample = targetContext ? targetContext.indentRaw : sourceBase.indentRaw;
  const indentUnitWidth = getIndentUnitWidthFn(indentSample || sourceBase.indentRaw);
  const indentDeltaBase = (targetContext ? targetContext.indentWidth : 0) - sourceBase.indentWidth;
  const intentIndentDelta = (listIntent == null ? void 0 : listIntent.mode) === "child" ? 1 : (listIntent == null ? void 0 : listIntent.mode) === "outdent" ? -1 : 0;
  let indentDelta = indentDeltaBase + intentIndentDelta * indentUnitWidth;
  if (typeof (listIntent == null ? void 0 : listIntent.targetIndentWidth) === "number") {
    indentDelta = listIntent.targetIndentWidth - sourceBase.indentWidth;
  }
  return {
    listContextLineNumber,
    targetContext,
    indentSample,
    indentUnitWidth,
    indentDelta,
    targetIndentWidth: sourceBase.indentWidth + indentDelta,
    sourceBaseIndentWidth: sourceBase.indentWidth
  };
}
function adjustListToTargetContext(params) {
  const {
    doc,
    sourceContent,
    targetLineNumber,
    parseLineWithQuote: parseLineWithQuote3,
    getIndentUnitWidth: getIndentUnitWidthFn,
    buildIndentStringFromSample: buildIndentStringFromSampleFn,
    getListContext: getListContextFn,
    listIntent
  } = params;
  const lines = sourceContent.split("\n");
  const sourceBase = getSourceListBase(lines, parseLineWithQuote3);
  if (!sourceBase)
    return sourceContent;
  const indentPlan = computeListIndentPlan({
    doc,
    sourceBase,
    targetLineNumber,
    parseLineWithQuote: parseLineWithQuote3,
    getIndentUnitWidth: getIndentUnitWidthFn,
    getListContext: getListContextFn,
    listIntent
  });
  const quoteAdjustedLines = lines.map((line) => {
    if (line.trim().length === 0)
      return line;
    const parsed = parseLineWithQuote3(line);
    const rest = parsed.rest;
    if (!parsed.isListItem) {
      if (parsed.indentWidth >= sourceBase.indentWidth) {
        const newIndent2 = buildIndentStringFromSampleFn(
          indentPlan.indentSample,
          parsed.indentWidth + indentPlan.indentDelta
        );
        return `${parsed.quotePrefix}${newIndent2}${rest.slice(parsed.indentRaw.length)}`;
      }
      return line;
    }
    const newIndent = buildIndentStringFromSampleFn(
      indentPlan.indentSample,
      parsed.indentWidth + indentPlan.indentDelta
    );
    return `${parsed.quotePrefix}${newIndent}${parsed.marker}${parsed.content}`;
  });
  return quoteAdjustedLines.join("\n");
}
function buildInsertText(params) {
  const {
    sourceBlockType,
    sourceContent,
    adjustListToTargetContext: adjustListToTargetContextFn
  } = params;
  let text = sourceContent;
  if (sourceBlockType !== "blockquote" /* Blockquote */) {
    text = adjustListToTargetContextFn(text);
  }
  text += "\n";
  return text;
}

// src/domain/markdown/line-range.ts
function normalizeLineRange(docLines, startLineNumber, endLineNumber) {
  const safeStart = Math.max(1, Math.min(docLines, Math.min(startLineNumber, endLineNumber)));
  const safeEnd = Math.max(1, Math.min(docLines, Math.max(startLineNumber, endLineNumber)));
  return {
    startLineNumber: safeStart,
    endLineNumber: safeEnd
  };
}
function mergeLineRanges(docLines, ranges) {
  const normalized = ranges.map((range) => normalizeLineRange(docLines, range.startLineNumber, range.endLineNumber)).sort((a, b) => a.startLineNumber - b.startLineNumber);
  const merged = [];
  for (const range of normalized) {
    const last = merged[merged.length - 1];
    if (!last || range.startLineNumber > last.endLineNumber + 1) {
      merged.push({ ...range });
      continue;
    }
    if (range.endLineNumber > last.endLineNumber) {
      last.endLineNumber = range.endLineNumber;
    }
  }
  return merged;
}
function isLineNumberInRanges(lineNumber, ranges) {
  for (const range of ranges) {
    if (lineNumber >= range.startLineNumber && lineNumber <= range.endLineNumber) {
      return true;
    }
  }
  return false;
}

// src/domain/selection/selection-ranges.ts
function normalizeCompositeRanges(ranges, totalLines) {
  if (totalLines <= 0) {
    return [];
  }
  const lineRanges = ranges.map((range) => ({
    startLineNumber: range.startLine + 1,
    endLineNumber: range.endLine + 1
  }));
  return mergeLineRanges(totalLines, lineRanges).map((range) => ({
    startLine: range.startLineNumber - 1,
    endLine: range.endLineNumber - 1
  }));
}

// src/domain/rules/drop-validation.ts
function sourceRangesAreListStructured(params) {
  const { doc, source, parseLineWithQuote: parseLineWithQuote3, ranges } = params;
  if (source.anchorBlock.type !== "list-item" /* ListItem */)
    return false;
  for (const range of ranges) {
    let foundContent = false;
    for (let lineNumber = range.startLine + 1; lineNumber <= range.endLine + 1; lineNumber++) {
      const text = doc.line(lineNumber).text;
      if (text.trim().length === 0)
        continue;
      foundContent = true;
      if (!parseLineWithQuote3(text).isListItem)
        return false;
    }
    if (!foundContent)
      return false;
  }
  return true;
}
function validateInPlaceDrop(params) {
  var _a;
  const {
    doc,
    source,
    targetLineNumber,
    parseLineWithQuote: parseLineWithQuote3,
    getListContext: getListContext2,
    getIndentUnitWidth: getIndentUnitWidth2,
    slotContext,
    lineMap,
    listIntent
  } = params;
  const sourceBlock = source.anchorBlock;
  if (typeof slotContext === "string") {
    const containerRule = resolveInsertionRule({
      sourceType: sourceBlock.type,
      slotContext
    });
    if (!containerRule.allowDrop) {
      return {
        inSelfRange: false,
        allowInPlaceIndentChange: false,
        rejectReason: (_a = containerRule.rejectReason) != null ? _a : "container_policy"
      };
    }
  }
  const targetLineIdx = targetLineNumber - 1;
  const sourceRanges = normalizeCompositeRanges(source.ranges, doc.lines);
  const effectiveSourceRange = {
    startLine: sourceRanges[0].startLine,
    endLine: sourceRanges[sourceRanges.length - 1].endLine
  };
  const inSelectedRange = sourceRanges.some((range) => targetLineIdx >= range.startLine && targetLineIdx <= range.endLine);
  const inSelfRange = inSelectedRange || targetLineIdx === effectiveSourceRange.endLine + 1;
  if (!inSelfRange) {
    return { inSelfRange: false, allowInPlaceIndentChange: false };
  }
  const hasListIntent = (listIntent == null ? void 0 : listIntent.targetIndentWidth) !== void 0 || (listIntent == null ? void 0 : listIntent.mode) !== void 0;
  if (!hasListIntent) {
    return {
      inSelfRange: true,
      allowInPlaceIndentChange: false,
      rejectReason: "self_range_blocked"
    };
  }
  if (!sourceRangesAreListStructured({
    doc,
    source,
    parseLineWithQuote: parseLineWithQuote3,
    ranges: sourceRanges
  })) {
    return {
      inSelfRange: true,
      allowInPlaceIndentChange: false,
      rejectReason: "self_range_blocked"
    };
  }
  const sourceLineNumber = effectiveSourceRange.startLine + 1;
  const sourceLineMeta = lineMap ? getLineMetaAt(lineMap, sourceLineNumber) : null;
  if (sourceLineMeta && !sourceLineMeta.isList) {
    return {
      inSelfRange: true,
      allowInPlaceIndentChange: false,
      rejectReason: "self_range_blocked"
    };
  }
  const sourceLineText = doc.line(sourceLineNumber).text;
  const sourceParsed = parseLineWithQuote3(sourceLineText);
  if (!sourceParsed.isListItem) {
    return {
      inSelfRange: true,
      allowInPlaceIndentChange: false,
      rejectReason: "self_range_blocked"
    };
  }
  const indentPlan = computeListIndentPlan({
    doc,
    sourceBase: {
      indentWidth: sourceParsed.indentWidth,
      indentRaw: sourceParsed.indentRaw
    },
    targetLineNumber,
    parseLineWithQuote: parseLineWithQuote3,
    getIndentUnitWidth: getIndentUnitWidth2,
    getListContext: getListContext2,
    listIntent
  });
  const targetIndentWidth = indentPlan.targetIndentWidth;
  const listContextLineNumber = indentPlan.listContextLineNumber;
  const isAfterSelf = targetLineIdx === effectiveSourceRange.endLine + 1;
  const isSameLine = targetLineIdx === effectiveSourceRange.startLine;
  const sourceEndLineNumber = effectiveSourceRange.endLine + 1;
  const isSelfContext = listContextLineNumber === sourceLineNumber;
  const isContextInsideSource = listContextLineNumber >= sourceLineNumber && listContextLineNumber <= sourceEndLineNumber;
  if (isAfterSelf && isContextInsideSource && targetIndentWidth > sourceParsed.indentWidth) {
    return {
      inSelfRange: true,
      allowInPlaceIndentChange: false,
      rejectReason: "self_embedding",
      listContextLineNumber,
      targetIndentWidth
    };
  }
  const allowInPlaceIndentChange = isAfterSelf && targetIndentWidth !== sourceParsed.indentWidth || isSameLine && targetIndentWidth !== sourceParsed.indentWidth && !isSelfContext || !isAfterSelf && targetIndentWidth < sourceParsed.indentWidth;
  if (!allowInPlaceIndentChange) {
    return {
      inSelfRange: true,
      allowInPlaceIndentChange: false,
      rejectReason: "self_range_blocked",
      listContextLineNumber,
      targetIndentWidth
    };
  }
  return {
    inSelfRange: true,
    allowInPlaceIndentChange: true,
    listContextLineNumber,
    targetIndentWidth
  };
}

// src/domain/mutation/document-change.ts
function resolveInsertionChange(doc, targetLineNumber, insertText, options) {
  var _a;
  if (targetLineNumber <= doc.lines) {
    return {
      pos: doc.line(targetLineNumber).from,
      text: insertText
    };
  }
  const normalized = insertText.endsWith("\n") ? insertText.slice(0, -1) : insertText;
  if (!normalized.length) {
    return { pos: doc.length, text: normalized };
  }
  const remainingLengthAfterDelete = (_a = options == null ? void 0 : options.remainingLengthAfterDelete) != null ? _a : doc.length;
  if (remainingLengthAfterDelete <= 0) {
    return { pos: 0, text: normalized };
  }
  return {
    pos: doc.length,
    text: `
${normalized}`
  };
}
function resolveDeleteRange(doc, sourceFrom, sourceTo) {
  if (sourceTo < doc.length) {
    return {
      from: sourceFrom,
      to: Math.min(sourceTo + 1, doc.length)
    };
  }
  if (sourceFrom > 0) {
    return {
      from: sourceFrom - 1,
      to: sourceTo
    };
  }
  return {
    from: sourceFrom,
    to: sourceTo
  };
}

// src/domain/selection/block-selection.ts
function createBlockSelection(anchorBlock, ranges, focusBlock = anchorBlock) {
  return { anchorBlock, focusBlock, ranges };
}

// src/domain/transaction/command-reject.ts
function rejectCommand(reason) {
  return { type: "reject", reason };
}

// src/domain/transaction/move-blocks.ts
function captureMoveSource(doc, selection) {
  const payload = captureMoveSourcePayload(doc, selection);
  if (!payload)
    return null;
  const firstRange = payload.ranges[0];
  const lastRange = payload.ranges[payload.ranges.length - 1];
  const firstLine = doc.line(firstRange.startLine + 1);
  const lastLine = doc.line(lastRange.endLine + 1);
  return {
    block: {
      ...selection.anchorBlock,
      startLine: firstRange.startLine,
      endLine: lastRange.endLine,
      from: firstLine.from,
      to: lastLine.to,
      content: payload.content
    },
    payload
  };
}
function captureMoveSourcePayload(doc, selection) {
  const ranges = normalizeCompositeRanges(selection.ranges, doc.lines);
  if (ranges.length === 0)
    return null;
  const segments = ranges.map((range) => {
    const startLineNumber = range.startLine + 1;
    const endLineNumber = range.endLine + 1;
    const startLine = doc.line(startLineNumber);
    const endLine = doc.line(endLineNumber);
    const deleteRange = resolveDeleteRange(doc, startLine.from, endLine.to);
    return {
      startLineNumber,
      endLineNumber,
      from: startLine.from,
      to: endLine.to,
      deleteFrom: deleteRange.from,
      deleteTo: deleteRange.to
    };
  });
  const content = segments.map((segment) => doc.sliceString(segment.from, segment.to)).join("\n");
  return { content, ranges, segments };
}
function planMoveBlocksTransaction(params) {
  const { doc, selection, target, deps } = params;
  const capturedSource = captureMoveSource(doc, selection);
  if (!capturedSource)
    return rejectCommand("empty_selection");
  return planCapturedMoveBlocksTransaction({
    doc,
    capturedSource,
    target,
    deps
  });
}
function planCapturedMoveBlocksTransaction(params) {
  var _a, _b, _c;
  const { doc, capturedSource, target, deps } = params;
  const { block: sourceBlock, payload } = capturedSource;
  const targetLineNumber = clampTargetLineNumber(doc.lines, target.targetLineNumber);
  const lineMap = getLineMap({ doc }, { tabSize: deps.tabSize });
  const containerRule = deps.resolveDropRuleAtInsertion(sourceBlock, targetLineNumber, {
    lineMap,
    tabSize: deps.tabSize
  });
  if (!containerRule.decision.allowDrop) {
    return rejectCommand((_a = containerRule.decision.rejectReason) != null ? _a : "container_policy");
  }
  const mode = (_b = params.mode) != null ? _b : "same-document";
  if (mode === "same-document") {
    const inPlaceValidation = validateInPlaceDrop({
      doc,
      source: createBlockSelection(sourceBlock, payload.ranges),
      targetLineNumber,
      parseLineWithQuote: deps.parseLineWithQuote,
      getListContext: deps.getListContext,
      getIndentUnitWidth: deps.getIndentUnitWidth,
      slotContext: containerRule.slotContext,
      lineMap,
      listIntent: target.listIntent
    });
    const allowInPlaceIndentChange = inPlaceValidation.allowInPlaceIndentChange;
    if (inPlaceValidation.inSelfRange && !allowInPlaceIndentChange) {
      return rejectCommand((_c = inPlaceValidation.rejectReason) != null ? _c : "self_range_blocked");
    }
    return planInsertionAndDeletionTransaction({
      doc,
      sourceBlock,
      payload,
      targetLineNumber,
      listIntent: target.listIntent,
      deps,
      allowInPlaceIndentChange
    });
  }
  return planInsertOnlyTransaction({
    doc,
    sourceBlock,
    payload,
    targetLineNumber,
    listIntent: target.listIntent,
    deps
  });
}
function planInsertionAndDeletionTransaction(params) {
  const { doc, sourceBlock, payload, targetLineNumber, listIntent, deps, allowInPlaceIndentChange } = params;
  const insertText = deps.buildInsertText(
    doc,
    sourceBlock,
    targetLineNumber,
    payload.content,
    listIntent
  );
  if (!insertText.length)
    return rejectCommand("no_insert_text");
  const totalDeletedLength = payload.segments.reduce(
    (sum, segment) => sum + (segment.deleteTo - segment.deleteFrom),
    0
  );
  const insertion = resolveInsertionChange(doc, targetLineNumber, insertText, {
    remainingLengthAfterDelete: doc.length - totalDeletedLength
  });
  if (payload.segments.some((segment) => insertion.pos > segment.deleteFrom && insertion.pos < segment.deleteTo)) {
    return rejectCommand("insertion_inside_deleted_range");
  }
  const firstSegment = payload.segments[0];
  const changes = allowInPlaceIndentChange && insertion.pos === firstSegment.deleteFrom ? [{ from: firstSegment.deleteFrom, to: firstSegment.deleteTo, insert: insertion.text }] : [
    { from: insertion.pos, to: insertion.pos, insert: insertion.text },
    ...payload.segments.map((segment) => ({ from: segment.deleteFrom, to: segment.deleteTo, insert: "" }))
  ].sort((a, b) => b.from - a.from);
  const finalInsertedStartLineNumber = resolveFinalInsertedStartLineNumber(targetLineNumber, payload);
  const renumberTargets = /* @__PURE__ */ new Set([targetLineNumber, finalInsertedStartLineNumber]);
  for (const segment of payload.segments) {
    renumberTargets.add(segment.startLineNumber);
  }
  return {
    changes,
    effects: [
      { type: "restore-fold-state", lineNumber: finalInsertedStartLineNumber },
      ...Array.from(renumberTargets).map((lineNumber) => ({ type: "renumber-ordered-list", lineNumber }))
    ]
  };
}
function planInsertOnlyTransaction(params) {
  const { doc, sourceBlock, payload, targetLineNumber, listIntent, deps } = params;
  const insertText = deps.buildInsertText(
    doc,
    sourceBlock,
    targetLineNumber,
    payload.content,
    listIntent
  );
  if (!insertText.length)
    return rejectCommand("no_insert_text");
  const insertion = resolveInsertionChange(doc, targetLineNumber, insertText, {
    remainingLengthAfterDelete: doc.length
  });
  const changes = [{ from: insertion.pos, to: insertion.pos, insert: insertion.text }];
  return {
    changes,
    effects: [
      { type: "restore-fold-state", lineNumber: targetLineNumber },
      { type: "renumber-ordered-list", lineNumber: targetLineNumber }
    ]
  };
}
function resolveFinalInsertedStartLineNumber(targetLineNumber, payload) {
  let removedLineCountBeforeTarget = 0;
  for (const segment of payload.segments) {
    if (segment.endLineNumber < targetLineNumber) {
      removedLineCountBeforeTarget += segment.endLineNumber - segment.startLineNumber + 1;
    }
  }
  return Math.max(1, targetLineNumber - removedLineCountBeforeTarget);
}

// src/domain/transaction/delete-blocks.ts
function planDeleteBlocksTransaction(params) {
  const { doc, selection } = params;
  const ranges = normalizeCompositeRanges(selection.ranges, doc.lines);
  if (ranges.length === 0)
    return rejectCommand("empty_selection");
  const changes = ranges.map((range) => {
    const startLineNumber = range.startLine + 1;
    const endLineNumber = range.endLine + 1;
    const startLine = doc.line(startLineNumber);
    const endLine = doc.line(endLineNumber);
    const deletesOnlyFinalLine = startLineNumber === endLineNumber && endLineNumber === doc.lines && startLineNumber > 1;
    return {
      from: deletesOnlyFinalLine ? startLine.from - 1 : startLine.from,
      to: endLineNumber === doc.lines ? doc.length : Math.min(doc.length, endLine.to + 1),
      insert: ""
    };
  }).filter((change) => change.to > change.from).sort((a, b) => b.from - a.from);
  if (changes.length === 0)
    return rejectCommand("empty_selection");
  return { changes };
}

// src/domain/transaction/block-command-transaction.ts
function planBlockCommandTransaction(params) {
  const { doc, command, deps } = params;
  if (command.type === "delete") {
    return planDeleteCommandTransaction({ doc, command });
  }
  if (command.type !== "move")
    return rejectCommand("unsupported_command");
  if (!deps)
    return rejectCommand("missing_move_planner_deps");
  return planMoveCommandTransaction({ doc, command, deps });
}
function planDeleteCommandTransaction(params) {
  const { doc, command } = params;
  return planDeleteBlocksTransaction({
    doc,
    selection: command.selection
  });
}
function planMoveCommandTransaction(params) {
  const { doc, command, deps } = params;
  return planMoveBlocksTransaction({
    doc,
    selection: command.selection,
    target: command.target,
    deps
  });
}
function planCapturedMoveCommandTransaction(params) {
  const { doc, capturedSource, command, deps, mode } = params;
  return planCapturedMoveBlocksTransaction({
    doc,
    capturedSource,
    target: command.target,
    deps,
    mode
  });
}

// src/domain/transaction/list-renumber.ts
function planOrderedListRenumberChanges(doc, parseLineWithQuote3, lineNumber) {
  if (lineNumber < 1 || lineNumber > doc.lines)
    return [];
  const findOrderedAt = (n) => {
    const parsed = parseLineWithQuote3(doc.line(n).text);
    if (parsed.isListItem && parsed.markerType === "ordered") {
      return { indentWidth: parsed.indentWidth, quoteDepth: parsed.quoteDepth };
    }
    return null;
  };
  let anchor = findOrderedAt(lineNumber);
  if (!anchor && lineNumber > 1)
    anchor = findOrderedAt(lineNumber - 1);
  if (!anchor && lineNumber < doc.lines)
    anchor = findOrderedAt(lineNumber + 1);
  if (!anchor)
    return [];
  let start = lineNumber;
  while (start > 1) {
    const info = findOrderedAt(start - 1);
    if (!info || info.indentWidth !== anchor.indentWidth || info.quoteDepth !== anchor.quoteDepth)
      break;
    start -= 1;
  }
  let end = lineNumber;
  while (end < doc.lines) {
    const info = findOrderedAt(end + 1);
    if (!info || info.indentWidth !== anchor.indentWidth || info.quoteDepth !== anchor.quoteDepth)
      break;
    end += 1;
  }
  const changes = [];
  let number = 1;
  for (let i = start; i <= end; i++) {
    const line = doc.line(i);
    const parsed = parseLineWithQuote3(line.text);
    if (!parsed.isListItem || parsed.markerType !== "ordered" || parsed.indentWidth !== anchor.indentWidth)
      continue;
    const newMarker = `${number}. `;
    const markerStart = line.from + parsed.quotePrefix.length + parsed.indentRaw.length;
    const markerEnd = markerStart + parsed.marker.length;
    changes.push({ from: markerStart, to: markerEnd, insert: newMarker });
    number += 1;
  }
  return changes;
}

// src/platform/codemirror/transaction/undo-selection-anchor.ts
var import_state = require("@codemirror/state");
function anchorSelectionBeforeUndoableChange(view, pos) {
  const docLength = view.state.doc.length;
  const anchor = Math.max(0, Math.min(docLength, pos));
  view.dispatch({
    selection: { anchor },
    scrollIntoView: false,
    annotations: import_state.Transaction.addToHistory.of(false)
  });
}

// src/platform/codemirror/transaction/transaction-applier.ts
function applyBlockTransaction(view, transaction, options) {
  var _a;
  if (transaction.changes.length === 0)
    return;
  if (typeof (options == null ? void 0 : options.anchor) === "number") {
    anchorSelectionBeforeUndoableChange(view, options.anchor);
  }
  view.dispatch({
    changes: transaction.changes,
    scrollIntoView: (_a = options == null ? void 0 : options.scrollIntoView) != null ? _a : false
  });
}

// src/platform/codemirror/transaction/move-command-applier.ts
function isReject(value) {
  return !!value && typeof value === "object" && "type" in value && value.type === "reject";
}
function applyMoveCommand(deps, params) {
  var _a, _b, _c, _d, _e;
  const {
    command,
    sourceView,
    sourceDocumentRelation,
    capturedBlockFoldStateOverride
  } = params;
  const selection = command.selection;
  const sourceEditorView = sourceView != null ? sourceView : deps.view;
  const sourceDoc = sourceEditorView.state.doc;
  const capturedSource = captureMoveSource(sourceDoc, selection);
  if (!capturedSource)
    return;
  if (sourceView && sourceView !== deps.view && sourceDocumentRelation !== "same_document") {
    const capturedBlockFoldState2 = capturedBlockFoldStateOverride != null ? capturedBlockFoldStateOverride : captureBlockFoldState(deps, sourceView, capturedSource.block);
    applyMoveCommandAcrossEditors({
      sourceView,
      targetView: deps.view,
      sourceBlock: capturedSource.block,
      moveSourcePayload: capturedSource.payload,
      command,
      capturedBlockFoldState: capturedBlockFoldState2,
      deps
    });
    return;
  }
  const capturedBlockFoldState = capturedBlockFoldStateOverride != null ? capturedBlockFoldStateOverride : captureBlockFoldState(deps, sourceEditorView, capturedSource.block);
  const doc = deps.view.state.doc;
  const displacedTargetFoldState = selection.ranges.length <= 1 ? captureDisplacedTargetFoldState(deps, {
    sourceBlock: capturedSource.block,
    targetLineNumber: command.target.targetLineNumber,
    insertedLineCount: capturedSource.payload.content.split("\n").length
  }) : null;
  const planned = planBlockCommandTransaction({ doc, command, deps });
  if (isReject(planned))
    return;
  applyBlockTransaction(deps.view, planned, { anchor: capturedSource.block.from });
  applyMovePostEffects(deps, planned.effects);
  const restoreLine = (_c = (_b = (_a = planned.effects) == null ? void 0 : _a.find((effect) => effect.type === "restore-fold-state")) == null ? void 0 : _b.lineNumber) != null ? _c : command.target.targetLineNumber;
  (_d = deps.blockFoldState) == null ? void 0 : _d.restore(deps.view, restoreLine, capturedBlockFoldState != null ? capturedBlockFoldState : null);
  if (displacedTargetFoldState) {
    (_e = deps.blockFoldState) == null ? void 0 : _e.restore(
      deps.view,
      displacedTargetFoldState.targetStartLineNumber,
      displacedTargetFoldState.foldState
    );
  }
}
function applyMoveCommandAcrossEditors(params) {
  var _a;
  const { sourceView, targetView, sourceBlock, moveSourcePayload, command, capturedBlockFoldState, deps } = params;
  if (sourceView === targetView)
    return;
  const targetDoc = targetView.state.doc;
  const planned = planCapturedMoveCommandTransaction({
    doc: targetDoc,
    capturedSource: { block: sourceBlock, payload: moveSourcePayload },
    command,
    deps,
    mode: "insert-only"
  });
  if (isReject(planned))
    return;
  applyBlockTransaction(targetView, { ...planned, changes: planned.changes.filter((change) => change.insert.length > 0) }, {
    anchor: sourceBlock.from
  });
  applyMovePostEffects({ ...deps, view: targetView }, planned.effects);
  applyBlockTransaction(sourceView, {
    changes: moveSourcePayload.segments.map((segment) => ({ from: segment.deleteFrom, to: segment.deleteTo, insert: "" })).sort((a, b) => b.from - a.from)
  }, { anchor: sourceBlock.from });
  (_a = deps.blockFoldState) == null ? void 0 : _a.restore(targetView, command.target.targetLineNumber, capturedBlockFoldState != null ? capturedBlockFoldState : null);
}
function applyMovePostEffects(deps, effects) {
  if (!effects)
    return;
  const renumberLineNumbers = Array.from(new Set(
    effects.filter((effect) => effect.type === "renumber-ordered-list").map((effect) => effect.lineNumber)
  ));
  for (const lineNumber of renumberLineNumbers) {
    const changes = planOrderedListRenumberChanges(
      deps.view.state.doc,
      deps.parseLineWithQuote,
      lineNumber
    );
    if (changes.length > 0) {
      applyBlockTransaction(deps.view, { changes });
    }
  }
}
function captureBlockFoldState(deps, sourceView, sourceBlock) {
  var _a, _b;
  return (_b = (_a = deps.blockFoldState) == null ? void 0 : _a.capture(sourceView, sourceBlock)) != null ? _b : null;
}
function captureDisplacedTargetFoldState(deps, params) {
  if (!deps.blockFoldState)
    return null;
  const { sourceBlock, targetLineNumber, insertedLineCount } = params;
  const targetBlock = resolveDisplacedTargetBlock(deps.view, targetLineNumber);
  if (!targetBlock)
    return null;
  if (sourceBlock.startLine <= targetBlock.startLine)
    return null;
  const foldState = deps.blockFoldState.capture(deps.view, targetBlock);
  if (!foldState)
    return null;
  return {
    targetStartLineNumber: targetBlock.startLine + 1 + insertedLineCount,
    foldState
  };
}
function resolveDisplacedTargetBlock(view, targetLineNumber) {
  const state = view.state;
  const doc = state.doc;
  if (targetLineNumber < 1 || targetLineNumber > doc.lines)
    return null;
  const targetBlock = detectBlock(state, targetLineNumber, { tabSize: view.state.facet(import_state2.EditorState.tabSize) });
  if (targetBlock) {
    return targetLineNumber === targetBlock.startLine + 1 ? targetBlock : null;
  }
  const lineMap = getLineMap(state, { tabSize: view.state.facet(import_state2.EditorState.tabSize) });
  const nextNonEmptyLineNumber = getNextNonEmptyLineNumber(doc, targetLineNumber, lineMap);
  if (nextNonEmptyLineNumber === null)
    return null;
  const nextBlock = detectBlock(state, nextNonEmptyLineNumber, { tabSize: view.state.facet(import_state2.EditorState.tabSize) });
  if (!nextBlock || nextNonEmptyLineNumber !== nextBlock.startLine + 1)
    return null;
  return nextBlock;
}

// src/platform/codemirror/selection/rect-calculator.ts
function getCoordsAtPos(view, pos, side) {
  try {
    const { from, to } = view.viewport;
    const margin = 500;
    if (pos >= Math.max(0, from - margin) && pos <= to + margin) {
      return typeof side !== "undefined" ? view.coordsAtPos(pos, side) : view.coordsAtPos(pos);
    }
    const lineBlock = view.lineBlockAt(pos);
    const editorRect = view.dom.getBoundingClientRect();
    const doc = view.state.doc;
    if (pos < 0 || pos > doc.length)
      return null;
    const line = doc.lineAt(pos);
    const col = pos - line.from;
    const defaultCharWidth = view.defaultCharacterWidth || 7;
    const estimatedLeft = editorRect.left + col * defaultCharWidth;
    const estimatedRight = estimatedLeft + defaultCharWidth;
    const documentTop = view.documentTop;
    const screenTop = documentTop + lineBlock.top;
    const screenBottom = documentTop + lineBlock.bottom;
    return {
      left: estimatedLeft,
      right: estimatedRight,
      top: screenTop,
      bottom: screenBottom
    };
  } catch (e) {
    return null;
  }
}
function getLineRect(view, lineNumber) {
  const doc = view.state.doc;
  if (lineNumber < 1 || lineNumber > doc.lines)
    return void 0;
  const line = doc.line(lineNumber);
  const start = getCoordsAtPos(view, line.from);
  const end = getCoordsAtPos(view, line.to);
  if (!start || !end)
    return void 0;
  const left = Math.min(start.left, end.left);
  const right = Math.max(start.left, end.left);
  return { left, width: Math.max(8, right - left) };
}
function getInsertionAnchorY(view, lineNumber) {
  const doc = view.state.doc;
  let y = null;
  if (lineNumber <= 1) {
    const first = doc.line(1);
    const coords = getCoordsAtPos(view, first.from);
    y = coords ? coords.top : null;
  } else {
    const anchorLineNumber = Math.min(lineNumber - 1, doc.lines);
    const anchorLine = doc.line(anchorLineNumber);
    const coords = getCoordsAtPos(view, anchorLine.to);
    y = coords ? coords.bottom : null;
  }
  return y;
}
function getLineIndentPosByWidth(view, lineNumber, targetIndentWidth, tabSize) {
  const doc = view.state.doc;
  if (lineNumber < 1 || lineNumber > doc.lines)
    return null;
  const line = doc.line(lineNumber);
  const text = line.text;
  let width = 0;
  let idx = 0;
  while (idx < text.length && width < targetIndentWidth) {
    const ch = text[idx];
    if (ch === "	") {
      width += tabSize;
    } else if (ch === " ") {
      width += 1;
    } else {
      break;
    }
    idx += 1;
  }
  return line.from + idx;
}
function getBlockRect(view, startLineNumber, endLineNumber) {
  const doc = view.state.doc;
  if (startLineNumber < 1 || endLineNumber > doc.lines)
    return void 0;
  let minLeft = Number.POSITIVE_INFINITY;
  let maxRight = 0;
  let top = 0;
  let bottom = 0;
  for (let i = startLineNumber; i <= endLineNumber; i++) {
    const line = doc.line(i);
    const start = getCoordsAtPos(view, line.from);
    const end = getCoordsAtPos(view, line.to);
    if (!start || !end)
      continue;
    if (i === startLineNumber)
      top = start.top;
    if (i === endLineNumber)
      bottom = end.bottom;
    const left = Math.min(start.left, end.left);
    const right = Math.max(start.left, end.left);
    minLeft = Math.min(minLeft, left);
    maxRight = Math.max(maxRight, right);
  }
  if (!isFinite(minLeft) || maxRight === 0 || bottom <= top)
    return void 0;
  return { top, left: minLeft, width: Math.max(8, maxRight - minLeft), height: bottom - top };
}

// src/platform/dom/embed-probe.ts
function normalizeEmbedRoot(el) {
  var _a;
  if (!el)
    return null;
  return (_a = el.closest(EMBED_ROOT_SELECTOR)) != null ? _a : el;
}
function collectEmbedRoots(view, options) {
  var _a;
  const root = view.dom;
  if (!(root == null ? void 0 : root.instanceOf(HTMLElement)))
    return [];
  const normalizeToEmbedRoot = (options == null ? void 0 : options.normalizeToEmbedRoot) !== false;
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  const raws = Array.from(root.querySelectorAll(EMBED_BLOCK_SELECTOR));
  for (const raw of raws) {
    const candidate = normalizeToEmbedRoot ? (_a = normalizeEmbedRoot(raw)) != null ? _a : raw : raw;
    if (!root.contains(candidate))
      continue;
    if (seen.has(candidate))
      continue;
    seen.add(candidate);
    result.push(candidate);
  }
  return result;
}
function findEmbedElementAtPoint(view, clientX, clientY, options) {
  var _a;
  const root = view.dom;
  if (!(root == null ? void 0 : root.instanceOf(HTMLElement)))
    return null;
  const requireDirectWithinRoot = (options == null ? void 0 : options.requireDirectWithinRoot) !== false;
  const normalizeToEmbedRoot = (options == null ? void 0 : options.normalizeToEmbedRoot) !== false;
  if (typeof activeDocument.elementFromPoint === "function") {
    const rawEl = activeDocument.elementFromPoint(clientX, clientY);
    const el = (rawEl == null ? void 0 : rawEl.instanceOf(HTMLElement)) ? rawEl : null;
    if (el) {
      const direct = el.closest(EMBED_BLOCK_SELECTOR);
      if (direct) {
        if (!requireDirectWithinRoot || root.contains(direct)) {
          return normalizeToEmbedRoot ? (_a = normalizeEmbedRoot(direct)) != null ? _a : direct : direct;
        }
      }
    }
  }
  return null;
}

// src/domain/markdown/line-number.ts
function clampLineNumber(docLines, lineNumber) {
  if (docLines <= 0)
    return 1;
  if (lineNumber < 1)
    return 1;
  if (lineNumber > docLines)
    return docLines;
  return lineNumber;
}

// src/platform/dom/element-probe.ts
function clamp(value, min, max) {
  if (value < min)
    return min;
  if (value > max)
    return max;
  return value;
}
function safeCoordsAtPos(view, pos, side) {
  return getCoordsAtPos(view, pos, side);
}
function safePosAtCoords(view, coords) {
  try {
    return view.posAtCoords(coords);
  } catch (e) {
    return null;
  }
}
function resolveLineNumberFromPos(view, pos) {
  try {
    return clampLineNumber(view.state.doc.lines, view.state.doc.lineAt(pos).number);
  } catch (e) {
    return null;
  }
}
function resolveLineNumberFromDomNodes(view, probes) {
  const seen = /* @__PURE__ */ new Set();
  for (const probe of probes) {
    if (!probe)
      continue;
    if (seen.has(probe))
      continue;
    seen.add(probe);
    try {
      const pos = view.posAtDOM(probe, 0);
      const lineNumber = resolveLineNumberFromPos(view, pos);
      if (lineNumber !== null)
        return lineNumber;
    } catch (e) {
    }
  }
  return null;
}
function resolveLineNumberFromBlockStartAttribute(view, handle) {
  const startAttr = handle.getAttribute("data-block-start");
  if (startAttr === null)
    return null;
  const lineNumber = Number(startAttr) + 1;
  if (!Number.isInteger(lineNumber))
    return null;
  if (lineNumber < 1 || lineNumber > view.state.doc.lines)
    return null;
  return lineNumber;
}
function resolveLineNumberAtCoords(view, clientX, clientY, contentRect) {
  const clampedX = clamp(clientX, contentRect.left + 2, contentRect.right - 2);
  const pos = safePosAtCoords(view, { x: clampedX, y: clientY });
  if (pos === null)
    return null;
  return resolveLineNumberFromPos(view, pos);
}

// src/platform/dom/line-hit.ts
function getRenderedMainLineElementAtPoint(view, clientX, clientY) {
  if (typeof activeDocument.elementFromPoint !== "function")
    return null;
  const rawEl = activeDocument.elementFromPoint(clientX, clientY);
  const el = (rawEl == null ? void 0 : rawEl.instanceOf(HTMLElement)) ? rawEl : null;
  if (!el)
    return null;
  const lineEl = el.closest(".cm-line");
  if (!lineEl)
    return null;
  if (!view.contentDOM.contains(lineEl))
    return null;
  return lineEl;
}
function getRenderedMainLineNumberAtPoint(view, clientX, clientY) {
  const lineEl = getRenderedMainLineElementAtPoint(view, clientX, clientY);
  if (!lineEl)
    return null;
  try {
    const pos = view.posAtDOM(lineEl, 0);
    const lineNumber = view.state.doc.lineAt(pos).number;
    if (lineNumber < 1 || lineNumber > view.state.doc.lines)
      return null;
    return lineNumber;
  } catch (e) {
    return null;
  }
}

// src/platform/codemirror/drop/list-drop-target-resolver.ts
function createListDropTargetResolver(view, deps) {
  function getListMarkerBounds(lineNumber, options) {
    var _a;
    const doc = view.state.doc;
    if (lineNumber < 1 || lineNumber > doc.lines)
      return null;
    const memo = options == null ? void 0 : options.memo;
    if (memo && memo.markerBoundsByLine.has(lineNumber)) {
      return (_a = memo.markerBoundsByLine.get(lineNumber)) != null ? _a : null;
    }
    const parsed = getParsedLineAtLineNumber(
      doc,
      lineNumber,
      memo,
      options == null ? void 0 : options.lineMap
    );
    if (!parsed || !parsed.isListItem) {
      if (memo)
        memo.markerBoundsByLine.set(lineNumber, null);
      return null;
    }
    const line = doc.line(lineNumber);
    const markerStartPos = line.from + parsed.quotePrefix.length + parsed.indentRaw.length;
    const contentStartPos = markerStartPos + parsed.marker.length;
    const markerStart = getCoordsAtPos(view, markerStartPos);
    const contentStart = getCoordsAtPos(view, contentStartPos);
    if (!markerStart || !contentStart) {
      if (memo)
        memo.markerBoundsByLine.set(lineNumber, null);
      return null;
    }
    const bounds = {
      markerStartX: markerStart.left,
      contentStartX: contentStart.left
    };
    if (memo)
      memo.markerBoundsByLine.set(lineNumber, bounds);
    return bounds;
  }
  function computeListTarget(params) {
    const {
      targetLineNumber,
      lineNumber,
      forcedLineNumber,
      childIntentOnLine,
      selection,
      sourceScope = "same_editor",
      clientX,
      lineMap: providedLineMap
    } = params;
    if (!selection || selection.anchorBlock.type !== "list-item" /* ListItem */)
      return {};
    const doc = view.state.doc;
    const lineMap = providedLineMap != null ? providedLineMap : getLineMap(view.state, { tabSize: deps.tabSize });
    const memo = {
      parsedLineByLine: /* @__PURE__ */ new Map(),
      markerBoundsByLine: /* @__PURE__ */ new Map(),
      listIndentByLine: /* @__PURE__ */ new Map()
    };
    const indentUnit = deps.getIndentUnitWidthForDoc(doc);
    const context = {
      doc,
      lineMap,
      memo,
      indentUnit
    };
    const prevNonEmptyLineNumber = deps.getPreviousNonEmptyLineNumber(doc, targetLineNumber - 1);
    let referenceLineNumber = prevNonEmptyLineNumber != null ? prevNonEmptyLineNumber : 0;
    if (!forcedLineNumber && childIntentOnLine) {
      referenceLineNumber = lineNumber;
    }
    if (referenceLineNumber < 1)
      return {};
    const baseLineNumber = resolveReferenceListLineNumber(referenceLineNumber, lineMap);
    if (baseLineNumber === null)
      return {};
    const isSelfTarget = sourceScope !== "cross_editor" && selection.anchorBlock.type === "list-item" /* ListItem */ && baseLineNumber === selection.anchorBlock.startLine + 1;
    const allowChild = !isSelfTarget;
    const dropTarget = getListDropTarget(baseLineNumber, clientX, allowChild, context);
    if (!dropTarget)
      return {};
    const listIntent = {
      mode: dropTarget.mode === "child" ? "child" : "sibling",
      contextLineNumber: dropTarget.lineNumber,
      targetIndentWidth: dropTarget.indentWidth
    };
    let cappedIndentWidth = listIntent.targetIndentWidth;
    const prevIndent = getListIndentWidthAtLine(doc, baseLineNumber, lineMap, memo);
    if (typeof prevIndent === "number") {
      const maxAllowedIndent = prevIndent + indentUnit;
      if (cappedIndentWidth > maxAllowedIndent) {
        cappedIndentWidth = maxAllowedIndent;
      }
    }
    const nextLineNumber = targetLineNumber <= doc.lines ? targetLineNumber : null;
    if (nextLineNumber !== null) {
      const nextIndent = getListIndentWidthAtLine(doc, nextLineNumber, lineMap, memo);
      if (typeof nextIndent === "number") {
        const minAllowedIndent = Math.max(0, nextIndent - indentUnit);
        if (cappedIndentWidth < minAllowedIndent) {
          cappedIndentWidth = minAllowedIndent;
        }
      }
    }
    listIntent.targetIndentWidth = cappedIndentWidth;
    const highlightInfo = computeHighlightRectForList({
      targetLineNumber,
      listTargetIndentWidth: listIntent.targetIndentWidth,
      context
    });
    return {
      listIntent,
      highlightRect: highlightInfo.highlightRect,
      lineRectSourceLineNumber: highlightInfo.lineRectSourceLineNumber
    };
  }
  function computeHighlightRectForList(params) {
    var _a, _b;
    const { targetLineNumber, listTargetIndentWidth, context } = params;
    if (listTargetIndentWidth <= 0)
      return {};
    const targetParentIndent = listTargetIndentWidth - context.indentUnit;
    const parentLineNumber = findParentLineNumberByIndent(
      context.doc,
      targetLineNumber - 1,
      targetParentIndent,
      context.lineMap,
      context.memo
    );
    if (parentLineNumber === null)
      return {};
    const parentMeta = getLineMetaAt(context.lineMap, parentLineNumber);
    if (!(parentMeta == null ? void 0 : parentMeta.isList))
      return {};
    const lineRectSourceLineNumber = parentLineNumber;
    const blockStartLineNumber = parentLineNumber;
    const mappedSubtreeEnd = context.lineMap.listSubtreeEndLine[parentLineNumber];
    const blockEndLineNumber = Math.max(
      blockStartLineNumber,
      mappedSubtreeEnd >= blockStartLineNumber ? mappedSubtreeEnd : blockStartLineNumber
    );
    const bounds = getListMarkerBounds(blockStartLineNumber, {
      memo: context.memo,
      lineMap: context.lineMap
    });
    const startLineObj = context.doc.line(blockStartLineNumber);
    const endLineObj = context.doc.line(blockEndLineNumber);
    const startCoords = getCoordsAtPos(view, startLineObj.from);
    const endCoords = getCoordsAtPos(view, endLineObj.to);
    if (bounds && startCoords && endCoords) {
      const lineCount = blockEndLineNumber - blockStartLineNumber + 1;
      (_a = deps.incrementPerfCounter) == null ? void 0 : _a.call(deps, "highlight_scan_lines", lineCount);
      const left = bounds.markerStartX;
      let maxRight = left;
      for (let i = blockStartLineNumber; i <= blockEndLineNumber; i++) {
        const lineObj = context.doc.line(i);
        const lineEndCoords = getCoordsAtPos(view, lineObj.to);
        if (!lineEndCoords)
          continue;
        const right = (_b = lineEndCoords.right) != null ? _b : lineEndCoords.left;
        if (right > maxRight) {
          maxRight = right;
        }
      }
      const width = Math.max(8, maxRight - left);
      return {
        lineRectSourceLineNumber,
        highlightRect: {
          top: startCoords.top,
          left,
          width,
          height: Math.max(4, endCoords.bottom - startCoords.top)
        }
      };
    }
    return { lineRectSourceLineNumber };
  }
  function getListDropTarget(lineNumber, clientX, allowChild, context) {
    const { doc, lineMap, memo, indentUnit } = context;
    if (lineNumber < 1 || lineNumber > doc.lines)
      return null;
    const bounds = getListMarkerBounds(lineNumber, { memo, lineMap });
    if (!bounds)
      return null;
    const slots = [];
    const baseIndent = getListIndentWidthAtLine(doc, lineNumber, lineMap, memo);
    const maxIndent = typeof baseIndent === "number" ? baseIndent + indentUnit : void 0;
    const columnPixelWidth = view.defaultCharacterWidth || 7;
    if (typeof baseIndent === "number") {
      slots.push({ x: bounds.markerStartX, lineNumber, indentWidth: baseIndent, mode: "same" });
    }
    if (allowChild && typeof baseIndent === "number") {
      const childIndent = baseIndent + indentUnit;
      if (maxIndent === void 0 || childIndent <= maxIndent) {
        const indentPixels = indentUnit * columnPixelWidth;
        const childSlotX = bounds.markerStartX + indentPixels;
        slots.push({ x: childSlotX, lineNumber, indentWidth: childIndent, mode: "child" });
      }
    }
    const ancestors = getListAncestorLineNumbers(doc, lineNumber, lineMap);
    for (const ancestorLine of ancestors) {
      if (ancestorLine === lineNumber)
        continue;
      const indentWidth = getListIndentWidthAtLine(doc, ancestorLine, lineMap, memo);
      if (typeof indentWidth !== "number" || typeof baseIndent !== "number")
        continue;
      const indentDeltaColumns = Math.max(0, baseIndent - indentWidth);
      const projectedX = bounds.markerStartX - indentDeltaColumns * columnPixelWidth;
      slots.push({
        x: projectedX,
        lineNumber: ancestorLine,
        indentWidth,
        mode: "same"
      });
    }
    if (slots.length === 0)
      return null;
    let best = slots[0];
    let bestDist = Math.abs(clientX - best.x);
    for (let i = 1; i < slots.length; i++) {
      const dist = Math.abs(clientX - slots[i].x);
      if (dist < bestDist) {
        best = slots[i];
        bestDist = dist;
      }
    }
    return { lineNumber: best.lineNumber, indentWidth: best.indentWidth, mode: best.mode };
  }
  function resolveReferenceListLineNumber(lineNumber, lineMap) {
    const nearestListLine = getNearestListLineAtOrBefore(lineMap, lineNumber);
    if (nearestListLine === null)
      return null;
    let cursor = nearestListLine;
    while (cursor > 0) {
      const subtreeEnd = lineMap.listSubtreeEndLine[cursor];
      if (subtreeEnd >= lineNumber) {
        return cursor;
      }
      cursor = lineMap.listParentLine[cursor];
    }
    return null;
  }
  function getParsedLineAtLineNumber(doc, lineNumber, memo, lineMap) {
    var _a;
    if (lineNumber < 1 || lineNumber > doc.lines)
      return null;
    if (memo == null ? void 0 : memo.parsedLineByLine.has(lineNumber)) {
      return (_a = memo.parsedLineByLine.get(lineNumber)) != null ? _a : null;
    }
    const lineMeta = lineMap ? getLineMetaAt(lineMap, lineNumber) : null;
    if (lineMeta && !lineMeta.isList) {
      return null;
    }
    const parsed = deps.parseLineWithQuote(doc.line(lineNumber).text);
    if (memo)
      memo.parsedLineByLine.set(lineNumber, parsed);
    return parsed;
  }
  function getListIndentWidthAtLine(doc, lineNumber, lineMap, memo) {
    if (lineNumber < 1 || lineNumber > doc.lines)
      return void 0;
    if (memo == null ? void 0 : memo.listIndentByLine.has(lineNumber)) {
      return memo.listIndentByLine.get(lineNumber);
    }
    let indent;
    const lineMeta = lineMap ? getLineMetaAt(lineMap, lineNumber) : null;
    if (lineMeta) {
      indent = lineMeta.isList ? lineMeta.indentWidth : void 0;
    } else {
      const parsed = deps.parseLineWithQuote(doc.line(lineNumber).text);
      indent = parsed.isListItem ? parsed.indentWidth : void 0;
    }
    if (memo)
      memo.listIndentByLine.set(lineNumber, indent);
    return indent;
  }
  function getListAncestorLineNumbers(doc, lineNumber, lineMap) {
    var _a;
    const result = [];
    if (lineMap) {
      let steps = 0;
      let cursor = resolveReferenceListLineNumber(
        Math.max(1, Math.min(lineNumber, doc.lines)),
        lineMap
      );
      while (cursor !== null && cursor > 0) {
        result.push(cursor);
        steps += 1;
        const parent = lineMap.listParentLine[cursor];
        cursor = parent > 0 ? parent : null;
      }
      if (steps > 0) {
        (_a = deps.incrementPerfCounter) == null ? void 0 : _a.call(deps, "list_ancestor_scan_steps", steps);
      }
      return result;
    }
    let currentIndent = null;
    for (let i = lineNumber; i >= 1; i--) {
      const text = doc.line(i).text;
      if (text.trim().length === 0)
        continue;
      const parsed = deps.parseLineWithQuote(text);
      if (!parsed.isListItem) {
        if (currentIndent !== null)
          break;
        continue;
      }
      if (currentIndent === null) {
        currentIndent = parsed.indentWidth;
        result.push(i);
        continue;
      }
      if (parsed.indentWidth < currentIndent) {
        currentIndent = parsed.indentWidth;
        result.push(i);
      }
    }
    return result;
  }
  function findParentLineNumberByIndent(doc, startLineNumber, targetIndent, lineMap, memo) {
    var _a, _b;
    if (lineMap) {
      let steps = 0;
      let cursor = resolveReferenceListLineNumber(
        Math.max(1, Math.min(startLineNumber, doc.lines)),
        lineMap
      );
      while (cursor !== null && cursor > 0) {
        steps += 1;
        const indent = getListIndentWidthAtLine(doc, cursor, lineMap, memo);
        if (typeof indent === "number" && indent === targetIndent) {
          (_a = deps.incrementPerfCounter) == null ? void 0 : _a.call(deps, "list_parent_scan_steps", steps);
          return cursor;
        }
        if (typeof indent === "number" && indent < targetIndent) {
          break;
        }
        const parent = lineMap.listParentLine[cursor];
        cursor = parent > 0 ? parent : null;
      }
      if (steps > 0) {
        (_b = deps.incrementPerfCounter) == null ? void 0 : _b.call(deps, "list_parent_scan_steps", steps);
      }
      return null;
    }
    for (let i = startLineNumber; i >= 1; i--) {
      const text = doc.line(i).text;
      if (text.trim().length === 0)
        continue;
      const parsed = deps.parseLineWithQuote(text);
      if (!parsed.isListItem)
        continue;
      if (parsed.indentWidth === targetIndent)
        return i;
    }
    return null;
  }
  return {
    getListMarkerBounds,
    computeListTarget
  };
}

// src/platform/codemirror/drop/drop-target-resolver.ts
var DropTargetResolver = class {
  constructor(view, deps) {
    this.view = view;
    this.deps = deps;
    this.lastResolvedCache = null;
    this.listDropTargetResolver = createListDropTargetResolver(view, {
      tabSize: deps.tabSize,
      parseLineWithQuote: deps.parseLineWithQuote,
      getPreviousNonEmptyLineNumber,
      getIndentUnitWidthForDoc: deps.getIndentUnitWidthForDoc,
      getBlockRect: deps.getBlockRect,
      incrementPerfCounter: deps.incrementPerfCounter
    });
  }
  resolveValidatedDropTarget(info) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const startedAt = this.now();
    const selection = (_a = info.selection) != null ? _a : null;
    const pointerType = (_b = info.pointerType) != null ? _b : null;
    const sourceScope = (_c = info.sourceScope) != null ? _c : "same_editor";
    const cacheKey = this.buildResolveCacheKey(info.clientX, info.clientY, selection, pointerType, sourceScope);
    if (this.lastResolvedCache && this.lastResolvedCache.state === this.view.state && this.lastResolvedCache.key === cacheKey) {
      (_e = (_d = this.deps).incrementPerfCounter) == null ? void 0 : _e.call(_d, "resolve_cache_hits", 1);
      const cached = this.lastResolvedCache.result;
      (_g = (_f = this.deps).recordPerfDuration) == null ? void 0 : _g.call(_f, "resolve_total", this.now() - startedAt);
      return cached;
    }
    (_i = (_h = this.deps).incrementPerfCounter) == null ? void 0 : _i.call(_h, "resolve_cache_misses", 1);
    const lineMap = getLineMap(this.view.state, { tabSize: this.deps.tabSize });
    const result = this.resolveValidatedDropTargetInternal({
      info,
      selection,
      sourceScope,
      lineMap
    });
    this.lastResolvedCache = {
      state: this.view.state,
      key: cacheKey,
      result
    };
    (_k = (_j = this.deps).recordPerfDuration) == null ? void 0 : _k.call(_j, "resolve_total", this.now() - startedAt);
    return result;
  }
  resolveValidatedDropTargetInternal(params) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const { info, selection, sourceScope, lineMap } = params;
    if (isPointInsideRenderedTableCell(this.view, info.clientX, info.clientY)) {
      return { allowed: false, reason: "table_cell" };
    }
    const embedEl = this.getEmbedElementAtPoint(info.clientX, info.clientY);
    if (embedEl) {
      const block = this.deps.getBlockInfoForEmbed(embedEl);
      if (block) {
        const rect = embedEl.getBoundingClientRect();
        const showAtBottom = info.clientY > rect.top + rect.height / 2;
        const lineNumber = clampTargetLineNumber(
          this.view.state.doc.lines,
          showAtBottom ? block.endLine + 2 : block.startLine + 1
        );
        const containerRule2 = this.resolveContainerRule(selection, lineNumber, lineMap);
        if (containerRule2.rejectReason) {
          return {
            allowed: false,
            reason: containerRule2.rejectReason
          };
        }
        const inPlaceRejectReason2 = this.getInPlaceRejectReason({
          selection,
          sourceScope,
          targetLineNumber: lineNumber,
          slotContext: containerRule2.slotContext,
          lineMap
        });
        if (inPlaceRejectReason2) {
          return {
            allowed: false,
            reason: inPlaceRejectReason2
          };
        }
        const indicatorY2 = showAtBottom ? rect.bottom : rect.top;
        return this.buildAllowedResult({
          target: {
            targetLineNumber: lineNumber,
            placement: "before"
          },
          preview: {
            indicatorY: indicatorY2,
            lineRect: { left: rect.left, width: rect.width }
          }
        });
      }
    }
    const verticalStartedAt = this.now();
    const vertical = this.computeVerticalTarget(info, selection);
    (_b = (_a = this.deps).recordPerfDuration) == null ? void 0 : _b.call(_a, "vertical", this.now() - verticalStartedAt);
    if (!vertical) {
      return { allowed: false, reason: "no_target" };
    }
    const containerRule = this.resolveContainerRule(selection, vertical.targetLineNumber, lineMap);
    if (containerRule.rejectReason) {
      return {
        allowed: false,
        reason: containerRule.rejectReason
      };
    }
    const listStartedAt = this.now();
    const listTarget = this.listDropTargetResolver.computeListTarget({
      targetLineNumber: vertical.targetLineNumber,
      lineNumber: vertical.line.number,
      forcedLineNumber: vertical.forcedLineNumber,
      childIntentOnLine: vertical.childIntentOnLine,
      selection,
      sourceScope,
      clientX: info.clientX,
      lineMap
    });
    (_d = (_c = this.deps).recordPerfDuration) == null ? void 0 : _d.call(_c, "list_target", this.now() - listStartedAt);
    const inPlaceRejectReason = this.getInPlaceRejectReason({
      selection,
      sourceScope,
      targetLineNumber: vertical.targetLineNumber,
      slotContext: containerRule.slotContext,
      listIntent: listTarget.listIntent,
      lineMap
    });
    if (inPlaceRejectReason) {
      return {
        allowed: false,
        reason: inPlaceRejectReason
      };
    }
    const geometryStartedAt = this.now();
    const indicatorY = this.deps.getInsertionAnchorY(vertical.targetLineNumber);
    if (indicatorY === null) {
      (_f = (_e = this.deps).recordPerfDuration) == null ? void 0 : _f.call(_e, "geometry", this.now() - geometryStartedAt);
      return { allowed: false, reason: "no_anchor" };
    }
    const lineRectSourceLineNumber = (_g = listTarget.lineRectSourceLineNumber) != null ? _g : vertical.lineRectSourceLineNumber;
    let lineRect = this.deps.getLineRect(lineRectSourceLineNumber);
    if (typeof ((_h = listTarget.listIntent) == null ? void 0 : _h.targetIndentWidth) === "number") {
      const indentPos = this.deps.getLineIndentPosByWidth(lineRectSourceLineNumber, listTarget.listIntent.targetIndentWidth);
      if (indentPos !== null) {
        const start = getCoordsAtPos(this.view, indentPos);
        const end = getCoordsAtPos(this.view, this.view.state.doc.line(lineRectSourceLineNumber).to);
        if (start && end) {
          const left = start.left;
          const width = Math.max(8, ((_i = end.right) != null ? _i : end.left) - left);
          lineRect = { left, width };
        }
      }
    }
    (_k = (_j = this.deps).recordPerfDuration) == null ? void 0 : _k.call(_j, "geometry", this.now() - geometryStartedAt);
    return this.buildAllowedResult({
      target: {
        targetLineNumber: vertical.targetLineNumber,
        placement: "before",
        listIntent: listTarget.listIntent
      },
      preview: {
        indicatorY,
        lineRect,
        highlightRect: listTarget.highlightRect
      }
    });
  }
  buildAllowedResult(resolution) {
    return {
      allowed: true,
      resolution
    };
  }
  resolveContainerRule(selection, targetLineNumber, lineMap) {
    var _a, _b, _c;
    const containerStartedAt = this.now();
    const containerRule = selection ? this.deps.resolveDropRuleAtInsertion(selection.anchorBlock, targetLineNumber, {
      lineMap,
      tabSize: this.deps.tabSize
    }) : null;
    (_b = (_a = this.deps).recordPerfDuration) == null ? void 0 : _b.call(_a, "container", this.now() - containerStartedAt);
    if (!containerRule) {
      return { slotContext: null, rejectReason: null };
    }
    if (containerRule.decision.allowDrop) {
      return { slotContext: containerRule.slotContext, rejectReason: null };
    }
    return {
      slotContext: containerRule.slotContext,
      rejectReason: (_c = containerRule.decision.rejectReason) != null ? _c : "container_policy"
    };
  }
  getInPlaceRejectReason(params) {
    var _a, _b, _c;
    const {
      selection,
      sourceScope,
      targetLineNumber,
      slotContext,
      lineMap,
      listIntent
    } = params;
    if (!selection || sourceScope === "cross_editor")
      return null;
    const inPlaceStartedAt = this.now();
    const inPlaceValidation = validateInPlaceDrop({
      doc: this.view.state.doc,
      source: selection,
      targetLineNumber,
      parseLineWithQuote: this.deps.parseLineWithQuote,
      getListContext: this.deps.getListContext,
      getIndentUnitWidth: this.deps.getIndentUnitWidth,
      slotContext: slotContext != null ? slotContext : void 0,
      listIntent,
      lineMap
    });
    (_b = (_a = this.deps).recordPerfDuration) == null ? void 0 : _b.call(_a, "in_place", this.now() - inPlaceStartedAt);
    if (inPlaceValidation.inSelfRange && !inPlaceValidation.allowInPlaceIndentChange) {
      return (_c = inPlaceValidation.rejectReason) != null ? _c : "self_range_blocked";
    }
    if (!inPlaceValidation.inSelfRange && inPlaceValidation.rejectReason) {
      return inPlaceValidation.rejectReason;
    }
    return null;
  }
  computeVerticalTarget(info, selection) {
    const contentRect = this.view.contentDOM.getBoundingClientRect();
    let lineNumber = getRenderedMainLineNumberAtPoint(this.view, info.clientX, info.clientY);
    if (lineNumber === null) {
      lineNumber = resolveLineNumberAtCoords(this.view, info.clientX, info.clientY, contentRect);
      if (lineNumber === null)
        return null;
    }
    const line = this.view.state.doc.line(lineNumber);
    const allowListChildIntent = !!selection && selection.anchorBlock.type === "list-item" /* ListItem */;
    const lineBoundsForSnap = this.listDropTargetResolver.getListMarkerBounds(line.number);
    const lineParsedForSnap = this.deps.parseLineWithQuote(line.text);
    const childIntentOnLine = allowListChildIntent && !!lineBoundsForSnap && lineParsedForSnap.isListItem && info.clientX >= lineBoundsForSnap.contentStartX + 2;
    const adjustedTarget = this.deps.getAdjustedTargetLocation(line.number, {
      clientY: info.clientY
    });
    let forcedLineNumber = adjustedTarget.blockAdjusted ? adjustedTarget.lineNumber : null;
    let showAtBottom = false;
    if (!forcedLineNumber) {
      const isBlankLine = line.text.trim().length === 0;
      if (isBlankLine) {
        const visualMidY = this.getVisualLineMidY(line.number, line.from);
        if (visualMidY !== null) {
          forcedLineNumber = info.clientY > visualMidY ? line.number + 1 : line.number;
        } else {
          const lineStart = getCoordsAtPos(this.view, line.from);
          const lineEnd = getCoordsAtPos(this.view, line.to);
          if (lineStart && lineEnd) {
            const midY = (lineStart.top + lineEnd.bottom) / 2;
            forcedLineNumber = info.clientY > midY ? line.number + 1 : line.number;
          } else {
            forcedLineNumber = line.number;
          }
        }
      } else {
        showAtBottom = true;
        const visualMidY = this.getVisualLineMidY(line.number, line.from);
        if (visualMidY !== null) {
          showAtBottom = info.clientY > visualMidY;
        } else {
          const lineStart = getCoordsAtPos(this.view, line.from);
          const lineEnd = getCoordsAtPos(this.view, line.to);
          if (lineStart && lineEnd) {
            const midY = (lineStart.top + lineEnd.bottom) / 2;
            showAtBottom = info.clientY > midY;
          }
        }
      }
    }
    let targetLineNumber = clampTargetLineNumber(
      this.view.state.doc.lines,
      forcedLineNumber != null ? forcedLineNumber : showAtBottom ? line.number + 1 : line.number
    );
    if (!forcedLineNumber && childIntentOnLine && !showAtBottom) {
      targetLineNumber = clampTargetLineNumber(this.view.state.doc.lines, line.number + 1);
    }
    return {
      line,
      targetLineNumber,
      forcedLineNumber,
      childIntentOnLine,
      lineRectSourceLineNumber: line.number
    };
  }
  getVisualLineMidY(lineNumber, lineFromPos) {
    try {
      const block = this.view.lineBlockAt(lineFromPos);
      return this.view.documentTop + (block.top + block.bottom) / 2;
    } catch (e) {
      return null;
    }
  }
  getEmbedElementAtPoint(clientX, clientY) {
    return findEmbedElementAtPoint(this.view, clientX, clientY, {
      requireDirectWithinRoot: false,
      normalizeToEmbedRoot: true
    });
  }
  buildResolveCacheKey(clientX, clientY, selection, pointerType, sourceScope) {
    if (!selection) {
      return `${clientX}|${clientY}|none|${pointerType != null ? pointerType : ""}|${sourceScope}`;
    }
    const rangesKey = selection.ranges.map((range) => `${range.startLine}-${range.endLine}`).join(",");
    return [
      clientX,
      clientY,
      pointerType != null ? pointerType : "",
      sourceScope,
      selection.anchorBlock.type,
      selection.anchorBlock.startLine,
      selection.anchorBlock.endLine,
      selection.anchorBlock.from,
      selection.anchorBlock.to,
      rangesKey
    ].join("|");
  }
  now() {
    if (typeof performance !== "undefined" && typeof performance.now === "function") {
      return performance.now();
    }
    return Date.now();
  }
};

// src/platform/codemirror/preview/drop-indicator.ts
var _DropIndicatorManager = class {
  constructor(view, options) {
    this.view = view;
    this.options = options;
    this.pendingDragInfo = null;
    this.rafId = null;
    this.lastResolution = null;
    _DropIndicatorManager.instances.add(this);
    this.indicatorEl = activeDocument.createElement("div");
    this.indicatorEl.className = `${DROP_INDICATOR_CLASS} ${HIDDEN_CLASS}`;
    activeDocument.body.appendChild(this.indicatorEl);
    this.highlightEl = activeDocument.createElement("div");
    this.highlightEl.className = `${DROP_HIGHLIGHT_CLASS} ${HIDDEN_CLASS}`;
    activeDocument.body.appendChild(this.highlightEl);
  }
  scheduleRender(validation, selection, pointerType) {
    this.pendingDragInfo = { validation, selection, pointerType };
    if (this.rafId !== null)
      return;
    this.rafId = window.requestAnimationFrame(() => {
      this.rafId = null;
      const pending = this.pendingDragInfo;
      if (!pending)
        return;
      this.renderValidation(pending);
    });
  }
  hide() {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.pendingDragInfo = null;
    this.lastResolution = null;
    this.indicatorEl.classList.add(HIDDEN_CLASS);
    this.highlightEl.classList.add(HIDDEN_CLASS);
  }
  destroy() {
    this.hide();
    this.indicatorEl.remove();
    this.highlightEl.remove();
    _DropIndicatorManager.instances.delete(this);
  }
  renderValidation(info) {
    var _a, _b, _c, _d, _e;
    const validation = info.validation;
    const resolution = validation.allowed ? (_a = validation.resolution) != null ? _a : null : null;
    (_c = (_b = this.options) == null ? void 0 : _b.onDropTargetEvaluated) == null ? void 0 : _c.call(_b, {
      source: info.selection,
      pointerType: info.pointerType,
      validation
    });
    (_e = (_d = this.options) == null ? void 0 : _d.onFrameMetrics) == null ? void 0 : _e.call(_d, {
      evaluated: true,
      skipped: false,
      reused: false,
      durationMs: 0
    });
    this.lastResolution = resolution;
    if (!resolution) {
      this.indicatorEl.classList.add(HIDDEN_CLASS);
      this.highlightEl.classList.add(HIDDEN_CLASS);
      return;
    }
    this.renderResolution(resolution);
  }
  renderResolution(resolution) {
    var _a, _b;
    this.hideOtherInstancesVisuals();
    const editorRect = this.view.dom.getBoundingClientRect();
    const indicatorY = resolution.preview.indicatorY;
    const indicatorLeft = resolution.preview.lineRect ? resolution.preview.lineRect.left : editorRect.left + 35;
    const contentRect = this.view.contentDOM.getBoundingClientRect();
    const contentPaddingRight = parseFloat(getComputedStyle(this.view.contentDOM).paddingRight) || 0;
    const indicatorRight = contentRect.right - contentPaddingRight;
    const indicatorWidth = Math.max(8, indicatorRight - indicatorLeft);
    this.indicatorEl.classList.remove(HIDDEN_CLASS);
    this.indicatorEl.setCssStyles({
      top: `${indicatorY}px`,
      left: `${indicatorLeft}px`,
      width: `${indicatorWidth}px`
    });
    if (resolution.preview.highlightRect && ((_b = (_a = this.options) == null ? void 0 : _a.isDropHighlightEnabled) == null ? void 0 : _b.call(_a)) !== false) {
      this.highlightEl.classList.remove(HIDDEN_CLASS);
      this.highlightEl.setCssStyles({
        top: `${resolution.preview.highlightRect.top}px`,
        left: `${resolution.preview.highlightRect.left}px`,
        width: `${resolution.preview.highlightRect.width}px`,
        height: `${resolution.preview.highlightRect.height}px`
      });
    } else {
      this.highlightEl.classList.add(HIDDEN_CLASS);
    }
  }
  hideOtherInstancesVisuals() {
    for (const instance of _DropIndicatorManager.instances) {
      if (instance === this)
        continue;
      instance.hide();
    }
  }
};
var DropIndicatorManager = _DropIndicatorManager;
DropIndicatorManager.instances = /* @__PURE__ */ new Set();

// src/platform/codemirror/preview/handle-renderer.ts
var import_state3 = require("@codemirror/state");
var import_view = require("@codemirror/view");
function resolveHandleBlockAtLine(state, lineNumber) {
  const block = detectBlock(state, lineNumber, { tabSize: state.facet(import_state3.EditorState.tabSize) });
  if (!block)
    return null;
  if (block.startLine + 1 !== lineNumber)
    return null;
  return block;
}
function createLineDragHandleElement(block) {
  const handle = activeDocument.createElement("div");
  handle.className = `${DRAG_HANDLE_CLASS} ${LINE_HANDLE_CLASS} dnd-handle-gutter-bound`;
  handle.setAttribute("data-block-start", String(block.startLine));
  handle.setAttribute("data-block-end", String(block.endLine));
  const core = activeDocument.createElement("span");
  core.className = HANDLE_CORE_CLASS;
  core.setAttribute("aria-hidden", "true");
  handle.appendChild(core);
  return handle;
}
function getVisibleHandleForBlockStart(view, blockStart) {
  const handle = view.dom.querySelector(
    `.${DRAG_HANDLE_CLASS}.${LINE_HANDLE_CLASS}[data-block-start="${blockStart}"]`
  );
  if (!handle || !handle.isConnected)
    return null;
  if (handle.closest(".cm-editor") !== view.dom)
    return null;
  return handle;
}
var HandleGutterLineMarker = class extends import_view.GutterMarker {
  constructor(block) {
    super();
    this.block = block;
    this.elementClass = "dnd-handle-gutter-marker";
  }
  eq(other) {
    return other instanceof HandleGutterLineMarker && other.block.startLine === this.block.startLine && other.block.endLine === this.block.endLine;
  }
  toDOM(_view) {
    return createLineDragHandleElement(this.block);
  }
};

// src/platform/dom/line-dom.ts
function getMainContentLineElementByDomAtPos(view, lineNumber) {
  if (typeof view.domAtPos !== "function")
    return null;
  try {
    const line = view.state.doc.line(lineNumber);
    const domAtPos = view.domAtPos(line.from);
    const base = domAtPos.node.nodeType === Node.TEXT_NODE ? domAtPos.node.parentElement : domAtPos.node;
    if (!(base instanceof Element))
      return null;
    const lineEl = base.closest(".cm-line");
    if (!lineEl)
      return null;
    if (!view.contentDOM.contains(lineEl))
      return null;
    return lineEl;
  } catch (e) {
    return null;
  }
}
function getMainContentLineElementForLine(view, lineNumber) {
  if (lineNumber < 1 || lineNumber > view.state.doc.lines)
    return null;
  return getMainContentLineElementByDomAtPos(view, lineNumber);
}

// src/platform/dom/dom-utils.ts
function hasInstanceOf(value) {
  return typeof value === "object" && value !== null && typeof value.instanceOf === "function";
}
function isHTMLElement(value) {
  return hasInstanceOf(value) && value.instanceOf(HTMLElement);
}

// src/platform/codemirror/preview/source-line-visual.ts
function addSourceLineClasses(lineEl, lineNumber, startLineNumber, endLineNumber) {
  removeSourceLineClasses(lineEl);
  lineEl.classList.add(
    DRAG_SOURCE_LINE_CLASS,
    getSourceLineVariantClass(lineNumber, startLineNumber, endLineNumber)
  );
}
function removeSourceLineClasses(lineEl) {
  lineEl.classList.remove(
    DRAG_SOURCE_LINE_CLASS,
    DRAG_SOURCE_LINE_SINGLE_CLASS,
    DRAG_SOURCE_LINE_FIRST_CLASS,
    DRAG_SOURCE_LINE_MIDDLE_CLASS,
    DRAG_SOURCE_LINE_LAST_CLASS
  );
}
function getSourceLineVariantClass(lineNumber, startLineNumber, endLineNumber) {
  if (startLineNumber === endLineNumber)
    return DRAG_SOURCE_LINE_SINGLE_CLASS;
  if (lineNumber === startLineNumber)
    return DRAG_SOURCE_LINE_FIRST_CLASS;
  if (lineNumber === endLineNumber)
    return DRAG_SOURCE_LINE_LAST_CLASS;
  return DRAG_SOURCE_LINE_MIDDLE_CLASS;
}

// src/platform/codemirror/preview/handle-visibility-controller.ts
var HandleVisibilityController = class {
  constructor(view, deps) {
    this.view = view;
    this.deps = deps;
    this.grabbedLineEls = /* @__PURE__ */ new Set();
    this.grabbedEmbedEls = /* @__PURE__ */ new Set();
    this.grabbedLineRanges = [];
    this.activeHandle = null;
    this.activeHoverBlock = null;
  }
  getActiveHandle() {
    return this.activeHandle;
  }
  clearGrabbedLineNumbers() {
    this.clearGrabbedLineVisualClasses();
    this.grabbedLineRanges = [];
  }
  refreshGrabVisualState() {
    if (this.grabbedLineRanges.length === 0)
      return;
    this.clearGrabbedLineVisualClasses();
    this.applyGrabbedLineVisualState();
  }
  setGrabbedLineNumberRange(startLineNumber, endLineNumber) {
    this.setGrabbedLineRanges([{ startLineNumber, endLineNumber }]);
  }
  enterGrabVisualState(ranges, handle) {
    this.setActiveVisibleHandle(handle);
    this.setGrabbedLineRanges(ranges);
  }
  enterGrabVisualStateForBlock(blockInfo, handle) {
    this.enterGrabVisualState([{
      startLineNumber: blockInfo.startLine + 1,
      endLineNumber: blockInfo.endLine + 1
    }], handle);
  }
  setActiveVisibleHandle(handle) {
    var _a;
    if (this.activeHandle === handle) {
      return;
    }
    if (this.activeHandle) {
      this.activeHandle.classList.remove("is-visible");
    }
    this.activeHandle = handle;
    if (!handle) {
      this.activeHoverBlock = null;
      return;
    }
    if (((_a = this.activeHoverBlock) == null ? void 0 : _a.handle) !== handle) {
      this.activeHoverBlock = null;
    }
    handle.classList.add("is-visible");
  }
  enterGrabVisualStateForRange(startLineNumber, endLineNumber, handle) {
    this.setActiveVisibleHandle(handle);
    this.setGrabbedLineNumberRange(startLineNumber, endLineNumber);
  }
  isPointerInHandleInteractionZone(snapshot) {
    return snapshot.withinHandleInteractionZone;
  }
  isPointerInHoverActivationZone(snapshot) {
    return snapshot.withinHoverActivationZone;
  }
  resolveVisibleHandleFromTarget(target) {
    if (!isHTMLElement(target))
      return null;
    const directHandle = target.closest(`.${DRAG_HANDLE_CLASS}`);
    if (!directHandle)
      return null;
    if (this.view.dom.contains(directHandle)) {
      return directHandle;
    }
    return null;
  }
  resolveVisibleHandleFromPointer(snapshot) {
    if (!snapshot.withinHoverActivationZone) {
      this.activeHoverBlock = null;
      return null;
    }
    const cachedHandle = this.resolveActiveHoverBlock(snapshot);
    if (cachedHandle) {
      return cachedHandle;
    }
    const blockInfo = this.deps.getDraggableBlockAtVerticalPosition(snapshot.clientY, snapshot.contentRect);
    if (!blockInfo)
      return null;
    const handle = this.resolveVisibleHandleForBlock(blockInfo);
    if (!handle) {
      this.activeHoverBlock = null;
      return null;
    }
    this.activeHoverBlock = {
      startLineNumber: blockInfo.startLine + 1,
      endLineNumber: blockInfo.endLine + 1,
      handle
    };
    return handle;
  }
  clearGrabbedLineVisualClasses() {
    for (const lineEl of this.grabbedLineEls) {
      removeSourceLineClasses(lineEl);
    }
    this.grabbedLineEls.clear();
    for (const embedEl of this.grabbedEmbedEls) {
      embedEl.classList.remove(DRAG_SOURCE_EMBED_CLASS);
    }
    this.grabbedEmbedEls.clear();
  }
  setGrabbedLineRanges(ranges) {
    this.clearGrabbedLineVisualClasses();
    this.grabbedLineRanges = this.normalizeGrabLineRanges(ranges);
    this.applyGrabbedLineVisualState();
  }
  applyGrabbedLineVisualState() {
    if (this.grabbedLineRanges.length === 0)
      return;
    for (const range of this.grabbedLineRanges) {
      const safeStart = Math.max(1, Math.min(this.view.state.doc.lines, range.startLineNumber));
      const safeEnd = Math.max(1, Math.min(this.view.state.doc.lines, range.endLineNumber));
      const from = Math.min(safeStart, safeEnd);
      const to = Math.max(safeStart, safeEnd);
      for (let lineNumber = from; lineNumber <= to; lineNumber++) {
        const lineEl = getMainContentLineElementForLine(this.view, lineNumber);
        if (!lineEl)
          continue;
        addSourceLineClasses(lineEl, lineNumber, from, to);
        this.grabbedLineEls.add(lineEl);
      }
    }
    this.applyGrabbedEmbedVisualState();
  }
  applyGrabbedEmbedVisualState() {
    const root = this.view.dom;
    if (!(root == null ? void 0 : root.instanceOf(HTMLElement)))
      return;
    for (const embed of collectEmbedRoots(this.view, { normalizeToEmbedRoot: true })) {
      const lineNumber = this.resolveEmbedLineNumber(embed);
      if (lineNumber === null)
        continue;
      if (!this.isLineNumberInGrabRanges(lineNumber))
        continue;
      embed.classList.add(DRAG_SOURCE_EMBED_CLASS);
      this.grabbedEmbedEls.add(embed);
    }
  }
  resolveEmbedLineNumber(embed) {
    var _a;
    const probes = [embed];
    if (embed.firstChild)
      probes.push(embed.firstChild);
    if (embed.parentElement)
      probes.push(embed.parentElement);
    if ((_a = embed.parentElement) == null ? void 0 : _a.firstChild)
      probes.push(embed.parentElement.firstChild);
    return resolveLineNumberFromDomNodes(this.view, probes);
  }
  isLineNumberInGrabRanges(lineNumber) {
    return isLineNumberInRanges(lineNumber, this.grabbedLineRanges);
  }
  normalizeGrabLineRanges(ranges) {
    const docLines = this.view.state.doc.lines;
    const merged = mergeLineRanges(docLines, ranges);
    return merged.map((range) => ({
      startLineNumber: range.startLineNumber,
      endLineNumber: range.endLineNumber
    }));
  }
  resolveVisibleHandleForBlock(blockInfo) {
    var _a, _b, _c;
    return (_c = (_b = (_a = this.deps).getVisibleHandleForBlockStart) == null ? void 0 : _b.call(_a, blockInfo.startLine)) != null ? _c : null;
  }
  resolveActiveHoverBlock(snapshot) {
    var _a, _b, _c;
    if (!this.activeHoverBlock)
      return null;
    if (this.activeHandle !== this.activeHoverBlock.handle)
      return null;
    if (!this.activeHoverBlock.handle.isConnected) {
      this.activeHoverBlock = null;
      return null;
    }
    const lineNumber = this.deps.getLineNumberAtVerticalPosition(snapshot.clientY, snapshot.contentRect);
    if (lineNumber === null)
      return null;
    if (lineNumber < this.activeHoverBlock.startLineNumber || lineNumber > this.activeHoverBlock.endLineNumber) {
      return null;
    }
    if (lineNumber === this.activeHoverBlock.startLineNumber) {
      return this.activeHoverBlock.handle;
    }
    const lineHandle = (_c = (_b = (_a = this.deps).getVisibleHandleForBlockStart) == null ? void 0 : _b.call(_a, lineNumber - 1)) != null ? _c : null;
    if (lineHandle && lineHandle !== this.activeHoverBlock.handle) {
      return null;
    }
    return this.activeHoverBlock.handle;
  }
};

// src/domain/selection/block-ranges.ts
function clamp2(value, min, max) {
  if (value < min)
    return min;
  if (value > max)
    return max;
  return value;
}
function keyForBlockRange(range) {
  return `${range.startLineNumber}:${range.endLineNumber}`;
}
function normalizeSelectedBlockRange(docLines, startLineNumber, endLineNumber) {
  const safeStart = clamp2(Math.min(startLineNumber, endLineNumber), 1, docLines);
  const safeEnd = clamp2(Math.max(startLineNumber, endLineNumber), safeStart, docLines);
  return {
    startLineNumber: safeStart,
    endLineNumber: safeEnd
  };
}
function mergeSelectedBlocks(docLines, blocks) {
  const normalized = blocks.map((block) => normalizeSelectedBlockRange(docLines, block.startLineNumber, block.endLineNumber)).sort((a, b) => a.startLineNumber - b.startLineNumber || a.endLineNumber - b.endLineNumber);
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  for (const block of normalized) {
    const key = keyForBlockRange(block);
    if (seen.has(key))
      continue;
    seen.add(key);
    result.push(block);
  }
  return result;
}
function subtractSelectedBlocks(docLines, sourceBlocks, blocksToRemove) {
  const removeKeys = new Set(
    mergeSelectedBlocks(docLines, blocksToRemove).map((block) => keyForBlockRange(block))
  );
  return mergeSelectedBlocks(docLines, sourceBlocks).filter((block) => !removeKeys.has(keyForBlockRange(block)));
}
function isSelectedBlockCoveredByBlocks(docLines, target, blocks) {
  const normalizedTarget = normalizeSelectedBlockRange(
    docLines,
    target.startLineNumber,
    target.endLineNumber
  );
  const targetKey = keyForBlockRange(normalizedTarget);
  return mergeSelectedBlocks(docLines, blocks).some((block) => keyForBlockRange(block) === targetKey);
}
function groupSelectedBlocksIntoSegments(docLines, blocks) {
  return groupSegments(mergeSelectedBlocks(docLines, blocks));
}
function groupSegments(normalized) {
  if (normalized.length === 0)
    return [];
  const segments = [];
  let current = {
    startLineNumber: normalized[0].startLineNumber,
    endLineNumber: normalized[0].endLineNumber,
    startBlockLineNumber: normalized[0].startLineNumber,
    endBlockLineNumber: normalized[0].startLineNumber
  };
  for (let i = 1; i < normalized.length; i++) {
    const block = normalized[i];
    if (block.startLineNumber <= current.endLineNumber + 1) {
      current.endLineNumber = Math.max(current.endLineNumber, block.endLineNumber);
      current.endBlockLineNumber = block.startLineNumber;
      continue;
    }
    segments.push(current);
    current = {
      startLineNumber: block.startLineNumber,
      endLineNumber: block.endLineNumber,
      startBlockLineNumber: block.startLineNumber,
      endBlockLineNumber: block.startLineNumber
    };
  }
  segments.push(current);
  return segments;
}

// src/domain/selection/range-selection.ts
function buildRangeSelectionBoundaryFromBlock(doc, block) {
  const startLineNumber = clampLineNumber(doc.lines, block.startLine + 1);
  const endLineNumber = clampLineNumber(doc.lines, block.endLine + 1);
  const representativeLineNumber = Math.max(
    startLineNumber,
    Math.min(endLineNumber, doc.lineAt(block.from).number)
  );
  return {
    startLineNumber,
    endLineNumber,
    representativeLineNumber
  };
}
function collectSelectedBlocksBetween(docLines, anchorStartLineNumber, anchorEndLineNumber, targetBlockStartLineNumber, targetBlockEndLineNumber, resolveBoundary) {
  const startLineNumber = Math.max(
    1,
    Math.min(docLines, Math.min(anchorStartLineNumber, targetBlockStartLineNumber))
  );
  const endLineNumber = Math.max(
    1,
    Math.min(docLines, Math.max(anchorEndLineNumber, targetBlockEndLineNumber))
  );
  const blocks = [];
  let cursor = startLineNumber;
  while (cursor <= endLineNumber) {
    const boundary = resolveBoundary(cursor);
    blocks.push({
      startLineNumber: boundary.startLineNumber,
      endLineNumber: boundary.endLineNumber
    });
    cursor = Math.max(cursor + 1, boundary.endLineNumber + 1);
  }
  return mergeSelectedBlocks(docLines, blocks);
}

// src/drag/pipeline/pipeline-output.ts
function buildPressPendingLifecycleEvent(source, pointerType, pressReady) {
  return {
    type: "drag_press_pending",
    phase: "press_pending",
    source,
    targetLine: null,
    listIntent: null,
    rejectReason: null,
    pointerType,
    pressReady
  };
}
function buildDragStartedLifecycleEvent(source, pointerType) {
  return {
    type: "drag_started",
    phase: "drag_active",
    source,
    targetLine: null,
    listIntent: null,
    rejectReason: null,
    pointerType
  };
}
function buildDragTargetChangedLifecycleEvent(params) {
  return {
    type: "drag_target_changed",
    phase: "drag_active",
    source: params.source,
    targetLine: params.targetLine,
    listIntent: params.listIntent,
    rejectReason: params.rejectReason,
    pointerType: params.pointerType
  };
}
function buildDropCommitLifecycleEvent(params) {
  return {
    type: "drag_drop_commit",
    phase: "drop_commit",
    source: params.source,
    targetLine: params.targetLine,
    listIntent: params.listIntent,
    rejectReason: null,
    pointerType: params.pointerType
  };
}
function buildCancelledLifecycleEvent(params) {
  var _a, _b;
  return {
    type: "drag_cancelled",
    phase: "cancelled",
    source: params.source,
    targetLine: (_a = params.targetLine) != null ? _a : null,
    listIntent: (_b = params.listIntent) != null ? _b : null,
    rejectReason: params.rejectReason,
    pointerType: params.pointerType
  };
}
function buildIdleLifecycleEvent() {
  return {
    type: "drag_idle",
    phase: "idle",
    source: null,
    targetLine: null,
    listIntent: null,
    rejectReason: null,
    pointerType: null
  };
}

// src/drag/selection/block-range-selection.ts
function createBlockRangeSelectionState(options) {
  var _a, _b, _c;
  const anchorStartLineNumber = options.anchorBoundary.startLineNumber;
  const anchorEndLineNumber = options.anchorBoundary.endLineNumber;
  if (anchorStartLineNumber < 1 || anchorEndLineNumber > options.doc.lines || anchorStartLineNumber > anchorEndLineNumber) {
    return null;
  }
  const initialBoundary = (_a = options.initialBoundary) != null ? _a : options.anchorBoundary;
  const activeBlocks = options.resolveBoundary ? collectSelectedBlocksBetween(
    options.doc.lines,
    anchorStartLineNumber,
    anchorEndLineNumber,
    initialBoundary.startLineNumber,
    initialBoundary.endLineNumber,
    options.resolveBoundary
  ) : [{
    startLineNumber: anchorStartLineNumber,
    endLineNumber: anchorEndLineNumber
  }];
  const activeBlock = (_b = activeBlocks[0]) != null ? _b : {
    startLineNumber: anchorStartLineNumber,
    endLineNumber: anchorEndLineNumber
  };
  const operation = (_c = options.operation) != null ? _c : isSelectedBlockCoveredByBlocks(
    options.doc.lines,
    activeBlock,
    options.selectedBlocks
  ) ? "remove" : "add";
  const baseBlocks = operation === "add" ? subtractSelectedBlocks(options.doc.lines, options.selectedBlocks, activeBlocks) : options.selectedBlocks;
  return applyBlockRangeSelection({
    docLines: options.doc.lines,
    operation,
    baseBlocks,
    activeBlocks
  }, {
    anchorStartLineNumber,
    anchorEndLineNumber
  });
}
function updateBlockRangeSelectionState(state, options) {
  const activeBlocks = collectSelectedBlocksBetween(
    options.docLines,
    state.anchorStartLineNumber,
    state.anchorEndLineNumber,
    options.target.startLineNumber,
    options.target.endLineNumber,
    options.resolveBoundary
  );
  return applyBlockRangeSelection({
    docLines: options.docLines,
    operation: state.operation,
    baseBlocks: state.baseBlocks,
    activeBlocks
  }, {
    anchorStartLineNumber: state.anchorStartLineNumber,
    anchorEndLineNumber: state.anchorEndLineNumber
  });
}
function applyBlockRangeSelection(options, anchor) {
  const selectionBlocks = options.operation === "remove" ? subtractSelectedBlocks(options.docLines, options.baseBlocks, options.activeBlocks) : mergeSelectedBlocks(options.docLines, [
    ...options.baseBlocks,
    ...options.activeBlocks
  ]);
  return {
    ...anchor,
    operation: options.operation,
    baseBlocks: mergeSelectedBlocks(options.docLines, options.baseBlocks),
    activeBlocks: mergeSelectedBlocks(options.docLines, options.activeBlocks),
    selectionBlocks
  };
}

// src/drag/pipeline/pipeline-drop.ts
function startDragDrop(params) {
  return [
    { type: "lifecycle", event: buildDragStartedLifecycleEvent(params.selection, params.pointerType) },
    ...dragOver(params)
  ];
}
function dragOver(params) {
  var _a, _b, _c, _d, _e;
  return [
    {
      type: "drag_over",
      selection: params.selection,
      drop: params.drop,
      pointerType: params.pointerType
    },
    {
      type: "lifecycle",
      event: buildDragTargetChangedLifecycleEvent({
        source: params.selection,
        targetLine: (_b = (_a = params.drop.target) == null ? void 0 : _a.targetLineNumber) != null ? _b : null,
        listIntent: (_d = (_c = params.drop.target) == null ? void 0 : _c.listIntent) != null ? _d : null,
        rejectReason: (_e = params.drop.rejectReason) != null ? _e : null,
        pointerType: params.pointerType
      })
    }
  ];
}
function drop(params) {
  var _a, _b, _c, _d, _e, _f;
  if (params.resolution.type === "cancel") {
    return cancelDrop({
      selection: params.selection,
      drop: params.resolution.drop,
      reason: (_b = (_a = params.resolution.reason) != null ? _a : params.resolution.drop.rejectReason) != null ? _b : "no_target",
      pointerType: params.pointerType
    });
  }
  const outputs = [];
  if (params.resolution.type === "command") {
    outputs.push({ type: "command_ready", command: params.resolution.command });
  }
  outputs.push(
    {
      type: "dropped",
      selection: params.selection,
      drop: params.resolution.drop,
      pointerType: params.pointerType
    },
    {
      type: "lifecycle",
      event: buildDropCommitLifecycleEvent({
        source: params.selection,
        targetLine: (_d = (_c = params.resolution.drop.target) == null ? void 0 : _c.targetLineNumber) != null ? _d : null,
        listIntent: (_f = (_e = params.resolution.drop.target) == null ? void 0 : _e.listIntent) != null ? _f : null,
        pointerType: params.pointerType
      })
    }
  );
  return outputs;
}
function cancelDrop(params) {
  var _a, _b, _c, _d, _e, _f;
  return [
    {
      type: "cancelled",
      selection: params.selection,
      reason: params.reason,
      pointerType: params.pointerType
    },
    {
      type: "lifecycle",
      event: buildCancelledLifecycleEvent({
        source: params.selection,
        targetLine: (_c = (_b = (_a = params.drop) == null ? void 0 : _a.target) == null ? void 0 : _b.targetLineNumber) != null ? _c : null,
        listIntent: (_f = (_e = (_d = params.drop) == null ? void 0 : _d.target) == null ? void 0 : _e.listIntent) != null ? _f : null,
        rejectReason: params.reason,
        pointerType: params.pointerType
      })
    }
  ];
}

// src/drag/pipeline/pipeline-guard.ts
function dependsOnGuard(state, guardId) {
  switch (state.type) {
    case "holding":
    case "ready_to_drag":
      return state.hold.guardDeps.includes(guardId);
    case "selecting":
      return state.selection.guardDeps.includes(guardId);
    case "dragging":
      return state.drag.guardDeps.includes(guardId);
    default:
      return false;
  }
}
function withGuardDeps(guardDeps) {
  return [...new Set(guardDeps != null ? guardDeps : [])];
}

// src/drag/pipeline/pipeline-state.ts
var IDLE_PIPELINE_STATE = { type: "idle" };

// src/drag/pipeline/pipeline-exit.ts
function cancelPipeline(state, reason, pointerType) {
  if (state.type === "idle") {
    return { state, outputs: [] };
  }
  if (reason !== "guard_unavailable" && (state.type === "holding" || state.type === "ready_to_drag") && state.hold.retainedSelection) {
    const next = {
      type: "selecting",
      selection: state.hold.retainedSelection
    };
    return {
      state: next,
      outputs: [
        { type: "state_changed", state: next },
        { type: "selection_changed", selection: next.selection.selection },
        { type: "lifecycle", event: buildIdleLifecycleEvent() }
      ]
    };
  }
  const source = state.type === "holding" || state.type === "ready_to_drag" ? state.hold.target.selection : state.type === "selecting" ? state.selection.selection : state.drag.selection;
  const drop2 = state.type === "dragging" ? state.drag.drop : null;
  return {
    state: IDLE_PIPELINE_STATE,
    outputs: [
      { type: "state_changed", state: IDLE_PIPELINE_STATE },
      ...cancelDrop({
        selection: source,
        drop: drop2,
        reason,
        pointerType
      }),
      { type: "lifecycle", event: buildIdleLifecycleEvent() }
    ]
  };
}
function clearSelection(state) {
  if (state.type !== "selecting") {
    return { state, outputs: [] };
  }
  return {
    state: IDLE_PIPELINE_STATE,
    outputs: [
      { type: "selection_changed", selection: null },
      { type: "state_changed", state: IDLE_PIPELINE_STATE },
      { type: "lifecycle", event: buildIdleLifecycleEvent() }
    ]
  };
}
function exitForUnavailableGuard(state, guardId) {
  if (!dependsOnGuard(state, guardId)) {
    return { state, outputs: [] };
  }
  return cancelPipeline(state, "guard_unavailable", null);
}
function destroyPipeline() {
  return {
    state: IDLE_PIPELINE_STATE,
    outputs: [
      { type: "state_changed", state: IDLE_PIPELINE_STATE },
      { type: "lifecycle", event: buildIdleLifecycleEvent() }
    ]
  };
}

// src/drag/pipeline/pipeline-reducer.ts
function transitionPipelineState(state, event) {
  var _a;
  switch (event.type) {
    case "hold_start":
      return onHoldStart(state, event);
    case "hold_ready":
      return onHoldReady(state, event);
    case "selection_start":
      return onSelectionStart(state, event);
    case "selection_change":
      return onSelectionChange(state, event);
    case "selection_finish":
      return onSelectionFinish(state);
    case "selection_clear":
      return clearSelection(state);
    case "drag_start":
      return onDragStart(state, event);
    case "drag_over":
      return onDragOver(state, event);
    case "drop":
      return onDrop(state, event);
    case "cancel":
      return cancelPipeline(state, event.reason, (_a = event.pointerType) != null ? _a : null);
    case "guard_unavailable":
      return exitForUnavailableGuard(state, event.guardId);
    case "destroy":
      return destroyPipeline();
  }
}
function onHoldStart(state, event) {
  var _a;
  const next = {
    type: "holding",
    hold: {
      sessionId: event.sessionId,
      target: event.target,
      guardDeps: withGuardDeps(event.guardDeps),
      ...state.type === "selecting" && state.selection.phase === "passive" ? { retainedSelection: state.selection } : {}
    }
  };
  return {
    state: next,
    outputs: [
      { type: "state_changed", state: next },
      { type: "lifecycle", event: buildPressPendingLifecycleEvent(event.target.selection, (_a = event.pointerType) != null ? _a : null, false) }
    ]
  };
}
function onHoldReady(state, event) {
  var _a;
  if (state.type !== "holding" || state.hold.sessionId !== event.sessionId) {
    return { state, outputs: [] };
  }
  const next = {
    type: "ready_to_drag",
    hold: state.hold
  };
  return {
    state: next,
    outputs: [
      { type: "state_changed", state: next },
      { type: "lifecycle", event: buildPressPendingLifecycleEvent(state.hold.target.selection, (_a = event.pointerType) != null ? _a : null, true) }
    ]
  };
}
function onSelectionStart(state, event) {
  const rangeState = createSelectionRangeState(event.seed);
  if (event.seed.range && !rangeState) {
    return { state, outputs: [] };
  }
  const selectionRangeState = rangeState != null ? rangeState : void 0;
  const selection = rangeState ? buildSelectionFromRangeState(event.seed.selection, rangeState.selectionBlocks) : event.seed.selection;
  const next = {
    type: "selecting",
    selection: {
      selection,
      phase: "adjusting",
      guardDeps: withGuardDeps(event.guardDeps),
      rangeState: selectionRangeState
    }
  };
  return {
    state: next,
    outputs: [
      { type: "state_changed", state: next },
      { type: "selection_changed", selection }
    ]
  };
}
function createSelectionRangeState(seed) {
  if (!seed.range)
    return void 0;
  return createBlockRangeSelectionState(seed.range);
}
function onSelectionChange(state, event) {
  if (state.type !== "selecting") {
    return { state, outputs: [] };
  }
  if (!state.selection.rangeState || event.docLines === void 0 || !event.resolveBoundary) {
    return { state, outputs: [] };
  }
  const rangeState = updateBlockRangeSelectionState(state.selection.rangeState, {
    docLines: event.docLines,
    target: event.boundary,
    resolveBoundary: event.resolveBoundary
  });
  const selection = buildSelectionFromRangeState(state.selection.selection, rangeState.selectionBlocks);
  const next = {
    type: "selecting",
    selection: {
      ...state.selection,
      selection,
      phase: "adjusting",
      rangeState
    }
  };
  return {
    state: next,
    outputs: [
      { type: "state_changed", state: next },
      { type: "selection_changed", selection }
    ]
  };
}
function buildSelectionFromRangeState(base, blocks) {
  return {
    ...base,
    ranges: blocks.map((block) => ({
      startLine: block.startLineNumber - 1,
      endLine: block.endLineNumber - 1
    }))
  };
}
function onSelectionFinish(state) {
  if (state.type !== "selecting") {
    return { state, outputs: [] };
  }
  const next = {
    type: "selecting",
    selection: {
      ...state.selection,
      phase: "passive"
    }
  };
  return {
    state: next,
    outputs: [
      { type: "state_changed", state: next },
      { type: "selection_changed", selection: next.selection.selection }
    ]
  };
}
function onDragStart(state, event) {
  var _a;
  if (state.type !== "ready_to_drag" || state.hold.sessionId !== event.sessionId) {
    return { state, outputs: [] };
  }
  const next = {
    type: "dragging",
    drag: {
      sessionId: event.sessionId,
      selection: state.hold.target.selection,
      drop: event.drop,
      guardDeps: state.hold.guardDeps
    }
  };
  return {
    state: next,
    outputs: [
      { type: "state_changed", state: next },
      ...startDragDrop({
        selection: next.drag.selection,
        drop: event.drop,
        pointerType: (_a = event.pointerType) != null ? _a : null
      })
    ]
  };
}
function onDragOver(state, event) {
  var _a;
  if (state.type !== "dragging" || state.drag.sessionId !== event.sessionId) {
    return { state, outputs: [] };
  }
  const next = {
    type: "dragging",
    drag: {
      ...state.drag,
      drop: event.drop
    }
  };
  return {
    state: next,
    outputs: [
      { type: "state_changed", state: next },
      ...dragOver({
        selection: next.drag.selection,
        drop: event.drop,
        pointerType: (_a = event.pointerType) != null ? _a : null
      })
    ]
  };
}
function onDrop(state, event) {
  var _a;
  if (state.type !== "dragging" || state.drag.sessionId !== event.sessionId) {
    return { state, outputs: [] };
  }
  return {
    state: IDLE_PIPELINE_STATE,
    outputs: [
      { type: "state_changed", state: IDLE_PIPELINE_STATE },
      ...drop({
        selection: state.drag.selection,
        resolution: event.resolution,
        pointerType: (_a = event.pointerType) != null ? _a : null
      }),
      { type: "lifecycle", event: buildIdleLifecycleEvent() }
    ]
  };
}

// src/drag/pipeline/drag-pipeline.ts
function createDragPipeline(options) {
  return new DragPipelineImpl(options);
}
var DragPipelineImpl = class {
  constructor(options = {}) {
    this.options = options;
    this.currentState = IDLE_PIPELINE_STATE;
  }
  get state() {
    return this.currentState;
  }
  enter(event) {
    var _a, _b;
    const previous = this.currentState;
    const transition = transitionPipelineState(previous, event);
    this.currentState = transition.state;
    const result = {
      previous,
      current: this.currentState,
      outputs: this.decorateOutputs(previous, this.currentState, event, transition.outputs)
    };
    (_b = (_a = this.options).onOutputs) == null ? void 0 : _b.call(_a, result.outputs, result);
    return result;
  }
  clear() {
    return this.enter({ type: "destroy" });
  }
  decorateOutputs(previous, current, event, outputs) {
    const decorated = [...outputs];
    if (shouldClearSelectionVisual(previous, current) && !hasSelectionClearOutput(decorated)) {
      decorated.push({ type: "selection_changed", selection: null });
    }
    if (previous.type !== "dragging" && current.type === "dragging") {
      decorated.push({ type: "drag_source_changed", selection: current.drag.selection });
    }
    if (previous.type !== "idle" && current.type === "idle") {
      decorated.push({ type: "drag_source_changed", selection: null });
    }
    const terminalReason = resolveTerminalReason(previous, current, event);
    if (terminalReason) {
      decorated.push({ type: "terminal", reason: terminalReason });
    }
    return decorated;
  }
};
function shouldClearSelectionVisual(previous, current) {
  if ((previous.type === "holding" || previous.type === "ready_to_drag") && previous.hold.retainedSelection && current.type === "dragging") {
    return true;
  }
  if (previous.type !== "selecting" || current.type === "selecting") {
    return false;
  }
  return !(current.type === "holding" && current.hold.retainedSelection);
}
function hasSelectionClearOutput(outputs) {
  return outputs.some((output) => output.type === "selection_changed" && output.selection === null);
}
function resolveTerminalReason(previous, current, event) {
  if (previous.type === "idle" || current.type !== "idle")
    return null;
  switch (event.type) {
    case "drop":
      return "drop";
    case "cancel":
      return "cancel";
    case "destroy":
      return "destroy";
    case "guard_unavailable":
      return "guard_unavailable";
    default:
      return null;
  }
}

// src/plugin/platform.ts
var import_obsidian = require("obsidian");
var platform = {
  isMobile: import_obsidian.Platform.isMobile,
  isPhone: import_obsidian.Platform.isPhone,
  isTablet: import_obsidian.Platform.isTablet,
  isDesktop: import_obsidian.Platform.isDesktop
};

// src/platform/codemirror/input/range-selection-gesture-state.ts
function resolveRangeSelectConfig(mouseLongPressMs, getTouchRangeSelectLongPressMs) {
  if (!platform.isMobile) {
    return {
      longPressMs: mouseLongPressMs
    };
  }
  return {
    longPressMs: getTouchRangeSelectLongPressMs()
  };
}
function createInitialRangeSelectionState(options) {
  var _a, _b, _c;
  const anchorStartLineNumber = options.blockInfo.startLine + 1;
  const anchorEndLineNumber = options.blockInfo.endLine + 1;
  if (anchorStartLineNumber < 1 || anchorEndLineNumber > options.doc.lines || anchorStartLineNumber > anchorEndLineNumber) {
    return null;
  }
  const anchorBoundary = (_a = options.anchorBoundary) != null ? _a : {
    startLineNumber: anchorStartLineNumber,
    endLineNumber: anchorEndLineNumber,
    representativeLineNumber: anchorEndLineNumber
  };
  const initialBoundary = (_b = options.initialBoundary) != null ? _b : anchorBoundary;
  return {
    anchorBlock: options.blockInfo,
    sourceSelection: options.sourceSelection,
    baseSelectedBlocks: options.baseSelectedBlocks,
    initialOperation: options.initialOperation,
    guardDeps: options.guardDeps,
    sourceKind: (_c = options.sourceKind) != null ? _c : "handle",
    anchorBoundary,
    initialBoundary,
    resolveBoundary: options.resolveBoundary,
    pipelineStarted: false,
    selectionGestureStarted: false,
    pointerId: options.pointerId,
    startX: options.startX,
    startY: options.startY,
    latestX: options.startX,
    latestY: options.startY,
    pointerType: options.pointerType,
    dragReady: !platform.isMobile,
    longPressReady: false,
    isIntercepting: platform.isMobile,
    timeoutId: null,
    dragTimeoutId: null,
    currentLineNumber: initialBoundary.representativeLineNumber
  };
}

// src/platform/codemirror/selection/selection-grip-hit.ts
var RANGE_SELECTION_GRIP_HIT_PADDING_PX = 20;
function getRangeSelectionDocLineCount(selection) {
  return Math.max(
    selection.templateBlock.endLine + 1,
    ...selection.blocks.map((block) => block.endLineNumber)
  );
}
function isRangeSelectionGripHit(options) {
  const selection = options.selection;
  if (!selection)
    return false;
  const hitHandle = options.target.closest(`.${RANGE_SELECTED_HANDLE_CLASS}`);
  if (hitHandle)
    return true;
  if (platform.isMobile) {
    if (options.target.closest(`.${DRAG_SOURCE_LINE_CLASS}`))
      return true;
    if (!options.isWithinMobileDragHotzoneBand(options.clientX)) {
      return false;
    }
  }
  const segments = groupSelectedBlocksIntoSegments(
    getRangeSelectionDocLineCount(selection),
    selection.blocks
  );
  for (const segment of segments) {
    const anchorSpan = options.resolveAnchorSpan(segment);
    if (!anchorSpan)
      continue;
    const top = anchorSpan.topY - RANGE_SELECTION_GRIP_HIT_PADDING_PX;
    const bottom = anchorSpan.bottomY + RANGE_SELECTION_GRIP_HIT_PADDING_PX;
    if (options.clientY >= top && options.clientY <= bottom) {
      return true;
    }
  }
  return false;
}

// src/platform/codemirror/selection/block-boundary-resolver.ts
var import_state4 = require("@codemirror/state");
function createRangeSelectionBoundaryResolver(state) {
  const doc = state.doc;
  const tabSize = state.facet(import_state4.EditorState.tabSize);
  return (lineNumber) => {
    const clampedLine = Math.max(1, Math.min(doc.lines, lineNumber));
    const block = detectBlock(state, clampedLine, { tabSize });
    if (!block) {
      return {
        startLineNumber: clampedLine,
        endLineNumber: clampedLine
      };
    }
    return {
      startLineNumber: Math.max(1, block.startLine + 1),
      endLineNumber: Math.min(doc.lines, block.endLine + 1)
    };
  };
}
function resolveRangeSelectionBoundaryAtVerticalPosition(view, clientY) {
  const contentRect = view.contentDOM.getBoundingClientRect();
  if (clientY < contentRect.top || clientY > contentRect.bottom)
    return null;
  try {
    const lineBlock = view.lineBlockAtHeight(clientY - view.documentTop);
    const lineNumber = view.state.doc.lineAt(lineBlock.from).number;
    const boundary = createRangeSelectionBoundaryResolver(view.state)(lineNumber);
    return {
      ...boundary,
      representativeLineNumber: lineNumber
    };
  } catch (e) {
    return null;
  }
}

// src/platform/codemirror/input/pointer-hit-test.ts
var clients = /* @__PURE__ */ new Set();
var activeClient = null;
function resolveClientAtPoint(clientX, clientY) {
  for (const client of clients) {
    if (client.containsPoint(clientX, clientY))
      return client;
  }
  return null;
}
function setActiveClient(nextClient) {
  if (activeClient && activeClient !== nextClient) {
    activeClient.hideDropPreview();
  }
  activeClient = nextClient;
}
function registerPointerHitTestClient(client) {
  clients.add(client);
  return () => {
    clients.delete(client);
    if (activeClient === client) {
      client.hideDropPreview();
      activeClient = null;
    }
  };
}
function showPointerDropPreview(fallbackClient, source, drop2, pointerType) {
  const targetClient = activeClient != null ? activeClient : fallbackClient;
  targetClient.showDropPreview(source, drop2, pointerType);
}
function resolvePointerDropSnapshotAtPoint(fallbackClient, clientX, clientY, source, pointerType) {
  var _a;
  const targetClient = (_a = resolveClientAtPoint(clientX, clientY)) != null ? _a : fallbackClient;
  setActiveClient(targetClient);
  return targetClient.resolveDropSnapshotAtPoint(clientX, clientY, source, pointerType);
}
function buildPointerBlockCommandAtPoint(fallbackClient, source, clientX, clientY, pointerType) {
  var _a, _b;
  const targetClient = (_b = (_a = resolveClientAtPoint(clientX, clientY)) != null ? _a : activeClient) != null ? _b : fallbackClient;
  setActiveClient(targetClient);
  return targetClient.buildBlockCommandAtPoint(source, clientX, clientY, pointerType);
}
function applyPointerBlockCommand(fallbackClient, command) {
  const targetClient = activeClient != null ? activeClient : fallbackClient;
  targetClient.applyBlockCommand(command);
}
function hidePointerDropPreviews() {
  for (const client of clients) {
    client.hideDropPreview();
  }
  activeClient = null;
}
function readPointerInput(kind, event) {
  return {
    kind,
    target: isHTMLElement(event.target) ? event.target : null,
    button: event.button,
    buttons: event.buttons,
    pointerId: event.pointerId,
    clientX: event.clientX,
    clientY: event.clientY,
    pointerType: event.pointerType || null,
    shiftKey: event.shiftKey
  };
}
function readKeyboardInput(kind, event) {
  return {
    kind,
    key: event.key,
    target: event.target
  };
}
function readFocusInput(kind, event) {
  return {
    kind,
    target: event.target
  };
}
function readVisibilityInput(event) {
  return {
    kind: "visibilitychange",
    visibilityState: activeDocument.visibilityState
  };
}
function shouldStartMobilePressDrag(e) {
  return e.pointerType === "touch" && e.button === 0;
}
function autoScrollNearViewportEdge(scroller, clientY, edgeZone = 60, maxSpeed = 12) {
  const rect = scroller.getBoundingClientRect();
  let delta = 0;
  if (clientY < rect.top + edgeZone) {
    const depth = rect.top + edgeZone - clientY;
    delta = -maxSpeed * Math.min(1, depth / edgeZone);
  } else if (clientY > rect.bottom - edgeZone) {
    const depth = clientY - (rect.bottom - edgeZone);
    delta = maxSpeed * Math.min(1, depth / edgeZone);
  }
  if (delta === 0)
    return false;
  const previousScrollTop = scroller.scrollTop;
  scroller.scrollTop += delta;
  return scroller.scrollTop !== previousScrollTop;
}
function autoScrollEditorNearViewportEdge(view, clientY, edgeZone, maxSpeed) {
  var _a, _b;
  const scroller = (_b = (_a = view.scrollDOM) != null ? _a : view.dom.querySelector(".cm-scroller")) != null ? _b : null;
  if (!scroller)
    return false;
  return autoScrollNearViewportEdge(scroller, clientY, edgeZone, maxSpeed);
}

// src/platform/codemirror/input/touch-delay-policy.ts
var MOBILE_DRAG_LONG_PRESS_MS = 200;
var MOBILE_SELECTED_RANGE_DRAG_LONG_PRESS_MS = 120;
var MOBILE_DRAG_START_MOVE_THRESHOLD_PX = 8;
var MOBILE_DRAG_CANCEL_MOVE_THRESHOLD_PX = 12;
var TOUCH_RANGE_SELECT_LONG_PRESS_MS = 900;
var MIN_TOUCH_RANGE_SELECT_LONG_PRESS_MS = 300;
var MAX_TOUCH_RANGE_SELECT_LONG_PRESS_MS = 2e3;
var MOUSE_RANGE_SELECT_LONG_PRESS_MS = 500;
var MOUSE_SECONDARY_DRAG_START_MOVE_THRESHOLD_PX = 4;
function clampTouchRangeSelectLongPressMs(value) {
  if (value === void 0 || !Number.isFinite(value)) {
    return TOUCH_RANGE_SELECT_LONG_PRESS_MS;
  }
  return Math.max(
    MIN_TOUCH_RANGE_SELECT_LONG_PRESS_MS,
    Math.min(MAX_TOUCH_RANGE_SELECT_LONG_PRESS_MS, Math.round(value))
  );
}

// src/platform/codemirror/input/pointer-selection.ts
function decidePointerDown(context, e, target) {
  const resize = decideSelectionResize(context, e, target);
  if (resize.type !== "none")
    return resize;
  const passiveDrag = decidePassiveSelectionDrag(context, e, target);
  if (passiveDrag.type !== "none")
    return passiveDrag;
  const handle = target.closest(`.${DRAG_HANDLE_CLASS}`);
  if (handle && !handle.classList.contains(EMBED_HANDLE_CLASS)) {
    return decideHandlePointerDown(context, e, handle);
  }
  const textRange = decideTextRangeSelection(context, e, target);
  if (textRange.type !== "none")
    return textRange;
  if (isPassiveSelectionActive(context))
    return { type: "none" };
  return decideTextLongPressDrag(context, e, target);
}
function decideEnterMobileSelectionMode(context, e) {
  if (!platform.isMobile)
    return { type: "none" };
  if (!context.isMultiLineSelectionEnabled)
    return { type: "none" };
  if (context.pipelineState.type !== "idle")
    return { type: "none" };
  const line = context.view.state.doc.lineAt(context.view.state.selection.main.head);
  const boundaryAtCursor = createRangeSelectionBoundaryResolver(context.view.state)(line.number);
  const startLine = context.view.state.doc.line(boundaryAtCursor.startLineNumber);
  const endLine = context.view.state.doc.line(boundaryAtCursor.endLineNumber);
  return decideEnterMobileSelectionModeFromBlock(context, {
    type: "paragraph" /* Paragraph */,
    startLine: boundaryAtCursor.startLineNumber - 1,
    endLine: boundaryAtCursor.endLineNumber - 1,
    from: startLine.from,
    to: endLine.to,
    indentLevel: 0,
    content: context.view.state.doc.sliceString(startLine.from, endLine.to)
  }, e);
}
function decideEnterMobileSelectionModeFromBlock(context, blockInfo, e) {
  if (!platform.isMobile)
    return { type: "none" };
  if (!context.isMultiLineSelectionEnabled)
    return { type: "none" };
  if (!context.canStartDragForPointer("text"))
    return { type: "none" };
  if (context.pipelineState.type !== "idle" && context.pipelineState.type !== "holding" && context.pipelineState.type !== "ready_to_drag") {
    return { type: "none" };
  }
  if (context.isBlockInsideRenderedTableCell(blockInfo))
    return { type: "none" };
  const selection = context.resolveBlockSelection({ kind: "block", block: blockInfo });
  if (!selection)
    return { type: "none" };
  return {
    type: "start_mobile_selection_mode",
    selection,
    blockInfo,
    markEventHandled: e instanceof CustomEvent && !!e.detail && typeof e.detail === "object"
  };
}
function isPassiveSelectionActive(context) {
  return context.pipelineState.type === "selecting" && context.pipelineState.selection.phase === "passive";
}
function decideSelectionResize(context, e, target) {
  if (!platform.isMobile)
    return { type: "none" };
  if (context.pipelineState.type !== "selecting" || context.pipelineState.selection.phase !== "passive")
    return { type: "none" };
  const handleEl = target.closest(`.${MOBILE_SELECTION_RESIZE_HANDLE_CLASS}`);
  if (!handleEl)
    return { type: "none" };
  const rawHandle = handleEl.getAttribute("data-dnd-mobile-selection-handle");
  if (rawHandle !== "top" && rawHandle !== "bottom")
    return { type: "none" };
  const targetSegment = readMobileSelectionHandleBlock(handleEl);
  if (!targetSegment)
    return { type: "none" };
  return decideRangeSelectionFromMobileResizeHandle(context, rawHandle, targetSegment);
}
function decideRangeSelectionFromMobileResizeHandle(context, handle, targetSegment) {
  if (context.pipelineState.type !== "selecting")
    return { type: "none" };
  const selectedBlocks = selectedBlocksFromPipeline(context.pipelineState);
  if (selectedBlocks.length === 0)
    return { type: "none" };
  const selectedSegment = groupSelectedBlocksIntoSegments(context.view.state.doc.lines, selectedBlocks).find((segment) => segment.startLineNumber === targetSegment.startLineNumber && segment.endLineNumber === targetSegment.endLineNumber);
  if (!selectedSegment)
    return { type: "none" };
  const baseSelectedBlocks = selectedBlocks.filter((block) => block.endLineNumber < selectedSegment.startLineNumber || block.startLineNumber > selectedSegment.endLineNumber);
  const fixedBoundary = buildMobileSelectionResizeBoundary(selectedSegment, handle === "top" ? "end" : "start");
  const movingBoundary = buildMobileSelectionResizeBoundary(selectedSegment, handle === "top" ? "start" : "end");
  return {
    type: "start_range_selection",
    source: context.pipelineState.selection.selection,
    handle: null,
    preventDefault: true,
    capturePointer: true,
    applySelectionGestureGuard: true,
    options: {
      skipLongPress: true,
      initialOperation: "add",
      guardDeps: ["mobile-text-drag-mode"],
      sourceKind: "handle",
      baseSelectedBlocks,
      anchorBoundary: fixedBoundary,
      initialBoundary: movingBoundary,
      resolveBoundary: createRangeSelectionBoundaryResolver(context.view.state)
    }
  };
}
function decidePassiveSelectionDrag(context, e, target) {
  var _a;
  if (!context.isMultiLineSelectionEnabled)
    return { type: "none" };
  if (e.button !== 0)
    return { type: "none" };
  const passiveSource = context.passiveSelectionSource;
  if (!passiveSource)
    return { type: "none" };
  const pointerType = e.pointerType || null;
  const selectedHandle = target.closest(`.${RANGE_SELECTED_HANDLE_CLASS}`);
  if (!context.isSelectionDragGripHit(target, e.clientX, e.clientY, pointerType)) {
    return { type: "none" };
  }
  const sourceKind = selectedHandle ? "handle" : "selected_text";
  if (!context.canStartDragForPointer(sourceKind))
    return { type: "none" };
  if (context.pipelineState.type === "selecting" && context.hasActiveRangePointerSession) {
    return { type: "retarget_mobile_range_selection" };
  }
  const longPressMs = platform.isMobile ? MOBILE_SELECTED_RANGE_DRAG_LONG_PRESS_MS : void 0;
  const shortPressSelectionToggle = selectedHandle && !platform.isMobile ? (_a = context.resolveBlockSelection({ kind: "handle", handle: selectedHandle })) != null ? _a : void 0 : void 0;
  return {
    type: "start_press_drag",
    source: passiveSource,
    options: { sourceKind, longPressMs, shortPressSelectionToggle }
  };
}
function decideHandlePointerDown(context, e, handle) {
  if (e.button !== 0)
    return { type: "none" };
  if (platform.isMobile) {
    const append = decideRangeSelectionFromHandleWhileSelecting(context, handle, e);
    if (append.type !== "none")
      return append;
    const retarget = decideRetargetRangeSelectionFromHandleWhileSelecting(context, handle, e);
    if (retarget.type !== "none")
      return retarget;
  }
  const source = context.resolveBlockSelection({ kind: "handle", handle });
  if (!source)
    return { type: "handled" };
  const blockInfo = source.anchorBlock;
  if (context.isBlockInsideRenderedTableCell(blockInfo))
    return { type: "handled" };
  const rangePolicy = resolveHandleRangeSelectionPolicy(context, e);
  if (rangePolicy) {
    return {
      type: "start_range_selection",
      source,
      handle,
      options: rangePolicy,
      preventDefault: !platform.isMobile
    };
  }
  return {
    type: "start_press_drag",
    source,
    options: {
      sourceKind: "handle",
      longPressMs: platform.isMobile ? context.mobileDragLongPressMs : 0
    }
  };
}
function resolveHandleRangeSelectionPolicy(context, e) {
  if (!context.isMultiLineSelectionEnabled)
    return null;
  if (platform.isMobile) {
    if (isPassiveSelectionActive(context))
      return { skipLongPress: true };
    return { deferPipelineStart: true, guardDeps: ["mobile-text-drag-mode"], sourceKind: "handle" };
  }
  return isPassiveSelectionActive(context) || e.shiftKey ? { skipLongPress: true } : { deferPipelineStart: true };
}
function decideRangeSelectionFromHandleWhileSelecting(context, handle, _e) {
  if (context.pipelineState.type !== "selecting" || context.pipelineState.selection.phase !== "passive")
    return { type: "none" };
  if (!platform.isMobile)
    return { type: "none" };
  if (targetIsInsideMobileSelection(handle))
    return { type: "none" };
  const source = context.resolveBlockSelection({ kind: "handle", handle });
  if (!source)
    return { type: "none" };
  return decideRangeSelectionThroughSharedSession(context, source, {
    skipLongPress: true
  });
}
function decideRangeSelectionThroughSharedSession(context, source, options) {
  if (context.pipelineState.type !== "selecting" || context.pipelineState.selection.phase !== "passive")
    return { type: "none" };
  const blockInfo = source.anchorBlock;
  if (context.isBlockInsideRenderedTableCell(blockInfo))
    return { type: "none" };
  return {
    type: "start_range_selection",
    source,
    handle: null,
    options: {
      ...options,
      initialOperation: "add",
      guardDeps: ["mobile-text-drag-mode"]
    }
  };
}
function decideTextRangeSelection(context, e, target) {
  if (!isPassiveSelectionActive(context))
    return { type: "none" };
  if (!platform.isMobile)
    return { type: "none" };
  if (!shouldStartMobilePressDrag(e))
    return { type: "none" };
  if (!context.canStartDragForPointer("text"))
    return { type: "none" };
  if (!context.isMobileTextLongPressDragEnabled)
    return { type: "none" };
  if (!context.isWithinMobileTextLineOrEmbedArea(target, e.clientX, e.clientY))
    return { type: "none" };
  const source = context.resolveBlockSelection({ kind: "point", clientX: e.clientX, clientY: e.clientY });
  if (!source)
    return { type: "none" };
  return decideRangeSelectionThroughSharedSession(context, source, {
    deferPipelineStart: true,
    allowSecondaryDrag: false,
    sourceKind: "text"
  });
}
function decideRetargetRangeSelectionFromHandleWhileSelecting(context, handle, _e) {
  if (context.pipelineState.type !== "selecting")
    return { type: "none" };
  if (!platform.isMobile)
    return { type: "none" };
  const source = context.resolveBlockSelection({ kind: "handle", handle });
  if (!source)
    return { type: "none" };
  const blockInfo = source.anchorBlock;
  if (context.isBlockInsideRenderedTableCell(blockInfo))
    return { type: "none" };
  return {
    type: "change_selection",
    boundary: buildRangeSelectionBoundaryFromBlock(context.view.state.doc, blockInfo),
    preventDefault: true,
    capturePointer: true
  };
}
function decideTextLongPressDrag(context, e, target) {
  if (!platform.isMobile)
    return { type: "none" };
  if (!shouldStartMobilePressDrag2(context, e))
    return { type: "none" };
  if (!context.canStartDragForPointer("text"))
    return { type: "none" };
  const inTextLineOrEmbedArea = context.isMobileTextLongPressDragEnabled && context.isWithinMobileTextLineOrEmbedArea(target, e.clientX, e.clientY);
  if (!inTextLineOrEmbedArea)
    return { type: "none" };
  const source = context.resolveBlockSelection({ kind: "point", clientX: e.clientX, clientY: e.clientY });
  if (!source)
    return { type: "none" };
  const blockInfo = source.anchorBlock;
  if (context.isBlockInsideRenderedTableCell(blockInfo))
    return { type: "none" };
  if (context.isMultiLineSelectionEnabled) {
    return {
      type: "start_range_selection",
      source,
      handle: null,
      options: {
        deferPipelineStart: true,
        guardDeps: ["mobile-text-drag-mode"],
        sourceKind: "text"
      }
    };
  }
  return {
    type: "start_press_drag",
    source,
    options: { sourceKind: "text" }
  };
}
function targetIsInsideMobileSelection(target) {
  return !!target.closest(`.${RANGE_SELECTED_HANDLE_CLASS}`);
}
function shouldStartMobilePressDrag2(context, e) {
  if (context.pipelineState.type !== "idle")
    return false;
  if (!platform.isMobile)
    return false;
  return shouldStartMobilePressDrag(e);
}
function buildMobileSelectionResizeBoundary(block, edge) {
  const lineNumber = edge === "start" ? block.startLineNumber : block.endLineNumber;
  return {
    startLineNumber: lineNumber,
    endLineNumber: lineNumber,
    representativeLineNumber: lineNumber
  };
}
function readMobileSelectionHandleBlock(handleEl) {
  const startLineNumber = Number(handleEl.getAttribute("data-dnd-mobile-selection-start-line"));
  const endLineNumber = Number(handleEl.getAttribute("data-dnd-mobile-selection-end-line"));
  if (!Number.isInteger(startLineNumber) || !Number.isInteger(endLineNumber))
    return null;
  if (startLineNumber < 1 || endLineNumber < startLineNumber)
    return null;
  return { startLineNumber, endLineNumber };
}
function selectedBlocksFromPipeline(state) {
  if (state.type !== "selecting")
    return [];
  return selectedBlocksFromSelection(state.selection.selection);
}
function selectedBlocksFromSelection(selection) {
  return selection.ranges.map((range) => ({
    startLineNumber: range.startLine + 1,
    endLineNumber: range.endLine + 1
  }));
}

// src/platform/codemirror/preview/range-selection-visual-manager.ts
function getHandleBlockLineNumber(handle) {
  const blockStartAttr = handle.getAttribute("data-block-start");
  if (!blockStartAttr)
    return null;
  const blockStart = Number(blockStartAttr);
  if (!Number.isFinite(blockStart))
    return null;
  return blockStart + 1;
}
function getAnchorPointForHandle(handle) {
  var _a, _b;
  if (!handle)
    return null;
  const host = (_a = handle.closest(`${CODEMIRROR_GUTTER_ELEMENT_SELECTOR}.${HANDLE_GUTTER_MARKER_CLASS}`)) != null ? _a : handle.closest(`.${HANDLE_GUTTER_MARKER_CLASS}`);
  if (!host)
    return null;
  const anchorTarget = (_b = handle.querySelector(`.${HANDLE_CORE_CLASS}`)) != null ? _b : handle;
  const rect = anchorTarget.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0)
    return null;
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    host
  };
}
function getAnchorPointByBlockLineNumber(blockLineNumber, resolveHandleForBlockLineNumber) {
  const handle = resolveHandleForBlockLineNumber(blockLineNumber);
  return getAnchorPointForHandle(handle);
}
function emptyAnchorSnapshot() {
  return {
    ordered: [],
    byBlockLineNumber: /* @__PURE__ */ new Map()
  };
}
function buildAnchorSnapshot(visibleHandles) {
  const snapshot = emptyAnchorSnapshot();
  for (const handle of visibleHandles) {
    const blockLineNumber = getHandleBlockLineNumber(handle);
    if (blockLineNumber === null)
      continue;
    if (snapshot.byBlockLineNumber.has(blockLineNumber))
      continue;
    const anchor = getAnchorPointForHandle(handle);
    if (!anchor)
      continue;
    snapshot.byBlockLineNumber.set(blockLineNumber, anchor);
    snapshot.ordered.push({ blockLineNumber, anchor });
  }
  snapshot.ordered.sort((a, b) => a.blockLineNumber - b.blockLineNumber);
  return snapshot;
}
function findFirstAnchorIndexAtOrAfter(ordered, startBlockLineNumber) {
  let low = 0;
  let high = ordered.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (ordered[mid].blockLineNumber < startBlockLineNumber) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function resolveAnchorSpan(options) {
  var _a, _b;
  const anchors = [];
  const seenHosts = /* @__PURE__ */ new Set();
  const addAnchor = (anchor) => {
    if (!anchor)
      return;
    if (seenHosts.has(anchor.host))
      return;
    seenHosts.add(anchor.host);
    anchors.push(anchor);
  };
  const startAnchor = (_a = options.snapshot.byBlockLineNumber.get(options.segment.startBlockLineNumber)) != null ? _a : options.resolveHandleForBlockLineNumber ? getAnchorPointByBlockLineNumber(
    options.segment.startBlockLineNumber,
    options.resolveHandleForBlockLineNumber
  ) : null;
  const endAnchor = (_b = options.snapshot.byBlockLineNumber.get(options.segment.endBlockLineNumber)) != null ? _b : options.resolveHandleForBlockLineNumber ? getAnchorPointByBlockLineNumber(
    options.segment.endBlockLineNumber,
    options.resolveHandleForBlockLineNumber
  ) : null;
  addAnchor(startAnchor);
  addAnchor(endAnchor);
  const ordered = options.snapshot.ordered;
  for (let i = findFirstAnchorIndexAtOrAfter(ordered, options.segment.startBlockLineNumber); i < ordered.length && ordered[i].blockLineNumber <= options.segment.endBlockLineNumber; i++) {
    addAnchor(ordered[i].anchor);
  }
  if (anchors.length === 0)
    return null;
  const topAnchor = anchors.reduce((best, current) => current.y < best.y ? current : best);
  const bottomAnchor = anchors.reduce((best, current) => current.y > best.y ? current : best);
  return {
    x: (topAnchor.x + bottomAnchor.x) / 2,
    topY: topAnchor.y,
    bottomY: bottomAnchor.y,
    host: topAnchor.host
  };
}
var RangeSelectionBoundaryHandleRenderer = class {
  constructor(view, resolveVisibleHandleForBlockStart) {
    this.view = view;
    this.resolveVisibleHandleForBlockStart = resolveVisibleHandleForBlockStart;
    this.resizeHandleEls = /* @__PURE__ */ new Map();
  }
  render(blocks, options) {
    if (!(options == null ? void 0 : options.showMobileResizeHandles) || !platform.isMobile) {
      this.clear();
      return;
    }
    const resizeBlocks = groupSelectedBlocksIntoSegments(this.view.state.doc.lines, blocks);
    const nextKeys = /* @__PURE__ */ new Set();
    for (const block of resizeBlocks) {
      const topHost = this.resolveResizeHandleHost(block.startBlockLineNumber);
      const bottomHost = this.resolveResizeHandleHost(block.endBlockLineNumber);
      if (!topHost || !bottomHost)
        continue;
      const topKey = this.resizeHandleKey(block, "top");
      const bottomKey = this.resizeHandleKey(block, "bottom");
      nextKeys.add(topKey);
      nextKeys.add(bottomKey);
      this.renderResizeHandle(this.getOrCreateResizeHandle(topKey, "top", block), topHost);
      this.renderResizeHandle(this.getOrCreateResizeHandle(bottomKey, "bottom", block), bottomHost);
    }
    this.removeStaleResizeHandles(nextKeys);
  }
  clear() {
    for (const handleEl of this.resizeHandleEls.values()) {
      handleEl.classList.remove("is-active");
      handleEl.remove();
    }
    this.resizeHandleEls.clear();
  }
  destroy() {
    this.clear();
  }
  renderResizeHandle(handleEl, host) {
    if (handleEl.parentElement !== host) {
      host.appendChild(handleEl);
    }
    this.syncResizeHandleInlineOffset(handleEl, host);
    handleEl.classList.add("is-active");
  }
  syncResizeHandleInlineOffset(handleEl, host) {
    const contentRect = this.view.contentDOM.getBoundingClientRect();
    const hostRect = host.getBoundingClientRect();
    if (!Number.isFinite(contentRect.left) || !Number.isFinite(contentRect.right) || contentRect.right <= contentRect.left) {
      handleEl.style.removeProperty("--dnd-selection-resize-handle-left");
      return;
    }
    if (!Number.isFinite(hostRect.left)) {
      handleEl.style.removeProperty("--dnd-selection-resize-handle-left");
      return;
    }
    const contentCenterX = (contentRect.left + contentRect.right) / 2;
    const hostLocalCenterX = contentCenterX - hostRect.left;
    handleEl.style.setProperty("--dnd-selection-resize-handle-left", `${hostLocalCenterX.toFixed(2)}px`);
  }
  resolveResizeHandleHost(blockLineNumber) {
    var _a;
    const handle = this.resolveVisibleHandleForBlockStart(blockLineNumber - 1);
    if (!handle)
      return null;
    return (_a = handle.closest(`${CODEMIRROR_GUTTER_ELEMENT_SELECTOR}.${HANDLE_GUTTER_MARKER_CLASS}`)) != null ? _a : handle.closest(`.${HANDLE_GUTTER_MARKER_CLASS}`);
  }
  createResizeHandle(position) {
    const handle = activeDocument.createElement("div");
    handle.className = `${MOBILE_SELECTION_RESIZE_HANDLE_CLASS} ${position === "top" ? MOBILE_SELECTION_RESIZE_HANDLE_TOP_CLASS : MOBILE_SELECTION_RESIZE_HANDLE_BOTTOM_CLASS}`;
    handle.textContent = "::";
    handle.setAttribute("data-dnd-mobile-selection-handle", position);
    handle.setAttribute("aria-label", position === "top" ? "Adjust selection start" : "Adjust selection end");
    return handle;
  }
  getOrCreateResizeHandle(key, position, block) {
    const existing = this.resizeHandleEls.get(key);
    if (existing)
      return existing;
    const handle = this.createResizeHandle(position);
    handle.setAttribute("data-dnd-mobile-selection-start-line", String(block.startLineNumber));
    handle.setAttribute("data-dnd-mobile-selection-end-line", String(block.endLineNumber));
    this.resizeHandleEls.set(key, handle);
    return handle;
  }
  resizeHandleKey(block, position) {
    return `${block.startLineNumber}:${block.endLineNumber}:${position}`;
  }
  removeStaleResizeHandles(nextKeys) {
    for (const [key, handleEl] of this.resizeHandleEls) {
      if (nextKeys.has(key))
        continue;
      handleEl.remove();
      this.resizeHandleEls.delete(key);
    }
  }
};
function renderRangeSelectionPreview(state, rangeVisual) {
  if (state.type === "selecting") {
    renderSelectionContext(state.selection, rangeVisual);
    return;
  }
  if ((state.type === "holding" || state.type === "ready_to_drag") && state.hold.retainedSelection) {
    renderSelectionContext(state.hold.retainedSelection, rangeVisual);
    return;
  }
  rangeVisual.clear();
}
function renderSelectionContext(selection, rangeVisual) {
  var _a, _b;
  const isMobileSelection = selection.guardDeps.includes("mobile-text-drag-mode");
  rangeVisual.renderInteractiveSelection((_b = (_a = selection.rangeState) == null ? void 0 : _a.selectionBlocks) != null ? _b : selectionBlocksFromSelection(selection.selection), {
    showSourceOutline: isMobileSelection,
    showMobileResizeHandles: isMobileSelection
  });
}
function selectionBlocksFromSelection(selection) {
  return selection.ranges.map((range) => ({
    startLineNumber: range.startLine + 1,
    endLineNumber: range.endLine + 1
  }));
}
var _RangeSelectionVisualManager = class {
  constructor(view, onRefreshRequested, resolveVisibleHandleForBlockStart) {
    this.view = view;
    this.onRefreshRequested = onRefreshRequested;
    this.resolveVisibleHandleForBlockStart = resolveVisibleHandleForBlockStart;
    this.handleElements = /* @__PURE__ */ new Set();
    this.sourceLineElements = /* @__PURE__ */ new Set();
    this.handleAnchorSnapshot = emptyAnchorSnapshot();
    this.refreshRafHandle = null;
    this.scrollContainer = null;
    this.currentVisualOptions = {};
    this.boundaryHandleRenderer = new RangeSelectionBoundaryHandleRenderer(
      this.view,
      this.resolveVisibleHandleForBlockStart
    );
    this.onScroll = () => this.scheduleRefresh();
    this.bindScrollListener();
  }
  renderInteractiveSelection(blocks, options) {
    this.currentVisualOptions = options;
    this.render(blocks, options);
  }
  renderDragSourceSelection(selection) {
    this.render(selectionBlocksFromSelection(selection), {
      showSourceOutline: true,
      showMobileResizeHandles: false
    });
  }
  render(blocks, options) {
    const normalizedBlocks = mergeSelectedBlocks(this.view.state.doc.lines, blocks);
    const nextHandleElements = /* @__PURE__ */ new Set();
    const nextSourceLineElements = /* @__PURE__ */ new Set();
    for (const block of normalizedBlocks) {
      const handleEl = this.resolveHandleElementForBlockStart(block.startLineNumber - 1);
      if (handleEl) {
        nextHandleElements.add(handleEl);
      }
      if (options == null ? void 0 : options.showSourceOutline) {
        this.collectSourceLineElements(block, nextSourceLineElements);
      }
    }
    this.handleAnchorSnapshot = buildAnchorSnapshot(nextHandleElements);
    this.syncSelectionElements(
      this.handleElements,
      nextHandleElements,
      RANGE_SELECTED_HANDLE_CLASS
    );
    this.syncSourceLineElements(nextSourceLineElements);
    this.boundaryHandleRenderer.render(normalizedBlocks, {
      showMobileResizeHandles: options == null ? void 0 : options.showMobileResizeHandles
    });
  }
  clear() {
    for (const handleEl of this.handleElements) {
      handleEl.classList.remove(RANGE_SELECTED_HANDLE_CLASS);
      this.removeSelectionCheckbox(handleEl);
    }
    this.clearSourceLineElements();
    this.handleElements.clear();
    this.handleAnchorSnapshot = emptyAnchorSnapshot();
    this.currentVisualOptions = {};
    this.boundaryHandleRenderer.clear();
  }
  scheduleRefresh() {
    if (this.refreshRafHandle !== null)
      return;
    this.refreshRafHandle = window.requestAnimationFrame(() => {
      this.refreshRafHandle = null;
      this.onRefreshRequested();
    });
  }
  cancelScheduledRefresh() {
    if (this.refreshRafHandle === null)
      return;
    window.cancelAnimationFrame(this.refreshRafHandle);
    this.refreshRafHandle = null;
  }
  destroy() {
    this.clear();
    this.boundaryHandleRenderer.destroy();
    this.cancelScheduledRefresh();
    this.unbindScrollListener();
  }
  bindScrollListener() {
    var _a, _b;
    this.unbindScrollListener();
    const scroller = (_b = (_a = this.view.scrollDOM) != null ? _a : this.view.dom.querySelector(".cm-scroller")) != null ? _b : null;
    if (!scroller)
      return;
    scroller.addEventListener("scroll", this.onScroll, { passive: true });
    this.scrollContainer = scroller;
  }
  unbindScrollListener() {
    if (!this.scrollContainer)
      return;
    this.scrollContainer.removeEventListener("scroll", this.onScroll);
    this.scrollContainer = null;
  }
  syncSelectionElements(current, next, className) {
    for (const el of current) {
      if (next.has(el)) {
        el.classList.add(className);
        if (className === RANGE_SELECTED_HANDLE_CLASS) {
          this.ensureSelectionCheckbox(el);
        }
        continue;
      }
      el.classList.remove(className);
      if (className === RANGE_SELECTED_HANDLE_CLASS) {
        this.removeSelectionCheckbox(el);
      }
    }
    for (const el of next) {
      if (current.has(el))
        continue;
      el.classList.add(className);
      if (className === RANGE_SELECTED_HANDLE_CLASS) {
        this.ensureSelectionCheckbox(el);
      }
    }
    current.clear();
    for (const el of next) {
      current.add(el);
    }
  }
  ensureSelectionCheckbox(handleEl) {
    const existing = handleEl.querySelector(`:scope > .${_RangeSelectionVisualManager.selectedCheckboxClass}`);
    if (existing) {
      existing.checked = true;
      return;
    }
    const checkbox = activeDocument.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.tabIndex = -1;
    checkbox.className = _RangeSelectionVisualManager.selectedCheckboxClass;
    checkbox.setAttribute("aria-hidden", "true");
    handleEl.appendChild(checkbox);
  }
  removeSelectionCheckbox(handleEl) {
    const checkbox = handleEl.querySelector(`:scope > .${_RangeSelectionVisualManager.selectedCheckboxClass}`);
    checkbox == null ? void 0 : checkbox.remove();
  }
  collectSourceLineElements(block, target) {
    for (let lineNumber = block.startLineNumber; lineNumber <= block.endLineNumber; lineNumber++) {
      const lineEl = getMainContentLineElementForLine(this.view, lineNumber);
      if (!lineEl)
        continue;
      addSourceLineClasses(lineEl, lineNumber, block.startLineNumber, block.endLineNumber);
      target.add(lineEl);
    }
  }
  syncSourceLineElements(next) {
    for (const lineEl of this.sourceLineElements) {
      if (next.has(lineEl))
        continue;
      removeSourceLineClasses(lineEl);
    }
    this.sourceLineElements.clear();
    for (const lineEl of next) {
      this.sourceLineElements.add(lineEl);
    }
  }
  clearSourceLineElements() {
    for (const lineEl of this.sourceLineElements) {
      removeSourceLineClasses(lineEl);
    }
    this.sourceLineElements.clear();
  }
  resolveHandleElementForBlockStart(blockStart) {
    return this.resolveVisibleHandleForBlockStart(blockStart);
  }
  resolveRangeAnchorSpan(segment) {
    return resolveAnchorSpan({
      segment,
      snapshot: this.handleAnchorSnapshot,
      resolveHandleForBlockLineNumber: (lineNumber) => this.resolveHandleElementForBlockStart(lineNumber - 1)
    });
  }
};
var RangeSelectionVisualManager = _RangeSelectionVisualManager;
RangeSelectionVisualManager.selectedCheckboxClass = "dnd-selection-checkbox";

// src/shared/dom-attrs.ts
var DND_DRAG_SOURCE_STYLE_ATTR = "data-dnd-drag-source-style";
var DND_DRAG_SOURCE_HIGHLIGHT_ATTR = "data-dnd-drag-source-highlight";
var DND_LIST_DROP_HIGHLIGHT_ATTR = "data-dnd-list-drop-highlight";
var DND_HANDLE_ICON_ATTR = "data-dnd-handle-icon";
var DND_MOBILE_GESTURE_LOCK_COUNT_ATTR = "data-dnd-mobile-lock-count";

// src/platform/codemirror/input/mobile-input-hit-test.ts
var MOBILE_DRAG_HOTZONE_EXTRA_LEFT_TOLERANCE_PX = 16;
var MOBILE_LINE_HIT_Y_TOLERANCE_PX = 8;
var MOBILE_EMBED_HIT_PADDING_PX = 6;
var MOBILE_RANGE_SELECT_SCROLL_CANCEL_THRESHOLD_PX = 14;
var MobileInputHitTest = class {
  constructor(view) {
    this.view = view;
  }
  isWithinContentTolerance(clientX) {
    const contentRect = this.view.contentDOM.getBoundingClientRect();
    const left = contentRect.left - MOBILE_DRAG_HOTZONE_EXTRA_LEFT_TOLERANCE_PX;
    const right = contentRect.right + MOBILE_DRAG_HOTZONE_EXTRA_LEFT_TOLERANCE_PX;
    return clientX >= left && clientX <= right;
  }
  isWithinEditorTolerance(clientX) {
    const editorRect = this.view.dom.getBoundingClientRect();
    const left = editorRect.left - MOBILE_DRAG_HOTZONE_EXTRA_LEFT_TOLERANCE_PX;
    const right = editorRect.right + MOBILE_DRAG_HOTZONE_EXTRA_LEFT_TOLERANCE_PX;
    return clientX >= left && clientX <= right;
  }
  isWithinMobileTextLineOrEmbedArea(target, clientX, clientY) {
    const embedEl = this.resolveEmbedElement(target, clientX, clientY);
    if (embedEl) {
      return this.isWithinEmbedDragArea(embedEl, clientX, clientY);
    }
    if (!target)
      return false;
    const lineEl = target.closest(".cm-line");
    if (lineEl && this.view.contentDOM.contains(lineEl)) {
      const lineNumber = this.resolveLineNumberFromTarget(target, lineEl);
      if (lineNumber !== null) {
        return this.isWithinLineDragArea(lineNumber, clientX, clientY);
      }
    }
    if (!this.view.contentDOM.contains(target))
      return false;
    const targetLineNumber = this.resolveLineNumberFromTarget(target, null);
    if (targetLineNumber !== null) {
      return this.isWithinLineDragArea(targetLineNumber, clientX, clientY);
    }
    return false;
  }
  isMostlyVerticalScrollGesture(dx, dy) {
    return Math.abs(dy) > MOBILE_RANGE_SELECT_SCROLL_CANCEL_THRESHOLD_PX && Math.abs(dy) > Math.abs(dx) * 1.4;
  }
  resolveLineNumberFromTarget(target, lineEl) {
    const probes = [target];
    if (lineEl)
      probes.push(lineEl);
    if (target.firstChild)
      probes.push(target.firstChild);
    if (lineEl == null ? void 0 : lineEl.firstChild)
      probes.push(lineEl.firstChild);
    return resolveLineNumberFromDomNodes(this.view, probes);
  }
  isWithinLineDragArea(lineNumber, clientX, clientY) {
    if (!this.isWithinContentTolerance(clientX))
      return false;
    const lineRect = this.resolveLineRect(lineNumber);
    if (!lineRect)
      return false;
    return clientY >= lineRect.top - MOBILE_LINE_HIT_Y_TOLERANCE_PX && clientY <= lineRect.bottom + MOBILE_LINE_HIT_Y_TOLERANCE_PX;
  }
  isWithinEmbedDragArea(embedEl, clientX, clientY) {
    if (!this.isWithinEditorTolerance(clientX))
      return false;
    const rect = embedEl.getBoundingClientRect();
    return clientX >= rect.left - MOBILE_EMBED_HIT_PADDING_PX && clientX <= rect.right + MOBILE_EMBED_HIT_PADDING_PX && clientY >= rect.top - MOBILE_EMBED_HIT_PADDING_PX && clientY <= rect.bottom + MOBILE_EMBED_HIT_PADDING_PX;
  }
  resolveEmbedElement(target, clientX, clientY) {
    if (target) {
      const fromTarget = target.closest(EMBED_BLOCK_SELECTOR);
      if (fromTarget && this.view.dom.contains(fromTarget)) {
        return fromTarget;
      }
    }
    return findEmbedElementAtPoint(this.view, clientX, clientY, {
      requireDirectWithinRoot: true,
      normalizeToEmbedRoot: false
    });
  }
  resolveLineRect(lineNumber) {
    var _a;
    if (lineNumber < 1 || lineNumber > this.view.state.doc.lines)
      return null;
    const line = this.view.state.doc.line(lineNumber);
    const startCoords = safeCoordsAtPos(this.view, line.from, 1);
    const endCoords = (_a = safeCoordsAtPos(this.view, line.to, -1)) != null ? _a : startCoords;
    if (!startCoords || !endCoords)
      return null;
    const top = Math.min(startCoords.top, endCoords.top);
    const bottom = Math.max(startCoords.bottom, endCoords.bottom);
    if (!Number.isFinite(top) || !Number.isFinite(bottom) || bottom <= top)
      return null;
    return { top, bottom };
  }
};

// src/platform/codemirror/input/input-guards.ts
var INPUT_GUARD_IDLE = { type: "idle" };
var INPUT_GUARD_MOBILE_DRAG_GESTURE = { type: "mobile_drag", phase: "gesture" };
var INPUT_GUARD_MOBILE_SELECTION_PASSIVE = {
  type: "mobile_drag",
  phase: "passive",
  submode: "selection"
};
var INPUT_GUARD_MOBILE_SELECTION_GESTURE = {
  type: "mobile_drag",
  phase: "gesture",
  submode: "selection"
};
function resolveDragInteractionCapabilities(mode) {
  if (mode.type === "idle") {
    return {
      suppressTextInput: false,
      suppressScroll: false
    };
  }
  return {
    suppressTextInput: true,
    suppressScroll: mode.phase === "gesture"
  };
}
var InputGuardController = class {
  constructor(view, onFocusIn) {
    this.view = view;
    this.textInputSuppressed = false;
    this.scrollSuppressed = false;
    this.focusGuardAttached = false;
    this.savedContentEditable = null;
    this.onDocumentFocusIn = onFocusIn;
    this.mobileInputHitTest = new MobileInputHitTest(view);
  }
  isWithinContentTolerance(clientX) {
    return this.mobileInputHitTest.isWithinContentTolerance(clientX);
  }
  isWithinEditorTolerance(clientX) {
    return this.mobileInputHitTest.isWithinEditorTolerance(clientX);
  }
  isWithinMobileTextLineOrEmbedArea(target, clientX, clientY) {
    return this.mobileInputHitTest.isWithinMobileTextLineOrEmbedArea(target, clientX, clientY);
  }
  isMostlyVerticalScrollGesture(dx, dy) {
    return this.mobileInputHitTest.isMostlyVerticalScrollGesture(dx, dy);
  }
  applyInputGuardMode(mode, keyboardTarget) {
    const capabilities = resolveDragInteractionCapabilities(mode);
    this.setTextInputSuppressed(capabilities.suppressTextInput, keyboardTarget);
    this.setScrollSuppressed(capabilities.suppressScroll);
  }
  clearInputGuardMode() {
    this.applyInputGuardMode(INPUT_GUARD_IDLE);
  }
  setScrollSuppressed(shouldSuppress) {
    if (shouldSuppress === this.scrollSuppressed)
      return;
    const body = activeDocument.body;
    if (shouldSuppress) {
      const current = Number(body.getAttribute(DND_MOBILE_GESTURE_LOCK_COUNT_ATTR) || "0");
      const next = current + 1;
      body.setAttribute(DND_MOBILE_GESTURE_LOCK_COUNT_ATTR, String(next));
      body.classList.add(MOBILE_GESTURE_LOCK_CLASS);
      this.view.dom.classList.add(MOBILE_GESTURE_LOCK_CLASS);
    } else {
      const current = Number(body.getAttribute(DND_MOBILE_GESTURE_LOCK_COUNT_ATTR) || "0");
      const next = Math.max(0, current - 1);
      if (next === 0) {
        body.removeAttribute(DND_MOBILE_GESTURE_LOCK_COUNT_ATTR);
        body.classList.remove(MOBILE_GESTURE_LOCK_CLASS);
      } else {
        body.setAttribute(DND_MOBILE_GESTURE_LOCK_COUNT_ATTR, String(next));
      }
      this.view.dom.classList.remove(MOBILE_GESTURE_LOCK_CLASS);
    }
    this.scrollSuppressed = shouldSuppress;
  }
  setTextInputSuppressed(shouldSuppress, keyboardTarget) {
    if (shouldSuppress === this.textInputSuppressed) {
      if (shouldSuppress) {
        this.suppressMobileKeyboard(keyboardTarget);
      }
      return;
    }
    if (shouldSuppress) {
      this.savedContentEditable = this.view.contentDOM.getAttribute("contenteditable");
      this.view.contentDOM.setAttribute("contenteditable", "false");
      this.attachFocusGuard();
      this.suppressMobileKeyboard(keyboardTarget);
    } else {
      if (this.savedContentEditable === null) {
        this.view.contentDOM.removeAttribute("contenteditable");
      } else {
        this.view.contentDOM.setAttribute("contenteditable", this.savedContentEditable);
      }
      this.savedContentEditable = null;
      this.detachFocusGuard();
    }
    this.textInputSuppressed = shouldSuppress;
  }
  suppressMobileKeyboard(target) {
    var _a;
    const rawActive = isHTMLElement(target) ? target : activeDocument.activeElement;
    const active = isHTMLElement(rawActive) ? rawActive : null;
    if (!active)
      return;
    if (!this.shouldSuppressFocusTarget(active))
      return;
    if (typeof active.blur === "function") {
      active.blur();
    }
    if (typeof window.getSelection === "function") {
      try {
        (_a = window.getSelection()) == null ? void 0 : _a.removeAllRanges();
      } catch (e) {
      }
    }
  }
  shouldSuppressFocusTarget(target) {
    const isInputControl = target.instanceOf(HTMLInputElement) || target.instanceOf(HTMLTextAreaElement) || target.isContentEditable;
    const isEditorContent = target.classList.contains("cm-content") || !!target.closest(".cm-content");
    return isInputControl || isEditorContent;
  }
  attachFocusGuard() {
    if (this.focusGuardAttached)
      return;
    activeDocument.addEventListener("focusin", this.onDocumentFocusIn, true);
    this.focusGuardAttached = true;
  }
  detachFocusGuard() {
    if (!this.focusGuardAttached)
      return;
    activeDocument.removeEventListener("focusin", this.onDocumentFocusIn, true);
    this.focusGuardAttached = false;
  }
  triggerMobileHapticFeedback() {
    const nav = navigator;
    if (typeof nav.vibrate !== "function")
      return;
    try {
      nav.vibrate(10);
    } catch (e) {
    }
  }
};

// src/platform/codemirror/input/pointer-session.ts
var PointerSession = class {
  constructor(view, handlers) {
    this.view = view;
    this.pointerListenersAttached = false;
    this.touchBlockerAttached = false;
    this.pointerCaptureTarget = null;
    this.capturedPointerId = null;
    this.onPointerMove = handlers.onPointerMove;
    this.onPointerUp = handlers.onPointerUp;
    this.onPointerCancel = handlers.onPointerCancel;
    this.onWindowBlur = handlers.onWindowBlur;
    this.onDocumentVisibilityChange = handlers.onDocumentVisibilityChange;
    this.onTouchMove = handlers.onTouchMove;
  }
  attachPointerListeners() {
    if (this.pointerListenersAttached)
      return;
    window.addEventListener("pointermove", this.onPointerMove, { passive: false, capture: true });
    window.addEventListener("pointerup", this.onPointerUp, { passive: false, capture: true });
    window.addEventListener("pointercancel", this.onPointerCancel, { passive: false, capture: true });
    window.addEventListener("blur", this.onWindowBlur);
    activeDocument.addEventListener("visibilitychange", this.onDocumentVisibilityChange);
    this.attachTouchBlocker();
    this.pointerListenersAttached = true;
  }
  detachPointerListeners() {
    if (!this.pointerListenersAttached)
      return;
    window.removeEventListener("pointermove", this.onPointerMove, true);
    window.removeEventListener("pointerup", this.onPointerUp, true);
    window.removeEventListener("pointercancel", this.onPointerCancel, true);
    window.removeEventListener("blur", this.onWindowBlur);
    activeDocument.removeEventListener("visibilitychange", this.onDocumentVisibilityChange);
    this.detachTouchBlocker();
    this.pointerListenersAttached = false;
  }
  tryCapturePointer(e) {
    this.releasePointerCapture();
    const candidates = [this.view.dom];
    const target = e.target;
    if (target instanceof Element && target !== this.view.dom) {
      candidates.push(target);
    }
    for (const candidate of candidates) {
      if (typeof candidate.setPointerCapture !== "function")
        continue;
      try {
        candidate.setPointerCapture(e.pointerId);
        this.pointerCaptureTarget = candidate;
        this.capturedPointerId = e.pointerId;
        return;
      } catch (e2) {
      }
    }
  }
  tryCapturePointerById(pointerId) {
    if (typeof this.view.dom.setPointerCapture !== "function")
      return;
    try {
      this.view.dom.setPointerCapture(pointerId);
      this.pointerCaptureTarget = this.view.dom;
      this.capturedPointerId = pointerId;
    } catch (e) {
    }
  }
  releasePointerCapture() {
    if (!this.pointerCaptureTarget || this.capturedPointerId === null)
      return;
    if (typeof this.pointerCaptureTarget.releasePointerCapture === "function") {
      try {
        this.pointerCaptureTarget.releasePointerCapture(this.capturedPointerId);
      } catch (e) {
      }
    }
    this.pointerCaptureTarget = null;
    this.capturedPointerId = null;
  }
  attachTouchBlocker() {
    if (this.touchBlockerAttached)
      return;
    activeDocument.addEventListener("touchmove", this.onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchmove", this.onTouchMove, { passive: false, capture: true });
    this.touchBlockerAttached = true;
  }
  detachTouchBlocker() {
    if (!this.touchBlockerAttached)
      return;
    activeDocument.removeEventListener("touchmove", this.onTouchMove, true);
    window.removeEventListener("touchmove", this.onTouchMove, true);
    this.touchBlockerAttached = false;
  }
};

// src/platform/codemirror/input/pointer-drag.ts
function handlePointerMove(host, e) {
  var _a;
  readPointerInput("move", e);
  if ((_a = host.pressSession) == null ? void 0 : _a.selectionToggleBrush) {
    handlePressPendingPointerMove(host, e);
    return;
  }
  switch (host.pipelineState.type) {
    case "dragging":
      handleDraggingPointerMove(host, e);
      return;
    case "selecting":
      if (host.rangePointerSession) {
        handleRangeSelectingPointerMove(host, e);
      }
      return;
    case "holding":
    case "ready_to_drag":
      handlePressPendingPointerMove(host, e);
      return;
    case "idle":
      if (host.rangePointerSession) {
        handleRangeSelectingPointerMove(host, e);
      }
      return;
    default:
      return;
  }
}
function handleDraggingPointerMove(host, e) {
  const dragState = host.activeDragSession;
  if (!dragState || host.pipelineState.type !== "dragging")
    return;
  if (e.pointerId !== dragState.pointerId)
    return;
  e.preventDefault();
  e.stopPropagation();
  host.updateActiveDragPointer(e.clientX, e.clientY, e.pointerType || null);
  const drop2 = host.resolveActiveDragDropSnapshot(host.pipelineState.drag.selection);
  host.previewActiveDrag({
    pointerId: e.pointerId,
    pointerType: e.pointerType || null,
    drop: drop2
  });
  if (autoScrollDrag(host, dragState)) {
    scheduleDragAutoScroll(host, dragState);
  }
}
function autoScrollDrag(host, dragState) {
  var _a, _b, _c, _d;
  if (host.pipelineState.type !== "dragging")
    return false;
  const pointer = host.getActiveDragPointer();
  if (!pointer)
    return false;
  const didScroll = autoScrollEditorNearViewportEdge(
    host.view,
    pointer.clientY,
    (_b = (_a = host.deps).getAutoScrollEdgeZonePx) == null ? void 0 : _b.call(_a),
    (_d = (_c = host.deps).getAutoScrollMaxSpeedPx) == null ? void 0 : _d.call(_c)
  );
  if (didScroll) {
    const drop2 = host.resolveActiveDragDropSnapshot(host.pipelineState.drag.selection);
    host.previewActiveDrag({
      pointerId: dragState.pointerId,
      pointerType: pointer.pointerType,
      drop: drop2
    });
  }
  return didScroll;
}
function scheduleDragAutoScroll(host, dragState) {
  if (dragState.autoScrollFrameId !== null)
    return;
  dragState.autoScrollFrameId = window.requestAnimationFrame(() => {
    if (host.pipelineState.type !== "dragging" || !host.activeDragSession)
      return;
    const state = host.activeDragSession;
    state.autoScrollFrameId = null;
    if (!autoScrollDrag(host, state))
      return;
    scheduleDragAutoScroll(host, state);
  });
}
function handleRangeSelectingPointerMove(host, e) {
  const rangeState = host.rangePointerSession;
  if (!rangeState)
    return;
  if (rangeState.pipelineStarted && host.pipelineState.type !== "selecting")
    return;
  if (rangeState.pointerId !== -1 && e.pointerId !== rangeState.pointerId)
    return;
  handleRangeSelectionPointerMove(host, e, rangeState);
}
function handlePressPendingPointerMove(host, e) {
  const pressState = host.pressSession;
  if (!pressState)
    return;
  if (e.pointerId !== pressState.pointerId)
    return;
  const previousX = pressState.latestX;
  const previousY = pressState.latestY;
  pressState.latestX = e.clientX;
  pressState.latestY = e.clientY;
  const dx = e.clientX - pressState.startX;
  const dy = e.clientY - pressState.startY;
  const distance = Math.hypot(dx, dy);
  if (!pressState.longPressReady) {
    if (pressState.shortPressSelectionToggle && distance >= pressState.startMoveThresholdPx) {
      const didToggle = toggleBrushTargetsBetween(host, pressState, previousX, previousY, e.clientX, e.clientY);
      if (didToggle) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }
    if (distance > pressState.cancelMoveThresholdPx) {
      host.abortForGestureCancel("press_cancelled", e.pointerType || null);
    }
    return;
  }
  if (distance < pressState.startMoveThresholdPx)
    return;
  if (host.pipelineState.type !== "ready_to_drag")
    return;
  e.preventDefault();
  e.stopPropagation();
  const source = host.pipelineState.hold.target.selection;
  const sourceKind = host.pipelineState.hold.target.source;
  const pointerId = pressState.pointerId;
  host.enterDraggingState(source, pointerId, e.clientX, e.clientY, e.pointerType || null, sourceKind);
}
function toggleBrushTargetsBetween(host, pressState, startX, startY, clientX, clientY) {
  var _a;
  const brush = (_a = pressState.selectionToggleBrush) != null ? _a : {
    toggledKeys: /* @__PURE__ */ new Set()
  };
  pressState.selectionToggleBrush = brush;
  if (pressState.timeoutId !== null) {
    window.clearTimeout(pressState.timeoutId);
    pressState.timeoutId = null;
  }
  return host.toggleRangeSelectionTargetsBetween(startX, startY, clientX, clientY, brush.toggledKeys);
}
function handleRangeSelectionPointerMove(host, e, state) {
  var _a, _b, _c, _d, _e;
  state.latestX = e.clientX;
  state.latestY = e.clientY;
  const pointerType = (_a = state.pointerType) != null ? _a : e.pointerType || null;
  const distance = Math.hypot(e.clientX - state.startX, e.clientY - state.startY);
  const dx = e.clientX - state.startX;
  const dy = e.clientY - state.startY;
  if (state.pointerId === -1 && platform.isMobile && host.mobile.isMostlyVerticalScrollGesture(dx, dy)) {
    host.finishRangeSelectionSession();
    return;
  }
  if (!state.longPressReady) {
    if (!platform.isMobile) {
      if (distance >= MOUSE_SECONDARY_DRAG_START_MOVE_THRESHOLD_PX) {
        e.preventDefault();
        e.stopPropagation();
        const pointerId = state.pointerId;
        host.clearMouseRangeSelectState();
        host.enterDraggingState(state.sourceSelection, pointerId, e.clientX, e.clientY, pointerType, state.sourceKind);
      }
    } else {
      if (!state.dragReady) {
        if (distance > MOBILE_DRAG_CANCEL_MOVE_THRESHOLD_PX) {
          if (state.pipelineStarted) {
            host.abortForGestureCancel("press_cancelled", pointerType);
          } else {
            host.finishRangeSelectionSession();
          }
        }
        return;
      }
      if (distance >= MOBILE_DRAG_START_MOVE_THRESHOLD_PX) {
        e.preventDefault();
        e.stopPropagation();
        const pointerId = state.pointerId;
        host.clearMouseRangeSelectState();
        host.enterDraggingState(state.sourceSelection, pointerId, e.clientX, e.clientY, pointerType, state.sourceKind);
      }
    }
    return;
  }
  if (shouldStartDesktopSelectedHandleDrag(host, state, distance)) {
    const source = host.resolveBlockSelection({
      kind: "selection",
      doc: host.view.state.doc,
      blocks: state.baseSelectedBlocks,
      templateBlock: state.sourceSelection.anchorBlock
    });
    if (source) {
      e.preventDefault();
      e.stopPropagation();
      const pointerId = state.pointerId;
      host.clearMouseRangeSelectState();
      host.enterDraggingState(source, pointerId, e.clientX, e.clientY, pointerType, state.sourceKind);
      return;
    }
  }
  host.activateMouseRangeSelectInterception(state);
  e.preventDefault();
  e.stopPropagation();
  const targetBoundary = resolveRangeSelectionBoundaryAtVerticalPosition(host.view, e.clientY);
  if (targetBoundary) {
    host.updateMouseRangeSelection(state, targetBoundary);
  }
  autoScrollEditorNearViewportEdge(
    host.view,
    e.clientY,
    (_c = (_b = host.deps).getAutoScrollEdgeZonePx) == null ? void 0 : _c.call(_b),
    (_e = (_d = host.deps).getAutoScrollMaxSpeedPx) == null ? void 0 : _e.call(_d)
  );
}
function shouldStartDesktopSelectedHandleDrag(host, state, distance) {
  var _a;
  if (platform.isMobile)
    return false;
  if (!state.dragReady || state.sourceKind !== "handle")
    return false;
  if (distance < MOUSE_SECONDARY_DRAG_START_MOVE_THRESHOLD_PX)
    return false;
  if (host.pipelineState.type !== "selecting")
    return false;
  return ((_a = host.pipelineState.selection.rangeState) == null ? void 0 : _a.operation) === "remove";
}
function handlePointerUp(host, e) {
  readPointerInput("up", e);
  handlePointerTerminal(host, e, "up");
}
function handlePointerCancel(host, e) {
  readPointerInput("cancel", e);
  handlePointerTerminal(host, e, "cancel");
}
function handlePointerTerminal(host, e, mode) {
  var _a;
  if ((_a = host.pressSession) == null ? void 0 : _a.selectionToggleBrush) {
    finishPressPendingPointer(host, e, mode);
    return;
  }
  switch (host.pipelineState.type) {
    case "dragging":
      finishPointerDrag(host, e, mode === "up");
      return;
    case "selecting":
      if (host.rangePointerSession) {
        finishRangeSelectingPointer(host, e, mode);
      }
      return;
    case "holding":
    case "ready_to_drag":
      finishPressPendingPointer(host, e, mode);
      return;
    case "idle":
      if (host.rangePointerSession) {
        finishRangeSelectingPointer(host, e, mode);
      }
      return;
    default:
      return;
  }
}
function finishPointerDrag(host, e, shouldDrop) {
  const state = host.activeDragSession;
  if (!state || host.pipelineState.type !== "dragging")
    return;
  if (e.pointerId !== state.pointerId)
    return;
  e.preventDefault();
  e.stopPropagation();
  if (shouldDrop) {
    host.updateActiveDragPointer(e.clientX, e.clientY, e.pointerType || null);
    const resolved = host.buildActiveDragCommand(host.pipelineState.drag.selection);
    host.commitActiveDrag({
      pointerId: e.pointerId,
      pointerType: e.pointerType || null,
      resolved
    });
  } else {
    host.cancelActiveDrag({
      pointerId: e.pointerId,
      pointerType: e.pointerType || null,
      reason: "pointer_cancelled"
    });
  }
  host.cleanupAfterPointerDrag({
    shouldFinishDragSession: true,
    shouldHideDropPreview: true,
    cancelReason: null,
    pointerType: e.pointerType || null
  });
}
function finishRangeSelectingPointer(host, e, mode) {
  var _a, _b, _c, _d;
  const rangeState = host.rangePointerSession;
  if (!rangeState)
    return;
  if (rangeState.pointerId !== -1 && e.pointerId !== rangeState.pointerId)
    return;
  if (mode === "up" && !rangeState.longPressReady && host.pipelineState.type === "idle" && shouldOpenBlockTypeMenuFromShortTextTap(host, rangeState.sourceKind)) {
    e.preventDefault();
    e.stopPropagation();
    host.openBlockTypeMenuForTap(rangeState.sourceSelection, e);
    return;
  }
  if (mode === "up" && !rangeState.longPressReady && !platform.isMobile) {
    e.preventDefault();
    e.stopPropagation();
    (_b = (_a = host.deps).openBlockTypeMenu) == null ? void 0 : _b.call(_a, rangeState.sourceSelection.anchorBlock, e);
    host.finishRangeSelectionSession();
    return;
  }
  if (host.pipelineState.type !== "selecting") {
    host.finishRangeSelectionSession();
    return;
  }
  if (mode === "cancel") {
    if (!rangeState.pipelineStarted) {
      host.finishRangeSelectionSession();
      return;
    }
    host.abortForGestureCancel("pointer_cancelled", e.pointerType || null);
    return;
  }
  if (!rangeState.longPressReady) {
    if (mode === "up" && !platform.isMobile) {
      e.preventDefault();
      e.stopPropagation();
      (_d = (_c = host.deps).openBlockTypeMenu) == null ? void 0 : _d.call(_c, rangeState.sourceSelection.anchorBlock, e);
      host.finishRangeSelectionSession();
      return;
    }
    if (rangeState.pipelineStarted) {
      host.abortForGestureCancel("press_cancelled", e.pointerType || null);
    } else {
      host.finishRangeSelectionSession();
    }
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  host.finishRangeSelectionSession();
}
function finishPressPendingPointer(host, e, mode) {
  const pressState = host.pressSession;
  if (!pressState)
    return;
  if (e.pointerId !== pressState.pointerId)
    return;
  if (pressState.selectionToggleBrush) {
    e.preventDefault();
    e.stopPropagation();
    host.finishPointerPressSession();
    return;
  }
  const pressDistance = Math.hypot(
    pressState.latestX - pressState.startX,
    pressState.latestY - pressState.startY
  );
  if (mode === "up" && !pressState.longPressReady && pressDistance < pressState.startMoveThresholdPx && (host.pipelineState.type === "holding" || host.pipelineState.type === "ready_to_drag") && host.pipelineState.hold.retainedSelection && pressState.shortPressSelectionToggle) {
    e.preventDefault();
    e.stopPropagation();
    if (host.toggleRangeSelectionTarget(pressState.shortPressSelectionToggle)) {
      host.finishPointerPressSession();
      return;
    }
  }
  if (mode === "up" && !pressState.longPressReady && (host.pipelineState.type === "holding" || host.pipelineState.type === "ready_to_drag") && shouldOpenBlockTypeMenuFromShortTextTap(host, host.pipelineState.hold.target.source)) {
    e.preventDefault();
    e.stopPropagation();
    host.openBlockTypeMenuForTap(host.pipelineState.hold.target.selection, e);
    return;
  }
  host.abortForGestureCancel(mode === "up" ? "press_cancelled" : "pointer_cancelled", e.pointerType || null);
}
function shouldOpenBlockTypeMenuFromShortTextTap(host, sourceKind) {
  return sourceKind === "text" && host.isMobileDragModeActiveForPointer();
}

// src/platform/codemirror/input/pipeline-adapter.ts
var GUARD_MOBILE_TEXT_DRAG = "mobile-text-drag-mode";
var PipelineAdapter = class {
  constructor(view, deps) {
    this.view = view;
    this.deps = deps;
    this.pressSession = null;
    this.activeDragSession = null;
    this.rangePointerSession = null;
    this.activeDragPointer = null;
    this.onEditorPointerDown = (e) => {
      const input = readPointerInput("down", e);
      const target = input.target;
      if (!target)
        return;
      if (!this.isMultiLineSelectionEnabled()) {
        this.clearRangeSelection();
      }
      this.executePointerDownDecision(
        decidePointerDown(this.buildPointerSelectionContext(), e, target),
        e
      );
    };
    this.onLostPointerCapture = (e) => this.handleLostPointerCapture(e);
    this.onWindowKeyDown = (e) => this.handleWindowKeyDown(e);
    this.onEnterMobileSelectionMode = (e) => this.handleEnterMobileSelectionMode(e);
    this.pipeline = createDragPipeline({
      onOutputs: (outputs) => this.applyPipelineOutputs(outputs)
    });
    this.rangeVisual = new RangeSelectionVisualManager(
      this.view,
      () => this.refreshRangeSelectionVisual(),
      (blockStart) => {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.deps).getVisibleHandleForBlockStart) == null ? void 0 : _b.call(_a, blockStart)) != null ? _c : null;
      }
    );
    this.mobile = new InputGuardController(this.view, (e) => this.handleDocumentFocusIn(e));
    this.pointer = new PointerSession(this.view, {
      onPointerMove: (e) => this.handlePointerMove(e),
      onPointerUp: (e) => this.handlePointerUp(e),
      onPointerCancel: (e) => this.handlePointerCancel(e),
      onWindowBlur: () => this.handleWindowBlur(),
      onDocumentVisibilityChange: () => this.handleDocumentVisibilityChange(),
      onTouchMove: (e) => this.handleTouchMove(e)
    });
  }
  attach() {
    const editorDom = this.view.dom;
    editorDom.addEventListener("pointerdown", this.onEditorPointerDown, true);
    editorDom.addEventListener("lostpointercapture", this.onLostPointerCapture, true);
    window.addEventListener("keydown", this.onWindowKeyDown, true);
    editorDom.addEventListener("dnd:enter-mobile-selection-mode", this.onEnterMobileSelectionMode);
  }
  destroy() {
    this.resetInteractionSession({ shouldFinishDragSession: true, shouldHideDropPreview: true });
    this.pipeline.enter({ type: "destroy" });
    this.rangeVisual.destroy();
    const editorDom = this.view.dom;
    editorDom.removeEventListener("pointerdown", this.onEditorPointerDown, true);
    editorDom.removeEventListener("lostpointercapture", this.onLostPointerCapture, true);
    window.removeEventListener("keydown", this.onWindowKeyDown, true);
    editorDom.removeEventListener("dnd:enter-mobile-selection-mode", this.onEnterMobileSelectionMode);
  }
  get pipelineState() {
    return this.pipeline.state;
  }
  isGestureActive() {
    return this.hasActivePointerSession();
  }
  refreshSelectionVisual() {
    if (!this.isMultiLineSelectionEnabled()) {
      this.clearRangeSelection();
      return;
    }
    this.rangeVisual.scheduleRefresh();
  }
  buildPointerSelectionContext() {
    var _a, _b, _c, _d, _e;
    return {
      view: this.view,
      pipelineState: this.pipelineState,
      hasActiveRangePointerSession: this.rangePointerSession !== null,
      passiveSelectionSource: this.getPassiveSelectionSource(),
      isMultiLineSelectionEnabled: this.isMultiLineSelectionEnabled(),
      isMobileTextLongPressDragEnabled: ((_b = (_a = this.deps).isMobileTextLongPressDragEnabled) == null ? void 0 : _b.call(_a)) !== false,
      mobileDragLongPressMs: (_e = (_d = (_c = this.deps).getMobileDragLongPressMs) == null ? void 0 : _d.call(_c)) != null ? _e : MOBILE_DRAG_LONG_PRESS_MS,
      isBlockInsideRenderedTableCell: (blockInfo) => this.deps.isBlockInsideRenderedTableCell(blockInfo),
      resolveBlockSelection: (request) => this.resolveBlockSelection(request),
      canStartDragForPointer: (source) => this.canStartDragForPointer(source),
      isMobileDragModeActiveForPointer: () => this.isMobileDragModeActiveForPointer(),
      isWithinMobileTextLineOrEmbedArea: (target, clientX, clientY) => this.mobile.isWithinMobileTextLineOrEmbedArea(target, clientX, clientY),
      isSelectionDragGripHit: (target, clientX, clientY, pointerType) => this.isSelectionDragGripHit(target, clientX, clientY, pointerType)
    };
  }
  executePointerDownDecision(decision, e) {
    switch (decision.type) {
      case "none":
        return false;
      case "handled":
        return true;
      case "retarget_mobile_range_selection":
        this.retargetMobileRangeSelection(e);
        return true;
      case "start_press_drag":
        this.beginPressPendingDrag(decision.source, e, decision.options);
        return true;
      case "start_range_selection":
        if (decision.preventDefault) {
          e.preventDefault();
          e.stopPropagation();
        }
        this.beginRangeSelectionSession(decision.source, e, decision.handle, decision.options);
        if (decision.capturePointer) {
          this.pointer.tryCapturePointer(e);
          this.pointer.attachPointerListeners();
        }
        if (decision.applySelectionGestureGuard) {
          this.mobile.applyInputGuardMode(INPUT_GUARD_MOBILE_SELECTION_GESTURE, e.target);
        }
        return true;
      case "change_selection":
        if (decision.preventDefault) {
          e.preventDefault();
          e.stopPropagation();
        }
        this.pipeline.enter({
          type: "selection_change",
          boundary: decision.boundary,
          docLines: this.view.state.doc.lines,
          resolveBoundary: createRangeSelectionBoundaryResolver(this.view.state)
        });
        if (decision.capturePointer) {
          this.pointer.tryCapturePointer(e);
        }
        return true;
    }
  }
  beginRangeSelectionSession(source, e, handle, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const blockInfo = source.anchorBlock;
    const baseBlocksSnapshot = ((_a = options == null ? void 0 : options.baseSelectedBlocks) != null ? _a : this.getPassiveSelectionBlocks()).map((block) => ({ ...block }));
    const pointerType = e.pointerType || null;
    const skipLongPress = (options == null ? void 0 : options.skipLongPress) === true;
    const config = resolveRangeSelectConfig(
      (_d = (_c = (_b = this.deps).getMouseRangeSelectLongPressMs) == null ? void 0 : _c.call(_b)) != null ? _d : MOUSE_RANGE_SELECT_LONG_PRESS_MS,
      () => this.getTouchRangeSelectLongPressMs()
    );
    const waitForMouseLongPress = !platform.isMobile && !skipLongPress;
    const initialRangeSelectState = createInitialRangeSelectionState({
      blockInfo,
      sourceSelection: source,
      baseSelectedBlocks: baseBlocksSnapshot,
      initialOperation: options == null ? void 0 : options.initialOperation,
      guardDeps: options == null ? void 0 : options.guardDeps,
      sourceKind: options == null ? void 0 : options.sourceKind,
      anchorBoundary: options == null ? void 0 : options.anchorBoundary,
      initialBoundary: options == null ? void 0 : options.initialBoundary,
      resolveBoundary: options == null ? void 0 : options.resolveBoundary,
      doc: this.view.state.doc,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      pointerType
    });
    if (!initialRangeSelectState)
      return;
    initialRangeSelectState.longPressReady = skipLongPress;
    const allowSecondaryDrag = (options == null ? void 0 : options.allowSecondaryDrag) !== false;
    const canDelayDesktopHandleDrag = !platform.isMobile && skipLongPress && allowSecondaryDrag && ((_e = options == null ? void 0 : options.sourceKind) != null ? _e : "handle") === "handle";
    let dragTimeoutId = null;
    if (platform.isMobile && allowSecondaryDrag) {
      dragTimeoutId = window.setTimeout(() => {
        const state = this.rangePointerSession;
        if (!state)
          return;
        if (state.pipelineStarted && this.pipelineState.type !== "selecting")
          return;
        if (state.pointerId !== e.pointerId)
          return;
        state.dragReady = true;
        this.activateMouseRangeSelectInterception(state);
      }, (_h = (_g = (_f = this.deps).getMobileDragLongPressMs) == null ? void 0 : _g.call(_f)) != null ? _h : MOBILE_DRAG_LONG_PRESS_MS);
    } else if (canDelayDesktopHandleDrag) {
      initialRangeSelectState.dragReady = false;
      dragTimeoutId = window.setTimeout(() => {
        const state = this.rangePointerSession;
        if (!state)
          return;
        if (state.pipelineStarted && this.pipelineState.type !== "selecting")
          return;
        if (state.pointerId !== e.pointerId)
          return;
        state.dragReady = true;
      }, config.longPressMs);
    }
    if (!waitForMouseLongPress) {
      e.preventDefault();
      e.stopPropagation();
      this.pointer.tryCapturePointer(e);
    }
    const timeoutId = skipLongPress ? null : window.setTimeout(() => {
      const state = this.rangePointerSession;
      if (!state)
        return;
      if (state.pipelineStarted && this.pipelineState.type !== "selecting")
        return;
      if (state.pointerId !== e.pointerId)
        return;
      state.longPressReady = true;
      this.startRangeSelectionPipeline(state);
      this.activateMouseRangeSelectInterception(state);
      this.updateMouseRangeSelectionFromLine(state, state.currentLineNumber);
    }, config.longPressMs);
    initialRangeSelectState.isIntercepting = !waitForMouseLongPress;
    initialRangeSelectState.timeoutId = timeoutId;
    initialRangeSelectState.dragTimeoutId = dragTimeoutId;
    this.rangePointerSession = initialRangeSelectState;
    this.pointer.attachPointerListeners();
    if (!(options == null ? void 0 : options.deferPipelineStart)) {
      this.startRangeSelectionPipeline(initialRangeSelectState);
    }
    if (skipLongPress) {
      initialRangeSelectState.longPressReady = true;
      this.startRangeSelectionPipeline(initialRangeSelectState);
      this.updateMouseRangeSelectionFromLine(initialRangeSelectState, initialRangeSelectState.currentLineNumber);
    }
    if (platform.isMobile && ((_i = this.rangePointerSession) == null ? void 0 : _i.isIntercepting)) {
      this.mobile.applyInputGuardMode(INPUT_GUARD_MOBILE_SELECTION_GESTURE, e.target);
    }
  }
  startRangeSelectionPipeline(state) {
    if (state.pipelineStarted)
      return;
    state.pipelineStarted = true;
    this.enterRangeSelection({
      sourceSelection: state.sourceSelection,
      anchorBoundary: state.anchorBoundary,
      initialBoundary: state.initialBoundary,
      selectedBlocks: state.baseSelectedBlocks,
      operation: state.initialOperation,
      guardDeps: state.guardDeps,
      resolveBoundary: state.resolveBoundary
    });
  }
  enterRangeSelection(options) {
    this.pipeline.enter({
      type: "selection_start",
      seed: {
        selection: options.sourceSelection,
        range: {
          type: "range",
          doc: this.view.state.doc,
          anchorBoundary: options.anchorBoundary,
          initialBoundary: options.initialBoundary,
          selectedBlocks: options.selectedBlocks,
          operation: options.operation,
          resolveBoundary: options.resolveBoundary
        }
      },
      guardDeps: options.guardDeps
    });
  }
  activateMouseRangeSelectInterception(state) {
    this.pointer.tryCapturePointerById(state.pointerId);
    if (state.isIntercepting)
      return;
    state.isIntercepting = true;
  }
  beginPressPendingDrag(source, e, options) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const pointerType = e.pointerType || null;
    const sourceKind = (_a = options == null ? void 0 : options.sourceKind) != null ? _a : "handle";
    if (!this.canStartDragForPointer(sourceKind))
      return;
    e.preventDefault();
    e.stopPropagation();
    this.pointer.tryCapturePointer(e);
    if (platform.isMobile) {
      this.mobile.applyInputGuardMode(INPUT_GUARD_MOBILE_DRAG_GESTURE, e.target);
    }
    const sessionId = this.createSessionId();
    const skipLongPress = (options == null ? void 0 : options.skipLongPress) === true || (options == null ? void 0 : options.longPressMs) === 0;
    const longPressMs = (_h = options == null ? void 0 : options.longPressMs) != null ? _h : platform.isMobile ? (_d = (_c = (_b = this.deps).getMobileDragLongPressMs) == null ? void 0 : _c.call(_b)) != null ? _d : MOBILE_DRAG_LONG_PRESS_MS : (_g = (_f = (_e = this.deps).getMouseRangeSelectLongPressMs) == null ? void 0 : _f.call(_e)) != null ? _g : MOUSE_RANGE_SELECT_LONG_PRESS_MS;
    const timeoutId = skipLongPress ? null : window.setTimeout(() => this.markPressReady(sessionId, e.pointerId, pointerType), longPressMs);
    const startMoveThresholdPx = skipLongPress ? 2 : platform.isMobile ? 8 : 4;
    const cancelMoveThresholdPx = platform.isMobile || skipLongPress ? MOBILE_DRAG_CANCEL_MOVE_THRESHOLD_PX : Number.POSITIVE_INFINITY;
    this.pressSession = {
      sessionId,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      latestX: e.clientX,
      latestY: e.clientY,
      pointerType,
      longPressReady: skipLongPress,
      timeoutId,
      cancelMoveThresholdPx,
      startMoveThresholdPx,
      shortPressSelectionToggle: options == null ? void 0 : options.shortPressSelectionToggle
    };
    this.pointer.attachPointerListeners();
    this.pipeline.enter({
      type: "hold_start",
      sessionId,
      target: { selection: source, source: sourceKind },
      guardDeps: this.guardDepsForSource(sourceKind),
      pointerType
    });
    if (skipLongPress) {
      this.pipeline.enter({ type: "hold_ready", sessionId, pointerType });
    }
  }
  markPressReady(sessionId, pointerId, pointerType) {
    const state = this.pressSession;
    if (!state || state.sessionId !== sessionId || state.pointerId !== pointerId)
      return;
    state.longPressReady = true;
    this.pipeline.enter({ type: "hold_ready", sessionId, pointerType });
  }
  clearPointerPressState() {
    const state = this.pressSession;
    if (!state)
      return;
    if (state.timeoutId !== null)
      window.clearTimeout(state.timeoutId);
    this.pressSession = null;
  }
  clearMouseRangeSelectState(options) {
    const hadState = this.rangePointerSession !== null;
    const state = this.rangePointerSession;
    if (state) {
      if (state.timeoutId !== null)
        window.clearTimeout(state.timeoutId);
      if (state.dragTimeoutId !== null)
        window.clearTimeout(state.dragTimeoutId);
      this.rangePointerSession = null;
    }
    if (hadState && !(options == null ? void 0 : options.preserveVisual)) {
      this.refreshRangeSelectionVisual();
    }
  }
  enterDraggingState(source, pointerId, clientX, clientY, pointerType, sourceKind = "handle") {
    var _a, _b;
    if (!this.canStartDragForPointer(sourceKind)) {
      this.resetInteractionSession({ shouldFinishDragSession: false, shouldHideDropPreview: true });
      return;
    }
    const sessionId = this.pipelineState.type === "ready_to_drag" ? this.pipelineState.hold.sessionId : (_b = (_a = this.pressSession) == null ? void 0 : _a.sessionId) != null ? _b : this.createSessionId();
    if (this.pipelineState.type !== "ready_to_drag") {
      this.pipeline.enter({
        type: "hold_start",
        sessionId,
        target: { selection: source, source: sourceKind },
        guardDeps: this.guardDepsForSource(sourceKind),
        pointerType
      });
      this.pipeline.enter({ type: "hold_ready", sessionId, pointerType });
    }
    const drop2 = this.deps.resolveDropSnapshotAtPoint(clientX, clientY, source, pointerType);
    this.pipeline.enter({ type: "drag_start", sessionId, drop: drop2, pointerType });
    if (this.pipelineState.type !== "dragging")
      return;
    if (platform.isMobile) {
      this.mobile.applyInputGuardMode(INPUT_GUARD_MOBILE_DRAG_GESTURE);
      this.mobile.triggerMobileHapticFeedback();
    }
    this.pointer.tryCapturePointerById(pointerId);
    this.pointer.attachPointerListeners();
    this.activeDragPointer = { clientX, clientY, pointerType };
    this.activeDragSession = {
      sessionId,
      pointerId,
      pointerType,
      autoScrollFrameId: null
    };
    this.deps.beginPointerDragSession(source);
    this.clearPointerPressState();
  }
  handlePointerMove(e) {
    handlePointerMove(this, e);
  }
  cancelDragAutoScroll(dragState) {
    if (dragState.autoScrollFrameId === null)
      return;
    window.cancelAnimationFrame(dragState.autoScrollFrameId);
    dragState.autoScrollFrameId = null;
  }
  updateActiveDragPointer(clientX, clientY, pointerType) {
    this.activeDragPointer = { clientX, clientY, pointerType };
  }
  getActiveDragPointer() {
    return this.activeDragPointer;
  }
  resolveActiveDragDropSnapshot(selection) {
    if (!this.activeDragPointer)
      return { target: null, rejectReason: "no_target" };
    return this.deps.resolveDropSnapshotAtPoint(
      this.activeDragPointer.clientX,
      this.activeDragPointer.clientY,
      selection,
      this.activeDragPointer.pointerType
    );
  }
  previewActiveDrag(params) {
    const drag = this.activeDragSession;
    if (!drag || this.pipelineState.type !== "dragging" || drag.pointerId !== params.pointerId)
      return [];
    drag.pointerType = params.pointerType || drag.pointerType;
    return this.pipeline.enter({
      type: "drag_over",
      sessionId: drag.sessionId,
      drop: params.drop,
      pointerType: params.pointerType
    }).outputs;
  }
  commitActiveDrag(params) {
    const drag = this.activeDragSession;
    if (!drag || this.pipelineState.type !== "dragging" || drag.pointerId !== params.pointerId)
      return [];
    return this.pipeline.enter({
      type: "drop",
      sessionId: drag.sessionId,
      resolution: params.resolved,
      pointerType: params.pointerType
    }).outputs;
  }
  cancelActiveDrag(params) {
    const drag = this.activeDragSession;
    if (!drag || this.pipelineState.type !== "dragging" || drag.pointerId !== params.pointerId)
      return [];
    return this.pipeline.enter({
      type: "cancel",
      sessionId: drag.sessionId,
      reason: params.reason,
      pointerType: params.pointerType
    }).outputs;
  }
  buildActiveDragCommand(selection) {
    if (!this.activeDragPointer) {
      return { type: "cancel", drop: { target: null, rejectReason: "no_target" }, reason: "no_target" };
    }
    return this.deps.buildBlockCommandAtPoint(
      selection,
      this.activeDragPointer.clientX,
      this.activeDragPointer.clientY,
      this.activeDragPointer.pointerType
    );
  }
  applyPipelineOutputs(outputs) {
    for (const output of outputs) {
      switch (output.type) {
        case "drag_over":
          this.deps.pipelineOutputExecutor.showDropPreview(output.selection, output.drop, output.pointerType);
          break;
        case "dropped":
          break;
        case "cancelled":
          this.deps.pipelineOutputExecutor.hideDropPreview();
          break;
        case "command_ready":
          this.deps.pipelineOutputExecutor.applyCommand(output.command);
          break;
        case "lifecycle":
          this.deps.pipelineOutputExecutor.emitLifecycle(output.event);
          break;
        case "state_changed":
          break;
        case "selection_changed":
          if (output.selection) {
            this.refreshRangeSelectionVisual();
          } else {
            this.rangeVisual.clear();
          }
          break;
        case "drag_source_changed":
          if (output.selection) {
            this.rangeVisual.renderDragSourceSelection(output.selection);
          } else {
            this.rangeVisual.clear();
          }
          break;
        case "terminal":
          break;
      }
    }
  }
  updateMouseRangeSelection(state, target) {
    this.pipeline.enter({
      type: "selection_change",
      boundary: target,
      docLines: this.view.state.doc.lines,
      resolveBoundary: createRangeSelectionBoundaryResolver(this.view.state)
    });
    state.currentLineNumber = target.representativeLineNumber;
    state.selectionGestureStarted = true;
  }
  updateMouseRangeSelectionFromLine(state, lineNumber) {
    const doc = this.view.state.doc;
    const clampedLine = Math.max(1, Math.min(doc.lines, lineNumber));
    const boundary = createRangeSelectionBoundaryResolver(this.view.state)(clampedLine);
    this.updateMouseRangeSelection(state, {
      ...boundary,
      representativeLineNumber: clampedLine
    });
  }
  retargetMobileRangeSelection(e) {
    const state = this.rangePointerSession;
    if (this.pipelineState.type !== "selecting" || !state || !platform.isMobile)
      return;
    state.pointerId = e.pointerId;
    state.startX = e.clientX;
    state.startY = e.clientY;
    state.latestX = e.clientX;
    state.latestY = e.clientY;
    state.longPressReady = true;
    state.dragReady = false;
    state.isIntercepting = true;
    if (state.dragTimeoutId !== null) {
      window.clearTimeout(state.dragTimeoutId);
      state.dragTimeoutId = null;
    }
    e.preventDefault();
    e.stopPropagation();
    this.pointer.tryCapturePointer(e);
  }
  tryStartPassiveSelectionDrag(e, target) {
    if (!this.isMultiLineSelectionEnabled())
      return false;
    if (e.button !== 0)
      return false;
    const passiveSource = this.getPassiveSelectionSource();
    if (!passiveSource)
      return false;
    const pointerType = e.pointerType || null;
    if (!this.isSelectionDragGripHit(target, e.clientX, e.clientY, pointerType)) {
      return false;
    }
    const selectedHandleHit = !!target.closest(`.${RANGE_SELECTED_HANDLE_CLASS}`);
    const sourceKind = selectedHandleHit ? "handle" : "selected_text";
    if (!this.canStartDragForPointer(sourceKind))
      return false;
    if (this.pipelineState.type === "selecting" && this.rangePointerSession) {
      this.retargetMobileRangeSelection(e);
    } else {
      this.beginPressPendingDrag(passiveSource, e, selectedHandleHit ? { sourceKind } : { sourceKind });
    }
    return true;
  }
  clearRangeSelection() {
    if (this.pipelineState.type === "selecting") {
      this.pipeline.enter({ type: "selection_clear" });
      return;
    }
    if ((this.pipelineState.type === "holding" || this.pipelineState.type === "ready_to_drag") && this.pipelineState.hold.retainedSelection) {
      this.pipeline.enter({ type: "destroy" });
      return;
    }
    this.rangeVisual.clear();
  }
  handleMobileDragAvailabilityChanged(mobileDragAvailable) {
    if (mobileDragAvailable) {
      return;
    }
    const previousState = this.pipelineState;
    this.pipeline.enter({ type: "guard_unavailable", guardId: GUARD_MOBILE_TEXT_DRAG });
    if (previousState.type !== "idle" && this.pipelineState.type === "idle") {
      this.clearTechnicalSessions();
      this.pointer.detachPointerListeners();
      this.pointer.releasePointerCapture();
      this.mobile.clearInputGuardMode();
    }
  }
  getPassiveSelectionSource() {
    const request = this.buildPassiveSelectionRequest();
    if (!request)
      return null;
    return this.resolveBlockSelection(request);
  }
  getPassiveSelectionBlocks() {
    const selection = this.getPassivePipelineSelection();
    return selection ? selectedBlocksFromSelection2(selection) : [];
  }
  buildPassiveSelectionRequest() {
    const selection = this.getPassivePipelineSelection();
    if (!selection)
      return null;
    return {
      kind: "selection",
      doc: this.view.state.doc,
      blocks: selectedBlocksFromSelection2(selection),
      templateBlock: selection.anchorBlock
    };
  }
  resolveBlockSelection(request) {
    return this.deps.resolveBlockSelection(request);
  }
  refreshRangeSelectionVisual() {
    renderRangeSelectionPreview(this.pipelineState, this.rangeVisual);
  }
  finishRangeSelectionSession() {
    this.clearMouseRangeSelectState({ preserveVisual: true });
    this.pointer.detachPointerListeners();
    this.pointer.releasePointerCapture();
    this.pipeline.enter({ type: "selection_finish" });
    if (platform.isMobile && this.pipelineState.type === "selecting") {
      this.mobile.applyInputGuardMode(INPUT_GUARD_MOBILE_SELECTION_PASSIVE);
    } else {
      this.mobile.clearInputGuardMode();
    }
  }
  toggleRangeSelectionTarget(source) {
    return this.toggleRangeSelectionBoundary(
      buildRangeSelectionBoundaryFromBlock(this.view.state.doc, source.anchorBlock)
    );
  }
  toggleRangeSelectionTargetsBetween(_startX, startY, _endX, endY, toggledKeys) {
    const startBoundary = resolveRangeSelectionBoundaryAtVerticalPosition(this.view, startY);
    const endBoundary = resolveRangeSelectionBoundaryAtVerticalPosition(this.view, endY);
    if (!startBoundary || !endBoundary)
      return false;
    const resolveBoundary = createRangeSelectionBoundaryResolver(this.view.state);
    let didToggle = false;
    for (const block of collectSelectedBlocksBetween(
      this.view.state.doc.lines,
      startBoundary.startLineNumber,
      startBoundary.endLineNumber,
      endBoundary.startLineNumber,
      endBoundary.endLineNumber,
      resolveBoundary
    )) {
      const key = keyForSelectedBlockRange(block);
      if (toggledKeys.has(key))
        continue;
      if (!this.toggleRangeSelectionBoundary(boundaryFromSelectedBlockRange(block), resolveBoundary))
        continue;
      toggledKeys.add(key);
      didToggle = true;
    }
    return didToggle;
  }
  toggleRangeSelectionBoundary(boundary, resolveBoundary = createRangeSelectionBoundaryResolver(this.view.state)) {
    const selection = this.getToggleBaseSelection();
    if (!selection)
      return false;
    this.enterRangeSelection({
      sourceSelection: selection.selection,
      anchorBoundary: boundary,
      selectedBlocks: selectedBlocksFromSelection2(selection.selection),
      guardDeps: selection.guardDeps,
      resolveBoundary
    });
    this.pipeline.enter({ type: "selection_finish" });
    return true;
  }
  finishPointerPressSession() {
    this.clearPointerPressState();
    this.pointer.detachPointerListeners();
    this.pointer.releasePointerCapture();
    this.mobile.clearInputGuardMode();
  }
  getToggleBaseSelection() {
    var _a;
    if (this.pipelineState.type === "holding" || this.pipelineState.type === "ready_to_drag") {
      return (_a = this.pipelineState.hold.retainedSelection) != null ? _a : null;
    }
    if (this.pipelineState.type === "selecting" && this.pipelineState.selection.phase === "passive") {
      return this.pipelineState.selection;
    }
    return null;
  }
  getPassivePipelineSelection() {
    return this.pipelineState.type === "selecting" && this.pipelineState.selection.phase === "passive" ? this.pipelineState.selection.selection : null;
  }
  hasPassivePipelineSelection() {
    if (this.pipelineState.type === "selecting" && this.pipelineState.selection.phase === "passive")
      return true;
    return (this.pipelineState.type === "holding" || this.pipelineState.type === "ready_to_drag") && !!this.pipelineState.hold.retainedSelection;
  }
  buildPassiveSelectionView() {
    const selection = this.getPassivePipelineSelection();
    if (!selection)
      return null;
    return {
      blocks: selectedBlocksFromSelection2(selection),
      templateBlock: selection.anchorBlock
    };
  }
  isSelectionDragGripHit(target, clientX, clientY, pointerType) {
    return isRangeSelectionGripHit({
      selection: this.buildPassiveSelectionView(),
      target,
      clientX,
      clientY,
      pointerType,
      resolveAnchorSpan: (range) => this.rangeVisual.resolveRangeAnchorSpan(range),
      isWithinMobileDragHotzoneBand: () => true
    });
  }
  cleanupAfterPointerDrag(options) {
    this.resetInteractionSession(options);
  }
  openBlockTypeMenuForTap(selection, e) {
    var _a, _b;
    const pointerType = e && "pointerType" in e ? e.pointerType || null : null;
    this.resetInteractionSession({
      shouldFinishDragSession: false,
      shouldHideDropPreview: false,
      cancelReason: null,
      pointerType
    });
    if (!platform.isMobile) {
      (_b = (_a = this.deps).openBlockTypeMenu) == null ? void 0 : _b.call(_a, selection.anchorBlock, e);
      return;
    }
    window.setTimeout(() => {
      var _a2, _b2;
      (_b2 = (_a2 = this.deps).openBlockTypeMenu) == null ? void 0 : _b2.call(_a2, selection.anchorBlock, null);
    }, 0);
  }
  handlePointerUp(e) {
    handlePointerUp(this, e);
  }
  handlePointerCancel(e) {
    handlePointerCancel(this, e);
  }
  handleLostPointerCapture(e) {
    readPointerInput("lost_capture", e);
    if (!this.hasActivePointerSession())
      return;
    this.abortForSessionInterrupted(e.pointerType || null);
  }
  handleWindowBlur() {
    readFocusInput("blur", new FocusEvent("blur"));
    if (!this.hasActivePointerSession())
      return;
    this.abortForSessionInterrupted(null);
  }
  handleDocumentVisibilityChange(e = new Event("visibilitychange")) {
    const input = readVisibilityInput(e);
    if (input.visibilityState !== "hidden")
      return;
    if (!this.hasActivePointerSession())
      return;
    this.abortForSessionInterrupted(null);
  }
  handleWindowKeyDown(e) {
    const input = readKeyboardInput("keydown", e);
    if (input.key !== "Escape")
      return;
    if (!this.clearRangeSelectionForEscape())
      return;
    e.preventDefault();
    e.stopPropagation();
  }
  clearRangeSelectionForEscape() {
    if (this.pipelineState.type === "selecting") {
      this.clearMouseRangeSelectState();
      this.pointer.detachPointerListeners();
      this.pointer.releasePointerCapture();
      this.mobile.clearInputGuardMode();
      this.clearRangeSelection();
      return true;
    }
    return false;
  }
  abortForGestureCancel(cancelReason, pointerType) {
    this.resetInteractionSession({
      shouldFinishDragSession: false,
      shouldHideDropPreview: false,
      cancelReason,
      pointerType
    });
  }
  abortForSessionInterrupted(pointerType) {
    this.resetInteractionSession({
      shouldFinishDragSession: true,
      shouldHideDropPreview: true,
      cancelReason: "session_interrupted",
      pointerType
    });
  }
  handleEnterMobileSelectionMode(e) {
    this.executeMobileSelectionModeDecision(
      decideEnterMobileSelectionMode(this.buildPointerSelectionContext(), e),
      e
    );
  }
  executeMobileSelectionModeDecision(decision, e) {
    if (decision.type === "none")
      return;
    if (decision.markEventHandled && e instanceof CustomEvent) {
      e.detail.handled = true;
    }
    this.enterRangeSelection({
      sourceSelection: decision.selection,
      anchorBoundary: buildRangeSelectionBoundaryFromBlock(this.view.state.doc, decision.blockInfo),
      selectedBlocks: [],
      operation: "add",
      guardDeps: [GUARD_MOBILE_TEXT_DRAG]
    });
    this.pipeline.enter({ type: "selection_finish" });
    this.mobile.applyInputGuardMode(INPUT_GUARD_MOBILE_SELECTION_PASSIVE, e.target);
  }
  handleDocumentFocusIn(e) {
    readFocusInput("focusin", e);
    if (!this.shouldSuppressTextInputForActiveInteraction())
      return;
    this.mobile.suppressMobileKeyboard(e.target);
  }
  handleTouchMove(e) {
    if (!this.shouldSuppressScrollForActiveInteraction())
      return;
    if (e.cancelable) {
      e.preventDefault();
    }
  }
  hasActivePointerSession() {
    if (this.activeDragSession || this.pressSession)
      return true;
    if (this.pipelineState.type === "selecting") {
      return !!this.rangePointerSession;
    }
    return false;
  }
  shouldSuppressTextInputForActiveInteraction() {
    var _a;
    if (this.pipelineState.type === "dragging")
      return true;
    if (this.pipelineState.type === "selecting")
      return true;
    if ((_a = this.rangePointerSession) == null ? void 0 : _a.isIntercepting)
      return true;
    if (this.pressSession)
      return true;
    return false;
  }
  shouldSuppressScrollForActiveInteraction() {
    var _a, _b;
    if (this.pipelineState.type === "dragging")
      return true;
    if (this.pipelineState.type === "selecting") {
      return !!((_a = this.rangePointerSession) == null ? void 0 : _a.isIntercepting);
    }
    if ((_b = this.rangePointerSession) == null ? void 0 : _b.isIntercepting)
      return true;
    if (this.pressSession)
      return true;
    return false;
  }
  resetInteractionSession(options) {
    var _a, _b, _c, _d;
    const hadDrag = !!this.activeDragSession || this.pipelineState.type === "dragging";
    const activeDrag = this.activeDragSession;
    if (activeDrag)
      this.cancelDragAutoScroll(activeDrag);
    const shouldFinishDragSession = (_a = options == null ? void 0 : options.shouldFinishDragSession) != null ? _a : hadDrag;
    const shouldHideDropPreview = (_b = options == null ? void 0 : options.shouldHideDropPreview) != null ? _b : hadDrag;
    const cancelReason = (_c = options == null ? void 0 : options.cancelReason) != null ? _c : null;
    const pointerType = (_d = options == null ? void 0 : options.pointerType) != null ? _d : null;
    this.clearTechnicalSessions();
    this.pointer.detachPointerListeners();
    this.pointer.releasePointerCapture();
    this.mobile.clearInputGuardMode();
    if (cancelReason) {
      this.pipeline.enter({ type: "cancel", reason: cancelReason, pointerType });
    } else if (this.pipelineState.type !== "idle") {
      this.pipeline.enter({ type: "destroy" });
    }
    if (shouldHideDropPreview) {
      this.deps.pipelineOutputExecutor.hideDropPreview();
    }
    if (hadDrag && shouldFinishDragSession) {
      this.deps.finishDragSession();
    }
    this.activeDragPointer = null;
  }
  isMultiLineSelectionEnabled() {
    if (!this.deps.isMultiLineSelectionEnabled)
      return true;
    return this.deps.isMultiLineSelectionEnabled();
  }
  canStartDragForPointer(source = "handle") {
    var _a, _b;
    if (source === "command")
      return true;
    if (!platform.isMobile)
      return true;
    return ((_b = (_a = this.deps).isMobileDragModeEnabled) == null ? void 0 : _b.call(_a)) === true;
  }
  isMobileDragModeActiveForPointer() {
    var _a, _b;
    if (!platform.isMobile)
      return false;
    return ((_b = (_a = this.deps).isMobileDragModeEnabled) == null ? void 0 : _b.call(_a)) === true;
  }
  getTouchRangeSelectLongPressMs() {
    var _a, _b;
    return clampTouchRangeSelectLongPressMs((_b = (_a = this.deps).getMultiLineSelectionLongPressMs) == null ? void 0 : _b.call(_a));
  }
  clearTechnicalSessions() {
    var _a, _b, _c, _d;
    this.clearPointerPressState();
    if (((_a = this.rangePointerSession) == null ? void 0 : _a.timeoutId) !== null && ((_b = this.rangePointerSession) == null ? void 0 : _b.timeoutId) !== void 0) {
      window.clearTimeout(this.rangePointerSession.timeoutId);
    }
    if (((_c = this.rangePointerSession) == null ? void 0 : _c.dragTimeoutId) !== null && ((_d = this.rangePointerSession) == null ? void 0 : _d.dragTimeoutId) !== void 0) {
      window.clearTimeout(this.rangePointerSession.dragTimeoutId);
    }
    this.rangePointerSession = null;
    this.activeDragSession = null;
  }
  guardDepsForSource(source) {
    if ((source === "text" || source === "selected_text") && platform.isMobile) {
      return [GUARD_MOBILE_TEXT_DRAG];
    }
    return [];
  }
  createSessionId() {
    return `drag-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
};
function selectedBlocksFromSelection2(selection) {
  return selection.ranges.map((range) => ({
    startLineNumber: range.startLine + 1,
    endLineNumber: range.endLine + 1
  }));
}
function boundaryFromSelectedBlockRange(block) {
  return {
    startLineNumber: block.startLineNumber,
    endLineNumber: block.endLineNumber,
    representativeLineNumber: block.endLineNumber
  };
}
function keyForSelectedBlockRange(block) {
  return `${block.startLineNumber}:${block.endLineNumber}`;
}

// src/shared/constants.ts
var DOC_SEMANTIC_IDLE_SMALL_MS = 500;
var DOC_SEMANTIC_IDLE_MEDIUM_MS = 900;
var DOC_SEMANTIC_IDLE_LARGE_MS = 1400;
var HANDLE_INTERACTION_ZONE_PX = 64;
var DEFAULT_HANDLE_SIZE_PX = 20;
var MIN_HANDLE_SIZE_PX = 10;
var MAX_HANDLE_SIZE_PX = 40;
var HANDLE_CORE_SIZE_RATIO = 0.5;
var GRIP_DOTS_CORE_SIZE_RATIO = 0.8;
var handleConfig = {
  sizePx: DEFAULT_HANDLE_SIZE_PX,
  horizontalOffsetPx: -8
};
function setHandleSizePx(size) {
  handleConfig.sizePx = Math.max(MIN_HANDLE_SIZE_PX, Math.min(MAX_HANDLE_SIZE_PX, size));
}
function setHandleHorizontalOffsetPx(offsetPx) {
  handleConfig.horizontalOffsetPx = Number.isFinite(offsetPx) ? offsetPx : 0;
}

// src/platform/codemirror/extension/semantic-refresh-scheduler.ts
var SemanticRefreshScheduler = class {
  constructor(view, deps) {
    this.view = view;
    this.deps = deps;
    this.semanticRefreshTimerHandle = null;
    this.pendingSemanticRefresh = false;
  }
  get isPending() {
    return this.pendingSemanticRefresh;
  }
  markSemanticRefreshPending() {
    this.pendingSemanticRefresh = true;
    if (this.semanticRefreshTimerHandle !== null) {
      window.clearTimeout(this.semanticRefreshTimerHandle);
      this.semanticRefreshTimerHandle = null;
    }
    const delayMs = this.getSemanticRefreshDelayMs(this.view.state.doc.lines);
    this.semanticRefreshTimerHandle = window.setTimeout(() => {
      this.semanticRefreshTimerHandle = null;
      if (activeDocument.body.classList.contains(DRAGGING_BODY_CLASS)) {
        this.markSemanticRefreshPending();
        return;
      }
      if (!this.pendingSemanticRefresh)
        return;
      this.deps.performRefresh();
    }, delayMs);
  }
  ensureSemanticReadyForInteraction() {
    if (!this.pendingSemanticRefresh)
      return;
    this.deps.performRefresh();
  }
  clearPendingSemanticRefresh() {
    this.pendingSemanticRefresh = false;
    if (this.semanticRefreshTimerHandle !== null) {
      window.clearTimeout(this.semanticRefreshTimerHandle);
      this.semanticRefreshTimerHandle = null;
    }
  }
  destroy() {
    this.clearPendingSemanticRefresh();
  }
  getSemanticRefreshDelayMs(docLines) {
    if (docLines > 12e4)
      return DOC_SEMANTIC_IDLE_LARGE_MS;
    if (docLines > 3e4)
      return DOC_SEMANTIC_IDLE_MEDIUM_MS;
    return DOC_SEMANTIC_IDLE_SMALL_MS;
  }
};

// src/platform/codemirror/extension/drag-perf-session-manager.ts
var import_state5 = require("@codemirror/state");

// src/platform/codemirror/extension/perf-time.ts
function nowMs3() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now();
  }
  return Date.now();
}

// src/platform/codemirror/extension/perf-session.ts
function createDurationStore() {
  return {
    resolve_total: [],
    vertical: [],
    container: [],
    list_target: [],
    in_place: [],
    geometry: [],
    line_map_get: [],
    line_map_build: [],
    detect_block_uncached: [],
    drop_indicator_resolve: []
  };
}
function createCounterStore() {
  return {
    drop_indicator_frames: 0,
    drop_indicator_skipped_frames: 0,
    drop_indicator_reused_frames: 0,
    resolve_cache_hits: 0,
    resolve_cache_misses: 0,
    list_ancestor_scan_steps: 0,
    list_parent_scan_steps: 0,
    highlight_scan_lines: 0
  };
}
function percentile(values, p) {
  if (values.length === 0)
    return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.max(0, Math.min(sorted.length - 1, Math.ceil(p / 100 * sorted.length) - 1));
  return Number(sorted[index].toFixed(3));
}
function summarize(values) {
  if (values.length === 0) {
    return { count: 0, p50: 0, p95: 0, max: 0 };
  }
  return {
    count: values.length,
    p50: percentile(values, 50),
    p95: percentile(values, 95),
    max: Number(Math.max(...values).toFixed(3))
  };
}
function serializeSnapshot(snapshot) {
  return JSON.stringify(snapshot, null, 2);
}
function createDragPerfSession(input) {
  const startedAtMs = nowMs3();
  const durations = createDurationStore();
  const counters = createCounterStore();
  const id = `drag-${Math.random().toString(36).slice(2, 10)}`;
  return {
    id,
    docLines: input.docLines,
    startedAtMs,
    recordDuration(key, durationMs) {
      if (!isFinite(durationMs) || durationMs < 0)
        return;
      durations[key].push(durationMs);
    },
    incrementCounter(key, delta = 1) {
      counters[key] += delta;
    },
    snapshot() {
      const resolveHits = counters.resolve_cache_hits;
      const resolveMisses = counters.resolve_cache_misses;
      const resolveTotal = resolveHits + resolveMisses;
      return {
        id,
        docLines: input.docLines,
        durationMs: Number((nowMs3() - startedAtMs).toFixed(3)),
        durations: {
          resolve_total: summarize(durations.resolve_total),
          vertical: summarize(durations.vertical),
          container: summarize(durations.container),
          list_target: summarize(durations.list_target),
          in_place: summarize(durations.in_place),
          geometry: summarize(durations.geometry),
          line_map_get: summarize(durations.line_map_get),
          line_map_build: summarize(durations.line_map_build),
          detect_block_uncached: summarize(durations.detect_block_uncached),
          drop_indicator_resolve: summarize(durations.drop_indicator_resolve)
        },
        counters: { ...counters },
        cacheHitRates: {
          resolveValidatedDropTarget: resolveTotal > 0 ? Number((resolveHits / resolveTotal).toFixed(3)) : 0
        }
      };
    }
  };
}
function logDragPerfSession(session, reason) {
  if (!session)
    return;
  const snapshot = session.snapshot();
  console.debug("[Dragger][Perf]", reason, serializeSnapshot(snapshot));
}

// src/platform/codemirror/extension/drag-perf-session-manager.ts
var DragPerfSessionManager = class {
  constructor(view) {
    this.view = view;
    this.session = null;
  }
  ensure() {
    if (this.session)
      return;
    this.session = createDragPerfSession({
      docLines: this.view.state.doc.lines
    });
    setLineMapPerfRecorder((key, durationMs) => {
      var _a;
      (_a = this.session) == null ? void 0 : _a.recordDuration(key, durationMs);
    });
    setDetectBlockPerfRecorder((key, durationMs) => {
      var _a;
      (_a = this.session) == null ? void 0 : _a.recordDuration(key, durationMs);
    });
    getLineMap(this.view.state, { tabSize: this.view.state.facet(import_state5.EditorState.tabSize) });
  }
  flush(reason) {
    if (this.session) {
      logDragPerfSession(this.session, reason);
      this.session = null;
    }
    setLineMapPerfRecorder(null);
    setDetectBlockPerfRecorder(null);
  }
  recordDuration(key, durationMs) {
    var _a;
    (_a = this.session) == null ? void 0 : _a.recordDuration(key, durationMs);
  }
  incrementCounter(key, delta = 1) {
    var _a;
    (_a = this.session) == null ? void 0 : _a.incrementCounter(key, delta);
  }
};

// src/platform/codemirror/extension/editor-context.ts
var import_state8 = require("@codemirror/state");

// src/domain/markdown/line-parsing-service.ts
function createLineParsingContext(tabSize) {
  const normalizedTabSize = normalizeTabSize(tabSize);
  const getTabSize = () => normalizedTabSize;
  const parseLine = (line) => parseLineWithQuote2(line, getTabSize());
  return {
    getTabSize,
    parseLine,
    getIndentUnitWidth: (sample) => getIndentUnitWidth(sample, getTabSize()),
    getIndentUnitWidthForDoc: (doc) => getIndentUnitWidthForDoc(doc, parseLine, getTabSize()),
    buildIndentStringFromSample: (sample, width) => buildIndentStringFromSample(sample, width, getTabSize())
  };
}

// src/domain/mutation/text-mutation-policy.ts
function buildInsertTextForDrop(params) {
  const {
    lineParsing,
    doc,
    sourceBlock,
    targetLineNumber,
    sourceContent,
    listIntent
  } = params;
  const getListContextForDoc = (activeDoc, lineNumber) => getListContext(activeDoc, lineNumber, lineParsing.parseLine);
  return buildInsertText({
    sourceBlockType: sourceBlock.type,
    sourceContent,
    adjustListToTargetContext: (content) => adjustListToTargetContext({
      doc,
      sourceContent: content,
      targetLineNumber,
      parseLineWithQuote: lineParsing.parseLine,
      getIndentUnitWidth: lineParsing.getIndentUnitWidth,
      buildIndentStringFromSample: lineParsing.buildIndentStringFromSample,
      getListContext: getListContextForDoc,
      listIntent
    })
  });
}

// src/domain/rules/container-policy-service.ts
function resolveDropRuleAtInsertion(state, sourceBlock, targetLineNumber, options) {
  var _a;
  const lineMap = (_a = options.lineMap) != null ? _a : getLineMap(state, { tabSize: options.tabSize });
  return resolveDropRuleContextAtInsertion(
    state,
    sourceBlock,
    targetLineNumber,
    void 0,
    { lineMap, tabSize: options.tabSize }
  );
}

// src/platform/codemirror/selection/block-selection-resolver.ts
var import_state6 = require("@codemirror/state");

// src/platform/obsidian/editor-view.ts
function getCodeMirrorView(markdownView) {
  var _a;
  const maybeView = (_a = markdownView.editor) == null ? void 0 : _a.cm;
  return maybeView != null ? maybeView : null;
}

// src/platform/obsidian/editor-markdown-view.ts
function resolveMarkdownViewForEditor(app, editorView) {
  var _a;
  for (const leaf of app.workspace.getLeavesOfType("markdown")) {
    const view = leaf.view;
    if (((_a = view.getViewType) == null ? void 0 : _a.call(view)) !== "markdown")
      continue;
    const markdownView = view;
    if (getCodeMirrorView(markdownView) === editorView) {
      return markdownView;
    }
  }
  return null;
}

// src/platform/obsidian/editor-fold.ts
var TEXT_NODE = 3;
function isElementLike(value) {
  if (!value || typeof value !== "object")
    return false;
  return typeof value.closest === "function";
}
function resolveVisibleLineElement(view, lineNumber) {
  var _a, _b, _c;
  try {
    const line = view.state.doc.line(lineNumber);
    const block = typeof view.lineBlockAt === "function" ? view.lineBlockAt(line.from) : null;
    if (block && typeof block.from === "number" && block.from !== line.from) {
      return null;
    }
    const domAtPos = view.domAtPos(line.from);
    const rawNode = domAtPos.node;
    const base = rawNode.nodeType === TEXT_NODE ? (_a = rawNode.parentElement) != null ? _a : null : rawNode;
    if (!isElementLike(base))
      return null;
    return (_c = (_b = base.closest) == null ? void 0 : _b.call(base, ".cm-line")) != null ? _c : null;
  } catch (e) {
    return null;
  }
}
function isEditorLineCollapsed(view, lineNumber) {
  var _a, _b, _c;
  const lineEl = resolveVisibleLineElement(view, lineNumber);
  if (!lineEl)
    return false;
  if (((_a = lineEl.classList) == null ? void 0 : _a.contains("is-collapsed")) || ((_b = lineEl.classList) == null ? void 0 : _b.contains("cm-folded"))) {
    return true;
  }
  return !!((_c = lineEl.querySelector) == null ? void 0 : _c.call(
    lineEl,
    ".cm-foldPlaceholder, .cm-fold-indicator.is-collapsed, .collapse-indicator.is-collapsed"
  ));
}
function restoreSelectionsAndScroll(editor, selections, scroll) {
  editor.setSelections(selections);
  editor.scrollTo(scroll.left, scroll.top);
}
function toggleLineFolds(params) {
  const { app, view, targetLineNumbers } = params;
  if (targetLineNumbers.length === 0)
    return;
  const markdownView = resolveMarkdownViewForEditor(app, view);
  const editor = markdownView == null ? void 0 : markdownView.editor;
  if (!editor)
    return;
  const selections = editor.listSelections();
  const scroll = editor.getScrollInfo();
  const hadFocus = editor.hasFocus();
  try {
    for (const targetLineNumber of [...new Set(targetLineNumbers)].sort((a, b) => b - a)) {
      if (targetLineNumber < 1 || targetLineNumber > editor.lineCount())
        continue;
      if (isEditorLineCollapsed(view, targetLineNumber))
        continue;
      editor.setCursor({ line: targetLineNumber - 1, ch: 0 });
      editor.exec("toggleFold");
    }
  } finally {
    restoreSelectionsAndScroll(editor, selections, scroll);
    if (!hadFocus && editor.hasFocus()) {
      editor.blur();
    }
  }
}

// src/platform/codemirror/selection/block-selection-resolver.ts
function makeBlockSelection(block, ranges) {
  return createBlockSelection(block, ranges);
}
function buildSingleBlockSelectionRanges(block) {
  return [{ startLine: block.startLine, endLine: block.endLine }];
}
function buildAnchorBlockFromRange(doc, startLineNumber, endLineNumber, template) {
  const safeStart = clampLineNumber(doc.lines, startLineNumber);
  const safeEnd = Math.max(safeStart, clampLineNumber(doc.lines, endLineNumber));
  const startLine = doc.line(safeStart);
  const endLine = doc.line(safeEnd);
  return {
    type: template.type,
    startLine: safeStart - 1,
    endLine: safeEnd - 1,
    from: startLine.from,
    to: endLine.to,
    indentLevel: template.indentLevel,
    content: doc.sliceString(startLine.from, endLine.to)
  };
}
function buildSelectionFromSelectedBlocks(doc, blocks, template) {
  const normalizedBlocks = mergeSelectedBlocks(doc.lines, blocks);
  if (normalizedBlocks.length === 0)
    return null;
  const segments = groupSelectedBlocksIntoSegments(doc.lines, normalizedBlocks);
  const firstSegment = segments[0];
  if (!firstSegment)
    return null;
  return makeBlockSelection(
    buildAnchorBlockFromRange(
      doc,
      firstSegment.startLineNumber,
      firstSegment.endLineNumber,
      template
    ),
    segments.map((segment) => ({
      startLine: segment.startLineNumber - 1,
      endLine: segment.endLineNumber - 1
    }))
  );
}
var BlockSelectionResolver = class {
  constructor(view) {
    this.view = view;
  }
  resolveSelection(request) {
    if (request.kind === "selection") {
      return buildSelectionFromSelectedBlocks(request.doc, request.blocks, request.templateBlock);
    }
    const block = this.resolveRequestedBlock(request);
    if (!block)
      return null;
    return makeBlockSelection(block, buildSingleBlockSelectionRanges(block));
  }
  getBlockInfoForHandle(handle) {
    const startLine = resolveLineNumberFromBlockStartAttribute(this.view, handle);
    if (startLine === null)
      return null;
    return this.getDraggableBlockAtLine(startLine);
  }
  getDraggableBlockAtLine(lineNumber) {
    const block = detectBlock(this.view.state, lineNumber, {
      tabSize: this.view.state.facet(import_state6.EditorState.tabSize)
    });
    if (!block)
      return null;
    return this.expandHeadingBlockIfCollapsed(block);
  }
  getLineNumberAtVerticalPosition(clientY, contentRect) {
    const activeContentRect = contentRect != null ? contentRect : this.view.contentDOM.getBoundingClientRect();
    if (clientY < activeContentRect.top || clientY > activeContentRect.bottom)
      return null;
    try {
      const lineBlock = this.view.lineBlockAtHeight(clientY - this.view.documentTop);
      return resolveLineNumberFromPos(this.view, lineBlock.from);
    } catch (e) {
      return null;
    }
  }
  getDraggableBlockAtVerticalPosition(clientY, contentRect) {
    const lineNumber = this.getLineNumberAtVerticalPosition(clientY, contentRect);
    if (lineNumber === null)
      return null;
    return this.getDraggableBlockAtLine(lineNumber);
  }
  getDraggableBlockAtPoint(clientX, clientY) {
    const embedAtPoint = this.getEmbedElementAtPoint(clientX, clientY);
    if (embedAtPoint) {
      const embedBlock = this.getBlockInfoForEmbed(embedAtPoint);
      if (embedBlock)
        return embedBlock;
    }
    const renderedLineNumber = getRenderedMainLineNumberAtPoint(this.view, clientX, clientY);
    if (renderedLineNumber !== null) {
      const renderedBlock = this.getDraggableBlockAtLine(renderedLineNumber);
      if (renderedBlock)
        return renderedBlock;
    }
    const contentRect = this.view.contentDOM.getBoundingClientRect();
    if (clientY < contentRect.top || clientY > contentRect.bottom)
      return null;
    const lineNumber = resolveLineNumberAtCoords(this.view, clientX, clientY, contentRect);
    if (lineNumber === null)
      return null;
    return this.getDraggableBlockAtLine(lineNumber);
  }
  getBlockInfoForEmbed(embedEl) {
    const candidates = this.collectEmbedProbeCandidates(embedEl);
    for (const candidate of candidates) {
      const lineNumber = resolveLineNumberFromDomNodes(this.view, [candidate]);
      if (lineNumber === null)
        continue;
      const block = this.getDraggableBlockAtLine(lineNumber);
      if (block)
        return block;
    }
    return null;
  }
  resolveRequestedBlock(request) {
    switch (request.kind) {
      case "handle":
        return this.getBlockInfoForHandle(request.handle);
      case "point":
        return this.getDraggableBlockAtPoint(request.clientX, request.clientY);
      case "block":
        return request.block;
      default:
        return null;
    }
  }
  collectEmbedProbeCandidates(embedEl) {
    const seen = /* @__PURE__ */ new Set();
    const candidates = [];
    const push = (el) => {
      if (!el)
        return;
      if (seen.has(el))
        return;
      seen.add(el);
      candidates.push(el);
    };
    push(embedEl.closest(EMBED_ROOT_SELECTOR));
    push(embedEl.closest(CODEMIRROR_LINE_SELECTOR));
    push(embedEl);
    let current = embedEl.parentElement;
    while (current) {
      push(current);
      if (current === this.view.dom)
        break;
      current = current.parentElement;
    }
    return candidates;
  }
  getEmbedElementAtPoint(clientX, clientY) {
    return findEmbedElementAtPoint(this.view, clientX, clientY, {
      requireDirectWithinRoot: true,
      normalizeToEmbedRoot: true
    });
  }
  expandHeadingBlockIfCollapsed(block) {
    if (block.type !== "heading" /* Heading */)
      return block;
    const headingLineNumber = block.startLine + 1;
    if (!isEditorLineCollapsed(this.view, headingLineNumber))
      return block;
    const range = getHeadingSectionRange(this.view.state.doc, headingLineNumber);
    if (!range || range.endLine <= headingLineNumber)
      return block;
    const endLineObj = this.view.state.doc.line(range.endLine);
    let content = "";
    for (let i = headingLineNumber; i <= range.endLine; i++) {
      content += this.view.state.doc.line(i).text;
      if (i < range.endLine)
        content += "\n";
    }
    return {
      ...block,
      endLine: range.endLine - 1,
      to: endLineObj.to,
      content
    };
  }
};

// src/platform/codemirror/selection/geometry.ts
var import_state7 = require("@codemirror/state");
function getAdjustedTargetLocation(view, lineNumber, options) {
  const doc = view.state.doc;
  if (lineNumber < 1 || lineNumber > doc.lines) {
    return { lineNumber: clampTargetLineNumber(doc.lines, lineNumber), blockAdjusted: false };
  }
  const block = detectBlock(view.state, lineNumber, { tabSize: view.state.facet(import_state7.EditorState.tabSize) });
  if (!block)
    return { lineNumber, blockAdjusted: false };
  const isAtomicBlock = block.type === "code-block" /* CodeBlock */ || block.type === "table" /* Table */ || block.type === "math-block" /* MathBlock */;
  const isCollapsedBlock = block.startLine !== block.endLine && isEditorLineCollapsed(view, block.startLine + 1);
  if (!isAtomicBlock && !isCollapsedBlock) {
    return { lineNumber, blockAdjusted: false };
  }
  if (typeof (options == null ? void 0 : options.clientY) === "number") {
    const blockStartLine = doc.line(block.startLine + 1);
    const blockEndLine = doc.line(block.endLine + 1);
    const startCoords = getCoordsAtPos(view, blockStartLine.from);
    const endCoords = getCoordsAtPos(view, blockEndLine.to);
    if (startCoords && endCoords) {
      const midPoint = (startCoords.top + endCoords.bottom) / 2;
      const insertAfter = options.clientY > midPoint;
      const adjustedLineNumber2 = insertAfter ? block.endLine + 2 : block.startLine + 1;
      return {
        lineNumber: clampTargetLineNumber(doc.lines, adjustedLineNumber2),
        blockAdjusted: true
      };
    }
  }
  const lineIndex = lineNumber - 1;
  const midLine = (block.startLine + block.endLine) / 2;
  const adjustedLineNumber = lineIndex <= midLine ? block.startLine + 1 : block.endLine + 2;
  return {
    lineNumber: clampTargetLineNumber(doc.lines, adjustedLineNumber),
    blockAdjusted: true
  };
}
function getLineRect2(view, lineNumber) {
  return getLineRect(view, lineNumber);
}
function getInsertionAnchorY2(view, lineNumber) {
  return getInsertionAnchorY(view, lineNumber);
}
function getLineIndentPosByWidth2(view, lineParsing, lineNumber, targetIndentWidth) {
  return getLineIndentPosByWidth(
    view,
    lineNumber,
    targetIndentWidth,
    lineParsing.getTabSize()
  );
}
function getBlockRect2(view, startLineNumber, endLineNumber) {
  return getBlockRect(view, startLineNumber, endLineNumber);
}

// src/platform/codemirror/extension/editor-context.ts
function createEditorContext(view) {
  const tabSize = view.state.facet(import_state8.EditorState.tabSize);
  const selection = new BlockSelectionResolver(view);
  const lineParsing = createLineParsingContext(tabSize);
  const getListContextForDoc = (doc, lineNumber) => getListContext(doc, lineNumber, lineParsing.parseLine);
  return {
    view,
    tabSize,
    selection,
    parseLineWithQuote: lineParsing.parseLine,
    getAdjustedTargetLocation: (lineNumber, options) => getAdjustedTargetLocation(view, lineNumber, options),
    resolveDropRuleAtInsertion: (sourceBlock, targetLineNumber, options) => resolveDropRuleAtInsertion(view.state, sourceBlock, targetLineNumber, {
      ...options,
      tabSize
    }),
    getListContext: getListContextForDoc,
    getIndentUnitWidth: lineParsing.getIndentUnitWidth,
    getIndentUnitWidthForDoc: lineParsing.getIndentUnitWidthForDoc,
    getBlockInfoForEmbed: (element) => selection.getBlockInfoForEmbed(element),
    getLineRect: (lineNumber) => getLineRect2(view, lineNumber),
    getInsertionAnchorY: (lineNumber) => getInsertionAnchorY2(view, lineNumber),
    getLineIndentPosByWidth: (lineNumber, width) => getLineIndentPosByWidth2(view, lineParsing, lineNumber, width),
    getBlockRect: (startLineNumber, endLineNumber) => getBlockRect2(view, startLineNumber, endLineNumber),
    buildInsertText: (doc, sourceBlock, targetLineNumber, sourceContent, listIntent) => buildInsertTextForDrop({
      lineParsing,
      doc,
      sourceBlock,
      targetLineNumber,
      sourceContent,
      listIntent
    })
  };
}

// src/platform/obsidian/editor-document-key.ts
function resolveEditorDocumentKey(app, editorView) {
  var _a;
  const markdownView = resolveMarkdownViewForEditor(app, editorView);
  const path = (_a = markdownView == null ? void 0 : markdownView.file) == null ? void 0 : _a.path;
  if (typeof path === "string" && path.length > 0)
    return path;
  return null;
}

// src/platform/obsidian/block-fold-state.ts
function createBlockFoldStateManager(params) {
  const { app, parseLineWithQuote: parseLineWithQuote3 } = params;
  return {
    capture(view, sourceBlock) {
      if (!isBlockFoldStateSupported(sourceBlock))
        return null;
      const startLineNumber = sourceBlock.startLine + 1;
      const endLineNumber = sourceBlock.endLine + 1;
      const collapsedRelativeLineOffsets = [];
      for (let lineNumber = startLineNumber; lineNumber <= endLineNumber; lineNumber++) {
        const lineText = view.state.doc.line(lineNumber).text;
        if (!isFoldableLineWithinBlock(sourceBlock, lineText, parseLineWithQuote3))
          continue;
        if (!isEditorLineCollapsed(view, lineNumber))
          continue;
        collapsedRelativeLineOffsets.push(lineNumber - startLineNumber);
      }
      if (collapsedRelativeLineOffsets.length === 0)
        return null;
      return { collapsedRelativeLineOffsets };
    },
    restore(view, targetStartLineNumber, foldState) {
      var _a;
      const collapsedRelativeLineOffsets = (_a = foldState == null ? void 0 : foldState.collapsedRelativeLineOffsets) != null ? _a : [];
      if (collapsedRelativeLineOffsets.length === 0)
        return;
      toggleLineFolds({
        app,
        view,
        targetLineNumbers: collapsedRelativeLineOffsets.map(
          (relativeOffset) => targetStartLineNumber + relativeOffset
        )
      });
    }
  };
}
function isBlockFoldStateSupported(sourceBlock) {
  return sourceBlock.type === "list-item" /* ListItem */ || sourceBlock.type === "heading" /* Heading */;
}
function isFoldableLineWithinBlock(sourceBlock, lineText, parseLineWithQuote3) {
  if (sourceBlock.type === "list-item" /* ListItem */) {
    return parseLineWithQuote3(lineText).isListItem;
  }
  if (sourceBlock.type === "heading" /* Heading */) {
    return getHeadingLevel(lineText) !== null;
  }
  return false;
}

// src/platform/codemirror/extension/editor-dom-sync.ts
function ensureEditorRootClasses(view) {
  view.dom.classList.add(ROOT_EDITOR_CLASS);
  view.contentDOM.classList.add(MAIN_EDITOR_CONTENT_CLASS);
}
function clearEditorRootClasses(view) {
  view.dom.classList.remove(ROOT_EDITOR_CLASS);
  view.contentDOM.classList.remove(MAIN_EDITOR_CONTENT_CLASS);
}
function syncBlockSelectionStyleAttr(view, style) {
  view.dom.setAttribute(DND_DRAG_SOURCE_STYLE_ATTR, style);
}
function syncBlockSelectionHighlightAttr(view, enabled) {
  view.dom.setAttribute(DND_DRAG_SOURCE_HIGHLIGHT_ATTR, enabled ? "on" : "off");
}

// src/platform/codemirror/extension/editor-update.ts
function applyViewUpdate(update, deps) {
  if (update.viewportChanged) {
    deps.refreshDecorationsAndEmbeds();
    deps.pipelineAdapter.refreshSelectionVisual();
    deps.handleVisibility.refreshGrabVisualState();
    const activeHandle2 = deps.handleVisibility.getActiveHandle();
    if (activeHandle2 && !activeHandle2.isConnected) {
      deps.handleVisibility.setActiveVisibleHandle(null);
      deps.reResolveActiveHandle();
    }
    return;
  }
  if (update.docChanged) {
    deps.semanticRefreshScheduler.markSemanticRefreshPending();
  } else if (update.geometryChanged) {
    deps.refreshDecorationsAndEmbeds();
  }
  if (update.docChanged || update.geometryChanged || update.selectionSet) {
    deps.pipelineAdapter.refreshSelectionVisual();
    deps.handleVisibility.refreshGrabVisualState();
  }
  const activeHandle = deps.handleVisibility.getActiveHandle();
  if (activeHandle && !activeHandle.isConnected) {
    deps.handleVisibility.setActiveVisibleHandle(null);
    deps.reResolveActiveHandle();
  }
}

// src/platform/codemirror/extension/global-pointermove-router.ts
var clients2 = /* @__PURE__ */ new Set();
var clientsByRoot = /* @__PURE__ */ new Map();
var activeClient2 = null;
var isListening = false;
function containsPoint(view, clientX, clientY) {
  const rect = view.dom.getBoundingClientRect();
  return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
}
function resolveClientFromTarget(target) {
  if (!(target instanceof Node))
    return null;
  let current = target;
  while (current) {
    if (current.instanceOf(HTMLElement)) {
      const client = clientsByRoot.get(current);
      if (client)
        return client;
    }
    current = current.parentNode;
  }
  return null;
}
function resolveClientFromPoint(clientX, clientY) {
  for (const client of clients2) {
    if (containsPoint(client.view, clientX, clientY)) {
      return client;
    }
  }
  return null;
}
function resolveClient(event) {
  var _a;
  return (_a = resolveClientFromTarget(event.target)) != null ? _a : resolveClientFromPoint(event.clientX, event.clientY);
}
function handleDocumentPointerMove(event) {
  const nextClient = resolveClient(event);
  if (activeClient2 && activeClient2 !== nextClient) {
    activeClient2.clearPointerHover();
  }
  if (!nextClient) {
    activeClient2 = null;
    return;
  }
  activeClient2 = nextClient;
  nextClient.onPointerMove(event);
}
function ensureListening() {
  if (isListening)
    return;
  activeDocument.addEventListener("pointermove", handleDocumentPointerMove, { passive: true });
  isListening = true;
}
function stopListeningIfIdle() {
  if (!isListening || clients2.size > 0)
    return;
  activeDocument.removeEventListener("pointermove", handleDocumentPointerMove);
  isListening = false;
}
function registerGlobalPointerMoveClient(client) {
  const root = client.view.dom;
  clients2.add(client);
  clientsByRoot.set(root, client);
  ensureListening();
}
function unregisterGlobalPointerMoveClient(client) {
  clients2.delete(client);
  clientsByRoot.delete(client.view.dom);
  if (activeClient2 === client) {
    client.clearPointerHover();
    activeClient2 = null;
  }
  stopListeningIfIdle();
}

// src/platform/codemirror/extension/editor-lifecycle.ts
function startViewLifecycle(deps) {
  deps.pipelineAdapter.attach();
  registerGlobalPointerMoveClient(deps.pointerMoveClient);
  window.addEventListener("dnd:settings-updated", deps.onSettingsUpdated);
  scheduleFenceScanWarmup(deps.view);
}
function destroyViewLifecycle(deps) {
  deps.semanticRefreshScheduler.destroy();
  unregisterGlobalPointerMoveClient(deps.pointerMoveClient);
  window.removeEventListener("dnd:settings-updated", deps.onSettingsUpdated);
  deps.pipelineAdapter.destroy();
}
function scheduleFenceScanWarmup(view) {
  const warmupFenceScan = () => prewarmFenceScan(view.state.doc);
  const requestIdle = window.requestIdleCallback;
  if (typeof requestIdle === "function") {
    requestIdle(warmupFenceScan, { timeout: 1e3 });
  } else {
    window.setTimeout(warmupFenceScan, 100);
  }
}

// src/platform/codemirror/extension/gutter.ts
var HANDLE_GUTTER_PLACEMENT_BY_SIDE = {
  left: {
    adjacentAnchor: "nextSibling",
    getReferenceNode: (anchor) => anchor
  },
  right: {
    adjacentAnchor: "previousSibling",
    getReferenceNode: (anchor) => anchor.nextSibling
  }
};
function isVisible(el) {
  const style = getComputedStyle(el);
  return style.display !== "none" && style.visibility !== "hidden";
}
function getHandleGutter(view) {
  var _a;
  const candidates = Array.from(view.dom.querySelectorAll(`.${HANDLE_GUTTER_CLASS}`));
  return (_a = candidates.find((candidate) => candidate.closest(CODEMIRROR_EDITOR_SELECTOR) === view.dom && isVisible(candidate))) != null ? _a : null;
}
function placeHandleGutterForConfiguredSide(view, side) {
  const gutter2 = getHandleGutter(view);
  if (!gutter2)
    return;
  const parent = view.contentDOM.parentElement;
  if (!parent)
    return;
  const anchor = view.contentDOM;
  const placement = HANDLE_GUTTER_PLACEMENT_BY_SIDE[side];
  if (gutter2.parentElement === parent && gutter2[placement.adjacentAnchor] === anchor)
    return;
  parent.insertBefore(gutter2, placement.getReferenceNode(anchor));
}

// src/platform/codemirror/extension/hover-pointer-snapshot.ts
function createHoverPointerSnapshot(view, clientX, clientY, gutterSide) {
  const contentRect = view.contentDOM.getBoundingClientRect();
  const withinVerticalBounds = clientY >= contentRect.top && clientY <= contentRect.bottom;
  const withinContent = withinVerticalBounds && clientX >= contentRect.left && clientX <= contentRect.right;
  const anchorX = gutterSide === "right" ? contentRect.right : contentRect.left;
  const withinHandleInteractionZone = withinVerticalBounds && clientX >= anchorX - HANDLE_INTERACTION_ZONE_PX && clientX <= anchorX + HANDLE_INTERACTION_ZONE_PX;
  return {
    clientX,
    clientY,
    contentRect,
    gutterSide,
    withinContent,
    withinHandleInteractionZone,
    withinHoverActivationZone: withinContent || withinHandleInteractionZone
  };
}

// src/plugin/block-type-menu.ts
var import_obsidian2 = require("obsidian");

// src/plugin/block-type-conversion.ts
var import_state9 = require("@codemirror/state");

// src/domain/block/block-type-conversion.ts
function planBlockTypeConversionChanges(doc, startLineNumber, endLineNumber, conversion) {
  var _a;
  const fencedBlock = readFencedBlockContentLines(doc, startLineNumber, endLineNumber);
  if (isFencedBlockConversion(conversion)) {
    if ((fencedBlock == null ? void 0 : fencedBlock.type) === conversion.type)
      return [];
    return planFencedBlockChanges(doc, startLineNumber, endLineNumber, conversion, (_a = fencedBlock == null ? void 0 : fencedBlock.contentLines) != null ? _a : null);
  }
  if (fencedBlock) {
    return planFencedBlockUnwrapChanges(doc, startLineNumber, endLineNumber, fencedBlock.contentLines, conversion);
  }
  const changes = [];
  for (let lineNumber = startLineNumber; lineNumber <= endLineNumber; lineNumber++) {
    const line = doc.line(lineNumber);
    const next = convertLine(line.text, conversion, lineNumber - startLineNumber + 1);
    if (next === line.text)
      continue;
    changes.push({ from: line.from, to: line.to, insert: next });
  }
  return changes;
}
function isFencedBlockConversion(conversion) {
  return conversion.type === "code-block" /* CodeBlock */ || conversion.type === "math-block" /* MathBlock */;
}
function readFencedBlockContentLines(doc, startLineNumber, endLineNumber) {
  const startText = doc.line(startLineNumber).text;
  const endText = doc.line(endLineNumber).text;
  if (isCodeFenceLine(startText) && startLineNumber < endLineNumber && isCodeFenceLine(endText)) {
    return {
      type: "code-block" /* CodeBlock */,
      contentLines: readInnerLines(doc, startLineNumber, endLineNumber)
    };
  }
  if (isMathFenceLine(startText)) {
    if (startLineNumber === endLineNumber) {
      const content = readSingleLineMathContent(startText);
      if (content !== null) {
        return { type: "math-block" /* MathBlock */, contentLines: [content] };
      }
    }
    if (startLineNumber < endLineNumber && isMathFenceLine(endText)) {
      return {
        type: "math-block" /* MathBlock */,
        contentLines: readInnerLines(doc, startLineNumber, endLineNumber)
      };
    }
  }
  return null;
}
function readInnerLines(doc, startLineNumber, endLineNumber) {
  return Array.from({ length: endLineNumber - startLineNumber - 1 }, (_, index) => doc.line(startLineNumber + index + 1).text);
}
function readSingleLineMathContent(text) {
  const trimmed = text.trim();
  if (!trimmed.startsWith("$$") || !trimmed.endsWith("$$") || trimmed.length < 4)
    return null;
  return trimmed.slice(2, -2).trim();
}
function planFencedBlockUnwrapChanges(doc, startLineNumber, endLineNumber, contentLines, conversion) {
  const startLine = doc.line(startLineNumber);
  const endLine = doc.line(endLineNumber);
  const insert = contentLines.map((line, index) => convertFencedContentLine(line, conversion, index + 1)).join("\n");
  return [{ from: startLine.from, to: endLine.to, insert }];
}
function planFencedBlockChanges(doc, startLineNumber, endLineNumber, conversion, existingContentLines) {
  const startLine = doc.line(startLineNumber);
  const endLine = doc.line(endLineNumber);
  const content = existingContentLines ? existingContentLines.join("\n") : Array.from({ length: endLineNumber - startLineNumber + 1 }, (_, index) => {
    const line = doc.line(startLineNumber + index);
    return stripKnownBlockPrefix(line.text).body;
  }).join("\n");
  const fence = conversion.type === "code-block" /* CodeBlock */ ? "```" : "$$";
  return [{ from: startLine.from, to: endLine.to, insert: `${fence}
${content}
${fence}` }];
}
function convertLine(text, conversion, ordinal) {
  const { indentRaw, body } = stripKnownBlockPrefix(text);
  return formatConvertedLine(indentRaw, body, conversion, ordinal);
}
function convertFencedContentLine(text, conversion, ordinal) {
  const { indentRaw, body } = splitIndent(text);
  return formatConvertedLine(indentRaw, body, conversion, ordinal);
}
function formatConvertedLine(indentRaw, body, conversion, ordinal) {
  switch (conversion.type) {
    case "paragraph" /* Paragraph */:
      return `${indentRaw}${body}`;
    case "heading" /* Heading */:
      return `${indentRaw}${"#".repeat(conversion.level)} ${body}`;
    case "list-item" /* ListItem */:
      return `${indentRaw}${formatListMarker(conversion.markerType, ordinal)}${body}`;
    case "blockquote" /* Blockquote */:
      return `> ${indentRaw}${body}`;
  }
}
function formatListMarker(markerType, ordinal) {
  switch (markerType) {
    case "ordered":
      return `${ordinal}. `;
    case "task":
      return "- [ ] ";
    case "unordered":
      return "- ";
  }
}
function stripKnownBlockPrefix(text) {
  var _a;
  const quoteMatch = text.match(/^(\s*>\s?)*/);
  const quotePrefix = (_a = quoteMatch == null ? void 0 : quoteMatch[0]) != null ? _a : "";
  const withoutQuote = text.slice(quotePrefix.length);
  const { indentRaw, body } = splitIndent(withoutQuote);
  let rest = body;
  rest = rest.replace(/^#{1,6}\s+/, "");
  const listMatch = rest.match(/^((?:[-*+]\s\[[ xX]\]\s+)|(?:[-*+]\s+)|(?:\d+[.)]\s+))/);
  if (listMatch) {
    rest = rest.slice(listMatch[0].length);
  }
  return { indentRaw, body: rest };
}
function splitIndent(text) {
  var _a;
  const indentMatch = text.match(/^(\s*)/);
  const indentRaw = (_a = indentMatch == null ? void 0 : indentMatch[0]) != null ? _a : "";
  return { indentRaw, body: text.slice(indentRaw.length) };
}

// src/domain/command/delete-command.ts
function createDeleteCommand(selection) {
  return { type: "delete", selection };
}

// src/plugin/block-type-conversion.ts
var PARAGRAPH_BLOCK_TYPE_OPTION = {
  target: { type: "paragraph" /* Paragraph */ },
  label: "Paragraph",
  icon: "pilcrow"
};
var HEADING_BLOCK_TYPE_OPTIONS = [
  { target: { type: "heading" /* Heading */, level: 1 }, label: "Heading 1", icon: "heading-1" },
  { target: { type: "heading" /* Heading */, level: 2 }, label: "Heading 2", icon: "heading-2" },
  { target: { type: "heading" /* Heading */, level: 3 }, label: "Heading 3", icon: "heading-3" },
  { target: { type: "heading" /* Heading */, level: 4 }, label: "Heading 4", icon: "heading-4" },
  { target: { type: "heading" /* Heading */, level: 5 }, label: "Heading 5", icon: "heading-5" },
  { target: { type: "heading" /* Heading */, level: 6 }, label: "Heading 6", icon: "heading-6" }
];
var LIST_BLOCK_TYPE_OPTIONS = [
  { target: { type: "list-item" /* ListItem */, markerType: "unordered" }, label: "Bullet list", icon: "list" },
  { target: { type: "list-item" /* ListItem */, markerType: "ordered" }, label: "Numbered list", icon: "list-ordered" },
  { target: { type: "list-item" /* ListItem */, markerType: "task" }, label: "Task list", icon: "list-checks" }
];
var SIMPLE_BLOCK_TYPE_OPTIONS = [
  { target: { type: "blockquote" /* Blockquote */ }, label: "Quote", icon: "quote" },
  { target: { type: "code-block" /* CodeBlock */ }, label: "Code block", icon: "code" },
  { target: { type: "math-block" /* MathBlock */ }, label: "Math block", icon: "sigma" }
];
function convertCurrentBlockType(view, conversion, pos) {
  const block = getBlockAtPos(view, pos);
  if (!block)
    return false;
  const changes = planBlockTypeConversionChanges(view.state.doc, block.startLine + 1, block.endLine + 1, conversion);
  if (changes.length === 0)
    return false;
  view.dispatch({
    changes,
    scrollIntoView: false
  });
  return true;
}
function deleteCurrentBlock(view) {
  const block = getBlockAtPos(view);
  if (!block)
    return false;
  const transaction = planBlockCommandTransaction({
    doc: view.state.doc,
    command: createDeleteCommand(createBlockSelection(block, [{
      startLine: block.startLine,
      endLine: block.endLine
    }]))
  });
  if (isCommandReject(transaction))
    return false;
  applyBlockTransaction(view, transaction, { anchor: block.from });
  return true;
}
async function copyCurrentBlock(view) {
  const text = getBlockAtPosText(view);
  if (text === null)
    return false;
  return writeClipboardText(text);
}
async function cutCurrentBlock(view) {
  const copied = await copyCurrentBlock(view);
  if (!copied)
    return false;
  return deleteCurrentBlock(view);
}
function getBlockAtPosText(view) {
  const block = getBlockAtPos(view);
  if (!block)
    return null;
  return view.state.doc.sliceString(block.from, block.to);
}
async function writeClipboardText(text) {
  if (typeof navigator === "undefined" || !navigator.clipboard)
    return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}
function getBlockAtPos(view, pos) {
  const head = pos != null ? pos : view.state.selection.main.head;
  const lineNumber = view.state.doc.lineAt(head).number;
  const block = detectBlock(view.state, lineNumber, { tabSize: view.state.facet(import_state9.EditorState.tabSize) });
  if (block)
    return block;
  const line = view.state.doc.line(lineNumber);
  return {
    type: "paragraph" /* Paragraph */,
    startLine: lineNumber - 1,
    endLine: lineNumber - 1,
    from: line.from,
    to: line.to,
    indentLevel: 0,
    content: line.text
  };
}
function isCommandReject(value) {
  return typeof value === "object" && value !== null && "type" in value && value.type === "reject";
}

// src/plugin/block-type-menu.ts
var openChildMenu = null;
var openChildTrigger = null;
var openChildMenuEl = null;
var closeChildMenuTimer = null;
var menuCursorPos = 0;
function openBlockTypeMenu(view, event) {
  const cursorHead = view.state.selection.main.head;
  menuCursorPos = cursorHead;
  const menu = new import_obsidian2.Menu();
  const nestedGroups = [
    {
      label: "Heading",
      icon: "heading",
      options: HEADING_BLOCK_TYPE_OPTIONS
    },
    {
      label: "List",
      icon: "list",
      options: LIST_BLOCK_TYPE_OPTIONS
    }
  ];
  menu.onHide(() => {
    window.setTimeout(() => hideOpenChildMenu(), 150);
  });
  addConversionItem(menu, view, PARAGRAPH_BLOCK_TYPE_OPTION, cursorHead);
  for (const group of nestedGroups) {
    addNestedConversionMenu(menu, view, group);
  }
  for (const option of SIMPLE_BLOCK_TYPE_OPTIONS) {
    addConversionItem(menu, view, option, cursorHead);
  }
  menu.addSeparator();
  addActionRow(menu, [
    {
      label: "Copy block",
      icon: "copy",
      run: () => copyCurrentBlock(view),
      failureNotice: "Unable to copy block."
    },
    {
      label: "Cut block",
      icon: "scissors",
      run: () => cutCurrentBlock(view),
      failureNotice: "Unable to cut block."
    },
    {
      label: "Delete block",
      icon: "trash-2",
      warning: true,
      run: () => deleteCurrentBlock(view),
      failureNotice: "Unable to delete block."
    }
  ]);
  showMenu(menu, view, event, nestedGroups);
}
function addConversionItem(menu, view, option, pos) {
  menu.addItem((item) => item.setTitle(option.label).setIcon(option.icon).onClick(() => {
    if (!convertCurrentBlockType(view, option.target, pos)) {
      new import_obsidian2.Notice("Unable to change block type.");
      return;
    }
    menu.hide();
  }));
}
function addNestedConversionMenu(menu, view, group) {
  menu.addItem((item) => {
    item.setTitle(createSubmenuTitle(group.label)).setIcon(group.icon);
    if (platform.isMobile) {
      item.onClick(() => {
        openNestedMenuPage(menu, view, group);
      });
    }
  });
}
function createSubmenuTitle(labelText) {
  const fragment = activeDocument.createDocumentFragment();
  const title = activeDocument.createElement("span");
  title.className = "dnd-block-type-submenu-title";
  const label = activeDocument.createElement("span");
  label.className = "dnd-block-type-submenu-title-label";
  label.textContent = labelText;
  const chevron = activeDocument.createElement("span");
  chevron.className = "dnd-block-type-submenu-title-chevron";
  chevron.setAttribute("aria-hidden", "true");
  (0, import_obsidian2.setIcon)(chevron, "chevron-right");
  title.append(label, chevron);
  fragment.appendChild(title);
  return fragment;
}
function openNestedMenuPopover(view, group, trigger) {
  cancelChildMenuClose();
  if (openChildMenu && openChildTrigger === trigger)
    return;
  hideOpenChildMenu();
  const child = createNestedConversionMenu(view, group.options, menuCursorPos);
  openChildMenu = child;
  openChildTrigger = trigger;
  child.onHide(() => {
    if (openChildMenu === child) {
      clearOpenChildMenuState();
    }
  });
  openChildMenuEl = showNestedMenu(child, trigger);
  activeDocument.addEventListener("pointermove", closeChildMenuWhenPointerLeaves, true);
}
function openNestedMenuPage(parent, view, group) {
  parent.hide();
  const child = new import_obsidian2.Menu();
  child.addItem((item) => item.setTitle("Back").setIcon("chevron-left").onClick(() => {
    child.hide();
    openBlockTypeMenu(view, null);
  }));
  for (const option of group.options) {
    addConversionItem(child, view, option, menuCursorPos);
  }
  showMenu(child, view, null);
}
function createNestedConversionMenu(view, options, pos) {
  const child = new import_obsidian2.Menu();
  for (const option of options) {
    addConversionItem(child, view, option, pos);
  }
  return child;
}
function addActionRow(menu, actions) {
  for (const action of actions) {
    addActionItem(menu, action);
  }
}
function addActionItem(menu, action) {
  menu.addItem((item) => {
    item.setTitle(action.label).setIcon(action.icon).onClick(() => {
      void executeMenuAction(menu, action);
    });
    if (action.warning) {
      item.setWarning(true);
    }
  });
}
async function executeMenuAction(menu, action) {
  const ok = await action.run();
  if (!ok) {
    new import_obsidian2.Notice(action.failureNotice);
    return;
  }
  menu.hide();
}
function prepareNestedMenuItems(view, groups) {
  var _a, _b;
  const isMobile = platform.isMobile;
  const items = activeDocument.querySelectorAll(".menu-item");
  for (const item of Array.from(items)) {
    const title = (_b = (_a = item.querySelector(".dnd-block-type-submenu-title-label")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim();
    const group = groups.find((candidate) => candidate.label === title);
    if (!group)
      continue;
    if (isMobile || item.dataset.dndSubmenuBound === "true")
      continue;
    item.dataset.dndSubmenuBound = "true";
    item.addEventListener("pointerenter", () => {
      openNestedMenuPopover(view, group, item);
    });
  }
}
function closeChildMenuWhenPointerLeaves(event) {
  const target = event.target;
  if (target instanceof Node && ((openChildTrigger == null ? void 0 : openChildTrigger.contains(target)) || (openChildMenuEl == null ? void 0 : openChildMenuEl.contains(target)))) {
    cancelChildMenuClose();
    return;
  }
  cancelChildMenuClose();
  closeChildMenuTimer = window.setTimeout(() => {
    hideOpenChildMenu();
  }, 80);
}
function cancelChildMenuClose() {
  if (closeChildMenuTimer === null)
    return;
  window.clearTimeout(closeChildMenuTimer);
  closeChildMenuTimer = null;
}
function hideOpenChildMenu() {
  const menu = openChildMenu;
  clearOpenChildMenuState();
  menu == null ? void 0 : menu.hide();
}
function clearOpenChildMenuState() {
  cancelChildMenuClose();
  activeDocument.removeEventListener("pointermove", closeChildMenuWhenPointerLeaves, true);
  openChildMenu = null;
  openChildTrigger = null;
  openChildMenuEl = null;
}
function showNestedMenu(menu, trigger) {
  var _a;
  const rect = trigger.getBoundingClientRect();
  const existingMenus = new Set(Array.from(activeDocument.querySelectorAll(".menu")));
  menu.showAtPosition({
    x: rect.right,
    y: rect.top,
    width: rect.width,
    overlap: true
  });
  const menus = Array.from(activeDocument.querySelectorAll(".menu"));
  for (let i = menus.length - 1; i >= 0; i--) {
    if (!existingMenus.has(menus[i]))
      return menus[i];
  }
  return (_a = menus[menus.length - 1]) != null ? _a : null;
}
function showMenu(menu, view, event, nestedGroups = []) {
  if (event) {
    menu.showAtMouseEvent(event);
  } else {
    const coords = view.coordsAtPos(view.state.selection.main.head);
    if (coords) {
      menu.showAtPosition({ x: coords.left, y: coords.bottom });
    } else {
      menu.showAtPosition({ x: activeWindow.innerWidth / 2, y: activeWindow.innerHeight / 2 });
    }
  }
  prepareNestedMenuItems(view, nestedGroups);
}

// src/domain/command/move-command.ts
function createMoveCommand(selection, target) {
  return { type: "move", selection, target };
}

// src/platform/codemirror/command/move-command-decision.ts
function buildMoveCommandDecision(params) {
  var _a;
  const {
    selection,
    validation,
    sourceScope,
    sourceDocumentRelation,
    crossFileDragEnabled
  } = params;
  if (sourceScope === "cross_editor" && sourceDocumentRelation === "different_document" && !crossFileDragEnabled) {
    return {
      type: "cancel",
      targetLine: null,
      rejectReason: "cross_document_disabled",
      validation
    };
  }
  if (!validation.allowed) {
    return {
      type: "cancel",
      targetLine: null,
      rejectReason: (_a = validation.reason) != null ? _a : "no_target",
      validation
    };
  }
  return {
    type: "commit",
    command: createMoveCommand(selection, validation.resolution.target),
    targetLine: validation.resolution.target.targetLineNumber,
    validation
  };
}

// src/platform/codemirror/extension/drag-driver.ts
var DragLifecycleEmitter = class {
  constructor(sink) {
    this.sink = sink;
    this.lastSignature = null;
  }
  emit(event) {
    var _a, _b, _c, _d, _e, _f;
    const signature = JSON.stringify({
      type: event.type,
      phase: event.phase,
      sourceStart: (_b = (_a = event.source) == null ? void 0 : _a.anchorBlock.startLine) != null ? _b : null,
      sourceEnd: (_d = (_c = event.source) == null ? void 0 : _c.anchorBlock.endLine) != null ? _d : null,
      sourceRanges: (_f = (_e = event.source) == null ? void 0 : _e.ranges) != null ? _f : null,
      targetLine: event.targetLine,
      listIntent: event.listIntent,
      rejectReason: event.rejectReason,
      pointerType: event.pointerType,
      pressReady: event.type === "drag_press_pending" && event.pressReady === true
    });
    if (signature === this.lastSignature)
      return;
    this.lastSignature = signature;
    this.sink(event);
  }
};
function createCodeMirrorDragDriverPluginClass(plugin) {
  return class {
    constructor(view) {
      this.lifecycleEmitter = new DragLifecycleEmitter(
        (event) => plugin.emitDragLifecycleEvent(event)
      );
      this.onDocumentPointerMove = (e) => this.handleDocumentPointerMove(e);
      this.onSettingsUpdated = () => this.handleSettingsUpdated();
      this.view = view;
      this.cachedHandleGutterSide = this.resolveConfiguredHandleGutterSide();
      this.syncViewDomState();
      this.context = createEditorContext(this.view);
      this.handleVisibility = new HandleVisibilityController(this.view, {
        getBlockInfoForHandle: (handle) => this.context.selection.getBlockInfoForHandle(handle),
        getLineNumberAtVerticalPosition: (clientY, contentRect) => this.context.selection.getLineNumberAtVerticalPosition(clientY, contentRect),
        getDraggableBlockAtVerticalPosition: (clientY, contentRect) => this.context.selection.getDraggableBlockAtVerticalPosition(clientY, contentRect),
        getVisibleHandleForBlockStart: (blockStart) => getVisibleHandleForBlockStart(this.view, blockStart)
      });
      this.dragPerfSessionManager = new DragPerfSessionManager(this.view);
      const dropTargetResolverDeps = {
        tabSize: this.context.tabSize,
        parseLineWithQuote: this.context.parseLineWithQuote,
        getAdjustedTargetLocation: this.context.getAdjustedTargetLocation,
        resolveDropRuleAtInsertion: this.context.resolveDropRuleAtInsertion,
        getListContext: this.context.getListContext,
        getIndentUnitWidth: this.context.getIndentUnitWidth,
        getBlockInfoForEmbed: this.context.getBlockInfoForEmbed,
        getIndentUnitWidthForDoc: this.context.getIndentUnitWidthForDoc,
        getLineRect: this.context.getLineRect,
        getInsertionAnchorY: this.context.getInsertionAnchorY,
        getLineIndentPosByWidth: this.context.getLineIndentPosByWidth,
        getBlockRect: this.context.getBlockRect,
        recordPerfDuration: (key, durationMs) => {
          this.dragPerfSessionManager.recordDuration(key, durationMs);
        },
        incrementPerfCounter: (key, delta = 1) => {
          this.dragPerfSessionManager.incrementCounter(key, delta);
        }
      };
      this.dropTargetResolver = new DropTargetResolver(this.view, dropTargetResolverDeps);
      this.dropIndicator = new DropIndicatorManager(
        view,
        {
          isDropHighlightEnabled: () => plugin.settings.enableListDropHighlight !== false,
          onFrameMetrics: (metrics) => {
            this.dragPerfSessionManager.incrementCounter("drop_indicator_frames");
            if (metrics.skipped) {
              this.dragPerfSessionManager.incrementCounter("drop_indicator_skipped_frames");
            }
            if (metrics.reused) {
              this.dragPerfSessionManager.incrementCounter("drop_indicator_reused_frames");
            }
          }
        }
      );
      this.moveCommandDeps = {
        view: this.context.view,
        tabSize: this.context.tabSize,
        resolveDropRuleAtInsertion: this.context.resolveDropRuleAtInsertion,
        parseLineWithQuote: this.context.parseLineWithQuote,
        getListContext: this.context.getListContext,
        getIndentUnitWidth: this.context.getIndentUnitWidth,
        buildInsertText: this.context.buildInsertText,
        blockFoldState: createBlockFoldStateManager({
          app: plugin.app,
          parseLineWithQuote: this.context.parseLineWithQuote
        })
      };
      this.pointerHitTestClient = {
        containsPoint: (clientX, clientY) => this.containsPoint(clientX, clientY),
        resolveDropSnapshotAtPoint: (clientX, clientY, selection, pointerType) => this.resolveDropSnapshotAtPoint(selection, clientX, clientY, pointerType),
        showDropPreview: (selection, drop2, pointerType) => this.showDropPreview(selection, drop2, pointerType),
        hideDropPreview: () => this.dropIndicator.hide(),
        buildBlockCommandAtPoint: (source, clientX, clientY, pointerType) => this.buildBlockCommandAtPoint(source, clientX, clientY, pointerType),
        applyBlockCommand: (command) => this.applyBlockCommand(command)
      };
      this.unregisterPointerHitTestClient = registerPointerHitTestClient(this.pointerHitTestClient);
      const pipelineOutputExecutor = {
        showDropPreview: (selection, drop2, pointerType) => showPointerDropPreview(
          this.pointerHitTestClient,
          selection,
          drop2,
          pointerType != null ? pointerType : null
        ),
        hideDropPreview: () => hidePointerDropPreviews(),
        applyCommand: (command) => applyPointerBlockCommand(this.pointerHitTestClient, command),
        emitLifecycle: (event) => {
          this.handleSourceVisualByLifecycle(event);
          this.emitDragLifecycle(event);
        }
      };
      this.pipelineAdapter = new PipelineAdapter(this.view, {
        resolveBlockSelection: (request) => this.context.selection.resolveSelection(request),
        getVisibleHandleForBlockStart: (blockStart) => getVisibleHandleForBlockStart(this.view, blockStart),
        isBlockInsideRenderedTableCell: (blockInfo) => isPosInsideRenderedTableCell(this.view, blockInfo.from, { skipLayoutRead: true }),
        isMultiLineSelectionEnabled: () => plugin.settings.enableMultiLineSelection,
        getMultiLineSelectionLongPressMs: () => plugin.settings.multiLineSelectionLongPressMs,
        getMobileDragLongPressMs: () => plugin.settings.mobileDragLongPressMs,
        getMouseRangeSelectLongPressMs: () => plugin.settings.mouseRangeSelectLongPressMs,
        getAutoScrollEdgeZonePx: () => plugin.settings.autoScrollEdgeZonePx,
        getAutoScrollMaxSpeedPx: () => plugin.settings.autoScrollMaxSpeedPx,
        isMobileDragModeEnabled: () => plugin.isMobileDragModeEnabled(),
        isMobileTextLongPressDragEnabled: () => plugin.settings.enableMobileTextLongPressDrag,
        beginPointerDragSession: (source) => {
          this.ensureDragPerfSession();
          beginDragSession(source, this.view);
        },
        finishDragSession: () => {
          this.handleVisibility.clearGrabbedLineNumbers();
          this.handleVisibility.setActiveVisibleHandle(null);
          finishDragSession(this.view);
          hidePointerDropPreviews();
          this.flushDragPerfSession("finish_drag_session");
          this.refreshDecorationsAndEmbeds();
        },
        resolveDropSnapshotAtPoint: (clientX, clientY, selection, pointerType) => resolvePointerDropSnapshotAtPoint(
          this.pointerHitTestClient,
          clientX,
          clientY,
          selection,
          pointerType != null ? pointerType : null
        ),
        buildBlockCommandAtPoint: (source, clientX, clientY, pointerType) => buildPointerBlockCommandAtPoint(
          this.pointerHitTestClient,
          source,
          clientX,
          clientY,
          pointerType != null ? pointerType : null
        ),
        pipelineOutputExecutor,
        openBlockTypeMenu: (blockInfo, event) => {
          const anchor = Math.max(0, Math.min(this.view.state.doc.length, blockInfo.from));
          this.view.dispatch({ selection: { anchor }, scrollIntoView: false });
          openBlockTypeMenu(this.view, event);
        }
      });
      this.semanticRefreshScheduler = new SemanticRefreshScheduler(this.view, {
        performRefresh: () => this.refreshDecorationsAndEmbeds()
      });
      this.pointerMoveClient = {
        view: this.view,
        onPointerMove: this.onDocumentPointerMove,
        clearPointerHover: () => this.handleVisibility.setActiveVisibleHandle(null)
      };
      startViewLifecycle({
        view: this.view,
        pipelineAdapter: this.pipelineAdapter,
        pointerMoveClient: this.pointerMoveClient,
        onSettingsUpdated: this.onSettingsUpdated
      });
      this.syncViewDomState();
    }
    update(update) {
      this.syncViewDomState();
      applyViewUpdate(update, {
        refreshDecorationsAndEmbeds: () => this.refreshDecorationsAndEmbeds(),
        pipelineAdapter: this.pipelineAdapter,
        handleVisibility: this.handleVisibility,
        semanticRefreshScheduler: this.semanticRefreshScheduler,
        reResolveActiveHandle: () => {
          const h = this.handleVisibility.getActiveHandle();
          if (h) {
            const rect = h.getBoundingClientRect();
            this.reResolveActiveHandle(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
        }
      });
    }
    destroy() {
      destroyViewLifecycle({
        semanticRefreshScheduler: this.semanticRefreshScheduler,
        pointerMoveClient: this.pointerMoveClient,
        onSettingsUpdated: this.onSettingsUpdated,
        pipelineAdapter: this.pipelineAdapter
      });
      this.handleVisibility.clearGrabbedLineNumbers();
      this.handleVisibility.setActiveVisibleHandle(null);
      this.unregisterPointerHitTestClient();
      finishDragSession(this.view);
      this.flushDragPerfSession("destroy");
      clearEditorRootClasses(this.view);
      this.view.dom.removeAttribute(DND_DRAG_SOURCE_STYLE_ATTR);
      this.view.dom.removeAttribute(DND_DRAG_SOURCE_HIGHLIGHT_ATTR);
      this.dropIndicator.destroy();
      this.emitDragLifecycle(buildIdleLifecycleEvent());
    }
    ensureDragPerfSession() {
      this.semanticRefreshScheduler.ensureSemanticReadyForInteraction();
      this.dragPerfSessionManager.ensure();
    }
    flushDragPerfSession(reason) {
      this.dragPerfSessionManager.flush(reason);
    }
    emitDragLifecycle(event) {
      this.lifecycleEmitter.emit(event);
    }
    resolveDropSnapshotAtPoint(source, clientX, clientY, pointerType) {
      var _a;
      const sourceView = getActiveBlockSelectionView();
      const sourceScope = sourceView && sourceView !== this.view ? "cross_editor" : "same_editor";
      const validation = this.dropTargetResolver.resolveValidatedDropTarget({
        clientX,
        clientY,
        selection: source,
        pointerType,
        sourceScope
      });
      return {
        target: validation.allowed ? validation.resolution.target : null,
        rejectReason: validation.allowed ? null : (_a = validation.reason) != null ? _a : "no_target",
        previewData: validation
      };
    }
    buildBlockCommandAtPoint(source, clientX, clientY, pointerType) {
      this.ensureDragPerfSession();
      const sourceView = getActiveBlockSelectionView();
      const sourceScope = sourceView && sourceView !== this.view ? "cross_editor" : "same_editor";
      const sourceDocumentRelation = this.resolveDragDocumentRelation(sourceView);
      const validation = this.dropTargetResolver.resolveValidatedDropTarget({
        clientX,
        clientY,
        selection: source,
        pointerType,
        sourceScope
      });
      const decision = buildMoveCommandDecision({
        selection: source,
        validation,
        sourceScope,
        sourceDocumentRelation,
        crossFileDragEnabled: plugin.settings.enableCrossFileDrag === true
      });
      const drop2 = {
        target: decision.type === "commit" ? decision.command.target : validation.allowed ? validation.resolution.target : null,
        rejectReason: decision.type === "cancel" ? decision.rejectReason : null,
        previewData: validation
      };
      if (decision.type === "cancel") {
        return { type: "cancel", drop: drop2, reason: decision.rejectReason };
      }
      return { type: "command", drop: drop2, command: decision.command };
    }
    applyBlockCommand(command) {
      if (command.type !== "move")
        return;
      const sourceView = getActiveBlockSelectionView();
      const sourceScope = sourceView && sourceView !== this.view ? "cross_editor" : "same_editor";
      const sourceDocumentRelation = this.resolveDragDocumentRelation(sourceView);
      applyMoveCommand(this.moveCommandDeps, {
        command,
        sourceView: sourceScope === "cross_editor" && sourceView ? sourceView : void 0,
        sourceDocumentRelation
      });
    }
    showDropPreview(selection, drop2, pointerType) {
      const validation = drop2.previewData;
      if (!validation) {
        this.dropIndicator.hide();
        return;
      }
      this.dropIndicator.scheduleRender(validation, selection, pointerType);
    }
    resolveDragDocumentRelation(sourceView) {
      if (!sourceView || sourceView === this.view) {
        return "same_document";
      }
      const sourceDocumentKey = resolveEditorDocumentKey(plugin.app, sourceView);
      const targetDocumentKey = resolveEditorDocumentKey(plugin.app, this.view);
      if (!sourceDocumentKey || !targetDocumentKey) {
        return "different_document";
      }
      return sourceDocumentKey === targetDocumentKey ? "same_document" : "different_document";
    }
    handleDocumentPointerMove(e) {
      if (activeDocument.body.classList.contains(MOBILE_GESTURE_LOCK_CLASS)) {
        return;
      }
      if (activeDocument.body.classList.contains(DRAGGING_BODY_CLASS)) {
        this.handleVisibility.setActiveVisibleHandle(null);
        return;
      }
      if (this.pipelineAdapter.isGestureActive()) {
        this.handleVisibility.setActiveVisibleHandle(this.handleVisibility.getActiveHandle());
        return;
      }
      const hoverSnapshot = this.createHoverPointerSnapshot(e.clientX, e.clientY);
      if (this.semanticRefreshScheduler.isPending && hoverSnapshot.withinHoverActivationZone) {
        this.semanticRefreshScheduler.ensureSemanticReadyForInteraction();
      }
      const directHandle = this.handleVisibility.resolveVisibleHandleFromTarget(e.target);
      if (directHandle) {
        this.handleVisibility.setActiveVisibleHandle(directHandle);
        return;
      }
      const handle = this.handleVisibility.resolveVisibleHandleFromPointer(hoverSnapshot);
      this.handleVisibility.setActiveVisibleHandle(handle);
    }
    reResolveActiveHandle(lastX, lastY) {
      if (lastX === void 0 || lastY === void 0)
        return;
      const handle = this.handleVisibility.resolveVisibleHandleFromPointer(
        this.createHoverPointerSnapshot(lastX, lastY)
      );
      this.handleVisibility.setActiveVisibleHandle(handle);
    }
    syncViewDomState() {
      ensureEditorRootClasses(this.view);
      placeHandleGutterForConfiguredSide(this.view, this.resolveConfiguredHandleGutterSide());
      syncBlockSelectionStyleAttr(this.view, plugin.settings.selectionVisualStyle);
      syncBlockSelectionHighlightAttr(this.view, this.isBlockSelectionHighlightEnabled());
    }
    isBlockSelectionHighlightEnabled() {
      return plugin.settings.enableBlockSelectionHighlight !== false;
    }
    refreshDecorationsAndEmbeds() {
      this.syncViewDomState();
      this.semanticRefreshScheduler.clearPendingSemanticRefresh();
    }
    handleSettingsUpdated() {
      this.cachedHandleGutterSide = this.resolveConfiguredHandleGutterSide();
      this.syncViewDomState();
      this.pipelineAdapter.handleMobileDragAvailabilityChanged(
        plugin.isMobileDragModeEnabled()
      );
      this.refreshDecorationsAndEmbeds();
      this.pipelineAdapter.refreshSelectionVisual();
      this.handleVisibility.refreshGrabVisualState();
    }
    createHoverPointerSnapshot(clientX, clientY) {
      return createHoverPointerSnapshot(this.view, clientX, clientY, this.cachedHandleGutterSide);
    }
    containsPoint(clientX, clientY) {
      const rect = this.view.dom.getBoundingClientRect();
      return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
    }
    resolveConfiguredHandleGutterSide() {
      return plugin.settings.handleGutterPosition === "right" ? "right" : "left";
    }
    handleSourceVisualByLifecycle(event) {
      if (event.type === "drag_press_pending") {
        if (event.pressReady && event.source && this.isBlockSelectionHighlightEnabled()) {
          this.handleVisibility.enterGrabVisualState(event.source.ranges.map((range) => ({
            startLineNumber: range.startLine + 1,
            endLineNumber: range.endLine + 1
          })), null);
        } else {
          this.handleVisibility.clearGrabbedLineNumbers();
        }
        return;
      }
      if (event.type === "drag_started") {
        if (event.source && this.isBlockSelectionHighlightEnabled()) {
          this.handleVisibility.enterGrabVisualState(event.source.ranges.map((range) => ({
            startLineNumber: range.startLine + 1,
            endLineNumber: range.endLine + 1
          })), null);
        } else if (!this.isBlockSelectionHighlightEnabled()) {
          this.handleVisibility.clearGrabbedLineNumbers();
        }
        return;
      }
      if (event.type === "drag_cancelled" || event.type === "drag_idle") {
        if (getActiveBlockSelection(this.view))
          return;
        this.handleVisibility.clearGrabbedLineNumbers();
        return;
      }
      if (event.type === "drag_drop_commit") {
        this.handleVisibility.clearGrabbedLineNumbers();
      }
    }
    resolveDragSelectionScope() {
      const sourceView = getActiveBlockSelectionView();
      if (!sourceView || sourceView === this.view) {
        return "same_editor";
      }
      return "cross_editor";
    }
  };
}

// src/platform/codemirror/extension/handle-gutter-extension.ts
var import_view2 = require("@codemirror/view");
function resolveLineNumber(view, line) {
  return view.state.doc.lineAt(line.from).number;
}
function createHandleGutterExtension() {
  return (0, import_view2.gutter)({
    class: HANDLE_GUTTER_CLASS,
    side: "before",
    renderEmptyElements: false,
    lineMarker: (view, line) => {
      const block = resolveHandleBlockAtLine(view.state, resolveLineNumber(view, line));
      return block ? new HandleGutterLineMarker(block) : null;
    },
    lineMarkerChange: (update) => update.docChanged || update.viewportChanged || update.geometryChanged
  });
}

// src/platform/codemirror/extension/editor-extension.ts
function createDragHandleViewPlugin(plugin) {
  return import_view3.ViewPlugin.fromClass(
    createCodeMirrorDragDriverPluginClass(plugin)
  );
}
function dragHandleExtension(plugin) {
  return [
    createHandleGutterExtension(),
    createDragHandleViewPlugin(plugin)
  ];
}

// src/platform/obsidian/external-file-drop-controller.ts
var import_obsidian3 = require("obsidian");

// src/platform/obsidian/file-move-applier.ts
var import_state10 = require("@codemirror/state");
var FileMoveApplier = class {
  constructor(app) {
    this.app = app;
  }
  async applyFileMove(params) {
    const { sourceView, selection, targetFile } = params;
    if (targetFile.extension !== "md") {
      return { moved: false, reason: "target_not_markdown" };
    }
    const payload = captureMoveSourcePayload(sourceView.state.doc, selection);
    if (!payload || payload.content.length === 0) {
      return { moved: false, reason: "empty_source" };
    }
    const targetView = this.getOpenMarkdownEditorView(targetFile);
    if (targetView === sourceView) {
      this.moveWithinSameEditorToEnd(sourceView, payload);
      this.renumberSourceLists(sourceView, payload);
      return { moved: true };
    }
    if (targetView) {
      this.appendToEditor(targetView, payload.content);
      this.deleteSourcePayload(sourceView, payload);
      this.renumberSourceLists(sourceView, payload);
      return { moved: true };
    }
    await this.app.vault.process(targetFile, (data) => appendMarkdownBlock(data, payload.content));
    this.deleteSourcePayload(sourceView, payload);
    this.renumberSourceLists(sourceView, payload);
    return { moved: true };
  }
  getOpenMarkdownEditorView(file) {
    var _a, _b;
    for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
      const view = leaf.view;
      if (((_a = view.getViewType) == null ? void 0 : _a.call(view)) !== "markdown")
        continue;
      const markdownView = view;
      if (((_b = markdownView.file) == null ? void 0 : _b.path) !== file.path)
        continue;
      return getCodeMirrorView(markdownView);
    }
    return null;
  }
  appendToEditor(view, content) {
    const doc = view.state.doc;
    const insert = buildAppendInsertion(doc.sliceString(0, doc.length), content);
    if (!insert.length)
      return;
    applyBlockTransaction(view, {
      changes: [{ from: doc.length, to: doc.length, insert }]
    }, { anchor: doc.length });
  }
  deleteSourcePayload(sourceView, payload) {
    var _a, _b;
    const changes = this.getMergedDeleteChanges(payload).sort((a, b) => b.from - a.from);
    if (changes.length === 0)
      return;
    applyBlockTransaction(sourceView, { changes }, { anchor: (_b = (_a = payload.segments[0]) == null ? void 0 : _a.deleteFrom) != null ? _b : 0 });
  }
  moveWithinSameEditorToEnd(view, payload) {
    var _a, _b;
    const doc = view.state.doc;
    const deletes = this.getMergedDeleteChanges(payload);
    const remainingText = applyDeleteChanges(doc.sliceString(0, doc.length), deletes);
    const insert = buildAppendInsertion(remainingText, payload.content);
    const changes = [
      ...deletes,
      ...insert.length ? [{ from: doc.length, to: doc.length, insert }] : []
    ].sort((a, b) => b.from - a.from);
    if (changes.length === 0)
      return;
    applyBlockTransaction(view, { changes }, { anchor: (_b = (_a = payload.segments[0]) == null ? void 0 : _a.deleteFrom) != null ? _b : 0 });
  }
  getMergedDeleteChanges(payload) {
    const sorted = payload.segments.map((segment) => ({
      from: segment.deleteFrom,
      to: segment.deleteTo
    })).sort((a, b) => a.from - b.from);
    const merged = [];
    for (const change of sorted) {
      const last = merged[merged.length - 1];
      if (!last) {
        merged.push({ ...change, insert: "" });
        continue;
      }
      if (change.from <= last.to) {
        last.to = Math.max(last.to, change.to);
        continue;
      }
      merged.push({ ...change, insert: "" });
    }
    return merged;
  }
  renumberSourceLists(sourceView, payload) {
    const lineParsing = createLineParsingContext(sourceView.state.facet(import_state10.EditorState.tabSize));
    const lineNumbers = new Set(payload.segments.map((segment) => segment.startLineNumber));
    for (const lineNumber of lineNumbers) {
      const changes = planOrderedListRenumberChanges(
        sourceView.state.doc,
        (line) => lineParsing.parseLine(line),
        lineNumber
      );
      applyBlockTransaction(sourceView, { changes });
    }
  }
};
function appendMarkdownBlock(existing, blockContent) {
  const insert = buildAppendInsertion(existing, blockContent);
  return insert.length ? `${existing}${insert}` : existing;
}
function buildAppendInsertion(existing, blockContent) {
  const normalized = blockContent.replace(/\n+$/, "");
  if (!normalized.length)
    return "";
  if (!existing.length)
    return normalized;
  if (existing.endsWith("\n\n"))
    return normalized;
  if (existing.endsWith("\n"))
    return `
${normalized}`;
  return `

${normalized}`;
}
function applyDeleteChanges(existing, deletes) {
  let result = "";
  let cursor = 0;
  for (const change of deletes) {
    result += existing.slice(cursor, change.from);
    cursor = change.to;
  }
  return result + existing.slice(cursor);
}

// src/platform/obsidian/external-file-drop-controller.ts
var SIDEBAR_FILE_SELECTOR = ".nav-file-title[data-path]";
var INTERNAL_LINK_SELECTOR = "a.internal-link, .internal-link[data-href], .cm-hmd-internal-link[data-href]";
var ExternalFileDropController = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.highlightedTarget = null;
    this.pointerHitTestClient = {
      containsPoint: (clientX, clientY) => this.resolveDropTargetAtPoint(clientX, clientY) !== null,
      resolveDropSnapshotAtPoint: (clientX, clientY) => this.resolveDropSnapshotAtPoint(clientX, clientY),
      showDropPreview: (_source, drop2) => {
        const target = drop2.previewData;
        if (!target) {
          this.clearHighlight();
          return;
        }
        this.setHighlightedTarget(target.element);
      },
      hideDropPreview: () => this.clearHighlight(),
      buildBlockCommandAtPoint: (source, clientX, clientY) => {
        const drop2 = this.resolveDropSnapshotAtPoint(clientX, clientY);
        const target = drop2.previewData;
        if (!target) {
          return { type: "cancel", drop: { target: null, rejectReason: "no_target" }, reason: "no_target" };
        }
        this.commitDropToTarget(source, target);
        return { type: "platform_commit", drop: drop2 };
      },
      applyBlockCommand: () => void 0
    };
    this.fileMoveApplier = new FileMoveApplier(plugin.app);
  }
  register() {
    const unregister = registerPointerHitTestClient(this.pointerHitTestClient);
    this.plugin.register(() => {
      unregister();
      this.clearHighlight();
    });
  }
  resolveDropSnapshotAtPoint(clientX, clientY) {
    const target = this.resolveDropTargetAtPoint(clientX, clientY);
    return target ? { target: null, rejectReason: null, previewData: target } : { target: null, rejectReason: "no_target" };
  }
  commitDropToTarget(source, target) {
    this.clearHighlight();
    const sourceView = getActiveBlockSelectionView();
    if (!sourceView) {
      new import_obsidian3.Notice("Dragger could not find the dragged block.");
      return false;
    }
    void this.fileMoveApplier.applyFileMove({
      sourceView,
      selection: source,
      targetFile: target.file
    }).then((result) => {
      if (!result.moved) {
        new import_obsidian3.Notice("Dragger could not move this block to the target note.");
      }
    }).catch((error) => {
      console.error("[Dragger] failed to move block to file target:", error);
      new import_obsidian3.Notice("Dragger could not move this block to the target note.");
    });
    return true;
  }
  resolveDropTargetAtPoint(clientX, clientY) {
    if (typeof activeDocument.elementFromPoint !== "function")
      return null;
    const target = activeDocument.elementFromPoint(clientX, clientY);
    return this.resolveDropTargetFromElement((target == null ? void 0 : target.instanceOf(HTMLElement)) ? target : null);
  }
  resolveDropTargetFromElement(target) {
    if (!target)
      return null;
    if (!this.isFileDropEnabled())
      return null;
    const sidebarFile = target.closest(SIDEBAR_FILE_SELECTOR);
    if (sidebarFile) {
      const file2 = this.resolveSidebarFileTarget(sidebarFile);
      if (file2)
        return { file: file2, element: sidebarFile };
    }
    const link = target.closest(INTERNAL_LINK_SELECTOR);
    if (!link)
      return null;
    const file = this.resolveInternalLinkTarget(link);
    if (!file)
      return null;
    return { file, element: link };
  }
  resolveSidebarFileTarget(element) {
    const rawPath = element.getAttribute("data-path");
    if (!rawPath)
      return null;
    return this.resolveMarkdownFileByVaultPath(rawPath);
  }
  resolveInternalLinkTarget(element) {
    const rawLinkpath = this.getInternalLinkPath(element);
    if (!rawLinkpath)
      return null;
    const contextPath = this.resolveLinkContextPath(element);
    if (rawLinkpath.startsWith("#")) {
      return contextPath ? this.resolveMarkdownFileByVaultPath(contextPath) : null;
    }
    const cleanLinkpath = stripSubpath(rawLinkpath);
    if (!cleanLinkpath)
      return null;
    const resolved = this.plugin.app.metadataCache.getFirstLinkpathDest(cleanLinkpath, contextPath != null ? contextPath : "");
    if (isMarkdownFile(resolved))
      return resolved;
    return this.resolveMarkdownFileByVaultPath(cleanLinkpath);
  }
  getInternalLinkPath(element) {
    const rawDataHref = element.getAttribute("data-href");
    if (rawDataHref)
      return normalizeInternalLinkAttribute(rawDataHref);
    if (element.instanceOf(HTMLAnchorElement)) {
      const rawHref = element.getAttribute("href");
      if (rawHref)
        return normalizeInternalLinkAttribute(rawHref);
    }
    return null;
  }
  resolveLinkContextPath(element) {
    var _a, _b, _c, _d, _e, _f, _g;
    for (const leaf of this.plugin.app.workspace.getLeavesOfType("markdown")) {
      const view = leaf.view;
      if (((_a = view.getViewType) == null ? void 0 : _a.call(view)) !== "markdown")
        continue;
      if (!((_b = view.containerEl) == null ? void 0 : _b.contains(element)))
        continue;
      return (_d = (_c = view.file) == null ? void 0 : _c.path) != null ? _d : null;
    }
    const sourceView = getActiveBlockSelectionView();
    if (!sourceView)
      return null;
    for (const leaf of this.plugin.app.workspace.getLeavesOfType("markdown")) {
      const view = leaf.view;
      if (((_e = view.editor) == null ? void 0 : _e.cm) === sourceView) {
        return (_g = (_f = view.file) == null ? void 0 : _f.path) != null ? _g : null;
      }
    }
    return null;
  }
  resolveMarkdownFileByVaultPath(path) {
    const cleaned = stripSubpath(path);
    if (!cleaned)
      return null;
    const candidates = cleaned.endsWith(".md") ? [cleaned] : [cleaned, `${cleaned}.md`];
    for (const candidate of candidates) {
      const normalized = (0, import_obsidian3.normalizePath)(candidate);
      const file = this.plugin.app.vault.getAbstractFileByPath(normalized);
      if (isMarkdownFile(file))
        return file;
    }
    return null;
  }
  isFileDropEnabled() {
    return this.plugin.settings.enableCrossFileDrag === true;
  }
  setHighlightedTarget(element) {
    if (this.highlightedTarget === element)
      return;
    this.clearHighlight();
    this.highlightedTarget = element;
    element.classList.add(FILE_DROP_TARGET_CLASS);
  }
  clearHighlight() {
    var _a;
    (_a = this.highlightedTarget) == null ? void 0 : _a.classList.remove(FILE_DROP_TARGET_CLASS);
    this.highlightedTarget = null;
  }
};
function normalizeInternalLinkAttribute(value) {
  let linkpath = safelyDecodeURIComponent(value.trim());
  if (!linkpath.length)
    return null;
  if (/^(https?|mailto):/i.test(linkpath))
    return null;
  if (linkpath.startsWith("#")) {
    return linkpath;
  }
  if (linkpath.startsWith("/")) {
    linkpath = linkpath.slice(1);
  }
  const aliasIndex = linkpath.indexOf("|");
  if (aliasIndex >= 0) {
    linkpath = linkpath.slice(0, aliasIndex);
  }
  return linkpath.trim() || null;
}
function stripSubpath(path) {
  const hashIndex = path.indexOf("#");
  return (hashIndex >= 0 ? path.slice(0, hashIndex) : path).trim();
}
function safelyDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    return value;
  }
}
function isMarkdownFile(file) {
  const candidate = file;
  return !!candidate && typeof candidate.path === "string" && candidate.extension === "md";
}

// src/plugin/settings.ts
var import_obsidian5 = require("obsidian");

// src/plugin/i18n/index.ts
var import_obsidian4 = require("obsidian");

// src/plugin/i18n/en.ts
var en = {
  headingAppearance: "Appearance",
  headingHandle: "Drag handle",
  headingHighlight: "Highlights",
  headingBehavior: "Behavior",
  headingMobile: "Mobile",
  handleColor: "Handle color",
  handleColorDesc: "Follow theme accent or pick a custom color",
  optionTheme: "Theme",
  optionCustom: "Custom",
  handleVisibility: "Handle visibility",
  handleVisibilityDesc: "Control how drag handles are displayed",
  optionHover: "Hover",
  optionAlways: "Always",
  optionHidden: "Hidden",
  selectionVisualStyle: "Block selection visual style",
  selectionVisualStyleDesc: "Shared highlight style",
  optionBlockSelectionVisualOutline: "Outline only",
  optionBlockSelectionVisualSubtle: "Subtle highlight",
  optionBlockSelectionVisualFilled: "Filled highlight",
  enableBlockSelectionHighlight: "Block selection highlight",
  enableBlockSelectionHighlightDesc: "Highlight the block being dragged",
  enableListDropHighlight: "List drop highlight",
  enableListDropHighlightDesc: "Highlight list drop target area",
  handleIcon: "Handle icon",
  handleIconDesc: "Choose the icon style for drag handles",
  iconDot: "\u25CF dot",
  iconGripDots: "\u283F grip dots",
  iconGripLines: "\u2630 grip lines",
  iconSquare: "\u25A0 square",
  handleSize: "Handle size",
  handleSizeDesc: "Adjust the size of drag handles (px)",
  handleOffset: "Handle horizontal offset",
  handleOffsetDesc: "Negative = left, positive = right",
  handleGutterPosition: "Handle gutter side",
  handleGutterPositionDesc: "Show the handle gutter on the left or right side of the editor",
  optionLeft: "Left",
  optionRight: "Right",
  indicatorColor: "Indicator color",
  indicatorColorDesc: "Follow theme accent or pick a custom color",
  multiLineSelection: "Multi-line selection",
  multiLineSelectionDesc: "Disable to keep single-block drag only",
  multiLineSelectionLongPressMs: "Multi-line selection long-press duration",
  multiLineSelectionLongPressMsDesc: "Enter milliseconds (300-2000). On mobile, hold for this duration before entering multi-block selection mode",
  mobileDragLongPressMs: "Drag start long-press duration",
  mobileDragLongPressMsDesc: "How long to hold the handle on mobile before drag starts (ms)",
  mouseRangeSelectLongPressMs: "Desktop range select long-press duration",
  mouseRangeSelectLongPressMsDesc: "How long to hold the handle with mouse before entering multi-block selection (ms)",
  autoScrollEdgeZonePx: "Auto-scroll edge zone",
  autoScrollEdgeZonePxDesc: "Distance from viewport edge to trigger auto-scroll while dragging (px)",
  autoScrollMaxSpeedPx: "Auto-scroll max speed",
  autoScrollMaxSpeedPxDesc: "Maximum pixels scrolled per frame during auto-scroll",
  disableMobileDragModeAfterDrop: "Disable drag mode after move",
  disableMobileDragModeAfterDropDesc: "On mobile, automatically exit drag mode after a block is moved successfully",
  mobileTextLongPressDrag: "Mobile text long-press drag",
  mobileTextLongPressDragDesc: "On mobile, long-press a text line or rendered block content to drag the current block directly without using the left handle",
  mobileDragModeToggleLocations: "Toggle button placement",
  mobileDragModeToggleLocationsDesc: "Choose where to show the mobile drag mode toggle. Multiple or none can be selected",
  optionMobileDragModeToggleViewAction: "View actions",
  enableCrossFileDrag: "Cross-file drag",
  enableCrossFileDragDesc: "Allow dragging blocks into open editors, internal links, and file explorer notes",
  mobileOnlyNotice: "\u26A0\uFE0F These settings can only be modified on mobile"
};

// src/plugin/i18n/zh-cn.ts
var zhCn = {
  // Headings
  headingAppearance: "\u5916\u89C2",
  headingHandle: "\u62D6\u62FD\u624B\u67C4",
  headingHighlight: "\u9AD8\u4EAE\u6548\u679C",
  headingBehavior: "\u884C\u4E3A",
  headingMobile: "\u79FB\u52A8\u7AEF",
  // Handle color
  handleColor: "\u624B\u67C4\u989C\u8272",
  handleColorDesc: "\u8DDF\u968F\u4E3B\u9898\u5F3A\u8C03\u8272\u6216\u81EA\u5B9A\u4E49\u989C\u8272",
  optionTheme: "\u8DDF\u968F\u4E3B\u9898\u8272",
  optionCustom: "\u81EA\u5B9A\u4E49",
  // Handle visibility
  handleVisibility: "\u624B\u67C4\u663E\u793A\u6A21\u5F0F",
  handleVisibilityDesc: "\u63A7\u5236\u62D6\u62FD\u624B\u67C4\u7684\u663E\u793A\u65B9\u5F0F",
  optionHover: "\u60AC\u505C\u663E\u793A",
  optionAlways: "\u59CB\u7EC8\u663E\u793A",
  optionHidden: "\u9690\u85CF",
  selectionVisualStyle: "\u62D6\u62FD\u6E90\u89C6\u89C9\u6837\u5F0F",
  selectionVisualStyleDesc: "\u7EDF\u4E00\u9AD8\u4EAE\u6837\u5F0F",
  optionBlockSelectionVisualOutline: "\u7EAF\u8FB9\u6846",
  optionBlockSelectionVisualSubtle: "\u7B80\u7EA6\u9AD8\u4EAE",
  optionBlockSelectionVisualFilled: "\u80CC\u666F\u589E\u5F3A",
  enableBlockSelectionHighlight: "\u62D6\u62FD\u6E90\u9AD8\u4EAE",
  enableBlockSelectionHighlightDesc: "\u9AD8\u4EAE\u88AB\u62D6\u52A8\u7684\u6E90\u5757",
  enableListDropHighlight: "\u5217\u8868\u843D\u70B9\u9AD8\u4EAE",
  enableListDropHighlightDesc: "\u9AD8\u4EAE\u5217\u8868\u5185\u53EF\u653E\u7F6E\u533A\u57DF",
  // Handle icon
  handleIcon: "\u624B\u67C4\u56FE\u6807",
  handleIconDesc: "\u9009\u62E9\u62D6\u62FD\u624B\u67C4\u7684\u56FE\u6807\u6837\u5F0F",
  iconDot: "\u25CF \u5706\u70B9",
  iconGripDots: "\u283F \u516D\u70B9\u6293\u624B",
  iconGripLines: "\u2630 \u4E09\u6A2A\u7EBF",
  iconSquare: "\u25A0 \u65B9\u5757",
  // Handle size
  handleSize: "\u624B\u67C4\u5927\u5C0F",
  handleSizeDesc: "\u8C03\u6574\u62D6\u62FD\u624B\u67C4\u7684\u5927\u5C0F\uFF08\u50CF\u7D20\uFF09",
  // Handle offset
  handleOffset: "\u624B\u67C4\u6A2A\u5411\u4F4D\u7F6E",
  handleOffsetDesc: "\u5411\u5DE6\u4E3A\u8D1F\u503C\uFF0C\u5411\u53F3\u4E3A\u6B63\u503C",
  handleGutterPosition: "\u624B\u67C4\u6240\u5728\u4FA7",
  handleGutterPositionDesc: "\u63A7\u5236\u624B\u67C4 gutter \u663E\u793A\u5728\u7F16\u8F91\u5668\u5DE6\u4FA7\u8FD8\u662F\u53F3\u4FA7",
  optionLeft: "\u5DE6\u4FA7",
  optionRight: "\u53F3\u4FA7",
  // Indicator color
  indicatorColor: "\u6307\u793A\u5668\u989C\u8272",
  indicatorColorDesc: "\u8DDF\u968F\u4E3B\u9898\u5F3A\u8C03\u8272\u6216\u81EA\u5B9A\u4E49\u989C\u8272",
  // Multi-line selection
  multiLineSelection: "\u591A\u884C\u9009\u53D6",
  multiLineSelectionDesc: "\u5173\u95ED\u540E\u4EC5\u4FDD\u7559\u5355\u5757\u62D6\u62FD\uFF0C\u4E0D\u8FDB\u5165\u591A\u884C\u9009\u53D6\u6D41\u7A0B",
  multiLineSelectionLongPressMs: "\u591A\u9009\u6A21\u5F0F\u957F\u6309\u65F6\u957F",
  multiLineSelectionLongPressMsDesc: "\u8F93\u5165\u6BEB\u79D2\u6570\uFF08300-2000\uFF09\uFF0C\u79FB\u52A8\u7AEF\u957F\u6309\u8FBE\u5230\u8BE5\u65F6\u957F\u540E\u8FDB\u5165\u591A\u6587\u672C\u5757\u9009\u62E9\u6A21\u5F0F",
  mobileDragLongPressMs: "\u62D6\u62FD\u542F\u52A8\u957F\u6309\u65F6\u957F",
  mobileDragLongPressMsDesc: "\u79FB\u52A8\u7AEF\u957F\u6309\u624B\u67C4\u591A\u4E45\u540E\u542F\u52A8\u62D6\u62FD\uFF08\u6BEB\u79D2\uFF09",
  mouseRangeSelectLongPressMs: "\u684C\u9762\u7AEF\u957F\u6309\u8FDB\u5165\u8303\u56F4\u9009\u62E9\u65F6\u957F",
  mouseRangeSelectLongPressMsDesc: "\u9F20\u6807\u957F\u6309\u624B\u67C4\u591A\u4E45\u540E\u8FDB\u5165\u591A\u5757\u9009\u62E9\u6A21\u5F0F\uFF08\u6BEB\u79D2\uFF09",
  autoScrollEdgeZonePx: "\u81EA\u52A8\u6EDA\u52A8\u89E6\u53D1\u8DDD\u79BB",
  autoScrollEdgeZonePxDesc: "\u62D6\u62FD\u65F6\u6307\u9488\u8DDD\u79BB\u89C6\u53E3\u8FB9\u7F18\u591A\u5C11\u50CF\u7D20\u5F00\u59CB\u81EA\u52A8\u6EDA\u52A8",
  autoScrollMaxSpeedPx: "\u81EA\u52A8\u6EDA\u52A8\u6700\u5927\u901F\u5EA6",
  autoScrollMaxSpeedPxDesc: "\u81EA\u52A8\u6EDA\u52A8\u6BCF\u5E27\u6700\u5927\u6EDA\u52A8\u50CF\u7D20\u6570",
  disableMobileDragModeAfterDrop: "\u79FB\u52A8\u540E\u5173\u95ED\u62D6\u62FD\u6A21\u5F0F",
  disableMobileDragModeAfterDropDesc: "\u5F00\u542F\u540E\uFF0C\u79FB\u52A8\u7AEF\u6BCF\u6B21\u6210\u529F\u79FB\u52A8\u6587\u672C\u5757\u540E\u4F1A\u81EA\u52A8\u9000\u51FA\u62D6\u62FD\u6A21\u5F0F",
  mobileTextLongPressDrag: "\u79FB\u52A8\u7AEF\u6587\u672C\u957F\u6309\u62D6\u62FD",
  mobileTextLongPressDragDesc: "\u79FB\u52A8\u7AEF\u5728\u6587\u672C\u6574\u884C\u6216\u5757\u5185\u5BB9\u533A\u57DF\u957F\u6309\u53EF\u76F4\u63A5\u62D6\u62FD\u5F53\u524D\u5757\uFF0C\u65E0\u9700\u5DE6\u4FA7\u624B\u67C4",
  mobileDragModeToggleLocations: "Toggle \u6309\u94AE\u4F4D\u7F6E",
  mobileDragModeToggleLocationsDesc: "\u9009\u62E9\u79FB\u52A8\u7AEF\u62D6\u62FD\u6A21\u5F0F\u5F00\u5173\u663E\u793A\u5728\u54EA\u4E9B\u5165\u53E3\uFF0C\u53EF\u591A\u9009\u6216\u4E0D\u9009",
  optionMobileDragModeToggleViewAction: "\u89C6\u56FE\u64CD\u4F5C\u680F",
  enableCrossFileDrag: "\u8DE8\u6587\u4EF6\u62D6\u62FD",
  enableCrossFileDragDesc: "\u5141\u8BB8\u5C06\u5757\u62D6\u62FD\u5230\u5DF2\u6253\u5F00\u7F16\u8F91\u5668\u3001\u5185\u90E8\u94FE\u63A5\u6216\u6587\u4EF6\u5217\u8868\u7B14\u8BB0\u4E2D",
  mobileOnlyNotice: "\u26A0\uFE0F \u4EE5\u4E0B\u8BBE\u7F6E\u4EC5\u5728\u79FB\u52A8\u7AEF\u53EF\u4FEE\u6539"
};

// src/plugin/i18n/ru.ts
var ru = {
  headingAppearance: "\u0412\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434",
  headingHandle: "\u041C\u0430\u0440\u043A\u0435\u0440 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u044F",
  headingHighlight: "\u041F\u043E\u0434\u0441\u0432\u0435\u0442\u043A\u0430",
  headingBehavior: "\u041F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435",
  headingMobile: "\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0435 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E",
  handleColor: "\u0426\u0432\u0435\u0442 \u043C\u0430\u0440\u043A\u0435\u0440\u0430",
  handleColorDesc: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0446\u0432\u0435\u0442 \u0430\u043A\u0446\u0435\u043D\u0442\u0430 \u0442\u0435\u043C\u044B \u0438\u043B\u0438 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u0432\u043E\u0439",
  optionTheme: "\u0422\u0435\u043C\u0430",
  optionCustom: "\u0421\u0432\u043E\u0439",
  handleVisibility: "\u0412\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0440\u0430",
  handleVisibilityDesc: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435\u043C \u043C\u0430\u0440\u043A\u0435\u0440\u043E\u0432 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u044F",
  optionHover: "\u041F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438",
  optionAlways: "\u0412\u0441\u0435\u0433\u0434\u0430",
  optionHidden: "\u0421\u043A\u0440\u044B\u0442",
  selectionVisualStyle: "\u0421\u0442\u0438\u043B\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u0438\u044F \u0431\u043B\u043E\u043A\u0430",
  selectionVisualStyleDesc: "\u041E\u0431\u0449\u0438\u0439 \u0441\u0442\u0438\u043B\u044C \u043F\u043E\u0434\u0441\u0432\u0435\u0442\u043A\u0438 \u043F\u0440\u0438 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0438",
  optionBlockSelectionVisualOutline: "\u0422\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u043D\u0442\u0443\u0440",
  optionBlockSelectionVisualSubtle: "\u041B\u0451\u0433\u043A\u0430\u044F \u043F\u043E\u0434\u0441\u0432\u0435\u0442\u043A\u0430",
  optionBlockSelectionVisualFilled: "\u0417\u0430\u043B\u0438\u0432\u043A\u0430",
  enableBlockSelectionHighlight: "\u041F\u043E\u0434\u0441\u0432\u0435\u0442\u043A\u0430 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0435\u043C\u043E\u0433\u043E \u0431\u043B\u043E\u043A\u0430",
  enableBlockSelectionHighlightDesc: "\u041F\u043E\u0434\u0441\u0432\u0435\u0447\u0438\u0432\u0430\u0442\u044C \u0431\u043B\u043E\u043A \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u044F",
  enableListDropHighlight: "\u041F\u043E\u0434\u0441\u0432\u0435\u0442\u043A\u0430 \u043C\u0435\u0441\u0442\u0430 \u0432\u0441\u0442\u0430\u0432\u043A\u0438 \u0432 \u0441\u043F\u0438\u0441\u043E\u043A",
  enableListDropHighlightDesc: "\u041F\u043E\u0434\u0441\u0432\u0435\u0447\u0438\u0432\u0430\u0442\u044C \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0432\u0441\u0442\u0430\u0432\u043A\u0438 \u0432 \u0441\u043F\u0438\u0441\u043E\u043A",
  handleIcon: "\u0418\u043A\u043E\u043D\u043A\u0430 \u043C\u0430\u0440\u043A\u0435\u0440\u0430",
  handleIconDesc: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0438\u043B\u044C \u0438\u043A\u043E\u043D\u043A\u0438 \u0434\u043B\u044F \u043C\u0430\u0440\u043A\u0435\u0440\u043E\u0432 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u044F",
  iconDot: "\u25CF \u0442\u043E\u0447\u043A\u0430",
  iconGripDots: "\u283F \u0442\u043E\u0447\u043A\u0438 \u0437\u0430\u0445\u0432\u0430\u0442\u0430",
  iconGripLines: "\u2630 \u043B\u0438\u043D\u0438\u0438 \u0437\u0430\u0445\u0432\u0430\u0442\u0430",
  iconSquare: "\u25A0 \u043A\u0432\u0430\u0434\u0440\u0430\u0442",
  handleSize: "\u0420\u0430\u0437\u043C\u0435\u0440 \u043C\u0430\u0440\u043A\u0435\u0440\u0430",
  handleSizeDesc: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 \u043C\u0430\u0440\u043A\u0435\u0440\u043E\u0432 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u044F (px)",
  handleOffset: "\u0413\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u043C\u0430\u0440\u043A\u0435\u0440\u0430",
  handleOffsetDesc: "\u041E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 = \u0432\u043B\u0435\u0432\u043E, \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 = \u0432\u043F\u0440\u0430\u0432\u043E",
  handleGutterPosition: "\u0421\u0442\u043E\u0440\u043E\u043D\u0430 \u043C\u0430\u0440\u043A\u0435\u0440\u0430",
  handleGutterPositionDesc: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0440 \u0441\u043B\u0435\u0432\u0430 \u0438\u043B\u0438 \u0441\u043F\u0440\u0430\u0432\u0430 \u043E\u0442 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430",
  optionLeft: "\u0421\u043B\u0435\u0432\u0430",
  optionRight: "\u0421\u043F\u0440\u0430\u0432\u0430",
  indicatorColor: "\u0426\u0432\u0435\u0442 \u0438\u043D\u0434\u0438\u043A\u0430\u0442\u043E\u0440\u0430",
  indicatorColorDesc: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0446\u0432\u0435\u0442 \u0430\u043A\u0446\u0435\u043D\u0442\u0430 \u0442\u0435\u043C\u044B \u0438\u043B\u0438 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u0432\u043E\u0439",
  multiLineSelection: "\u0412\u044B\u0431\u043E\u0440 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 \u0431\u043B\u043E\u043A\u043E\u0432",
  multiLineSelectionDesc: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0434\u0438\u043D \u0431\u043B\u043E\u043A \u0437\u0430 \u0440\u0430\u0437",
  multiLineSelectionLongPressMs: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0434\u043E\u043B\u0433\u043E\u0433\u043E \u043D\u0430\u0436\u0430\u0442\u0438\u044F \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 \u0431\u043B\u043E\u043A\u043E\u0432",
  multiLineSelectionLongPressMsDesc: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0432 \u043C\u0438\u043B\u043B\u0438\u0441\u0435\u043A\u0443\u043D\u0434\u0430\u0445 (300-2000). \u041D\u0430 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u043C \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u044D\u0442\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u0435\u0440\u0435\u0434 \u0432\u0445\u043E\u0434\u043E\u043C \u0432 \u0440\u0435\u0436\u0438\u043C \u0432\u044B\u0431\u043E\u0440\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 \u0431\u043B\u043E\u043A\u043E\u0432",
  mobileDragLongPressMs: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u043D\u0430\u0436\u0430\u0442\u0438\u044F \u0434\u043B\u044F \u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u044F",
  mobileDragLongPressMsDesc: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0440 \u043D\u0430 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u043C \u043F\u0435\u0440\u0435\u0434 \u043D\u0430\u0447\u0430\u043B\u043E\u043C \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u044F (\u043C\u0441)",
  mouseRangeSelectLongPressMs: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u043D\u0430\u0436\u0430\u0442\u0438\u044F \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0430 (\u041F\u041A)",
  mouseRangeSelectLongPressMsDesc: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0440 \u043C\u044B\u0448\u044C\u044E \u043F\u0435\u0440\u0435\u0434 \u0432\u0445\u043E\u0434\u043E\u043C \u0432 \u0440\u0435\u0436\u0438\u043C \u0432\u044B\u0431\u043E\u0440\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 \u0431\u043B\u043E\u043A\u043E\u0432 (\u043C\u0441)",
  autoScrollEdgeZonePx: "\u0417\u043E\u043D\u0430 \u0430\u0432\u0442\u043E\u043F\u0440\u043E\u043A\u0440\u0443\u0442\u043A\u0438",
  autoScrollEdgeZonePxDesc: "\u0420\u0430\u0441\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043E\u0442 \u043A\u0440\u0430\u044F \u043E\u043A\u043D\u0430 \u0434\u043B\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0430\u0432\u0442\u043E\u043F\u0440\u043E\u043A\u0440\u0443\u0442\u043A\u0438 \u043F\u0440\u0438 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0438 (\u043F\u0438\u043A\u0441)",
  autoScrollMaxSpeedPx: "\u041C\u0430\u043A\u0441. \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0430\u0432\u0442\u043E\u043F\u0440\u043E\u043A\u0440\u0443\u0442\u043A\u0438",
  autoScrollMaxSpeedPxDesc: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439 \u043F\u0440\u043E\u043A\u0440\u0443\u0442\u043A\u0438 \u0437\u0430 \u043A\u0430\u0434\u0440",
  disableMobileDragModeAfterDrop: "\u041E\u0442\u043A\u043B\u044E\u0447\u0430\u0442\u044C \u0440\u0435\u0436\u0438\u043C \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u044F \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u044F",
  disableMobileDragModeAfterDropDesc: "\u041D\u0430 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u043C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0432\u044B\u0445\u043E\u0434\u0438\u0442\u044C \u0438\u0437 \u0440\u0435\u0436\u0438\u043C\u0430 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u044F \u043F\u043E\u0441\u043B\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E\u0433\u043E \u043F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0431\u043B\u043E\u043A\u0430",
  mobileTextLongPressDrag: "\u041F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435 \u0434\u043E\u043B\u0433\u0438\u043C \u043D\u0430\u0436\u0430\u0442\u0438\u0435\u043C \u043D\u0430 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u043C",
  mobileTextLongPressDragDesc: "\u041D\u0430 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u043C \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0441\u0442\u0440\u043E\u043A\u0443 \u0442\u0435\u043A\u0441\u0442\u0430 \u0438\u043B\u0438 \u0431\u043B\u043E\u043A, \u0447\u0442\u043E\u0431\u044B \u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u044C \u0435\u0433\u043E \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u0431\u0435\u0437 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u043C\u0430\u0440\u043A\u0435\u0440\u0430",
  mobileDragModeToggleLocations: "\u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043A\u043D\u043E\u043F\u043A\u0438",
  mobileDragModeToggleLocationsDesc: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435, \u0433\u0434\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044C \u0440\u0435\u0436\u0438\u043C\u0430 \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u044F \u043D\u0430 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u043C. \u041C\u043E\u0436\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432 \u0438\u043B\u0438 \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E",
  optionMobileDragModeToggleViewAction: "\u041F\u0430\u043D\u0435\u043B\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439",
  enableCrossFileDrag: "\u041F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435 \u043C\u0435\u0436\u0434\u0443 \u0444\u0430\u0439\u043B\u0430\u043C\u0438",
  enableCrossFileDragDesc: "\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u043D\u0438\u0435 \u0431\u043B\u043E\u043A\u043E\u0432 \u0432 \u0434\u0440\u0443\u0433\u043E\u0439 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0439 \u0444\u0430\u0439\u043B",
  mobileOnlyNotice: "\u26A0\uFE0F \u042D\u0442\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435"
};

// src/plugin/i18n/index.ts
function t() {
  const locale = import_obsidian4.moment.locale();
  return locale.startsWith("zh") ? zhCn : locale.startsWith("ru") ? ru : en;
}

// src/plugin/settings-types.ts
var DEFAULT_MULTI_LINE_SELECTION_LONG_PRESS_MS = 900;
var NUMERIC_SETTING_RANGES = {
  handleSize: { min: MIN_HANDLE_SIZE_PX, max: MAX_HANDLE_SIZE_PX, step: 2 },
  handleHorizontalOffsetPx: { min: -80, max: 80, step: 1 },
  multiLineSelectionLongPressMs: { min: 300, max: 2e3, step: 50 },
  mobileDragLongPressMs: { min: 50, max: 800, step: 10 },
  mouseRangeSelectLongPressMs: { min: 50, max: 800, step: 10 },
  autoScrollEdgeZonePx: { min: 20, max: 200, step: 4 },
  autoScrollMaxSpeedPx: { min: 4, max: 60, step: 2 }
};
var DEFAULT_SETTINGS = {
  handleColorMode: "theme",
  handleColor: "#8a8a8a",
  handleVisibility: "hover",
  handleIcon: "grip-dots",
  handleSize: DEFAULT_HANDLE_SIZE_PX,
  indicatorColorMode: "theme",
  indicatorColor: "#7a7a7a",
  enableCrossFileDrag: true,
  enableMultiLineSelection: true,
  multiLineSelectionLongPressMs: DEFAULT_MULTI_LINE_SELECTION_LONG_PRESS_MS,
  mobileDragLongPressMs: 200,
  mouseRangeSelectLongPressMs: 500,
  autoScrollEdgeZonePx: 60,
  autoScrollMaxSpeedPx: 12,
  disableMobileDragModeAfterDrop: true,
  enableMobileTextLongPressDrag: true,
  mobileDragModeToggleLocations: ["view-action"],
  enableBlockSelectionHighlight: true,
  enableListDropHighlight: true,
  selectionVisualStyle: "subtle",
  handleHorizontalOffsetPx: -8,
  handleGutterPosition: "left"
};

// src/plugin/settings.ts
var DragNDropSettingTab = class extends import_obsidian5.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.activeTab = "appearance";
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    const i = t();
    const nav = containerEl.createDiv("dnd-settings-nav");
    const tabAppearance = nav.createEl("button", {
      text: i.headingAppearance,
      cls: `dnd-settings-tab ${this.activeTab === "appearance" ? "is-active" : ""}`
    });
    const tabBehavior = nav.createEl("button", {
      text: i.headingBehavior,
      cls: `dnd-settings-tab ${this.activeTab === "behavior" ? "is-active" : ""}`
    });
    tabAppearance.addEventListener("click", () => {
      this.activeTab = "appearance";
      this.display();
    });
    tabBehavior.addEventListener("click", () => {
      this.activeTab = "behavior";
      this.display();
    });
    if (this.activeTab === "appearance") {
      this.displayAppearance(containerEl, i);
    } else {
      this.displayBehavior(containerEl, i);
    }
  }
  displayAppearance(containerEl, i) {
    new import_obsidian5.Setting(containerEl).setName(i.headingHandle).setHeading();
    new import_obsidian5.Setting(containerEl).setName(i.handleIcon).setDesc(i.handleIconDesc).addDropdown((dropdown) => dropdown.addOption("dot", i.iconDot).addOption("grip-dots", i.iconGripDots).addOption("grip-lines", i.iconGripLines).addOption("square", i.iconSquare).setValue(this.plugin.settings.handleIcon).onChange(async (value) => {
      this.plugin.settings.handleIcon = value;
      await this.plugin.saveSettings();
    }));
    const colorSetting = new import_obsidian5.Setting(containerEl).setName(i.handleColor).setDesc(i.handleColorDesc);
    const themeAccent = this.resolveThemeAccent();
    colorSetting.addDropdown((dropdown) => dropdown.addOption("theme", i.optionTheme).addOption("custom", i.optionCustom).setValue(this.plugin.settings.handleColorMode).onChange(async (value) => {
      this.plugin.settings.handleColorMode = value;
      await this.plugin.saveSettings();
      this.display();
    }));
    colorSetting.addColorPicker((picker) => {
      const isTheme = this.plugin.settings.handleColorMode === "theme";
      picker.setValue(isTheme ? themeAccent : this.plugin.settings.handleColor).setDisabled(isTheme).onChange(async (value) => {
        this.plugin.settings.handleColor = value;
        await this.plugin.saveSettings();
      });
    });
    this.addNumericSetting(containerEl, {
      name: i.handleSize,
      desc: i.handleSizeDesc,
      ...NUMERIC_SETTING_RANGES.handleSize,
      value: this.plugin.settings.handleSize,
      defaultValue: DEFAULT_SETTINGS.handleSize,
      onChange: async (v) => {
        this.plugin.settings.handleSize = v;
        await this.plugin.saveSettings();
      }
    });
    new import_obsidian5.Setting(containerEl).setName(i.handleVisibility).setDesc(i.handleVisibilityDesc).addDropdown((dropdown) => dropdown.addOption("hover", i.optionHover).addOption("always", i.optionAlways).addOption("hidden", i.optionHidden).setValue(this.plugin.settings.handleVisibility).onChange(async (value) => {
      this.plugin.settings.handleVisibility = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian5.Setting(containerEl).setName(i.handleGutterPosition).setDesc(i.handleGutterPositionDesc).addDropdown((dropdown) => dropdown.addOption("left", i.optionLeft).addOption("right", i.optionRight).setValue(this.plugin.settings.handleGutterPosition).onChange(async (value) => {
      this.plugin.settings.handleGutterPosition = value;
      await this.plugin.saveSettings();
    }));
    this.addNumericSetting(containerEl, {
      name: i.handleOffset,
      desc: i.handleOffsetDesc,
      ...NUMERIC_SETTING_RANGES.handleHorizontalOffsetPx,
      value: this.plugin.settings.handleHorizontalOffsetPx,
      defaultValue: DEFAULT_SETTINGS.handleHorizontalOffsetPx,
      onChange: async (v) => {
        this.plugin.settings.handleHorizontalOffsetPx = v;
        await this.plugin.saveSettings();
      }
    });
    new import_obsidian5.Setting(containerEl).setName(i.headingHighlight).setHeading();
    new import_obsidian5.Setting(containerEl).setName(i.selectionVisualStyle).setDesc(i.selectionVisualStyleDesc).addDropdown((dropdown) => dropdown.addOption("outline", i.optionBlockSelectionVisualOutline).addOption("subtle", i.optionBlockSelectionVisualSubtle).addOption("filled", i.optionBlockSelectionVisualFilled).setValue(this.plugin.settings.selectionVisualStyle).onChange(async (value) => {
      this.plugin.settings.selectionVisualStyle = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian5.Setting(containerEl).setName(i.enableBlockSelectionHighlight).setDesc(i.enableBlockSelectionHighlightDesc).addToggle((toggle) => toggle.setValue(this.plugin.settings.enableBlockSelectionHighlight).onChange(async (value) => {
      this.plugin.settings.enableBlockSelectionHighlight = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian5.Setting(containerEl).setName(i.enableListDropHighlight).setDesc(i.enableListDropHighlightDesc).addToggle((toggle) => toggle.setValue(this.plugin.settings.enableListDropHighlight).onChange(async (value) => {
      this.plugin.settings.enableListDropHighlight = value;
      await this.plugin.saveSettings();
    }));
    const indicatorSetting = new import_obsidian5.Setting(containerEl).setName(i.indicatorColor).setDesc(i.indicatorColorDesc);
    indicatorSetting.addDropdown((dropdown) => dropdown.addOption("theme", i.optionTheme).addOption("custom", i.optionCustom).setValue(this.plugin.settings.indicatorColorMode).onChange(async (value) => {
      this.plugin.settings.indicatorColorMode = value;
      await this.plugin.saveSettings();
      this.display();
    }));
    indicatorSetting.addColorPicker((picker) => {
      const isTheme = this.plugin.settings.indicatorColorMode === "theme";
      picker.setValue(isTheme ? themeAccent : this.plugin.settings.indicatorColor).setDisabled(isTheme).onChange(async (value) => {
        this.plugin.settings.indicatorColor = value;
        await this.plugin.saveSettings();
      });
    });
  }
  displayBehavior(containerEl, i) {
    new import_obsidian5.Setting(containerEl).setName(i.multiLineSelection).setDesc(i.multiLineSelectionDesc).addToggle((toggle) => toggle.setValue(this.plugin.settings.enableMultiLineSelection).onChange(async (value) => {
      this.plugin.settings.enableMultiLineSelection = value;
      await this.plugin.saveSettings();
    }));
    this.addNumericSetting(containerEl, {
      name: i.multiLineSelectionLongPressMs,
      desc: i.multiLineSelectionLongPressMsDesc,
      ...NUMERIC_SETTING_RANGES.multiLineSelectionLongPressMs,
      value: this.plugin.settings.multiLineSelectionLongPressMs,
      defaultValue: DEFAULT_SETTINGS.multiLineSelectionLongPressMs,
      onChange: async (v) => {
        this.plugin.settings.multiLineSelectionLongPressMs = v;
        await this.plugin.saveSettings();
      }
    });
    new import_obsidian5.Setting(containerEl).setName(i.enableCrossFileDrag).setDesc(i.enableCrossFileDragDesc).addToggle((toggle) => toggle.setValue(this.plugin.settings.enableCrossFileDrag).onChange(async (value) => {
      this.plugin.settings.enableCrossFileDrag = value;
      await this.plugin.saveSettings();
    }));
    this.addNumericSetting(containerEl, {
      name: i.mobileDragLongPressMs,
      desc: i.mobileDragLongPressMsDesc,
      ...NUMERIC_SETTING_RANGES.mobileDragLongPressMs,
      value: this.plugin.settings.mobileDragLongPressMs,
      defaultValue: DEFAULT_SETTINGS.mobileDragLongPressMs,
      onChange: async (v) => {
        this.plugin.settings.mobileDragLongPressMs = v;
        await this.plugin.saveSettings();
      }
    });
    this.addNumericSetting(containerEl, {
      name: i.mouseRangeSelectLongPressMs,
      desc: i.mouseRangeSelectLongPressMsDesc,
      ...NUMERIC_SETTING_RANGES.mouseRangeSelectLongPressMs,
      value: this.plugin.settings.mouseRangeSelectLongPressMs,
      defaultValue: DEFAULT_SETTINGS.mouseRangeSelectLongPressMs,
      onChange: async (v) => {
        this.plugin.settings.mouseRangeSelectLongPressMs = v;
        await this.plugin.saveSettings();
      }
    });
    this.addNumericSetting(containerEl, {
      name: i.autoScrollEdgeZonePx,
      desc: i.autoScrollEdgeZonePxDesc,
      ...NUMERIC_SETTING_RANGES.autoScrollEdgeZonePx,
      value: this.plugin.settings.autoScrollEdgeZonePx,
      defaultValue: DEFAULT_SETTINGS.autoScrollEdgeZonePx,
      onChange: async (v) => {
        this.plugin.settings.autoScrollEdgeZonePx = v;
        await this.plugin.saveSettings();
      }
    });
    this.addNumericSetting(containerEl, {
      name: i.autoScrollMaxSpeedPx,
      desc: i.autoScrollMaxSpeedPxDesc,
      ...NUMERIC_SETTING_RANGES.autoScrollMaxSpeedPx,
      value: this.plugin.settings.autoScrollMaxSpeedPx,
      defaultValue: DEFAULT_SETTINGS.autoScrollMaxSpeedPx,
      onChange: async (v) => {
        this.plugin.settings.autoScrollMaxSpeedPx = v;
        await this.plugin.saveSettings();
      }
    });
    const isMobile = platform.isMobile;
    new import_obsidian5.Setting(containerEl).setName(i.headingMobile).setHeading();
    if (!isMobile) {
      new import_obsidian5.Setting(containerEl).setDesc(i.mobileOnlyNotice);
    }
    new import_obsidian5.Setting(containerEl).setName(i.mobileTextLongPressDrag).setDesc(i.mobileTextLongPressDragDesc).addToggle((toggle) => toggle.setValue(this.plugin.settings.enableMobileTextLongPressDrag).setDisabled(!isMobile).onChange(async (value) => {
      this.plugin.settings.enableMobileTextLongPressDrag = value;
      await this.plugin.saveSettings();
      this.display();
    }));
    if (this.plugin.settings.enableMobileTextLongPressDrag && isMobile) {
      new import_obsidian5.Setting(containerEl).setName(i.disableMobileDragModeAfterDrop).setDesc(i.disableMobileDragModeAfterDropDesc).addToggle((toggle) => toggle.setValue(this.plugin.settings.disableMobileDragModeAfterDrop).onChange(async (value) => {
        this.plugin.settings.disableMobileDragModeAfterDrop = value;
        await this.plugin.saveSettings();
      }));
      new import_obsidian5.Setting(containerEl).setName(i.mobileDragModeToggleLocations).setHeading();
      const toggleLocation = async (location, enabled) => {
        const next = new Set(this.plugin.settings.mobileDragModeToggleLocations);
        if (enabled) {
          next.add(location);
        } else {
          next.delete(location);
        }
        this.plugin.settings.mobileDragModeToggleLocations = Array.from(next);
        await this.plugin.saveSettings();
      };
      new import_obsidian5.Setting(containerEl).setName(i.optionMobileDragModeToggleViewAction).addToggle((toggle) => toggle.setValue(this.plugin.settings.mobileDragModeToggleLocations.includes("view-action")).onChange((value) => toggleLocation("view-action", value)));
    }
  }
  addNumericSetting(containerEl, opts) {
    let textInput;
    let resetBtn;
    let currentValue = opts.value;
    const updateResetVisibility = () => {
      resetBtn.extraSettingsEl.toggle(currentValue !== opts.defaultValue);
    };
    new import_obsidian5.Setting(containerEl).setName(opts.name).setDesc(opts.desc).addSlider((slider) => slider.setLimits(opts.min, opts.max, opts.step).setValue(opts.value).onChange(async (value) => {
      currentValue = value;
      textInput.setValue(String(value));
      updateResetVisibility();
      await opts.onChange(value);
    })).addText((text) => {
      textInput = text;
      text.inputEl.type = "number";
      text.inputEl.addClass("dnd-setting-number-input");
      text.setValue(String(opts.value));
      text.inputEl.addEventListener("blur", () => {
        const v = Math.round(Math.max(opts.min, Math.min(opts.max, Number(text.inputEl.value) || opts.defaultValue)));
        currentValue = v;
        text.setValue(String(v));
        updateResetVisibility();
        void opts.onChange(v);
      });
      text.inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          text.inputEl.blur();
        }
      });
    }).addExtraButton((btn) => {
      resetBtn = btn;
      btn.setIcon("reset").onClick(() => {
        void opts.onChange(opts.defaultValue).then(() => this.display());
      });
      btn.extraSettingsEl.toggle(opts.value !== opts.defaultValue);
    });
  }
  resolveThemeAccent() {
    const el = activeDocument.body.createEl("div", { cls: "dnd-theme-accent-probe" });
    const rgb = getComputedStyle(el).backgroundColor;
    el.remove();
    const match = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (!match)
      return "#7b6cd9";
    const [, r, g, b] = match;
    return `#${[r, g, b].map((c) => Number(c).toString(16).padStart(2, "0")).join("")}`;
  }
};

// src/plugin/settings-migrations.ts
var SCHEMA_VERSION_KEY = "schemaVersion";
var CURRENT_SCHEMA_VERSION = 3;
var MIGRATIONS = [
  // v0 -> v1: consolidate legacy field shapes from versions before the
  // migration system existed.
  (data) => {
    const next = { ...data };
    if ("alwaysShowHandles" in next && !("handleVisibility" in next)) {
      next.handleVisibility = next.alwaysShowHandles ? "always" : "hover";
    }
    delete next.alwaysShowHandles;
    if (next.selectionVisualStyle === "none") {
      next.selectionVisualStyle = "outline";
      if (!("enableBlockSelectionHighlight" in next)) {
        next.enableBlockSelectionHighlight = false;
      }
      if (!("enableListDropHighlight" in next)) {
        next.enableListDropHighlight = false;
      }
    }
    delete next.requireMobileDragMode;
    return next;
  },
  // v1 -> v2: retune auto-scroll defaults. Existing installs persisted a
  // complete data.json on load, so legacy default values need an explicit
  // migration; custom values are left untouched.
  (data) => {
    const next = { ...data };
    if (next.autoScrollEdgeZonePx === 88) {
      next.autoScrollEdgeZonePx = DEFAULT_SETTINGS.autoScrollEdgeZonePx;
    }
    if (next.autoScrollMaxSpeedPx === 22) {
      next.autoScrollMaxSpeedPx = DEFAULT_SETTINGS.autoScrollMaxSpeedPx;
    }
    return next;
  },
  // v2 -> v3: reduce accidental desktop multi-select entry during normal
  // handle drag. Existing installs persisted the old default value, so only
  // migrate that value and preserve custom timings.
  (data) => {
    const next = { ...data };
    if (next.mouseRangeSelectLongPressMs === 260) {
      next.mouseRangeSelectLongPressMs = DEFAULT_SETTINGS.mouseRangeSelectLongPressMs;
    }
    return next;
  }
];
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function clampNumericSettings(settings) {
  for (const key of Object.keys(NUMERIC_SETTING_RANGES)) {
    const { min, max } = NUMERIC_SETTING_RANGES[key];
    const raw = settings[key];
    settings[key] = Number.isFinite(raw) ? Math.round(Math.min(max, Math.max(min, raw))) : DEFAULT_SETTINGS[key];
  }
}
function migrateSettings(saved) {
  const raw = isRecord(saved) ? { ...saved } : {};
  const storedVersion = raw[SCHEMA_VERSION_KEY];
  const fromVersion = typeof storedVersion === "number" ? storedVersion : 0;
  let data = raw;
  for (let v = fromVersion; v < CURRENT_SCHEMA_VERSION; v++) {
    data = MIGRATIONS[v](data);
  }
  const merged = {
    ...DEFAULT_SETTINGS,
    ...data,
    [SCHEMA_VERSION_KEY]: CURRENT_SCHEMA_VERSION
  };
  clampNumericSettings(merged);
  return merged;
}

// src/plugin/mobile-toolbar-commands.ts
var import_obsidian6 = require("obsidian");

// src/platform/obsidian/workspace.ts
function getActiveLeaf(app) {
  var _a;
  return (_a = app.workspace.getMostRecentLeaf()) != null ? _a : null;
}

// src/platform/obsidian/app-adapter.ts
function getActiveMarkdownView(app) {
  var _a;
  const leaf = getActiveLeaf(app);
  if (!leaf)
    return null;
  const view = leaf.view;
  return ((_a = view.getViewType) == null ? void 0 : _a.call(view)) === "markdown" ? view : null;
}

// src/plugin/mobile-toolbar-commands.ts
function getActiveEditorView(app) {
  const markdownView = getActiveMarkdownView(app);
  if (!markdownView)
    return null;
  return getCodeMirrorView(markdownView);
}
function registerMobileToolbarCommands(plugin) {
  plugin.addCommand({
    id: "open-current-block-type-menu",
    name: "Change current block type",
    icon: "replace",
    mobileOnly: true,
    checkCallback: (checking) => {
      if (!platform.isMobile)
        return false;
      const view = getActiveEditorView(plugin.app);
      if (!view)
        return false;
      if (!checking) {
        openBlockTypeMenu(view, null);
      }
      return true;
    }
  });
  plugin.addCommand({
    id: "enter-mobile-block-multi-select",
    name: "Select multiple blocks",
    icon: "list-checks",
    mobileOnly: true,
    checkCallback: (checking) => {
      if (!platform.isMobile)
        return false;
      const view = getActiveEditorView(plugin.app);
      if (!view)
        return false;
      if (!checking) {
        const event = new CustomEvent("dnd:enter-mobile-selection-mode", {
          bubbles: true,
          detail: { handled: false }
        });
        view.dom.dispatchEvent(event);
        if (!event.detail.handled) {
          new import_obsidian6.Notice("Unable to enter block selection mode.");
        }
      }
      return true;
    }
  });
  plugin.addCommand({
    id: "toggle-mobile-drag-mode",
    name: "Toggle mobile drag mode",
    icon: "hand",
    mobileOnly: true,
    checkCallback: (checking) => {
      if (!platform.isMobile)
        return false;
      if (!checking) {
        plugin.toggleMobileDragMode();
      }
      return true;
    }
  });
}

// src/plugin/main.ts
var DragNDropPlugin = class extends import_obsidian7.Plugin {
  constructor() {
    super(...arguments);
    this.dragLifecycleListeners = /* @__PURE__ */ new Set();
    this.mobileDragModeActionByView = /* @__PURE__ */ new WeakMap();
    this.mobileDragModeActionEls = /* @__PURE__ */ new Set();
    this.mobileDragModeEnabled = false;
  }
  async onload() {
    await this.loadSettings();
    this.registerEditorExtension(dragHandleExtension(this));
    registerMobileToolbarCommands(this);
    this.app.workspace.onLayoutReady(() => this.registerMobileDragModeActions());
    this.registerEvent(this.app.workspace.on("layout-change", () => this.registerMobileDragModeActions()));
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.registerMobileDragModeActions()));
    this.registerEvent(this.app.workspace.on("file-open", () => this.registerMobileDragModeActions()));
    const externalFileDropController = new ExternalFileDropController(this);
    externalFileDropController.register();
    this.addSettingTab(new DragNDropSettingTab(this.app, this));
  }
  onunload() {
    this.dragLifecycleListeners.clear();
    for (const actionEl of this.mobileDragModeActionEls) {
      actionEl.remove();
    }
    this.mobileDragModeActionEls.clear();
  }
  async loadSettings() {
    this.settings = migrateSettings(await this.loadData());
    await this.saveData(this.settings);
    this.applySettings();
  }
  async saveSettings() {
    this.applySettings();
    await this.saveData(this.settings);
  }
  applySettings() {
    const body = activeDocument.body;
    if (!this.settings.enableMobileTextLongPressDrag) {
      this.mobileDragModeEnabled = false;
    }
    const visibility = this.settings.handleVisibility;
    body.classList.toggle("dnd-handles-always", visibility === "always");
    body.classList.toggle("dnd-handles-hidden", visibility === "hidden");
    body.classList.toggle("dnd-mobile-handles-hidden", platform.isMobile && !this.settings.enableMobileTextLongPressDrag);
    body.classList.toggle("dnd-mobile-drag-mode-enabled", this.mobileDragModeEnabled);
    const selectionVisualStyle = this.settings.selectionVisualStyle;
    body.setAttribute(DND_DRAG_SOURCE_STYLE_ATTR, selectionVisualStyle);
    body.setAttribute(DND_DRAG_SOURCE_HIGHLIGHT_ATTR, this.settings.enableBlockSelectionHighlight ? "on" : "off");
    body.setAttribute(DND_LIST_DROP_HIGHLIGHT_ATTR, this.settings.enableListDropHighlight ? "on" : "off");
    const handleOffset = this.settings.handleHorizontalOffsetPx;
    setHandleHorizontalOffsetPx(handleOffset);
    body.setCssProps({
      "--dnd-handle-horizontal-offset-px": `${handleOffset}px`
    });
    let colorValue = "";
    if (this.settings.handleColorMode === "theme") {
      colorValue = "var(--interactive-accent)";
    } else if (this.settings.handleColor) {
      colorValue = this.settings.handleColor;
    }
    if (colorValue) {
      body.setCssProps({
        "--dnd-handle-color": colorValue,
        "--dnd-handle-color-hover": colorValue
      });
    } else {
      body.setCssProps({
        "--dnd-handle-color": "",
        "--dnd-handle-color-hover": ""
      });
    }
    let indicatorColorValue = "";
    if (this.settings.indicatorColorMode === "theme") {
      indicatorColorValue = "var(--interactive-accent)";
    } else if (this.settings.indicatorColor) {
      indicatorColorValue = this.settings.indicatorColor;
    }
    if (indicatorColorValue) {
      body.setCssProps({
        "--dnd-drop-indicator-color": indicatorColorValue
      });
    } else {
      body.setCssProps({
        "--dnd-drop-indicator-color": ""
      });
    }
    const handleSize = this.settings.handleSize;
    setHandleSizePx(handleSize);
    body.setCssProps({
      "--dnd-handle-size": `${handleSize}px`,
      "--dnd-handle-core-size": `${Math.round(handleSize * HANDLE_CORE_SIZE_RATIO)}px`,
      "--dnd-grip-dots-core-size": `${Math.round(handleSize * GRIP_DOTS_CORE_SIZE_RATIO)}px`
    });
    body.setAttribute(DND_HANDLE_ICON_ATTR, this.settings.handleIcon);
    window.dispatchEvent(new Event("dnd:settings-updated"));
    this.syncMobileDragModeActionVisibility();
  }
  onDragLifecycleEvent(listener) {
    this.dragLifecycleListeners.add(listener);
    return () => {
      this.dragLifecycleListeners.delete(listener);
    };
  }
  emitDragLifecycleEvent(event) {
    this.handleMobileDragModeLifecycle(event);
    for (const listener of Array.from(this.dragLifecycleListeners)) {
      try {
        listener(event);
      } catch (error) {
        console.error("[Dragger] drag lifecycle listener failed:", error);
      }
    }
  }
  isMobileDragModeEnabled() {
    return this.mobileDragModeEnabled;
  }
  toggleMobileDragMode() {
    if (!this.settings.enableMobileTextLongPressDrag) {
      this.setMobileDragModeEnabled(false);
      return false;
    }
    this.setMobileDragModeEnabled(!this.mobileDragModeEnabled);
    return this.mobileDragModeEnabled;
  }
  setMobileDragModeEnabled(enabled) {
    if (this.mobileDragModeEnabled === enabled)
      return;
    this.mobileDragModeEnabled = enabled;
    if (enabled) {
      this.dismissActiveMobileInput();
    }
    this.applySettings();
    this.syncMobileDragModeActionIcons();
  }
  dismissActiveMobileInput() {
    var _a;
    if (!platform.isMobile)
      return;
    const win = activeWindow;
    const active = activeDocument.activeElement;
    if (!(active instanceof win.HTMLElement))
      return;
    const shouldBlur = active.instanceOf(win.HTMLInputElement) || active.instanceOf(win.HTMLTextAreaElement) || active.isContentEditable || !!active.closest(".cm-content");
    if (!shouldBlur)
      return;
    active.blur();
    try {
      (_a = window.getSelection()) == null ? void 0 : _a.removeAllRanges();
    } catch (e) {
    }
  }
  handleMobileDragModeLifecycle(event) {
    if (event.type !== "drag_drop_commit")
      return;
    if (!platform.isMobile)
      return;
    if (this.settings.disableMobileDragModeAfterDrop === false)
      return;
    this.setMobileDragModeEnabled(false);
  }
  registerMobileDragModeActions() {
    if (!platform.isMobile)
      return;
    if (!this.isMobileDragModeToggleLocationEnabled("view-action")) {
      this.removeMobileDragModeActions();
      return;
    }
    for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
      const view = leaf.view;
      if (!(view instanceof import_obsidian7.MarkdownView))
        continue;
      const existingActionEl = this.mobileDragModeActionByView.get(view);
      if (existingActionEl == null ? void 0 : existingActionEl.isConnected)
        continue;
      if (existingActionEl) {
        this.mobileDragModeActionEls.delete(existingActionEl);
      }
      const actionEl = view.addAction(this.getMobileDragModeActionIcon(), this.getMobileDragModeActionTitle(), (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.toggleMobileDragMode();
      });
      this.mobileDragModeActionByView.set(view, actionEl);
      this.mobileDragModeActionEls.add(actionEl);
      this.syncMobileDragModeActionEl(actionEl);
    }
  }
  syncMobileDragModeActionVisibility() {
    if (!platform.isMobile)
      return;
    if (!this.isMobileDragModeToggleLocationEnabled("view-action")) {
      this.removeMobileDragModeActions();
      return;
    }
    this.registerMobileDragModeActions();
  }
  removeMobileDragModeActions() {
    for (const actionEl of Array.from(this.mobileDragModeActionEls)) {
      actionEl.remove();
    }
    this.mobileDragModeActionEls.clear();
    this.mobileDragModeActionByView = /* @__PURE__ */ new WeakMap();
  }
  syncMobileDragModeActionIcons() {
    for (const actionEl of Array.from(this.mobileDragModeActionEls)) {
      if (!actionEl.isConnected) {
        this.mobileDragModeActionEls.delete(actionEl);
        continue;
      }
      this.syncMobileDragModeActionEl(actionEl);
    }
  }
  syncMobileDragModeActionEl(actionEl) {
    const title = this.getMobileDragModeActionTitle();
    (0, import_obsidian7.setIcon)(actionEl, this.getMobileDragModeActionIcon());
    actionEl.setAttribute("aria-label", title);
    actionEl.setAttribute("aria-pressed", String(this.mobileDragModeEnabled));
    actionEl.setAttribute("title", title);
  }
  getMobileDragModeActionIcon() {
    return this.mobileDragModeEnabled ? "check" : "hand";
  }
  getMobileDragModeActionTitle() {
    return this.mobileDragModeEnabled ? "Drag mode enabled" : "Drag mode disabled";
  }
  isMobileDragModeToggleLocationEnabled(location) {
    return this.settings.enableMobileTextLongPressDrag && this.settings.mobileDragModeToggleLocations.includes(location);
  }
};

/* nosourcemap */