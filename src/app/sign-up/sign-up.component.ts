import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  signUpForm: FormGroup;
  isFormSubmitted = false;
  successMsg: Boolean = false;
  errorMsg;
  errorFlag: Boolean = false;
  constructor(private apiService: SignUpService, private route: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    })
  }

  // signUp(){
  //   //console.log("hi");
  //   this.apiService.getCountryList().subscribe(res=>{

  //   });
  // }

  onSubmit(form) {
    //console.log("hi");
    this.isFormSubmitted = true;
    //console.log(form);
    if (form.status == "VALID") {
      // this.apiService.getData().subscribe(res=>{
      //   console.log(res);
      // });
      this.apiService.signUpData(form.value).subscribe(res=>{
        this.errorFlag = false;
        console.log(res);
        if(res){
          this.successMsg = true;
        }
        else{
          this.successMsg = false;
        }
      },  err=>{
        //console.log(err);
        this.errorFlag = true;
        this.errorMsg = err.error.message ? err.error.message : err.error ;
    });
     //console.log(form);
    }
  }

  login(){
    this.route.navigate(["/login"])
  }

}
