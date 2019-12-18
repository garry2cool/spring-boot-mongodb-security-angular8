import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  fullName = '';
  email = '';
  password = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'fullName' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.authService.register(form)
      .subscribe(res => {
        if (res.message) {
          this.toastr.success('Registration Successful', 'Success', {timeOut: 2000});
          this.router.navigate(['login']);
        } else {
          this.toastr.success('Email is already registered', 'Error', {timeOut: 2000});
        }
      }, (err) => {
        console.log(err);
        alert(err.error);
      });
  }

}
