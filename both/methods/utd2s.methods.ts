import {Utds2} from '../collections/utds2.collection';
import {Email} from 'meteor/email';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';

function getContactEmail(user:Meteor.User):string {
  if (user.emails && user.emails.length)
    return user.emails[0].address;

  return null;
}

Meteor.methods({
  inviteUtdMethod: function (utdId:string, userId:string) {

    let s = '***************   in utd2s.methods.ts ' + (Meteor.isServer ? 'server' : 'client');
    check(utdId, String);
    check(userId, String);

    let utd2 = Utds2.collection.findOne(utdId);

    if (!utd2)
      throw new Meteor.Error('404', 'No such utd2!');

    if (utd2.public)
      throw new Meteor.Error('400', 'That utd2 is public. No need to invite people.');

    if (utd2.owner !== this.userId)
      throw new Meteor.Error('403', 'No permissions!');

    if (userId !== utd2.owner && (utd2.invited || []).indexOf(userId) == -1) {
      Utds2.collection.update(utdId, {$addToSet: {invited: userId}});

      let from = getContactEmail(Meteor.users.findOne(this.userId));
      let to = getContactEmail(Meteor.users.findOne(userId));

      if (Meteor.isServer && to) {
        Email.send({
          from: 'noreply@socially.com',
          to: to,
          replyTo: from || undefined,
          subject: 'UTD: ' + utd2.name,
          text: `Hi, I just invited you to ${utd2.name} on Socially.
                        \n\nCome check it out: ${Meteor.absoluteUrl()}\n`
        });
      }
    }
  },
  replyUtdx: function(utdId: string, rsvp: string) {
    check(utdId, String);
    check(rsvp, String);

    if (!this.userId)
      throw new Meteor.Error('403', 'You must be logged-in to reply');

    if (['yes', 'no', 'maybe'].indexOf(rsvp) === -1)
      throw new Meteor.Error('400', 'Invalid RSVP');

    let utd = Utds2.findOne({ _id: utdId });

    if (!utd)
      throw new Meteor.Error('404', 'No such utd');

    if (utd.owner === this.userId)
      throw new Meteor.Error('500', 'You are the owner!');

    if (!utd.public && (!utd.invited || utd.invited.indexOf(this.userId) == -1))
      throw new Meteor.Error('403', 'No such utd'); // its private, but let's not tell this to the user

    let rsvpIndex = utd.rsvps ? utd.rsvps.findIndex((rsvp) => rsvp.userId === this.userId) : -1;

    if (rsvpIndex !== -1) {
      // update existing rsvp entry
      if (Meteor.isServer) {
        // update the appropriate rsvp entry with $
        Utds2.update(
          { _id: utdId, 'rsvps.userId': this.userId },
          { $set: { 'rsvps.$.response': rsvp } });
      } else {
        // minimongo doesn't yet support $ in modifier. as a temporary
        // workaround, make a modifier that uses an index. this is
        // safe on the client since there's only one thread.
        let modifier = { $set: {} };
        modifier.$set['rsvps.' + rsvpIndex + '.response'] = rsvp;

        Utds2.update(utdId, modifier);
      }
    } else {
      // add new rsvp entry
      Utds2.update(utdId,
        { $push: { rsvps: { userId: this.userId, response: rsvp } } });
    }
  }
});