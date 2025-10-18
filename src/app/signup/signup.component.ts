import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false
})
export class SignupComponent implements OnInit {
  myForm: UntypedFormGroup;
  message = '';
  userError: any;

  constructor(
    public fb: UntypedFormBuilder,
    public authService: AuthService,
    private firestore: Firestore,
    private ngZone: NgZone
  ) {
    this.myForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      },
      {
        validator: this.checkIfMatchingPasswords('password', 'confirmPassword')
      }
    );
  }

  async onSubmit(signupform: UntypedFormGroup) {
    if (!signupform.valid) return;

    const { firstName, lastName, email, password } = signupform.value;

    try {
      // Signup via your AuthService (should already use modular Firebase)
      const user: any = await this.authService.signup(
        email,
        password,
        firstName,
        lastName
      );

      // Save user info in Firestore
      const usersRef = collection(this.firestore, 'users');
      const userDoc = doc(usersRef, user.uid);

      await setDoc(userDoc, {
        firstName,
        lastName,
        email,
        photoURL: user.photoURL || '',
        interests: '',
        bio: '',
        hobbies: ''
      });

      this.ngZone.run(() => {
        this.message = 'You have signed up successfully. Please login.';
      });
    } catch (error) {
      console.error(error);
      this.userError = error;
    }
  }

  checkIfMatchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: UntypedFormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ notEqualToPassword: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }

  ngOnInit(): void {}
}