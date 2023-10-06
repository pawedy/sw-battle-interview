import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Winner } from '../../../core/enums';

@Component({
  selector: 'swb-winner-bar',
  templateUrl: './winner-bar.component.html',
  styleUrls: ['./winner-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnerBarComponent {
  public readonly WinnerOptions = Winner;

  @Input({ required: true })
  winner!: Winner | null;

  @Input({ required: true })
  winCount!: {
    player1Wins: number;
    player2Wins: number;
  } | null;
}
