import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  standalone: false
})
export class CreateComponent implements OnInit {
  editorConfig: any;
  title = '';
  content = '';

  @Output('postCreated') postCreated = new EventEmitter<void>();

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private ngZone: NgZone
  ) {
    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '150px',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: false,
      placeholder: 'Enter text here...',
      imageEndPoint: '',
      toolbar: [
        ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'justifyFull', 'outdent'],
        ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
        [
          'paragraph',
          'blockquote',
          'removeBlockquote',
          'horizontalLine',
          'orderedList',
          'unorderedList',
          'link',
          'unlink'
        ],
        ['code']
      ]
    };
  }

  async createPost() {
    try {
      if (!this.auth.currentUser) {
        console.warn('User not logged in');
        return;
      }

      const postsRef = collection(this.firestore, 'posts');

      await addDoc(postsRef, {
        title: this.title,
        content: this.content,
        owner: this.auth.currentUser.uid,
        created: serverTimestamp()
      });

      this.ngZone.run(() => {
        console.log('Post created successfully');
        this.postCreated.emit();
      });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  ngOnInit(): void {}
}