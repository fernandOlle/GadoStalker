import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class BaseService {

	constructor() { }

	getHeaders() {
		let headers = { 'Content-Type': 'application/json'};
		let reqOpts = { headers: new HttpHeaders(headers)};
		return reqOpts;
	}

}
