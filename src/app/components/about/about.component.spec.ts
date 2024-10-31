import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { By } from '@angular/platform-browser';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the heading "Our Philosophy"', () => {
    const headingElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(headingElement.textContent).toContain('Our Philosophy');
  });

  it('should render the mission statement text', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    expect(paragraphs.length).toBeGreaterThan(0);
    expect(paragraphs[0].nativeElement.textContent).toContain(
      'Our mission is to promote sustainable travel by providing insights into the environmental impact of flights.'
    );
  });

  it('should render the signature text', () => {
    const signatureElement = fixture.debugElement.query(By.css('.signature')).nativeElement;
    expect(signatureElement.textContent).toContain('The Travel Impact Team');
  });
});
