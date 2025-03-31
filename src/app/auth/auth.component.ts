import { Component } from '@angular/core';
import { take } from 'rxjs';
import { THEME_OPTIONS } from '../shared/interfaces/theme.interface';
import { UtilsService } from '../shared/services/utils/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  currentTheme: THEME_OPTIONS;

  constructor(private utilService: UtilsService) {
    this.currentTheme = THEME_OPTIONS.LIGHT;

    utilService
      .themeObservable()
      .pipe(take(1))
      .subscribe({
        next: (theme: THEME_OPTIONS) => {
          this.currentTheme = theme ?? THEME_OPTIONS.LIGHT;
        }
      });
  }

  switchTheme(): void {
    if (this.currentTheme === THEME_OPTIONS.LIGHT) {
      this.currentTheme = THEME_OPTIONS.DARK;
    } else {
      this.currentTheme = THEME_OPTIONS.LIGHT;
    }

    this.utilService.setThemeValue(this.currentTheme);
  }
}
