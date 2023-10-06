import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BattleRoutingModule } from './battle-routing.module';
import { BattleComponent } from './battle.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { NgxsModule } from '@ngxs/store';
import { BattleState } from '../../core/state';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

describe('BattleComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([BattleState]),
        HttpClientModule,
        RouterTestingModule,
        BattleRoutingModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatButtonModule,
      ],
      declarations: [BattleComponent, PlayerCardComponent],
    })
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(BattleComponent);
    const battle = fixture.componentInstance;
    expect(battle).toBeTruthy();
  });

  it('should show loader', () => {
    const fixture = TestBed.createComponent(BattleComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loader')?.textContent).toContain(
      'Loading new battle...'
    );
  });
});
