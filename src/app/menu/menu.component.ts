import { Component, OnInit, NgZone } from '@angular/core';
import { Auth, onAuthStateChanged, signOut, User } from '@angular/fire/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: false
})
export class MenuComponent implements OnInit {
  loggedIn = false;
  user: User | null = null;

  constructor(private auth: Auth, private ngZone: NgZone) {
    // Set initial user state
    this.user = this.auth.currentUser;
    this.loggedIn = !!this.user;

    // Subscribe to auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.ngZone.run(() => {
        this.user = user;
        this.loggedIn = !!user;
      });
    });
  }

  ngOnInit(): void {}

  async logout() {
    try {
      await signOut(this.auth);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}