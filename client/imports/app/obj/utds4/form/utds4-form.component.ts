import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utds42 } from '../../../../../../both/collections/utds42.collection';
//import {UtilLog} from '../../../../../../both/utlities/UtilLog';
import { UtilLog } from '../../../../../../both/utlities/UtilLog';
import { UtdEnum } from '../../../../../../both/utlities/UtdEnum';
import { UtilDate } from '../../../../../../both/utlities/UtilDate';

import { InjectUser } from "angular2-meteor-accounts-ui";
import template from './utds4-form.component.html';
import style from './utds4-form.component.scss';
import {MeteorObservable} from "meteor-rxjs";
import user = Meteor.user;

@Component({
    selector: 'utds-formx2634',
    template,
    styles: [ style ]
})
@InjectUser("user")
export class Utds4FormComponent implements OnInit {
    addForm: FormGroup;

    images: string[] = [];

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            utdstr: ['', Validators.required],
            public: [false]
        });
    }


    addUtd(): void {
        //UtilLog.utdmLog('in utds4 utdsxx2-form.component.ts', UtilLog.SEVERITYy.INFO);
        UtilLog.utdmLog('in utds4-form.component.ts.addUtd', UtdEnum.Severity.INFO);
        if (!Meteor.userId()) {
            alert('Please log in to add a utd');
            return;
        }

        if (this.addForm.valid) {
            let i;
            for (i = 0; i < 1; i++) {
                if (this.addForm.valid) {
                    UtilLog.log('pre save in client/imports/app/obj/utds4/form/utds4-form.component.ts:' + this.addForm.value.utdstr);
                    try {

                        this.getTexthk.call(this);

                        //alert('pre call');
                        //Meteor.call('hbkTestCallToServer', this);

                        // works 171014
                        //       MeteorObservable.call('hbkTestCallToServer', Meteor.userId()).subscribe(() => {
                        //     //MeteorObservable.call('hbkTestCallToServer', this.utd._id, user._id).subscribe(() => {
                        //         alert('User successfully invited to this utd3.');
                        //     }, (error) => {
                        //         alert(`Failed utd invite to invite due to ${error}`);
                        //     });
                        // end works 171014

// from https://docs.meteor.com/api/methods.html

                        // synch with no callback I guess
                        // Synchronous call
                        // const result = Meteor.call('foo', 1, 2);






                        // asynch works 171014b
                        // Meteor.call('hbkTestCallToServer', 1, 6, (error, result) => {
                        //     if (error)
                        //         alert ('error:'+error);
                        //     if (result)
                        //         alert ('result:'+result);
                        //     if (!error &&  !result)
                        //         alert ('neither error nor result');
                        //
                        // });
                        // end works 171014b

                        UtilLog.log('pre xxxxx save in client/imports/app/obj/utds4/form/utds4-form.component.ts');

                        // synch - try
                        try {
                            // Meteor.call('hbkTestCallToServer4', 'utdidhbk', 'rsvphbk', (error, result) => {
                            Meteor.call('hbkTestCallToServer4', this.addForm.value.utdstr, 'rsvphbk', function (error, result)  {
                                console.log('========================== in callback from hbkTestCallToServer4');
                                if (error)
                                    alert ('error2:'+error);
                                if (result)
                                    alert ('result2:'+result);
                                if (!error &&  !result)
                                    alert ('2neither error nor result');

                            });

                        } catch(e) {
                            console.log ('eeeeeeeeeeeeeeeeeefffffff');
                            UtilLog.logError('hbkTestCallToServer2 ERROR', e)
                        }
                        // end works 171014b

                        UtilLog.log('post xxxxx save in client/imports/app/obj/utds4/form/utds4-form.component.ts');

                        // works but no return 171014c
                        //                      const x = Meteor.call('hbkTestCallToServer', 1, 4);
                        // end works but no return 171014c




                        //alert('post call x:' + x);


                        let dt = UtilDate.getDateStr(new Date()).toString();
                        Utds42.insert({
                            //datey: dt,
                            filelineraw: dt + ' ' + this.addForm.value.utdstr,
                            //texty: this.addForm.value.utdstr,
                            public: this.addForm.value.public,
                            owner: Meteor.userId(),
                            date: dt,
                            text: this.addForm.value.utdstr,
                        });
                    } catch (err) {
                        console.log(err.stack);
                        console.log(err.toString());
                        alert('error in save');
                    }
                } else {
                    alert ('invalid form');
                }
                //alert('post save');

            } // for

            this.addForm.reset();
        }
    }


    //
    getTexthk(){
        UtilLog.log('in getText=================');
        //     // read text from URL location
        //     var request = new XMLHttpRequest();
        //     request.open('GET', 'http://www.puzzlers.org/pub/wordlists/pocket.txt', true);
        //     request.send(null);
        //     request.onreadystatechange = function () {
        //         if (request.readyState === 4 && request.status === 200) {
        //             var type = request.getResponseHeader('Content-Type');
        //             if (type.indexOf("text") !== 1) {
        //                 return request.responseText;
        //             }
        //         }
        //     }
    }

    // from /Users/hkon/utd/170804utd/client/imports/app/obj/utds3/details/utd3-details.component.ts
    // inviteUtd3Methodhbkhbk
    // hbkTestCallToServer (user: Meteor.User) {
    //
    //     //  example call Meteor.call('createPlayer'); // from http://meteortips.com/first-meteor-tutorial/methods/
    //
    //     MeteorObservable.call('hbkTestCallToServer', this.utd._id, user._id).subscribe(() => {
    //         alert('User successfully invited to this utd3.');
    //     }, (error) => {
    //         alert(`Failed utd invite to invite due to ${error}`);
    //     });
    // }

    onImage(imageId: string) {
        this.images.push(imageId);
    }
}
