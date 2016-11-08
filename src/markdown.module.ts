import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MarkdownViewerComponent } from './markdown-viewer/markdown-viewer.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';

@NgModule({
  imports:      [CommonModule, FormsModule],
  providers:    [],
  declarations: [MarkdownViewerComponent, MarkdownEditorComponent],
  exports:      [MarkdownViewerComponent, MarkdownEditorComponent],
})

export class MarkdownModule { }
