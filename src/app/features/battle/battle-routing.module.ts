import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BattleComponent } from './battle.component';
import { APP_TITLE } from '../../constants';

const routes: Routes = [
  {
    path: '',
    component: BattleComponent,
    title: `${APP_TITLE} - Fight`
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BattleRoutingModule {}
