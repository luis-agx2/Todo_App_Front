import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements AfterViewInit {
  @ViewChild('bar') containerDiv!: ElementRef<HTMLDivElement>;

  @Input() title: string;
  @Input() showIconAction: boolean;
  @Input() icon: string | undefined;
  @Input() position: 'relative' | 'sticky';

  @Output() back: EventEmitter<boolean>;
  @Output() action: EventEmitter<void>;

  constructor() {
    this.back = new EventEmitter(false);
    this.action = new EventEmitter();
    this.showIconAction = false;
    this.position = 'relative';
    this.title = '';
  }

  ngAfterViewInit(): void {
    this.containerDiv.nativeElement.style.position = this.position;
    this.containerDiv.nativeElement.style.top = '0';
  }

  goBack(): void {
    this.back.emit(true);
  }

  onAction(): void {
    this.action.emit();
  }
}
