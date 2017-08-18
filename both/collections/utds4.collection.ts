import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Utd3 }  from '../models/utd3.model';
import {Utd4} from "../models/utd4.model";

export const Utds4 = new MongoObservable.Collection<Utd4>('utds4ahbkpubname');
console.log ('hbkhbk in utds4.collection.ts');

function loggedIn() {
  return !!Meteor.user();
}

Utds4.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
