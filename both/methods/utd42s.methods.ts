import {Utds3} from '../collections/utds3.collection';
import {Email} from 'meteor/email';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import {UtilLog} from "../utlities/UtilLog";
import * as http from "http";

function getContactEmail(user:Meteor.User):string {
    if (user.emails && user.emails.length)
        return user.emails[0].address;

    return null;
}

function hkTestCallBackFromWithinServerCall(callback) {

    UtilLog.log('in here');
    callback ('this is callback content hbk');

}



function getTestPersonaLoginCredentials(callback) {
    UtilLog.log('in getTestPersonaLoginCredentials top level =================');


    callback(getTestPersonaLoginCredentials(function (resp) {
        callback
    }));


    // return http.get({
    //     host: 'personatestuser.org',
    
    //     path: '/email'
    // }, function(response) {
    //     UtilLog.log('in getTestPersonaLoginCredentials inside callback =================');
    //
    //     // Continuously update stream with data
    //     var body = '';
    //     response.on('data', function(d) {
    //         body += d;
    //     });
    //     response.on('end', function() {
    //
    //         // Data reception is done, do whatever with it!
    //         var parsed = JSON.parse(body);
    //         callback({
    //             email: parsed.email,
    //             password: parsed.pass
    //         });
    //     });
    // });

}


function getTestPersonaLoginCredentials2(callback) {
    UtilLog.log('in getTestPersonaLoginCredentials top level =================');


    callback({
        email: 'hk',
        password: 'lb'
    });

}

Meteor.methods({
    hbkTestCallToServer: function (a, b) { // was inviteUtd3Methodhbkhbk
        UtilLog.log('in hbkTestCallToServer ======================================== ');
        UtilLog.log('in  a:' + a);
        UtilLog.log('in  b:' + b);
        // getTexthk(){
        UtilLog.log('in getText=================');
        // read text from URL location


       // hkTestCallBackFromWithinServerCall(  function (resp) {
        getTestPersonaLoginCredentials(  function (resp) {
            UtilLog.log ('got back resp:' + resp);
            return resp;
            }
        );


        //return 'hi mom';

    },
    hbkTestCallToServer2: function(utdId: string, rsvp: string) {

    }
});
