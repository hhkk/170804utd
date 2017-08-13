import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { MouseEvent } from "angular2-google-maps/core";

import 'rxjs/add/operator/map';

import { Utds3 } from '../../../../../../both/collections/utds3.collection';
import { Utd3 } from '../../../../../../both/models/utd3.model';
import { Users } from '../../../../../../both/collections/users.collection';
import { User } from '../../../../../../both/models/user.model';

import template from './utd2-details.component.html';
import style from './utd2-details.component.scss';

console.log ('in client utd2-details.component.ts');

@Component({
  selector: 'utd-details',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class Utd2DetailsComponent implements OnInit, OnDestroy {
  utdId: string;
  paramsSub: Subscription;
  utd: Utd3;
  utdSub: Subscription;
  users: Observable<User>;
  uninvitedSub: Subscription;
  user: Meteor.User;
  // Default center Palo Alto coordinates.
  centerLat: number = 37.4292;
  centerLng: number = -122.1381;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['utdId'])
      .subscribe(utdId => {
        this.utdId = utdId;
        
        if (this.utdSub) {
          this.utdSub.unsubscribe();
        }

        this.utdSub = MeteorObservable.subscribe('utd2pub', this.utdId).subscribe(() => {
          console.log('in subscribe utd2pub');
          MeteorObservable.autorun().subscribe(() => {
            this.utd = Utds3.findOne(this.utdId);
            this.getUsers(this.utd);
          });
        });

         if (this.uninvitedSub) {
           this.uninvitedSub.unsubscribe();
         }

         this.uninvitedSub = MeteorObservable.subscribe('uninvitedUtd2', this.utdId).subscribe(() => {
           this.getUsers(this.utd);
         });
      });
  }

  getUsers(utd: Utd3) {
    if (utd) {
      this.users = Users.find({
        _id: {
          $nin: utd.invited || [],
          $ne: Meteor.userId()
        }
      }).zone();
    }
  }

  saveUtd() {
    if (!Meteor.userId()) {
      alert('Please log in to change this utd');
      return;
    }
    
    Utds3.update(this.utd._id, {
      $set: {
        name: this.utd.name,
        description: this.utd.description,
        location: this.utd.location,
        'public': this.utd.public
      }
    });
  }

  inviteUtd(user: Meteor.User) {
    MeteorObservable.call('inviteUtdMethod', this.utd._id, user._id).subscribe(() => {
      alert('User successfully invited to this utd2.');
    }, (error) => {
      alert(`Failed utd invite to invite due to ${error}`);
    });
  }

  replyUtd(rsvp: string) {
    MeteorObservable.call('replyUtdx', this.utd._id, rsvp).subscribe(() => {
      alert('You successfully replied to this utd2.');
    }, (error) => {
      alert(`Failed to reply due to ${error}`);
    });
  }

  get isOwner(): boolean {
    return this.utd && this.user && this.user._id === this.utd.owner;
  }

  get isPublic(): boolean {
    return this.utd && this.utd.public;
  }

  get isInvited(): boolean {
    if (this.utd && this.user) {
      const invited = this.utd.invited || [];

      return invited.indexOf(this.user._id) !== -1;
    }

    return false;
  }


  get lat(): number {
    return this.utd && this.utd.location.lat;
  }

  get lng(): number {
    return this.utd && this.utd.location.lng;
  }

  mapClicked($event: MouseEvent) {
    this.utd.location.lat = $event.coords.lat;
    this.utd.location.lng = $event.coords.lng;
  }

  ngOnDestroy() {
    //alert('exiting 1 utd2-details.component.ts');
    this.paramsSub.unsubscribe();
    //alert('exiting 2 utd2-details.component.ts');
    this.utdSub.unsubscribe();
    //alert('exiting 3 utd2-details.component.ts');
    this.uninvitedSub.unsubscribe();
    //alert('exiting 4 utd2-details.component.ts');
  }
}
