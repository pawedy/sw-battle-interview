import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { BattleService } from '../../core/state';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ApiResourceType } from '../../core/enums';

@Component({
  selector: 'swb-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private battleService = inject(BattleService);
  public loadingBattle$ = new BehaviorSubject<boolean>(true);
  public players$ = this.battleService.players$;
  public winCount$ = this.battleService.winCount$;
  public winner$ = this.battleService.winner$;

  public ngOnInit(): void {
    this.battleService.initiateBattle(ApiResourceType.STARSHIPS);
    this.players$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadingBattle$.next(false);
    });
  }

  public startNewMatch(): void {
    this.loadingBattle$.next(true);
    this.battleService.startNewMatch();
  }

  public resetWins(): void {
    this.battleService.resetWins();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
