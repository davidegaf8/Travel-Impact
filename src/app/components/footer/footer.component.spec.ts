import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should render copyright text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('© 2024 by Davide Giannetti');
  });

  it('should have a GitHub link with the correct URL', () => {
    const githubLink = fixture.debugElement.query(By.css('a')).nativeElement as HTMLAnchorElement;
    expect(githubLink.href).toContain('https://github.com/davidegaf8');
  });

  it('should contain a GitHub icon', () => {
    const iconElement = fixture.debugElement.query(By.css('i')).nativeElement as HTMLElement;
    expect(iconElement.classList).toContain('bx');
    expect(iconElement.classList).toContain('bxl-github');
  });
});
