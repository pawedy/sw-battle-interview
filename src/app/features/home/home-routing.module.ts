import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { APP_TITLE } from '../../core/constants';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: `${APP_TITLE} - Home`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
