import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'item', loadChildren: () => import('./item/item.module').then(m => m.ItemModule) },
  { path: '**', redirectTo: 'item' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
