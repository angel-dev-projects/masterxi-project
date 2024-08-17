import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: ` @if(isLoading()){
    <div class="overlay">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    }`,
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  private readonly spinnerService = inject(SpinnerService);
  isLoading = this.spinnerService.isLoading;
}
