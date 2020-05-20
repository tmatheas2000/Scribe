import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any={};
  posts:any[]=[];

  constructor(public activatedRoute:ActivatedRoute) {

    let id=this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.getProfile(id);
    this.getUsersPosts(id);

   }

  ngOnInit(): void {
  }

  getProfile(id:string){

    firebase.firestore().collection("users").doc(id).get().then((documentSnapshot)=>{
      this.user=documentSnapshot.data();
      this.user.displayName=this.user.firstName+" "+this.user.lastName;
      this.user.id=documentSnapshot.id;
      this.user.interests=this.user.interests.split(",");
      this.user.hobbies=this.user.hobbies.split(",");
      console.log(this.user);
    }).catch((error)=>{
      console.log(error);
    })

  }
  getUsersPosts(id:string){

    firebase.firestore().collection("posts").where("owner","==",id).get().then((data)=>{
      this.posts=data.docs; 
    })
  }

}
