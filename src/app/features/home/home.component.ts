import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiResourceType } from '../../core/enums';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'swb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private router = inject(Router);
  public readonly ResourceTypes = ApiResourceType;
  public battleTypeForm = new FormControl(ApiResourceType.PEOPLE);

  public startBattle(): void {
    this.router.navigate(['/battle'], {
      queryParams: { type: this.battleTypeForm.value },
    });
  }
}
