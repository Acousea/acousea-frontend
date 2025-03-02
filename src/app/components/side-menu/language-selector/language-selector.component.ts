import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Language, LanguageService} from "../../../services/language-service/language.service";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    FormsModule,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent implements OnInit {
  languages: Language[] = [];
  currentLanguage: string = '';
  dropdownOpen = false;

  constructor(private languageService: LanguageService,
              private elementRef: ElementRef
  ) {
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  ngOnInit(): void {
    this.languages = this.languageService.getAvailableLanguages();
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }


  switchLanguage(language: string) {
    this.languageService.switchLanguage(language);
    this.currentLanguage = language;
    this.dropdownOpen = false;
  }

  getFlagUrl(code: string): string {
    return this.languageService.getFlagUrl(code);
  }

  getCurrentLanguageLabel(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang ? lang.label : '';
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
