import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {HttpClientModule} from '@angular/common/http';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { config } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CapitalizePipe } from './capitalize.pipe';
import { SalutationPipe } from './salutation.pipe';
import { MenuComponent } from './menu/menu.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';  
import { AuthService } from './auth.service';
import { PostComponent } from './post/post.component';
import { ViewComponent } from './view/view.component';
import { CommentsComponent } from './comments/comments.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

let firebaseConfig = {
  apiKey: "AIzaSyDi5XfDy2cbJcApeqU_-7IkU_GbXU97XJE",
  authDomain: "scribe-3b18d.firebaseapp.com",
  databaseURL: "https://scribe-3b18d.firebaseio.com",
  projectId: "scribe-3b18d",
  storageBucket: "scribe-3b18d.appspot.com",
  messagingSenderId: "945627745729",
  appId: "1:945627745729:web:3218854a8360a022fa7340",
  measurementId: "G-DX9G0YVRR0"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    CapitalizePipe,
    SalutationPipe,
    MenuComponent,
    MyblogsComponent,
    ProfileComponent,
    CreateComponent,
    PostComponent,
    ViewComponent,
    CommentsComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule, 
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
 export class AppModule { }