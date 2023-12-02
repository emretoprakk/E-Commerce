import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent {

  isSpinning!: boolean;
  categoryForm!: FormGroup;

  constructor(private adminService: AdminService,
    private fb: FormBuilder,
    private notification: NzNotificationService) { }

    ngOnInit() {
      this.categoryForm = this.fb.group({
        name: [null, [Validators.required]],
        description: [null, [Validators.required]],
      })
    }
    
    postCategory() {
      this.isSpinning = true;
      this.adminService.postCategory(this.categoryForm.value).subscribe(
        (res) => {
          this.isSpinning = false;
          console.log(res);
          if (res.id != null) {
            this.notification.success(
              'SUCCESS',
              'Category posted successfully',
              { nzDuration: 5000 }
            );
          } else {
            this.notification.error(
              'ERROR',
              res.message || 'An error occurred while posting the category.',
              { nzDuration: 5000 }
            );
          }
        },
        (error) => {
          this.isSpinning = false;
          console.error(error);
          this.notification.error(
            'ERROR',
            'An error occurred while posting the category.',
            { nzDuration: 5000 }
          );
        }
      );
    }

  }
