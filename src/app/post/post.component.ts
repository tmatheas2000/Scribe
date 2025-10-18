import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Firestore, doc, deleteDoc, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Auth, User, getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  standalone: false
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Output('onDelete') onDelete = new EventEmitter<void>();

  postData: any = {};
  user: User | null = null;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // If post is a DocumentSnapshot
    if (this.post?.data) {
      this.postData = this.post.data();
    } else {
      this.postData = this.post;
    }

    // Get current user
    this.user = this.auth.currentUser;
  }

  async delete() {
    try {
      if (!this.post?.id) return;

      const postDocRef: DocumentReference<DocumentData> = doc(this.firestore, `posts/${this.post.id}`);
      await deleteDoc(postDocRef);

      this.ngZone.run(() => {
        this.onDelete.emit();
      });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
}