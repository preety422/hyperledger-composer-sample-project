import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PersonService } from './home.service';
import 'rxjs/add/operator/toPromise';
import {Router} from "@angular/router";
import { Skill } from '../org.skillcape.tricon';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [PersonService]
})
export class HomeComponent {

	myForm: FormGroup;

	private allAssets;
	private asset;
	private currentId;
	private errorMessage;



	email = new FormControl("", Validators.required);



	firstName = new FormControl("", Validators.required);



	lastName = new FormControl("", Validators.required);



	password = new FormControl("", Validators.required);




	constructor(private servicePerson: PersonService, fb: FormBuilder, private router: Router) {
		this.myForm = fb.group({


			email: this.email,



			firstName: this.firstName,



			lastName: this.lastName,



			password: this.password


		});
	};

	registerPerson(form: any): Promise<any> {
		this.asset = {
		  $class: "org.skillcape.tricon.Skill",
		  
			
			  "email":this.email.value,
			
		  
			
			  "firstName":this.firstName.value,
			
		  
			
			  "lastName":this.lastName.value,
			
		  
			
			  "password":this.password.value
			
		  
		};
	
		this.myForm.setValue({
		  
			
			  "email":null,
			
		  
			
			  "firstName":null,
			
		  
			
			  "lastName":null,
			
		  
			
			  "password":null
			
		  
		});
	
		return this.servicePerson.registerPerson(this.asset)
		.then(() => {
				this.errorMessage = null;
		  this.myForm.setValue({
		  
			
			  "email":null,
			
		  
			
			  "firstname":null,
			
		  
			
			  "lastName":null,
			
		  
			
			  "password":null 
			
		  
		  });
		  this.router.navigate(['/SkillComponent']);
		})
		.catch((error) => {
			if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else{
				this.errorMessage = error;
			}
		});
	  }

	
}
