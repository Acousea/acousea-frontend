import {Component, OnInit} from '@angular/core';
import {User} from "@/app/services/auth/user-service/user.interfaces";
import {
  UserProfilePictureComponent
} from "@/app/components/user-site/user-profile-picture/user-profile-picture.component";
import {UserPersonalInfoComponent} from "@/app/components/user-site/user-personal-info/user-personal-info.component";
import {UserStatusComponent} from "@/app/components/user-site/user-status/user-status.component";
import {UserAddressComponent} from "@/app/components/user-site/user-address/user-address.component";
import {NgIf} from "@angular/common";
import {AuthService} from "@/app/services/auth/auth.service";

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

  constructor(
    private authService: AuthService
    ) {}

  ngOnInit(): void {

    const user = this.authService.getCurrentUser();
    if (user) {
      this.user = user;
    } else {
      console.error(UserProfileSiteComponent.name + ": User not found");
    }
  }

}
