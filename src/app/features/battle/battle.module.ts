import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleComponent } from './battle.component';
import { BattleRoutingModule } from './battle-routing.module';
import { MatCardModule } from '@angular/material/card';
import { PlayerCardComponent } from './player-card/player-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '../../core/pipes';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    BattleRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  declarations: [BattleComponent, PlayerCardComponent, TranslatePipe],
})
export class BattleModule {}
