import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestTableExampleComponent } from './test-table-example/test-table-example.component';
import { LayoutComponent } from './layout/layout.component';
import { NgxGenericTableModule } from '@elvis11235/ngx-generic-table';



@NgModule({
  declarations: [
    AppComponent,
    TestTableExampleComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGenericTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
