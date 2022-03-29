import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {

  constructor() { }
  
  header() {

    let httpHeader: HttpHeaders = new HttpHeaders();

    if (localStorage['token']) {
      httpHeader = httpHeader.set(
        "Authorization", 'Bearer ' + localStorage['token']
      );
    }

    return { headers: httpHeader }
  }

}
