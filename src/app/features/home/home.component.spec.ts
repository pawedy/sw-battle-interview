import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

describe('HomeComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HomeRoutingModule],
      declarations: [HomeComponent],
    })
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const home = fixture.componentInstance;
    expect(home).toBeTruthy();
  });

  it('should render name', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain(
      'Home'
    );
  });
});
