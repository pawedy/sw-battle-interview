import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { BattleService } from '../../core/state';
import { BehaviorSubject, Subject, map, takeUntil } from 'rxjs';
import { ApiResourceType, Winner } from '../../core/enums';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'swb-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private route = inject(ActivatedRoute);
  private battleService = inject(BattleService);
  public readonly Winner = Winner;

  public loadingBattle$ = new BehaviorSubject<boolean>(true);
  public players$ = this.battleService.players$;
  public winCount$ = this.battleService.winCount$;
  public winner$ = this.battleService.winner$;

  public ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        takeUntil(this.destroy$),
        map((params) => params.get('type') as ApiResourceType | null)
      )
      .subscribe((type) => {
        const isProperType =
          type && Object.values(ApiResourceType).includes(type);
        this.battleService.initiateBattle(
          isProperType ? type : ApiResourceType.PEOPLE
        );
      });

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
