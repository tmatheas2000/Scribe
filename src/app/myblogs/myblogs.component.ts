import { Component, OnInit, NgZone } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  DocumentData
} from '@angular/fire/firestore';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css'],
  standalone: false
})
export class MyblogsComponent implements OnInit {
  user: User | null = null;
  posts: QueryDocumentSnapshot<DocumentData>[] = [];

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private ngZone: NgZone
  ) {
    // Track auth state
    onAuthStateChanged(this.auth, (user) => {
      this.ngZone.run(() => {
        this.user = user;
      });
    });

    this.getPosts();
  }

  async getPosts() {
    try {
      const postsRef = collection(this.firestore, 'posts');
      const q = query(postsRef, orderBy('created', 'desc'));
      const querySnapshot = await getDocs(q);

      this.ngZone.run(() => {
        this.posts = querySnapshot.docs;
        console.log(this.posts);
      });
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  }

  // Call after a new post is created
  onPostCreated() {
    this.posts = [];
    this.getPosts();
  }

  // Call after a post is deleted
  onDelete() {
    this.posts = [];
    this.getPosts();
  }

  ngOnInit(): void {}
}