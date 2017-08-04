import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Utd2 }  from '../models/utd2.model';

export const  Utds2 = new MongoObservable.Collection<Utd2>('utds2a');
console.log ('in utds2.collection.ts');

function loggedIn() {
  return !!Meteor.user();
}

Utds2.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
