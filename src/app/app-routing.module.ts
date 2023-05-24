import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestTableExampleComponent } from './test-table-example/test-table-example.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: 'users',
    component: TestTableExampleComponent,
  },
  {
    path: 'layout',
    component: LayoutComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
