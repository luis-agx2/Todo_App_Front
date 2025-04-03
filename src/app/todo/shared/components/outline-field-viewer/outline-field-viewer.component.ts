import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-outline-field-viewer',
  templateUrl: './outline-field-viewer.component.html',
  styleUrls: ['./outline-field-viewer.component.scss']
})
export class OutlineFieldViewerComponent {
  @Input() label: string | undefined;
  @Input() value: unknown | undefined;
}
