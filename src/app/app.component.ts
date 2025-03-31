import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { THEME_OPTIONS } from './shared/interfaces/theme.interface';
import { UtilsService } from './shared/services/utils/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Todo_App_Front';

  themeSubscription: Subscription | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private utilsService: UtilsService
  ) {
    this.switchThemeListener();
  }
  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }

  switchThemeListener(): void {
    this.themeSubscription = this.utilsService.themeObservable().subscribe({
      next: (theme: THEME_OPTIONS) => {
        if (theme === THEME_OPTIONS.DARK) {
          this.document.body.classList.add('dark-mode');
        } else {
          this.document.body.classList.remove('dark-mode');
        }
      }
    });
  }
}
