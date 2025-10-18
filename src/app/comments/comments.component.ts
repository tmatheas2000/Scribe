import { Component, Input, OnInit, NgZone } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp
} from '@angular/fire/firestore';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  standalone: false
})
export class CommentsComponent implements OnInit {
  comment = '';
  comments: any[] = [];
  loggedIn = false;
  currentUser: User | null = null;

  @Input() postId!: string;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private ngZone: NgZone
  ) {
    // ✅ Track auth state
    onAuthStateChanged(this.auth, (user) => {
      this.ngZone.run(() => {
        this.loggedIn = !!user;
        this.currentUser = user;
      });
    });
  }

  async postComment() {
    if (this.comment.trim().length < 5 || !this.currentUser) {
      return;
    }

    try {
      const commentsRef = collection(this.firestore, 'comments');
      await addDoc(commentsRef, {
        text: this.comment,
        post: this.postId,
        owner: this.currentUser.uid,
        ownerName: this.currentUser.displayName || 'Anonymous',
        created: serverTimestamp()
      });

      console.log('Comment saved!');
      this.comment = '';
      await this.getComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  }

  async getComments() {
    this.comments = [];

    try {
      const commentsRef = collection(this.firestore, 'comments');
      const q = query(
        commentsRef,
        where('post', '==', this.postId),
        orderBy('created', 'desc')
      );

      const querySnapshot = await getDocs(q);
      this.comments = querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  ngOnInit(): void {
    this.getComments();
  }
}