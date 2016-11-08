import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core'

import * as marked from 'marked'

@Component({
  selector:    'markdown-editor',
  styleUrls:   ['markdown-editor.component.css'],
  templateUrl: 'markdown-editor.component.html',
})
export class MarkdownEditorComponent implements OnInit {
  @Input() model: string
  @Output() modelChange = new EventEmitter<string>()
  @ViewChild('editArea') editArea: any;
  preview = false

  constructor() { }

  ngOnInit() { }

  onPreview() {
    this.preview = !this.preview
  }

  getSelection() {
    this.model = this.model || ""
    const start = this.editArea.nativeElement.selectionStart
    const end = this.editArea.nativeElement.selectionEnd
    return {
      start: start,
      end: end,
      text: this.model.substring(start, end),
      length: end-start
    }
  }

  getSelectionLength() {
    const start = this.editArea.nativeElement.selectionStart
    const end = this.editArea.nativeElement.selectionEnd
    return end-start
  }

  setSelection(left:number, length:number) {
    const s = this.editArea.nativeElement
    s.focus()
    s.selectionStart = left
    s.selectionEnd = left + length
  }

  replaceSelection(newText) {
    const selection = this.getSelection()
    newText = newText.replace("${text}", selection.text)
    this.model = `${this.model.substring(0,selection.start)}${newText}${this.model.substring(selection.end)}`
    this.modelChange.emit(this.model)
    this.setSelection(selection.start, newText.length)
  }

  insertText(newText) {
    const selection = this.getSelection()
    this.model = `${this.model.substring(0,selection.start)}${newText}${this.model.substring(selection.start)}`
    this.modelChange.emit(this.model)
    this.setSelection(selection.start, newText.length)
  }

  onEditor(param) {
    switch(param) {
      case "bold":
        if (this.getSelectionLength()) this.replaceSelection("**${text}**")
        else this.insertText("**bold**")
        break
      case "italic":
        if (this.getSelectionLength()) this.replaceSelection("_${text}_")
        else this.insertText("_italic_")
        break
      case "underline":
        if (this.getSelectionLength()) this.replaceSelection("<u>${text}</u>")
        else this.insertText("_underline_")
        break
      case "code":
        if (this.getSelectionLength()) this.replaceSelection("`${text}`")
        else this.insertText("`code`")
        break
      case "codeblock":
        if (this.getSelectionLength()) this.replaceSelection("\n```\n${text}\n```\n")
        else this.insertText("\n```\ncode block\n```\n")
        break
      case "quote":
        const sel = this.getSelection()
        if (sel.length) {
          this.replaceSelection(`\n> ${sel.text.replace(/\n/g, '\n> ')}\n\n`)
        }
        else this.insertText("> quote paragraph 1\n\n> quote paragraph 2")
        break
      case "strikethrough":
        if (this.getSelectionLength()) this.replaceSelection("~~${text}~~")
        else this.insertText("~~strikethrough~~")
        break
      case "hr":
        this.insertText("\n\n------\n")
        break
      case "list":
        this.insertText("\n* Item\n")
        break
      case "list-2":
        this.insertText("\n1. Item\n")
        break
      case "header":
        this.insertText("\n# Header\n")
        break
      case "url":
        this.insertText("[link text](url)")
        break
      case "img":
        this.insertText("![alt text](url)")
        break
    }
  }
}
