import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { SwitcherThemeComponent } from './components/switcher-theme/switcher-theme.component';

@NgModule({
  declarations: [SwitcherThemeComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SwitcherThemeComponent]
})
export class SharedModule {}
