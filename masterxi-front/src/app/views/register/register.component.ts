import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public register: User;
  formErrors: any = {};

  constructor(
    private userService: UserService,
    private route: Router,
    private toastrService: ToastrService
  ) {
    this.register = <User>{};
  }

  onRegister() {
    this.userService.register(this.register).subscribe({
      next: (res) => {
        this.toastrService.success(res.msg, 'Success');
        return this.route.navigate(['/login']);
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
