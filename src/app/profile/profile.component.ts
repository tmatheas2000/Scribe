import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs
} from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false
})
export class ProfileComponent implements OnInit {
  user: any = {};
  posts: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore,
    private ngZone: NgZone
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getProfile(id);
      this.getUsersPosts(id);
    }
  }

  ngOnInit(): void {}

  async getProfile(id: string) {
    try {
      const userDocRef = doc(this.firestore, `users/${id}`);
      const documentSnapshot = await getDoc(userDocRef);

      if (documentSnapshot.exists()) {
        const userData = documentSnapshot.data();

        this.ngZone.run(() => {
          this.user = {
            ...userData,
            displayName: `${userData.firstName} ${userData.lastName}`,
            id: documentSnapshot.id,
            interests: userData.interests ? userData.interests.split(',') : [],
            hobbies: userData.hobbies ? userData.hobbies.split(',') : []
          };
          console.log(this.user);
        });
      } else {
        console.warn('User not found!');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  async getUsersPosts(id: string) {
    try {
      const postsRef = collection(this.firestore, 'posts');
      const q = query(postsRef, where('owner', '==', id));
      const querySnapshot = await getDocs(q);

      this.ngZone.run(() => {
        this.posts = querySnapshot.docs;
      });
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  }
}