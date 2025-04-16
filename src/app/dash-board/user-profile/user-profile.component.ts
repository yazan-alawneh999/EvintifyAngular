import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { NavController } from 'src/app/services/NavController';
import {FormControl, FormGroup} from "@angular/forms";
import {Role} from "../manage-users/Role";



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userId!: number;
  usrProfile: any;
  roles: Role[] = [];
  selectedImageFile: File | null = null;
  previewImage: string | null = null;
showProgressbar: boolean = false;
showToast: boolean = false;
  profileForm = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Username : new FormControl(''),
    Email: new FormControl(''),
    City: new FormControl(''),
    Age : new FormControl(''),
    PhoneNumber: new FormControl(''),
    RoleID : new FormControl(''),
    RoleName : new FormControl(''),
    CreatedAt : new FormControl(''),
    ImageFile : new FormControl(),
  });
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private loadingServiceUi: LoadingService
  ) {
    debugger;
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getAllRoles()
    this.getUserProfile();

  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;

      // Show preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  async urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  }

  async  updateUserForm(data: any) {
    this.profileForm.patchValue({
      Username: data.username,
      Email: data.email,
      PhoneNumber : data.phoneNumber,
      RoleID: data.roleID,
      RoleName: data.roleName,
      CreatedAt: new Date(data.createdAt).toLocaleDateString('en-GB'),
      ImageFile: data.profileImage,
      Age: data.age,
      City: data.city,
      FirstName: data.firstName,
      LastName: data.lastName,
    })

  }
  getUserProfile() {
    this.loadingServiceUi.show();

    this.http
      .get(
        `https://localhost:7065/api/event-manager/profile-details/${this.userId}`
      )
      .subscribe({
        next: (data: any) => {
          this.usrProfile = data;
          this.cdr.detectChanges();
          this.loadingServiceUi.hide();
          this.updateUserForm(data)
          console.log(data);
        },
        error: () => {
          this.loadingServiceUi.hide();
        },
        complete: () => {
          this.loadingServiceUi.hide();
        },
      });
  }

  getAllRoles() {
    this.http.get("https://localhost:7065/api/event-manager/admin-dashboard/All-Roles")
      .subscribe({
      next: (data: any) => {
        this.roles = data;
      }
    })
  }

  async onSubmit() {

    await this.updateProfile();
  }

 async   updateProfile() {

   this.showProgressbar = true
   const formData = new FormData();

   if (this.selectedImageFile) {
     formData.append('ImageFile', this.selectedImageFile);
   } else  {
     const imageUrl = this.usrProfile.profileImage;
     const fallbackFile = await this.urlToFile(imageUrl, 'profile.jpg');
     formData.append('ImageFile', fallbackFile);
   }

// Append the rest of the fields
   Object.entries(this.profileForm.value).forEach(([key, value]) => {
     if (key !== 'ImageFile') {
       formData.append(key, value ?? '');
     }
   });


    console.log(this.profileForm.value);
    this.http.put(`https://localhost:7065/api/event-manager/admin-dashboard/UpdateProfile/${this.userId}`,
      formData)
      .subscribe({
      next: (data: any) => {
        // window.location.reload();

        this.showToast = true
        this.showProgressbar = false
      },
        error: (err:any) => {
        alert(err.message())
          this.showProgressbar = false
        },
        complete: () => {
        this.showToast = false
          this.showProgressbar = false
        }

    })

  }
}
