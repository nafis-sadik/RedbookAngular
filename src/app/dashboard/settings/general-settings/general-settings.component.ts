import { Component } from '@angular/core';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent {
  loaderContainer: HTMLElement| null;

  constructor() { }

  ngOnInit(): void {
    this.loaderContainer = document.getElementById('LoadingScreen');
    
    setTimeout(() => {
      if(this.loaderContainer && this.loaderContainer.classList.contains('d-block')){
        this.loaderContainer.classList.remove('d-block');
        this.loaderContainer.classList.add('d-none');
      }
    }, 1.5 * 1000);
  }
}
