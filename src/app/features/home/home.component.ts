import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiResource } from '../../core/enums';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private router = inject(Router);
  public readonly ResourceTypes = ApiResource;
  public battleTypeForm = new FormControl(ApiResource.PEOPLE);

  public startBattle(): void {
    this.router.navigateByUrl('/battle');
  }
}
