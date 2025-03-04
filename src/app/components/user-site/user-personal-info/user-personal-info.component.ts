import { Component, Input } from '@angular/core';
import {UserInfo} from "@/app/services/users/user.interfaces";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-user-personal-info',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './user-personal-info.component.html',
  styleUrl: './user-personal-info.component.css'
})
export class UserPersonalInfoComponent {
  @Input() userInfo: UserInfo | undefined;
}
