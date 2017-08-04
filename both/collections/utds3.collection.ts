import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Utd3 }  from '../models/utd3.model';

export const Utds3 = new MongoObservable.Collection<Utd3>('utds3a');
console.log ('in utds3.collection.ts');

function loggedIn() {
  return !!Meteor.user();
}

Utds3.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
