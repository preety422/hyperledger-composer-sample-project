import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Skill, Person, Student, Administrator } from '../org.skillcape.tricon';
import 'rxjs/Rx';
import { Participant } from '../org.hyperledger.composer.system';
import { Configuration } from '../configuration';
import { Http, Response, Headers } from '@angular/http';

// Can be injected into a constructor
 @Injectable()
 export class PersonService {

    private REGISTERNAMESPACE: string = 'register';
    private LOGINNAMESPACE: string = 'login';

    private resolveSuffix: string = '?resolve=true';
    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public async registerPerson(person: any){

        return this.http.post(this.actionUrl + this.REGISTERNAMESPACE, person)
        .map(this.extractData)
        .catch(this.handleError);
    }

    public async loginPerson(person: any) {

        return this.http.post(this.actionUrl + this.LOGINNAMESPACE, person)
        .map(this.extractData)
        .catch(this.handleError);
    }

    private handleError(error: any): Observable<string> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private extractData(res: Response): any {
        return res.json();
    }

   
 }
