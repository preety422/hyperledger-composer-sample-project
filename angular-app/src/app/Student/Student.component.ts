import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StudentSkillService } from './Student.service';
import 'rxjs/add/operator/toPromise';
import { ViewChild } from '@angular/core';
@Component({
	selector: 'app-Skill',
	templateUrl: './Student.component.html',
	styleUrls: ['./Student.component.css'],
  providers: [StudentSkillService]
})
export class StudentSkillComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  @ViewChild("gtStartDate") startDate;
  @ViewChild("gtEndDate") endDate;

  
      
          personSkillId = new FormControl("", Validators.required);
        
  
      
          skillCode = new FormControl("", Validators.required);
        
  
      
          name = new FormControl("", Validators.required);
        
  
      
          category = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          Student = new FormControl("", Validators.required);
        
  


  constructor(private serviceSkill:StudentSkillService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          personSkillId:this.personSkillId,
        
    
        
          skillCode:this.skillCode,
        
    
        
          name:this.name,
        
    
        
          category:this.category,
        
    
        
          status:this.status,
        
    
        
          Student:this.Student
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceSkill.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.skillcape.Skill",
      
        
          "personSkillId":this.personSkillId.value,
        
      
        
          "skillCode":this.skillCode.value,
        
      
        
          "name":this.name.value,
        
      
        
          "category":this.category.value,
        
      
        
          "status":this.status.value,
        
      
        
          "Student":this.Student.value
        
      
    };

    this.myForm.setValue({
      
        
          "personSkillId":null,
        
      
        
          "skillCode":null,
        
      
        
          "name":null,
        
      
        
          "category":null,
        
      
        
          "status":null,
        
      
        
          "Student":null
        
      
    });

    return this.serviceSkill.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "personSkillId":null,
        
      
        
          "skillCode":null,
        
      
        
          "name":null,
        
      
        
          "category":null,
        
      
        
          "status":null,
        
      
        
          "Student":null 
        
      
      });
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.skillcape.Skill",
      
        
          
        
    
        
          
            "skillCode":this.skillCode.value,
          
        
    
        
          
            "name":this.name.value,
          
        
    
        
          
            "category":this.category.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "Student":this.Student.value
          
        
    
    };

    return this.serviceSkill.updateAsset(form.get("personSkillId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceSkill.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceSkill.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "personSkillId":null,
          
        
          
            "skillCode":null,
          
        
          
            "name":null,
          
        
          
            "category":null,
          
        
          
            "status":null,
          
        
          
            "Student":null 
          
        
      };



      
        if(result.personSkillId){
          
            formObject.personSkillId = result.personSkillId;
          
        }else{
          formObject.personSkillId = null;
        }
      
        if(result.skillCode){
          
            formObject.skillCode = result.skillCode;
          
        }else{
          formObject.skillCode = null;
        }
      
        if(result.name){
          
            formObject.name = result.name;
          
        }else{
          formObject.name = null;
        }
      
        if(result.category){
          
            formObject.category = result.category;
          
        }else{
          formObject.category = null;
        }
      
        if(result.status){
          
            formObject.status = result.status;
          
        }else{
          formObject.status = null;
        }
      
        // if(result.Student){
          
        //     formObject.Student = result.Student;
          
        // }else{
        //   formObject.Student = null;
        // }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "personSkillId":null,
        
      
        
          "skillCode":null,
        
      
        
          "name":null,
        
      
        
          "category":null,
        
      
        
          "status":null,
        
      
        
          "Student":null 
        
      
      });
  }

  onClickApplyFilter (){
      
  }

}
