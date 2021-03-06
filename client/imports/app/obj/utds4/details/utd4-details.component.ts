import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { MouseEvent } from "angular2-google-maps/core";

import 'rxjs/add/operator/map';

import { Utds4 } from '../../../../../../both/collections/utds4.collection';
import { Utd4 } from '../../../../../../both/models/utd4.model';
import { Users } from '../../../../../../both/collections/users.collection';
import { User } from '../../../../../../both/models/user.model';

import template from './utd4-details.component.html';
import style from './utd4-details.component.scss';
import {Utds42} from "../../../../../../both/collections/utds42.collection";
import {Utd42} from "../../../../../../both/models/utd42.model";
//import JSONStream = Mocha.reporters.JSONStream;

console.log ('hbkhbk in client utds4-details.component.ts');

@Component({
    selector: 'utd-detailsxxcomponentselector42',
    template,
    styles: [ style ]
})
@InjectUser('user')
export class Utd4DetailsComponent implements OnInit, OnDestroy {
    utdId: string;
    paramsSub: Subscription;
    utd: Utd42;
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

                this.utdSub = MeteorObservable.subscribe('indivUtdhbkpubname42', this.utdId).subscribe(() => {
                    console.log('hbkhbk in subscribe utd4pub');
                    MeteorObservable.autorun().subscribe(() => {
                        console.log('------------------ in Utds4 in MeteorObservable.autorun this.utdId:' + this.utdId);
                        this.utd = Utds42.findOne(this.utdId);
                        this.getUsers(this.utd);
                    });
                });

                if (this.uninvitedSub) {
                    this.uninvitedSub.unsubscribe();
                }

                this.uninvitedSub = MeteorObservable.subscribe('uninvitedUtd4', this.utdId).subscribe(() => {
                    this.getUsers(this.utd);
                });
            });
    }

    getUsers(utd: Utd42) {
        if (utd) {
            this.users = Users.find({
                _id: {
                    // hbk $nin: utd.invited || [],
                    $ne: Meteor.userId()
                }
            }).zone();
        }
    }

    saveUtd() {
        alert ('in saveUtd');
        if (!Meteor.userId()) {
            alert('Please log in to change this utd');
            return;
        }

        Utds42.update(this.utd._id, {
            $set: {
                filelineraw: this.utd.filelineraw,
                'public': this.utd.public
            }

        });
        alert ('saved update to:'+ JSON.stringify(this.utd));
    }

    inviteUtd(user: Meteor.User) {
        MeteorObservable.call('inviteUtd4Methodhbkhbk', this.utd._id, user._id).subscribe(() => {
            alert('User successfully invited to this utd4.');
        }, (error) => {
            alert(`Failed utd invite to invite due to ${error}`);
        });
    }

    replyUtd(rsvp: string) {
        MeteorObservable.call('replyUtd4x', this.utd._id, rsvp).subscribe(() => {
            alert('You successfully replied to this utd4.');
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

    ngOnDestroy() {
        //alert('exiting 1 utd4-details.component.ts');
        this.paramsSub.unsubscribe();
        //alert('exiting 2 utd4-details.component.ts');
        this.utdSub.unsubscribe();
        //alert('exiting 3 utd4-details.component.ts');
        this.uninvitedSub.unsubscribe();
        //alert('exiting 4 utd4-details.component.ts');
    }
}
