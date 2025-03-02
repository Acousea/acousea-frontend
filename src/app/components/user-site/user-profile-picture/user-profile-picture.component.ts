import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-profile-picture',
  standalone: true,
  imports: [],
  templateUrl: './user-profile-picture.component.html',
  styleUrl: './user-profile-picture.component.css'
})
export class UserProfilePictureComponent {
  @Input() profileImageUrl: string | undefined;
}
