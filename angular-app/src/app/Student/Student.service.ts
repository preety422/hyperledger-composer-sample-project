import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Skill, Student } from '../org.skillcape.tricon';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class StudentSkillService {

	
    private NAMESPACE: string = 'Skill';
    
    private PUBLISH_NAMESPACE: string = "publish";
	



    constructor(private dataService: DataService<Skill>) {
    };

    public getAll(): Observable<Skill[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Skill> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Skill> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Skill> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Skill> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

    public publishStudentSkill(itemToPublish: any): Observable<Skill>{
      return this.dataService.add(this.PUBLISH_NAMESPACE, itemToPublish);
    }

}
