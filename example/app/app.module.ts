import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {MarkdownModule} from '../../src/markdown.module'

@NgModule({
  declarations: [AppComponent],
  imports     : [BrowserModule, FormsModule, CommonModule, MarkdownModule],
  providers   : [],
  bootstrap   : [AppComponent]
})
export class AppModule { }
