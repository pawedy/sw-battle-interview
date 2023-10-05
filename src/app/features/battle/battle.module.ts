import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleComponent } from './battle.component';
import { BattleRoutingModule } from './battle-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [CommonModule, MatToolbarModule, BattleRoutingModule],
  declarations: [BattleComponent],
})
export class BattleModule {}
