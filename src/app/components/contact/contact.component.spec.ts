import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      imports: [ FormsModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display thank you message after form submission', () => {
    // Simulate form submission
    component.onSubmit();
    fixture.detectChanges();

    // Check that the thank-you message is displayed
    const thankYouMessage = fixture.debugElement.query(By.css('.thank-you-message'));
    expect(thankYouMessage).toBeTruthy();
  });

  it('should disable the submit button when form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('.submit-btn')).nativeElement;
    
    // Initially, form should be invalid
    expect(submitButton.disabled).toBeFalse();

    // Fill form fields and check button state
    component.isSubmitted = false;
    fixture.nativeElement.querySelector('#name').value = 'John Doe';
    fixture.nativeElement.querySelector('#email').value = 'john@example.com';
    fixture.nativeElement.querySelector('#message').value = 'Hello!';
    fixture.detectChanges();

    expect(submitButton.disabled).toBeTruthy();
  });
});
