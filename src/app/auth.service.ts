import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  // Login method
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Signup method
  async signup(email: string, password: string, firstName: string, lastName: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // Generate random avatar URL
      const randomNumber = Math.floor(Math.random() * 1000);
      const photoURL = `https://api.adorable.io/avatars/${randomNumber}`;

      // Update user profile
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
        photoURL
      });

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }
}