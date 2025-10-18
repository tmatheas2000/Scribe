import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent implements OnInit {

  myForm:UntypedFormGroup;
  message:string="";
  userError:any;

  constructor(public fb:UntypedFormBuilder, public authService:AuthService, public router:Router) {
    this.myForm=this.fb.group({
      email:['',[Validators.email,Validators.required]],
      password:['',Validators.required]
    })
   }

   onSubmit(form)
   {
     this.authService.login(form.value.email,form.value.password)
     .then((data)=>{
       console.log(data);
       this.message="You have been logged in successfully."

       this.router.navigate(['myblogs'])
     }).catch((error)=>{
       console.log(error);
       this.userError=error;
     })
   }

  ngOnInit(): void {
  }

}
