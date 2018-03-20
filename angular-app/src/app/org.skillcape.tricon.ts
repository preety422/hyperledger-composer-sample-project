import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.skillcape.tricon{
   export class Skill extends Asset {
      personSkillId: string;
      skillCode: string;
      name: string;
      category: Category;
      status: Status;
      student: Student;
   }
   export enum Status {
      NEW,
      APPROVED,
   }
   export abstract class Person extends Participant {
      personId: string;
      firstName: string;
      lastName: string;
      secretId: string;
      institute: Institution;
   }
   export enum Category {
      Engineering,
      Management,
      Analytics,
      Psychology,
   }
   export class Student extends Person {
      category: Category;
      skills: Skill[];
   }
   export class Administrator extends Person {
   }
   export class Institution extends Participant {
      institutionCode: string;
      name: string;
      city: string;
   }
   export class publish extends Transaction {
      skill: Skill;
      person: Person;
      newStatus: Status;
   }
   export class studentPublishSkill extends Transaction {
      skill: Skill;
      person: Person;
   }
   export class adminUpdateSkill extends Transaction {
      skill: Skill;
      person: Person;
      newStatus: Status;
   }
   export enum Type {
      Student,
      Admin,
   }
   export class register extends Transaction {
      personId: string;
      firstName: string;
      lastName: string;
      institutionCode: string;
      secretId: string;
      personType: Type;
   }
   export class login extends Transaction {
      personId: string;
      secretId: string;
   }
   export class issueIdentity extends Transaction {
      personId: string;
      personType: Type;
   }
// }
