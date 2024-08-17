import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  newUsername: string = '';
  newEmail: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  newPasswordConfirm: string = '';
  deleteConfirmation: string = '';
  isButtonDeleteDisabled: boolean = true;
  formErrors: any = {};

  constructor(
    public userService: UserService,
    private toastrService: ToastrService
  ) {
    const tokenData = this.userService.getDecodedToken();
    this.newUsername = tokenData.username || '';
    this.newEmail = tokenData.email || '';
  }

  changeUsername() {
    this.userService.changeUsername(this.newUsername).subscribe({
      next: (res) => {
        document.getElementById('closeChangeUsernameModal')?.click();
        this.userService.logOut();
        this.toastrService.success(
          'Your new username is ' +
            this.newUsername +
            '. Login again to access',
          'Username changed'
        );
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

  changeEmail() {
    this.userService.changeEmail(this.newEmail).subscribe({
      next: (res) => {
        document.getElementById('closeChangeEmailModal')?.click();
        this.userService.logOut();
        this.toastrService.success(
          'Your new email is ' + this.newEmail + '. Login again to access',
          'Email changed'
        );
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

  changePassword() {
    this.userService
      .changePassword(
        this.currentPassword,
        this.newPassword,
        this.newPasswordConfirm
      )
      .subscribe({
        next: (res) => {
          document.getElementById('closeChangePasswordModal')?.click();
          this.userService.logOut();
          this.toastrService.success(
            'Login again to access',
            'Password changed'
          );
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

  deleteUser() {
    this.userService.delete().subscribe({
      next: (res) => {
        document.getElementById('closeDeleteUserModal')?.click();
        this.userService.logOut();
        this.toastrService.success(res.msg, 'User deleted');
      },
      error: (error) => {
        console.log(error);
        this.formErrors = {};
        this.toastrService.error(error.error.msg, 'Error');
      },
    });
  }

  onInputDeleteChange(): void {
    this.isButtonDeleteDisabled = this.deleteConfirmation !== 'DELETE';
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
