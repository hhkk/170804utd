import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { Utd3 }  from '../models/utd3.model';
import { UtilLog } from "../../both/utlities/UtilLog";
import { UtdEnum } from "../../both/utlities/UtdEnum";

export const Utds3 = new MongoObservable.Collection<Utd3>('utds3ahbkpubname');
UtilLog.utdmLog("hbkhbk in utds3.collection.ts main", UtdEnum.Severity.INFO);

function loggedIn() {
  return !!Meteor.user();
}

Utds3.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
