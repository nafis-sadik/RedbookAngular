import { Directive, HostListener, Output, EventEmitter, Input, ElementRef, Renderer2, OnInit, Injectable } from '@angular/core';

@Directive({
  selector: '[appBlumeDrop]'
})
@Injectable({
  providedIn: 'root',
})
export class BlumeDropDirective {
  @Output() filesDropped = new EventEmitter<File[]>();
  @Input() allowedFileTypes: string[];
  @Input() uploadUrl: string;
  private fileInput: HTMLInputElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // create the file input element
    this.fileInput = this.renderer.createElement('input');
    this.renderer.setProperty(this.fileInput, 'type', 'file');
    this.renderer.setStyle(this.fileInput, 'display', 'none');
    this.renderer.listen(this.fileInput, 'change', (event) => this.handleInputChange(event));
    // append the file input element to the host element
    this.renderer.appendChild(this.elementRef.nativeElement, this.fileInput);
  }

  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) public onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.handleFiles(files);
    }
  }

  @HostListener('click') public onClick() {
    this.fileInput.click();
  }

  private handleInputChange(event: any) {
    let files = event.target.files;
    if (files.length > 0) {
      this.handleFiles(files);
    }
  }

  private handleFiles(files: FileList) {
    // filter out files that are not of the allowed types
    let allowedFiles: File[] = Array.from(files).filter(file => this.allowedFileTypes.includes(file.type));
    if (allowedFiles.length > 0) {
      this.filesDropped.emit(allowedFiles);
    }
  }
}
