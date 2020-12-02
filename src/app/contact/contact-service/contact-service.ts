import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class ContactService {
  

  constructor(public _http: Http, private _router: Router) { }

  getHistory(){
      return this._http.get("https://jsonplaceholder.typicode.com/users")
        .map((response: Response) => {
            return response.json();
        }).catch(this.handleError);
  }

  saveData(data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("https://jsonplaceholder.typicode.com/users",data ,{ headers: headers })
    .map((response: Response) => {
        return response.json();
    }).catch(this.handleError);
  }

  updateData(employee) {
    return this._http.put("https://jsonplaceholder.typicode.com/users" + '/' + employee.id, employee)
    .map((response: Response) => {
      return response.json();
  }).catch(this.handleError);;
  }

  handleError(error: Response) {
      console.error("error " + error);
      return Observable.throw(error);
  }
}
