import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
//import {Utd4} from "../models/utd4.model";
import {Utd42} from "../models/utd42.model";
import { UtilLog } from "../../both/utlities/UtilLog";
import { UtdEnum } from "../../both/utlities/UtdEnum";

// utdbase is the mongo collection name
export const Utds42 = new MongoObservable.Collection<Utd42>('utdbase');
UtilLog.utdmLog(" hbkhbk in utds42.collection.ts main", UtdEnum.Severity.INFO);


function loggedIn() {
  return !!Meteor.user();
}

Utds42.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
