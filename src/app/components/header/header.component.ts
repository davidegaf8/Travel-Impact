import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  windowWidth: any = window.innerWidth;
  isToggled: boolean = false;
  animationState: string = '';

  constructor() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  }

  toggleMenu() {
    if (this.isToggled) {
      this.animationState = 'inactive';
      setTimeout(() => {
        this.isToggled = false;
      }, 500);
    } else {
      this.isToggled = true;
      this.animationState = 'active';
    }
  }
}

