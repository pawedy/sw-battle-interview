import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BattleRoutingModule } from './battle-routing.module';
import { BattleComponent } from './battle.component';

describe('BattleComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BattleRoutingModule],
      declarations: [BattleComponent],
    })
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(BattleComponent);
    const battle = fixture.componentInstance;
    expect(battle).toBeTruthy();
  });

  it('should render name', () => {
    const fixture = TestBed.createComponent(BattleComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain('Battle!');
  });
});
