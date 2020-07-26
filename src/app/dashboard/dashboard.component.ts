import { Component, OnInit } from '@angular/core';
import { ServiceDataService } from '../service-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private serviceData: ServiceDataService, private route: Router) { }
  userData: any;
  jwtToken: string;

  ngOnInit(): void {
   this.userData = this.serviceData.getData();
    console.log(this.userData);
    if(this.userData){
    localStorage.setItem("jwtToken", this.userData.token);
    localStorage.setItem("email", this.userData.email);
    localStorage.setItem("id", this.userData.id);
    }
  }

  logout(){
    localStorage.clear();
    this.route.navigate(["/login"])
  }

}
