import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticate: boolean = false;
  isAdmin = false;

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authservice.user.subscribe((user) => {
      this.isAuthenticate = !!user;
      this.isAdmin = user?.email == environment.adminEmail;
    });
  }

  Logout() {
    this.authservice.Logout();
    this.router.navigate(['/']);
  }
}
