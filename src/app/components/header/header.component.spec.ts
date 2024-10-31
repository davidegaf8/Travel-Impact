import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo and logo text', () => {
    const logoElement = fixture.debugElement.query(By.css('.logo img')).nativeElement;
    const logoTextElement = fixture.debugElement.query(By.css('.logo-text img')).nativeElement;

    expect(logoElement).toBeTruthy();
    expect(logoElement.getAttribute('src')).toContain('travel_impact_logo.png');
    expect(logoTextElement).toBeTruthy();
    expect(logoTextElement.getAttribute('src')).toContain('Travel_Impact_name.png');
  });

  it('should display the navbar when windowWidth > 768', () => {
    component.windowWidth = 1024;
    fixture.detectChanges();

    const navbar = fixture.debugElement.query(By.css('.navbar'));
    expect(navbar).toBeTruthy();
  });

  it('should hide the navbar and display the hamburger icon when windowWidth <= 768', () => {
    component.windowWidth = 768;
    fixture.detectChanges();

    const navbar = fixture.debugElement.query(By.css('.navbar'));
    const hamburger = fixture.debugElement.query(By.css('.hamburger'));
    expect(navbar).toBeFalsy();
    expect(hamburger).toBeTruthy();
  });

  it('should toggle mobile menu when hamburger icon is clicked', () => {
    component.windowWidth = 768;
    component.isToggled = false;
    fixture.detectChanges();

    const hamburger = fixture.debugElement.query(By.css('.hamburger'));
    hamburger.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isToggled).toBeTrue();
    const mobileNavbar = fixture.debugElement.query(By.css('.mobile-navbar'));
    expect(mobileNavbar).toBeTruthy();
  });

  it('should close the mobile menu when a link in mobile-navbar is clicked', () => {
    component.windowWidth = 768;
    component.isToggled = true;
    fixture.detectChanges();

    const mobileNavbar = fixture.debugElement.query(By.css('.mobile-navbar'));
    mobileNavbar.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isToggled).toBeTrue();
  });
});
