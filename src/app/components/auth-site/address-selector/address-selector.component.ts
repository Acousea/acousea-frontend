import {Component, ElementRef, HostListener} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {
  NominatimLocationService
} from "@/app/services/shared/location-services/nominatim-location-service/nominatim-location-service.service";
import {LocationResult} from "@/app/services/shared/location-services/location-interfaces";

@Component({
  selector: 'app-address-selector',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './address-selector.component.html',
  styleUrl: './address-selector.component.css'
})
export class AddressSelectorComponent {
  searchQuery: string = '';
  suggestions: LocationResult[] = [];
  selectedAddress: LocationResult | null = null;
  showSuggestions: boolean = false;

  constructor(private locationService: NominatimLocationService,
              private elementRef: ElementRef) {
  }

  onSearchQueryChange() {
    if (this.searchQuery.length > 2) {  // Realizar la búsqueda si hay al menos 3 caracteres
      this.locationService.searchAddress(this.searchQuery).subscribe(results => {
        this.suggestions = results;
        this.showSuggestions = true;
      });
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showSuggestions = false;
    }
  }

  selectSuggestion(suggestion: LocationResult) {
    this.selectedAddress = suggestion;
    this.searchQuery = suggestion.displayName;
    this.suggestions = [];
  }
}
