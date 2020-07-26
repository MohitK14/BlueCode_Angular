import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { ResetPasswordService } from './forgot-pwd.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  constructor(private apiService: ResetPasswordService, private route: Router) { }

  forgotForm: FormGroup;
  isFormSubmitted: Boolean= false;
  errorFlag: Boolean = false;
  successMsg: Boolean = false;;
  errorMsg;

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    })
  }

  login(){
    this.route.navigate(["/login"])
  }

  onSubmit(form) {
    //console.log("hi");
    this.isFormSubmitted = true;
    //console.log(form);
    if (form.status == "VALID") {
      
      this.apiService.resetPassword(form.value).subscribe(res=>{
        //console.log(res);
        this.errorFlag=false;
        this.successMsg = true;
      },  err=>{
        ////console.log(err);
        this.errorFlag = true;
        this.errorMsg = err.error.message ? err.error.message : err.error ;
    });
    
    }
  }

}
