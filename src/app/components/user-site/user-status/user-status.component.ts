import { Component, Input } from '@angular/core';
import {UserStatus} from "@/app/services/users/user.interfaces";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-user-status',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './user-status.component.html',
  styleUrl: './user-status.component.css'
})
export class UserStatusComponent {
  @Input() status: UserStatus | undefined;
}
