import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesSelectorComponent } from './resourcesSelector.component';
import { ResourcesListComponent } from './resourcesList.component';
import { PlotGeneratorComponent } from './plotGenerator.component';

const routes: Routes = [
  {path: 'home', component: ResourcesSelectorComponent},
  {path: 'resources', component: ResourcesListComponent},
  {path: 'plotgen', component: PlotGeneratorComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
