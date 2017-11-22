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
// import {Utds42List} from "../../../shared-components/utds42-list.class";
// import { Utds4ListComponent } from "../list/utds4-list.component";
// import {PaginationService} from "ng2-pagination";

@Component({
    selector: 'utds-formx2634',
    template,
    styles: [ style ]
})
@InjectUser("user")
export class Utds4FormComponent implements OnInit {
    addForm: FormGroup;
    setSearchStringForm: FormGroup;
    hkbigstring1: string
    images: string[] = [];

    constructor(
        private formBuilder: FormBuilder
    ) {
        //alert ('in Utds4FormComponent.construct');
        this.hkbigstring1 = 'hkbigstring1b';
    }

    ngOnInit() {
        //alert('in Utds4FormComponent.ngOnInit()');
        this.addForm = this.formBuilder.group(
            {
                utdstr: ['', Validators.required],
                public: [false],
                save2: [true]
            });



        let xx = this.addForm.getRawValue();
        xx.utdstr = 'sdsdfsdfsdfsdf';


        //works this.addForm.setValue({utdstr: 'utdstr_yo', public: false, save2: true});
        this.addForm.setValue(xx);
        // this.addForm.setValue({utdstr: 'utdstr_yo', last: 'Drew'});

        //alert('utdstr:' + this.addForm.getRawValue().utdstr);

        this.setSearchStringForm = this.formBuilder.group(
            {
                setsrchhbk: [true]
            });
    }


    setSrch(srchStr): void {
        alert('in setSrch srchStr:' + srchStr);
    }


    //addUtd(addUtdStr, saveUtdCheckbox, publicUtdCheckbox): void {
    addUtd(addUtdStr, saveHtmlHolder, publicHtmlHolder): void {
        //UtilLog.utdmLog('in utds4 utdsxx2-form.component.ts', UtilLog.SEVERITYy.INFO);
        //alert ('in addUtd utds4-form.component.ts.addUtd:' + addUtdStr);
//         UtilLog.utdmLog('========= in addUtd saveHtmlHolder:' + saveHtmlHolder, UtdEnum.Severity.INFO);
//
//         try {
//             UtilLog.utdmLog('========= in addUtd saveHtmlHolder._checked:' + saveHtmlHolder._checked, UtdEnum.Severity.INFO);
//
//         } catch (error) {
//             UtilLog.logError('in addUtd save retrieve', error);
//         }
//         UtilLog.utdmLog('in addUtd utds4-form.component.ts.addUtd:' + addUtdStr, UtdEnum.Severity.INFO);
//         if (!Meteor.userId()) {
//             alert('Please log in to add a utd');
//             return;
//         }
//
//         //let saveUtdCheckbox = this.addForm.value.saveUtdCheckbox;
//         // let publicUtdCheckbox = this.addForm.value.publicUtdCheckbox;
//         // UtilLog.utdmLog('in addUtd saveUtdCheckbox:' + saveUtdCheckbox, UtilLog.SEVERITYy.INFO);
//         // UtilLog.utdmLog('in addUtd publicUtdCheckbox:' + publicUtdCheckbox, UtilLog.SEVERITYy.INFO);
//
//
//         // alert('in add looking across to list window.xxxglobalUtds42List.constructedTime:' + window.xxxglobalUtds42List.constructedTime);
//         //alert('in add BEFORE looking across to list window.xxxglobalUtds42List.searchutdbase:');
//
//
        let x = window.xxxglobalUtds42List;
//         // WORKS - OLD WAY - x.searchutdbase(this.addForm.value.utdstr);  // GLOBALUSAGE
        x.searchutdbase(addUtdStr);  // NO GLOBALUSAGE
//
//         //alert('in add DONE!!! looking across to list window.xxxglobalUtds42List.constructedTime:' + window.xxxglobalUtds42List.constructedTime);
//
//         //let x = new Utds42List(new PaginationService());
//         //x.searchutdbase('bkon');
//
        if (saveHtmlHolder._checked && this.addForm.valid)
        {
//             //alert('start save');
//             let i;
//             for (i = 0; i < 1; i++) {
//                     UtilLog.log('pre save in client/imports/app/obj/utds4/form/utds4-form.component.ts:' + this.addForm.value.utdstr);
//                     try {
//
//
            let dt = UtilDate.getDateStr(new Date()).toString();
//                         //Utds42.insert(docToInsert);
//
//                         if (false)  // hk test way - creatr doc and call server to do insert to DB and to get title
//                         {
//                             // synch - try
//                             try {
//                                 let docToInsert  = {
//                                     //datey: dt,
//                                     filelineraw: dt + ' ' + this.addForm.value.utdstr,
//                                     //texty: this.addForm.value.utdstr,
//                                     public: this.addForm.value.public,
//                                     owner: Meteor.userId(),
//                                     date: dt,
//                                     text: this.addForm.value.utdstr,
//                                 };
//                                 //let docToInsert_jsonString = EJSON.stringify(docToInsert);
//                                 let jSONstrngifiedDocToInsert = JSON.stringify(docToInsert);
//
//                                 // Meteor.call('hbkTestCallToServer4', 'utdidhbk', 'rsvphbk', (error, result) => {
//                                 Meteor.call('hbkInsertDocThenUpdateWithTitleForURL', this.addForm.value.utdstr, jSONstrngifiedDocToInsert, function (error, result)  {
//                                     console.log('========================== in callback from hbkTestCallToServer4');
//                                     if (error) {
//                                         alert ('ERROR in asynchHttpTitleGetWrapper:' + error);
//                                     }
//                                     else if (result) {
//                                         alert ('NONERROR in asynchHttpTitleGetWrapper got back result:'+result);
//                                     }
//                                     else {
//                                         console.log ('====================== neither error nor result docToInsert.text:'+docToInsert.text);
//                                         UtilLog.log ('====================== docToInsert.text2:'+docToInsert.text);
//
//                                         saveHtmlHolder._checked = false;
//                                         //alert ('saved:' + docToInsert.text);
//                                         //let Utds4ListComponent.search
//
//                                         //Utds42List x = new Utds42List();
//                                         //x.searchutdbase (docToInsert.text)
//                                         //alert ('NEITHER error nor result1:' + docToInsert.text);
//                                     }
//
//                                 });
//
//                             } catch(e) {
//                                 console.log ('caught error: eeeeeeeeeeeeeeeeeefffffff');
//                                 UtilLog.logError('hbkTestCallToServer2 ERROR', e)
//                                 alert('error1 in save - see client console');
//
//                             }
//                         }
//                         else if (true)// which "way"?
//                         {
//                            //saveHtmlHolder._checked = true;
//
            try {
                Utds42.insert
                (
                    {
                        //datey: dt,
                        filelineraw: dt + ' ' + this.addForm.value.utdstr,
                        //texty: this.addForm.value.utdstr,
                        public: this.addForm.value.public,
                        owner: Meteor.userId(),
                        date: dt,
                        text: this.addForm.value.utdstr,
                        owner: Meteor.userId()
                    }
                    // , () => {
                    //     alert('in callback from utds42 insert');
                    // }
                );
            } catch (err) {
                console.log(err.stack);
                console.log(err.toString());
                alert('error in save');
            }
//                         }
//                         else // playpen sandbox testbin
//                         {
//                             this.addForm.value.save2 = true;
//                             alert('set this.addForm.value.save = true');
//
//                         }
//                         // end works 171014b
//
//                         UtilLog.log('post x xxxx save in client/imports/app/obj/utds4/form/utds4-form.component.ts');
//
//
//
//
//                         UtilLog.log('pre xxxxx save in client/imports/app/obj/utds4/form/utds4-form.component.ts');
//
//
//                         // works but no return 171014c
//                         //                      const x = Meteor.call('hbkTestCallToServer', 1, 4);
//                         // end works but no return 171014c
//
//
//                         //this.getTexthk.call(this);
//
//                         //alert('pre call');
//                         //Meteor.call('hbkTestCallToServer', this);
//
//                         // works 171014
//                         //       MeteorObservable.call('hbkTestCallToServer', Meteor.userId()).subscribe(() => {
//                         //     //MeteorObservable.call('hbkTestCallToServer', this.utd._id, user._id).subscribe(() => {
//                         //         alert('User successfully invited to this utd3.');
//                         //     }, (error) => {
//                         //         alert(`Failed utd invite to invite due to ${error}`);
//                         //     });
//                         // end works 171014
//
// // from https://docs.meteor.com/api/methods.html
//
//                         // synch with no callback I guess
//                         // Synchronous call
//                         // const result = Meteor.call('foo', 1, 2);
//
//
//
//
//
//
//                         // asynch works 171014b
//                         // Meteor.call('hbkTestCallToServer', 1, 6, (error, result) => {
//                         //     if (error)
//                         //         alert ('error:'+error);
//                         //     if (result)
//                         //         alert ('result:'+result);
//                         //     if (!error &&  !result)
//                         //         alert ('neither error nor result');
//                         //
//                         // });
//                         // end works 171014b
//
//
//
//
//
//                         //alert('post call x:' + x);
//
//
//
//                     } catch (err) {
//                         console.log(err.stack);
//                         console.log(err.toString());
//                         alert('error2 in save');
//                     }
//                 } else {
//                     alert ('invalid form');
//                 }
//                 //alert('post save');
//
//             } // for
//
//             this.addForm.reset();
//         } else {
//             // no save
//         }
        }
    } // end addutd fn


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
