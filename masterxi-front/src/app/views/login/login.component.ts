import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../interfaces/login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public login: Login;
  formErrors: any = {};

  constructor(
    private userService: UserService,
    private route: Router,
    private toastrService: ToastrService
  ) {
    this.login = <Login>{};
  }

  onLogin() {
    this.userService.login(this.login).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        return this.route.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
        this.formErrors = {};
        if (error.error.errors) {
          this.processFormErrors(error.error.errors);
        } else {
          this.toastrService.error(error.error.msg, 'Error');
        }
      },
    });
  }

  processFormErrors(errors: any[]) {
    errors.forEach((err) => {
      const field = err.path;
      if (!this.formErrors[field]) {
        this.formErrors[field] = [];
      }
      this.formErrors[field].push(err.msg);
    });
  }
}
