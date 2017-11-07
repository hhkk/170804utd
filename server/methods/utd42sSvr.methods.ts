
import {Meteor} from 'meteor/meteor';
import {UtilLog} from "../../both/utlities/UtilLog";
import {UtilHttp} from "../../both/utlities/UtilHttp";
import {Utds42} from "../../both/collections/utds42.collection";

// function getContactEmail(user:Meteor.User):string {
//     if (user.emails && user.emails.length)
//         return user.emails[0].address;
//
//     return null;
// }



function getTestPersonaLoginCredentials(s, callback2) {
    UtilLog.log('in getTestPersonaLoginCredentials top level =================');



    getTestPersonaLoginCredentials2(s, function (resp) {
        UtilLog.log('in getTestPersonaLoginCredentials GOT DEPTH LEVEL 2 callback a['+ '] resp:'+resp)
        callback2(null, resp); // ,ust be error, resp          callback2(null, resp); // ,ust be error, resp
        // Wrap a function that takes a callback function as its final parameter.
        // The signature of the callback of the wrapped function should be function(error, result){}.
        // On the server, the wrapped function can be used either synchronously (without passing a callback) or asynchronously (when a callback is passed).
        // On the client, a callback is always required; errors will be logged if there is no callback.
        // If a callback is provided, the environment captured when the original function was called will be restored in the callback.


    });


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


function getTestPersonaLoginCredentials2(s, callback) {
    UtilLog.log('in getTestPersonaLoginCredentials2 top level ================= s:'+s )   ;


    // callback({
    //     email: 'hk',
    //     password: 'lb'
    // });
    callback('getTestPersonaLoginCredentials2_RETURN');

}



// needed this fn to be able to break on a log
function simplefun (s) {
//console.log('simplefun:desc ['+desc+'] s ['+s+']');
    let i = 0;
    if (Array.isArray(s)) {
        s.forEach(function(x) {
            i++;
            console.log('simplefun:sArray['+i+'] ['+         JSON.stringify(x) +']');});


    } else {
        console.log('simplefun:s.noArray ['+s+']');
    }
console.log('simplefun:s ['+s+']');
}

function localHttpMethodToWrap (host, path, c) {
    UtilHttp.getHtmlTitle('http://'+host, path, function callback (error, result) {
        console.log('in xxxxxxxxxxxxxxxxxxxxxxxxxxx');
        c(null, result);

    });
}

function localHttpMethodToWrap_sleep (host, path, c) {
    //eg host is num ms to pause by
    setTimeout(c, host, null, 'donesleeping2:' + host);


    // UtilHttp.getHtmlTitle(host, path, function callback (error, result) {
    //     console.log('in xxxxxxxxxxxxxxxxxxxxxxxxxxx');
    //     c(null, result);
    //
    // });
}


// s://docs.meteor.com/api/methods.html
// https://guide.meteor.com/methods.html

Meteor.methods({
    hbkTestCallToServer4: function(utdId: string, rsvp: string) {

        try {

            // publish once:  https://stackoverflow.com/questions/18821014/meteor-one-time-or-static-publish-without-collection-tracking

            if (Meteor.isClient) {
                UtilLog.log('------------ exiting client in hbkTestCallToServer4');
                return;
            } else if (Meteor.isServer) {
                //UtilLog.log('------------ staying with server in hbkTestCallToServer4');

                // WORKS ASYNC  UtilLog.log ('======================= wrap2:'+Meteor.wrapAsync(getTestPersonaLoginCredentials)('xxxtttt'));
                UtilLog.log('=wrap2:' + Meteor.wrapAsync(getTestPersonaLoginCredentials)(utdId));
                // return wrap('passed in')

                // no work setTimeout(function(){return 'hi steven';}, 5000);


                // WORKS getTestPersonaLoginCredentials('asdasdsad',  function (resp) {
                //         UtilLog.log ('------------------------ MADE IT HERE? GOT CALLBACK LEVEL 1  --------------------------got back resp:' + resp);
                //         //xxhbk = resp;
                //     }
                // );

                // works return 'hi leah';

                // not sure if this works: const x = Utds42.find({filelineraw: /.*testy.*/}).count();

                //================================
                // WORKS WITH DEBOUNCE AND OBSERVABLE SUBSCRIBE const x = Utds42.find({filelineraw: /.*testy.*/})
                //     .debounce(() => Observable.interval(50))
                //     .subscribe(todoCount => simplefun(todoCount));
                //================================
                //const title1 = Meteor.wrapAsync(localHttpMethodToWrap)('http://'+utdId, '/');
                const title1 = Meteor.wrapAsync(localHttpMethodToWrap_sleep)(utdId, '/');
                const title2 = 'hktesttitle2';

                UtilLog.log('======================= title1:' + title1);
                //console.log('======================= title1:' + title1);
                UtilLog.log('======================= title2:' + title2);
                //console.log('======================= title2:' + title2);


                // WRAP TEST OF DB FIND.COUNT
                //UtilLog.log ('======================= wrap3 start');
                //UtilLog.log ('======================= wrap3:'+Meteor.wrapAsync(synchronousGetTestPersonaLoginCredentials)('xxxtttt'));
                //UtilLog.log ('======================= wrap3 end');

                return title2;

                //UtilLog.log ('======================= x:'+x);
                //return x;
            }
            else {

                UtilLog.log('------------ neither server nor client in hbkTestCallToServer2');
                throw  '------------ neither server nor client in hbkTestCallToServer2';

            }
        } catch (e) {
            //UtilLog.logError('==============error1 in hbkTestCallToServer2', e)

            console.log('ERROR1 !!!!!!!!! ==================error2 in hbkTestCallToServer2 [' + e.toString() + ']')
            e.subscribe(function (todoCount) { return simplefun(todoCount); })
            console.log('ERROR2 !!!!!!!!! ==================error2 in hbkTestCallToServer2:' + e.toString())
        }


    }
});


function synchronousGetTestPersonaLoginCredentials(a,  callback) {
    try {
        //const y = Utds42.find({filelineraw: /.*testy.*/}).count();
        const y = Utds42.find({filelineraw: /.*testy.*/});
        UtilLog.log('in synchronousGetTestPersonaLoginCredentials got a:' + a + ', return:' + y);
        callback(y);

    } catch (e) {
        UtilLog.logError('ERROR!!!!!!!!!!!!!!! error in synchronousGetTestPersonaLoginCredentials', e)
        console.log('error in synchronousGetTestPersonaLoginCredentials', e)
    }
}