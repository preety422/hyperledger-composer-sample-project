'use strict';

var ORGNAMESPACE = 'org.skillcape';
var NAMESPACE = 'Person';
var ADMIN = 'admin@skillcape';


/**
 * Write your transction processor functions here
 * @param {org.skillcape.publish} tx The publish skill transaction instance
 * @transaction
 */

function publish(tx) {
    var skill = tx.skill;
    var participant = tx.skill.student;// 
    var txParticipant = getCurrentParticipant();
    skill.status = tx.newStatus;

    return getAssetRegistry('org.skillcape.Skill')
        .then(function (skillRegistry) {
            return skillRegistry.update(skill);
        })
        .then(function () {
            return getParticipantRegistry('org.skillcape.Student');
        })
        .then(function (studentRegistry) {
            participant.skills.push(skill);
            return studentRegistry.update(participant);
        })
}

/**
 * Write your transction processor functions here
 * @param {org.skillcape.studentPublishSkill} tx 
 * The publish skill transaction instance
 * @transaction
 */

function studentPublishSkill(tx) {
    var skill = tx.skill;
    var participant = tx.skill.student;// 
    var txParticipant = getCurrentParticipant();

    return getAssetRegistry('org.skillcape.Skill')
        .then(function (skillRegistry) {
            if (participant.$class == txParticipant.$class) {
                if (skill.status == 'NEW') {
                    return skillRegistry.update(skill);
                } else {
                    return Promise.reject(
                        new Error("Student can create skill with NEW only"));
                }
            }
            else {
                return Promise.reject(
                    new Error("Transaction Participant is not student"));
            }
        })
        .then(function () {
            return getParticipantRegistry('org.skillcape.Student');
        })
        .then(function (studentRegistry) {
            participant.skills.push(skill);
            return studentRegistry.update(participant);
        })
}

/**
 * Write your transction processor functions here
 * @param {org.skillcape.adminUpdateSkill} tx 
 * The publish skill transaction instance
 * @transaction
 */

function adminUpdateSkill(tx) {
    var skill = tx.skill;
    var participant = tx.skill.student;// 
    var txParticipant = getCurrentParticipant();
    skill.status = tx.newStatus;

    return getAssetRegistry('org.skillcape.Skill')
        .then(function (skillRegistry) {
            if (txParticipant.$class == 'org.skillcape.Administrator') {
                return skillRegistry.update(skill);
            } else {
                return Promise.reject(
                    new Error("Transaction Participant is not student"));
            }
        })
        .then(function () {
            return getParticipantRegistry('org.skillcape.Student');
        })
        .then(function (studentRegistry) {
            participant.skills.push(skill);
            return studentRegistry.update(participant);
        })
}


/**
 * Write your transction processor functions here
 * @param {org.skillcape.register} tx 
 * The publish skill transaction instance
 * @transaction
 */

function registerPerson(tx) {
    return new Promise(function (resolve, reject) {
        addParticipant(tx)
            .then(function (part) {
                // return issueIdentity(tx);
                resolve(part);
            })
        //  .then(function (identity) {
        //      resolve(identity);
        //  });

    });
}

/**
 * Write your transction processor functions here
 * @param {org.skillcape.login} tx 
 * The publish skill transaction instance
 * @transaction
 */

function loginPerson(creds) {
    return getParticipantRegistry(ORGNAMESPACE + '.Student')
        .then(function (participantRegistry) {
            return participantRegistry.get(creds.personId);
        })
        .then(function (participant) {
            return participant.secret == creds.secretId ? "success" : "failure"
        })
}


function addParticipant(person) {
    var factory = getFactory();
    var participant = factory.newResource(ORGNAMESPACE,
        person.personType, person.personId);
    participant.personId = person.personId;
    participant.firstName = person.firstName;
    participant.lastName = person.lastName;
    participant.secretId = person.secretId;
    return new Promise(function (resolve, reject) {
        getParticipantRegistry(ORGNAMESPACE + '.Institution')
            .then(function (institutionRegistry) {
                return institutionRegistry.get(person.institutionCode);
            })
            .then(function (institution) {
                participant.institute = institution
                return getParticipantRegistry(ORGNAMESPACE + '.' + person.personType);
            })
            .then(function (participantRegistry) {
                return participantRegistry.add(participant);
            })
            .then(function (part) {
                resolve(part);
            })
            .catch(function (part) {
                reject("failure");
            })
    });
}


/**
 * Write your transction processor functions here
 * @param {org.skillcape.issueIdentity} tx 
 * The issueIdentity skill transaction instance
 * @transaction
 */
function issueIdentity(person) {
    var id = 'org.skillcape.Student#' + person.personId;
    var BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
    var businessNetworkConnection = new BusinessNetworkConnection();
    return businessNetworkConnection.connect('admin@skillcape')
        .then(function () {
            return businessNetworkConnection.issueIdentity(id, person.personId)
                .then(function (result) {
                    console.log('-------userID------- = ' + result.userID);
                    console.log('--------userSecret------ = ' + result.userSecret);
                    resolve(result);
                })
                .catch(function (result) {
                    reject(null);
                });
        });

}

issueIdentity({ personId: 'person07' });
