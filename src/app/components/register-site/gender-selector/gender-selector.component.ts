import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-gender-selector',
  standalone: true,
  imports: [],
  templateUrl: './gender-selector.component.html',
  styleUrl: './gender-selector.component.css'
})
export class GenderSelectorComponent {
  selectedGender: string | null = null;

  @Output() genderSelected = new EventEmitter<string>();

  selectGender(gender: string) {
    this.selectedGender = gender;
    this.genderSelected.emit(gender);
  }
}
