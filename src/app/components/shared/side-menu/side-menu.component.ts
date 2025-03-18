import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {MenuElementComponent} from "./menu-element/menu-element.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {LanguageSelectorComponent} from "./language-selector/language-selector.component";
import {TranslateModule} from "@ngx-translate/core";

import {animate, state, style, transition, trigger} from "@angular/animations";
import {UserWindowBubbleComponent} from "@/app/components/user-site/user-window-bubble/user-window-bubble.component";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    NgClass,
    MenuElementComponent,
    SearchBarComponent,
    LanguageSelectorComponent,
    TranslateModule,
    NgIf,
    UserWindowBubbleComponent
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  @Output() menuStateChanged = new EventEmitter<boolean>(); // Emite cambios en el menú

  protected readonly properties = {isCollapsed: true, isFixed: false}; // Propiedades del menú


  onMouseEnter() {
    if (!this.properties.isFixed) {
      this.properties.isCollapsed = false;
      this.menuStateChanged.emit(this.properties.isCollapsed);
    }
  }

  onMouseLeave() {
    if (!this.properties.isFixed) {
      this.properties.isCollapsed = true;
      this.menuStateChanged.emit(this.properties.isCollapsed);
    }
  }

  toggleFix() {
    this.properties.isFixed = !this.properties.isFixed;
  }

  toggleMenu() {
    this.properties.isCollapsed = !this.properties.isCollapsed;
    this.menuStateChanged.emit(this.properties.isCollapsed);
  }
}
