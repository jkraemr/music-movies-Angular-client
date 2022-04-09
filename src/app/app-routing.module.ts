/**
 * The AppRoutingModule creates and configures a module which serves all providers and 
 * directives required by the Router service for navigation procedures within the app.
 * @module AppRoutingModule
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
