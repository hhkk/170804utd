import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import {Utd4} from "../models/utd4.model";
import { UtilLog } from "../../both/utlities/UtilLog";
import { UtdEnum } from "../../both/utlities/UtdEnum";

export const Utds4 = new MongoObservable.Collection<Utd4>('utdbase2');
//UtilLog.utdmLog("@@@@@@@@@@@@@@ hbkhbk in utds4.collection.ts main", UtdEnum.Severity.INFO);


function loggedIn() {
  return !!Meteor.user();
}

Utds4.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
