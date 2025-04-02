import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { THEME_OPTIONS } from '../../interfaces/theme.interface';

@Component({
  selector: 'app-switcher-theme',
  templateUrl: './switcher-theme.component.html',
  styleUrls: ['./switcher-theme.component.scss']
})
export class SwitcherThemeComponent implements OnChanges, AfterViewInit {
  @ViewChild('switch') switchElement!: ElementRef<HTMLLabelElement>;

  @Input() width: number;
  @Input() duration: number;

  @Output() slide: EventEmitter<THEME_OPTIONS> = new EventEmitter<THEME_OPTIONS>();

  constructor() {
    this.width = 28;
    this.duration = 0.3;
  }
  ngAfterViewInit(): void {
    this.switchElement.nativeElement.style.setProperty('--width', `${this.width}px`);
    this.switchElement.nativeElement.style.setProperty('--height', `${(this.width + 2) / 2}px`);
    this.switchElement.nativeElement.style.setProperty('--radius-switcher-width', `${(this.width + 2) / 2}px`);
    this.switchElement.nativeElement.style.setProperty('--animation-time', `${this.duration}s`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[`width`]) {
      const width = changes[`width`].currentValue;
      this.switchElement.nativeElement.style.setProperty('--width', `${width}px`);
      this.switchElement.nativeElement.style.setProperty('--height', `${(width + 2) / 2}px`);
    }
  }

  switchTheme(): void {
    this.slide.emit();
  }
}
