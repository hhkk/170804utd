import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Utds2 } from '../../../both/collections/utds2.collection';

interface Options {
  [key: string]: any;
}

Meteor.publish('utds2a', function(options: Options, location?: string) {
  console.log('===== in publish (utds2a)');

  const selector = buildQuery.call(this, null, location);

  Counts.publish(this, 'numberOfUtds', Utds2.collection.find(selector), { noReady: true });

  return Utds2.find(selector, options);
});

Meteor.publish('utd2pub', function(utdId: string) {
  console.log('======= in publish(utd2pub)');

  return Utds2.find(buildQuery.call(this, utdId));
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