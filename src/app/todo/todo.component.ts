import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  showFullMenu: boolean;
  processInProgress: number;

  constructor() {
    this.showFullMenu = false;
    this.processInProgress = 0;
  }

  toggleMenu(): void {
    this.showFullMenu = !this.showFullMenu;
  }
}
