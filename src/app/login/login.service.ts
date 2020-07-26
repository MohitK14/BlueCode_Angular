import { Injectable } from '@angular/core';
//declare var environment: any;
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServiceDataService } from '../service-data.service';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
  constructor(private apiService: ServiceDataService, private http: HttpClient){ }

  login(data){
    return this.apiService.getDataPromise("POST", environment.BASE_API_URL+"/login", data, {}, {} )
  }

}
