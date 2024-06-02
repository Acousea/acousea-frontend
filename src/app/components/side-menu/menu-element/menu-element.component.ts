import {Component, Input, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {ItemsBarComponent} from "./steps-bar/items-bar.component";


export interface MenuItem {
  link: string;
  text: string;
  icon: string;
}


@Component({
  selector: 'app-menu-element',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    NgIf,
    NgForOf,
    ItemsBarComponent
  ],
  templateUrl: './menu-element.component.html',
  styleUrl: './menu-element.component.css'
})
export class MenuElementComponent implements OnInit {
  @Input() link: string = '';
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() subMenuItems: MenuItem[] = [];
  dropdownClosed: BehaviorSubject<boolean> | undefined = undefined;

  ngOnInit(): void {
    if (this.subMenuItems.length > 0) {
      this.dropdownClosed = new BehaviorSubject<boolean>(true);
    }
  }

  toggleDropdown(){
    if(this.dropdownClosed) {
      this.dropdownClosed.next(!this.dropdownClosed.value);
    }

  }

}
