import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/users/user.service";
import {User} from "../../../services/users/user.interfaces";
import {
  UserProfilePictureComponent
} from "../../../components/user-site/user-profile-picture/user-profile-picture.component";
import {UserPersonalInfoComponent} from "../../../components/user-site/user-personal-info/user-personal-info.component";
import {UserStatusComponent} from "../../../components/user-site/user-status/user-status.component";
import {UserAddressComponent} from "../../../components/user-site/user-address/user-address.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-profile-site',
  standalone: true,
  imports: [
    UserProfilePictureComponent,
    UserPersonalInfoComponent,
    UserStatusComponent,
    UserAddressComponent,
    NgIf
  ],
  templateUrl: './user-profile-site.component.html',
  styleUrl: './user-profile-site.component.css'
})
export class UserProfileSiteComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile('user-id'); // Reemplaza con el ID del usuario actual
  }

  loadUserProfile(userId: string): void {
    this.userService.getUserProfile(userId).subscribe(data => {
      this.user = data;
    });
  }
}
