import {Component} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {MenuElementComponent} from "./menu-element/menu-element.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {LanguageSelectorComponent} from "./language-selector/language-selector.component";
import {TranslateModule} from "@ngx-translate/core";
import {UserWindowBubbleComponent} from "../user-site/user-window-bubble/user-window-bubble.component";

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
  isCollapsed = true; // Estado inicial del menú

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed; // Alterna entre colapsado y expandido
  }
}
