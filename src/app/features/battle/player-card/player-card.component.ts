import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'swb-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCardComponent {
  @Input({ required: true })
  name!: string;

  @Input({ required: true })
  playerProps!: { [key: string]: string | number };

  @Input()
  isWinning = false;
}
