<<<<<<< HEAD
import debounce from "lodash/debounce";
import CodeMirror from "codemirror";
import { parser } from "../dist/jcl.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/shadowfox.css";
import "./styles/main.less";

class Editor {
  constructor(editor_id, output_id, options) {
    const $container = document.getElementById(editor_id);
    this.code_editor = CodeMirror.fromTextArea($container, {
      lineNumbers: true,
      mode: "jcl",
      matchBrackets: true,
      theme: "shadowfox"
    });
    this.$gutter = document.querySelector(".CodeMirror-gutters");

    this.$output = document.getElementById(output_id);
    this.initialize();
  }
  validate() {
    try {
      parser.parse(this.code_editor.getValue());
      this.$output.textContent = "";
      this.clear_gutter_mark();
    } catch (e) {
      const matches = e.message.match("line ([0-9]*)");
      this.$gutter.classList.toggle("error", true);
      if (matches) {
        this.code_editor.addLineClass(
          parseInt(matches[1] - 1),
          "gutter",
          "error-line"
        );
      } else {
        throw e;
        this.$output.textContent = e;
      }
    }
  }
  clear_gutter_mark() {
    this.$gutter.classList.toggle("error", false);
    this.code_editor.eachLine(line => {
      this.code_editor.removeLineClass(line, "gutter", "error-line");
    });
  }
  initialize() {
    this.code_editor.on("changes", debounce(this.validate.bind(this), 500));
=======
import fs from "fs";
import debounce from "lodash/debounce";
import CodeMirror from "codemirror";
import Parser from "../src/jcl.parser";
<<<<<<< HEAD
=======
import Tooltip from "tooltip.js";
>>>>>>> 277a1cfdd91b86e4807f53aab10a7d1e170ba358
import "codemirror/lib/codemirror.css";
import "./styles/3024-day.css";
import "codemirror/addon/lint/lint.css";
import "./styles/main.less";

<<<<<<< HEAD
=======
const correctMessage = "All going well!";
>>>>>>> 277a1cfdd91b86e4807f53aab10a7d1e170ba358
class Editor {
  constructor(editorId, outputId, options) {
    const codeEditorOptions = {
      lineNumbers: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-lint-markers"],
      theme: "3024-day",
<<<<<<< HEAD
      lint: true
=======
      lint: true,
      styleSelectedText: true
>>>>>>> 277a1cfdd91b86e4807f53aab10a7d1e170ba358
    };
    this.lineHandles = [];
    this.parser = new Parser();
    this.$container = document.getElementById(editorId);
    this.$output = document.getElementById(outputId);

    this.$container.value = fs.readFileSync("./sample", "utf8");
    this.codeEditor = CodeMirror.fromTextArea(
      this.$container,
      codeEditorOptions
    );
    this.$gutter = document.querySelector(".CodeMirror-gutters");
    this.initEvents();
  }
  validate() {
    this.clear_marks();
    this.parser.parse(this.codeEditor.getValue());
    const errors = this.parser.errors;
    if (errors.length !== 0) {
      this.toggle_gutter_error(true);
      this.handleErrors(errors);
    } else {
<<<<<<< HEAD
=======
      this.update_output_message(correctMessage);
>>>>>>> 277a1cfdd91b86e4807f53aab10a7d1e170ba358
      this.toggle_gutter_error(false);
    }
  }
  handleErrors(errors) {
    errors.forEach(err => {
      const { first_line, last_line, first_column, last_column } = err.location;
      const lineHandle = this.codeEditor.getLineHandle(first_line - 1);
      const marker = this.codeEditor.markText(
        CodeMirror.Pos(first_line - 1, first_column),
        CodeMirror.Pos(last_line - 1, last_column),
        {
          className: "CodeMirror-lint-mark-error",
          title: "error"
        }
      );
      this.lineHandles.push(lineHandle);
<<<<<<< HEAD
=======
      this.update_output_message(err.message);
>>>>>>> 277a1cfdd91b86e4807f53aab10a7d1e170ba358
      this.codeEditor.addLineClass(lineHandle, "gutter", "error-line");
    });
  }
  clear_marks() {
    this.lineHandles.forEach(line => {
      this.codeEditor.removeLineClass(line, "gutter", "error-line");
    });
    this.codeEditor.getAllMarks().forEach(marker => {
      marker.clear();
    });
  }
  toggle_gutter_error(status = true) {
    this.$gutter.classList.toggle("error", status);
  }
<<<<<<< HEAD
  initEvents() {
=======
  update_output_message(message) {
    this.outputContainer.updateTitleContent(message);
    this.outputContainer.show();
  }
  initEvents() {
    this.outputContainer = new Tooltip(this.$output, {
      title: correctMessage,
      trigger: "click"
    });
    this.outputContainer.show();
>>>>>>> 277a1cfdd91b86e4807f53aab10a7d1e170ba358
    this.codeEditor.on("changes", debounce(this.validate.bind(this), 500));
>>>>>>> server
  }
}

document.addEventListener("DOMContentLoaded", function() {
<<<<<<< HEAD
  const editor = new Editor("editor", "output");
=======
<<<<<<< HEAD
  const editor = new Editor("editor", "output");
=======
  const editor = new Editor("editor", "watermelon");
>>>>>>> 277a1cfdd91b86e4807f53aab10a7d1e170ba358
>>>>>>> server
});