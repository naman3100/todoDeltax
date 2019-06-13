import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'first', pathMatch: 'full' },
  { path: 'first', 
    children:[
      {
        path:'',
        loadChildren: './first/first.module#FirstPageModule' 
      },
      {
        path:':todoId',
        loadChildren: './first/todo-detail/todo-detail.module#TodoDetailPageModule'
      }
]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
