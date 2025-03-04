import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {SearchBarService, SearchContent} from "@/app/services/search-bar-service/search-bar.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    TranslateModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  searchText = '';
  suggestions: SearchContent[] = [];

  constructor(private router: Router, private searchService: SearchBarService) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'p') {
      event.preventDefault();
      this.searchInput.nativeElement.focus();
    }
  }

  onSearch() {
    if (this.searchText.trim()) {
      this.suggestions = this.searchService.search(this.searchText);
    } else {
      this.suggestions = [];
    }
  }

  onSuggestionClick(route: string) {
    this.router.navigate([route]).then(r => {});
    this.searchText = '';
    this.suggestions = [];
  }
}
