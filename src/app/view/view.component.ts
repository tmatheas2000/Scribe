import { Component, OnInit, NgZone } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router'

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css'],
    standalone: false
})
export class ViewComponent implements OnInit {

  post:any={};
  postId:string="";

  constructor(public activateRoute:ActivatedRoute, public ngZone:NgZone, private firestore: Firestore) {
    this.loadPosts();
  }

  async loadPosts () {
    let postId=this.activateRoute.snapshot.paramMap.get("postId");
    this.postId=postId;

    try {
      const docRef = doc(this.firestore, `posts/${postId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.ngZone.run(() => {
          this.post = docSnap.data();
          console.log(this.post);
        });
      } else {
        console.warn('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
   }

  ngOnInit(): void {
  }

}
