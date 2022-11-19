import fs from "fs";
import path from "path";

import { describe, it, expect, vi, beforeEach } from "vitest";
import { Window } from "happy-dom";

import { showError } from "./dom";

const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;
vi.stubGlobal("document", document);

beforeEach(()=>{
    document.body.innerHTML = ''
    document.write(htmlDocumentContent);

})

it("should add an error paragraph to the id='errors' elemnts", () => {
  showError("Test");

  const errorEl = document.getElementById("errors");
  const errorParagraph = errorEl.firstElementChild

  expect(errorParagraph).not.toBeNull();
});

it("should not contain an error paragraph initially", () => {
  
    const errorEl = document.getElementById("errors");
    const errorParagraph = errorEl.firstElementChild
  
    expect(errorParagraph).toBeNull();
  });