import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxsModule, Store } from '@ngxs/store';
import { APP_TITLE } from './core/constants';
import { Title } from '@angular/platform-browser';
import { routes } from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        NgxsModule.forRoot([]),
        MatToolbarModule,
      ],
      declarations: [AppComponent],
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('store should be available', () => {
    const store = TestBed.inject(Store);
    expect(store).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const titleService = TestBed.inject(Title);
    titleService.setTitle(APP_TITLE);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain(
      APP_TITLE
    );
  });
});
