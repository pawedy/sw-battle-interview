import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { BattleService } from '../../core/state';
import { BehaviorSubject } from 'rxjs';
import { ApiResourceType } from '../../core/enums';

@Component({
  selector: 'swb-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleComponent implements OnInit {
  private battleService = inject(BattleService);

  public loadingBattle$ = new BehaviorSubject<boolean>(true);
  public players$ = this.battleService.players$;
  public winCount$ = this.battleService.winCount$;

  public ngOnInit(): void {
    this.battleService.initiateBattle(ApiResourceType.PEOPLE);
    this.players$.subscribe(() => {
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
}
