import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  validateForm !: FormGroup;
  isSpinning = false;

  constructor(private authService: AuthService,
    private fb:FormBuilder,
    private router: Router,
    private notification: NzNotificationService) {}

    ngOnInit() {
      this.validateForm = this.fb .group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
      })  
    }

    login() {
      console.log(this.validateForm.value)
      this.authService.login(this.validateForm.get(['username'])!.value, this.validateForm.get(['password'])!.value).subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
      if(LocalStorageService.isAdminLoggedIn()) {
        this.router.navigateByUrl("/admin/dashboard");
      } else if (LocalStorageService.isUserLoggedIn()) {
        this.router.navigateByUrl("/user/dashboard");
      }
      }, error => {
        console.log(error)
        if (error.status == 406) {
          this.notification.error(
            "ERROR",
            "Account is not active. Please register first",
            { nzDuration: 5000 }
          )
        } else {
          this.notification.error(
            "ERROR",
            "Bad crendentials",
            { nzDuration: 5000 }
          )
        }
        this.isSpinning = false;
      }
      )
    }
}