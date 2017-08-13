import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Utds3 } from '../../../both/collections/utds3.collection';

interface Options {
  [key: string]: any;
}

Meteor.publish('utds3ahbkpubname', function(options: Options, location?: string) {
  console.log('===== in publish (utds3ahbkpubname)');

  const selector = buildQuery.call(this, null, location);

  Counts.publish(this, 'numberOfUtds', Utds3.collection.find(selector), { noReady: true });

  return Utds3.find(selector, options);
});

Meteor.publish('indivUtdhbkpubname', function(utdId: string) {
  console.log('======= in publish(indivUtdhbkpubname)');

  return Utds3.find(buildQuery.call(this, utdId));
});


function buildQuery(utdId?: string, location?: string): Object {
  const isAvailable = {
    $or: [{
      // utd is public
      public: true
    },
      // or
      {
        // current user is the owner
        $and: [{
          owner: this.userId
        }, {
          owner: {
            $exists: true
          }
        }]
      },
      {
        $and: [
          { invited: this.userId },
          { invited: { $exists: true } }
        ]
      }]
  };

  if (utdId) {
    return {
      // only single utd
      $and: [{
        _id: utdId
      },
        isAvailable
      ]
    };
  }

  const searchRegEx = { '$regex': '.*' + (location || '') + '.*', '$options': 'i' };

  return {
    $and: [{
      'location.name': searchRegEx
    },
      isAvailable
    ]
  };
}