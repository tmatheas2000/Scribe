import { Component, OnInit, NgZone } from '@angular/core';
import { Auth, updateProfile, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  standalone: false
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  message = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private ngZone: NgZone
  ) {
    this.getProfile();
  }

  ngOnInit(): void {}

  async getProfile() {
    try {
      const currentUser: User | null = this.auth.currentUser;
      if (!currentUser) return;

      const userDocRef = doc(this.firestore, `users/${currentUser.uid}`);
      const documentSnapshot = await getDoc(userDocRef);

      if (documentSnapshot.exists()) {
        const userData = documentSnapshot.data();

        this.ngZone.run(() => {
          this.user = {
            ...userData,
            displayName: `${userData.firstName} ${userData.lastName}`,
            id: documentSnapshot.id
          };
          console.log(this.user);
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  async update() {
    try {
      this.message = 'Updating profile...';

      const currentUser: User | null = this.auth.currentUser;
      if (!currentUser) return;

      // Update Firebase Auth profile
      await updateProfile(currentUser, {
        displayName: this.user.displayName,
        photoURL: this.user.photoUrl || ''
      });

      // Update Firestore user document
      const userDocRef = doc(this.firestore, `users/${currentUser.uid}`);
      await updateDoc(userDocRef, {
        firstName: this.user.displayName.split(' ')[0] || '',
        lastName: this.user.displayName.split(' ')[1] || '',
        hobbies: this.user.hobbies || [],
        interests: this.user.interests || [],
        bio: this.user.bio || ''
      });

      this.ngZone.run(() => {
        this.message = 'Profile Updated Successfully.';
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      this.ngZone.run(() => {
        this.message = 'Error updating profile.';
      });
    }
  }
}