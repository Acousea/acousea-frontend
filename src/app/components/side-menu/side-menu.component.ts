import {Component} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {MenuElementComponent} from "./menu-element/menu-element.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {LanguageSelectorComponent} from "./language-selector/language-selector.component";
import {TranslateModule} from "@ngx-translate/core";
import {UserWindowBubbleComponent} from "../user-site/user-window-bubble/user-window-bubble.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
  animations: [
    trigger('menuState', [
      state('collapsed', style({
        width: '50px',
      })),
      state('expanded', style({
        width: '250px',
      })),
      transition('collapsed <=> expanded', [
        animate('500ms ease-in-out')
      ])
    ])
  ],

  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  protected readonly properties = {isCollapsed: true, isFixed: false}; // Propiedades del menú


  onMouseEnter() {
    if (!this.properties.isFixed) {
      this.properties.isCollapsed = false;
    }
  }

  onMouseLeave() {
    if (!this.properties.isFixed) {
      this.properties.isCollapsed = true;
    }
  }

  toggleFix() {
    this.properties.isFixed = !this.properties.isFixed;
  }

  toggleMenu() {
    this.properties.isCollapsed = !this.properties.isCollapsed;
  }
}
