import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';
import { THEME_OPTIONS } from '../../../../generics/interfaces/theme.interface';
import { UtilsService } from '../../../../generics/services/utils/utils.service';
import { MENU } from '../../data/menu';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() show: boolean;
  @Input() loading: boolean;

  themeIcon!: 'light_mode' | 'dark_mode';
  currentTheme: THEME_OPTIONS;
  userName: string;
  menuOptions: MenuItem[];
  isMenuInBuildProgress: boolean;

  constructor(
    private authService: AuthService,
    private utilService: UtilsService
  ) {
    this.isMenuInBuildProgress = true;
    this.menuOptions = this.buildMenu();
    this.isMenuInBuildProgress = false;

    this.show = false;
    this.loading = true;

    this.themeIcon = 'light_mode';
    this.currentTheme = THEME_OPTIONS.LIGHT;

    this.userName = this.authService?.username;
  }

  ngOnInit(): void {
    this.utilService
      .themeObservable()
      .pipe(take(1))
      .subscribe({
        next: (theme: THEME_OPTIONS) => {
          this.currentTheme = theme ?? THEME_OPTIONS.LIGHT;
          this.themeIcon = this.currentTheme === THEME_OPTIONS.LIGHT ? 'light_mode' : 'dark_mode';
        }
      });
  }

  toggleTheme(): void {
    if (this.currentTheme === THEME_OPTIONS.LIGHT) {
      this.currentTheme = THEME_OPTIONS.DARK;
      this.themeIcon = 'dark_mode';
    } else {
      this.currentTheme = THEME_OPTIONS.LIGHT;
      this.themeIcon = 'light_mode';
    }

    this.utilService.setThemeValue(this.currentTheme);
  }

  private buildMenu(): MenuItem[] {
    let optionsMenu: MenuItem[] = [];

    this.authService.roles.map((role) => {
      optionsMenu = MENU?.[role.toUpperCase()] ?? [];
    });

    return optionsMenu as MenuItem[];
  }
}
