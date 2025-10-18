import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
  
  myForm:UntypedFormGroup;

  simpleInterest:number;
  principalAmount:number;
  rateOfInterest:number;
  time:number;
  amount:number;
  

  onSubmit(cal)
  {
    this.principalAmount=cal.value.principalAmount;
    this.rateOfInterest=cal.value.rateOfInterest;
    this.time=cal.value.time;
    this.simpleInterest=this.principalAmount*this.rateOfInterest*this.time/1200;
    this.amount=this.simpleInterest+this.principalAmount;

  }

  constructor(public fb:UntypedFormBuilder) 
  {
    this.myForm=this.fb.group({
      principalAmount:['', [Validators.required]],
      rateOfInterest:['', [Validators.required]],
      time:['', [Validators.required]],
    })
   }

  ngOnInit(): void {
  }

}
