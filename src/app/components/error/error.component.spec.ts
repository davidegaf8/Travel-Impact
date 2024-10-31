import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      imports: [RouterTestingModule],  // Adds routing support for routerLink
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error message', () => {
    const messageElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(messageElement.textContent).toContain('Oops! Something went wrong. Please try again or return to the home page.');
  });

  it('should display a Retry button', () => {
    const retryButton = fixture.debugElement.query(By.css('.retry-button')).nativeElement;
    expect(retryButton.textContent).toContain('Retry');
  });

  it('should display a Home button with a routerLink', () => {
    const homeButton = fixture.debugElement.query(By.css('.home-button')).nativeElement;
    expect(homeButton.textContent).toContain('Home');
    expect(homeButton.getAttribute('ng-reflect-router-link')).toBe('/');
  });
});
