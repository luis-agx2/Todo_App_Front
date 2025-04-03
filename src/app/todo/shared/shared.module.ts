import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { MenuComponent } from './components/menu/menu.component';
import { OutlineFieldViewerComponent } from './components/outline-field-viewer/outline-field-viewer.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';

@NgModule({
  declarations: [MenuComponent, TitleBarComponent, OutlineFieldViewerComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [MenuComponent, TitleBarComponent, OutlineFieldViewerComponent]
})
export class SharedModule {}
