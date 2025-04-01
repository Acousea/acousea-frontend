import {Component, Input} from '@angular/core';
import {UserAddress} from "@/app/services/auth/user-service/user.interfaces";

@Component({
  selector: 'app-user-address',
  standalone: true,
  imports: [],
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.css'
})
export class UserAddressComponent {
  @Input() address: UserAddress | undefined;
}
