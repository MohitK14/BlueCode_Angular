import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ServiceDataService } from '../service-data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isFormSubmitted = false;
  loginData:any;
  errorMsg;
  errorFlag: Boolean = false;

  constructor(private route: Router, private apiService: LoginService, private serviceData: ServiceDataService) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    })

  }

  // submit(){
    
  // }

  onSubmit(form) {

    //console.log("hi");
    this.isFormSubmitted = true;
    if (form.status == "VALID") {
      //console.log("hi");
      this.apiService.login(form.value).subscribe(res=>{
        this.errorFlag = false;
        //console.log(res);
        if(res.status != 400){
          this.loginData = res;
          // //console.log(this.loginData); 
          this.serviceData.setData({
            email: res.email,
            id: res.id,
            token: res.tokenData
          })
          
        this.route.navigate(["/dashboard"]);
        }
        else if(res.status== 400){
          
          //console.log(res);
        }
      }, err=>{
          //console.log(err);
          this.errorFlag = true;
          this.errorMsg = err.error.message ? err.error.message : err.error ;
      });
       
     //console.log(form);
    }

  }

  forgotPwd(){
    this.route.navigate(["/resetPassword"])
  }

  signUp(){
    this.route.navigate(["/signUp"])
  }

}
