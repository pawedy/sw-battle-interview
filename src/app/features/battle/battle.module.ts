import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleComponent } from './battle.component';
import { BattleRoutingModule } from './battle-routing.module';
import { MatCardModule } from '@angular/material/card';
import { PlayerCardComponent } from './player-card/player-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe, WinTimesPipe } from '../../core/pipes';
import { MatButtonModule } from '@angular/material/button';
import { WinnerBarComponent } from './winner-bar/winner-bar.component';

@NgModule({
  imports: [
    CommonModule,
    BattleRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  declarations: [
    BattleComponent,
    PlayerCardComponent,
    WinnerBarComponent,
    TranslatePipe,
    WinTimesPipe,
  ],
})
export class BattleModule {}
