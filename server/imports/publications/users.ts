import { Meteor } from 'meteor/meteor';

import { Parties } from '../../../both/collections/parties.collection';
import { Utds2 } from '../../../both/collections/utds2.collection';
import { Utds3 } from '../../../both/collections/utds3.collection';

Meteor.publish('uninvited', function (partyId: string) {
  const party = Parties.findOne(partyId);

  if (!party) {
    throw new Meteor.Error('404', 'No such partyId:' + partyId);
  }

  return Meteor.users.find({
    _id: {
      $nin: party.invited || [],
      $ne: this.userId
    }
  });
});

Meteor.publish('uninvitedUtd2', function (utdId: string) {
    const utd2= Utds2.findOne(utdId);

    if (!utd2) {
        throw new Meteor.Error('404', 'No such utdId:' + utdId);
    }

    return Meteor.users.find({
        _id: {
            $nin: utd2.invited || [],
            $ne: this.userId
        }
    });
});


Meteor.publish('uninvitedUtd3', function (utdId: string) {
    const utd3= Utds3.findOne(utdId);

    if (!utd3) {
        throw new Meteor.Error('404', 'No such utdId:' + utdId);
    }

    return Meteor.users.find({
        _id: {
            $nin: utd3.invited || [],
            $ne: this.userId
        }
    });
});

