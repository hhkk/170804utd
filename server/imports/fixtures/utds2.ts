import { Utds2 } from '../../../both/collections/utds2.collection';
import { Utd2 } from '../../../both/models/utd2.model';

export function loadUtds() {
  if (Utds2.find().cursor.count() === 0) {
    const utds2: Utd2[] = [{
      name: 'Dubstep-Free Zone',
      description: 'Can we please just for an evening not listen to dubstep.',
      location: {
        name: 'Palo Alto'
      },
      public: true
    }, {
      name: 'All dubstep all the time',
      description: 'Get it on!',
      location: {
        name: 'Palo Alto'
      },
      public: true
    }, {
      name: 'Savage lounging',
      description: 'Leisure suit required. And only fiercest manners.',
      location: {
        name: 'San Francisco'
      },
      public: false
    }];

    utds2.forEach((utd2: Utd2) => Utds2.insert(utd2));
  }
}