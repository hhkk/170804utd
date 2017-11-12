
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

function asynchHttpTitleGetWrapper (docToInsert, c) {
    UtilLog.log('in asynchHttpTitleGetWrapper');
    UtilHttp.getHtmlTitle(docToInsert.text, '/', function callback (error, result) {


        UtilLog.log('called back from getHtmlTitle in asynchHttpTitleGetWrapper');


        if (error) {
            UtilLog.log ('ERROR in asynchHttpTitleGetWrapper:' + error);
        }
        else if (result) {
            UtilLog.log ('NONERROR in asynchHttpTitleGetWrapper got back result:'+result);
        }
        else {
            UtilLog.log ('NEITHER error nor result');
        }

        c (null, result);
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

function getTitleForUrlSynchronous(utdurlNoHttp) {
    let title1 = null
    let utdurl = 'http://'+utdurlNoHttp;
    try {
        title1 = Meteor.wrapAsync(asynchHttpTitleGetWrapper)(utdurl, '/');
        //UtilLog.log ('======================= wrap3:'+Meteor.wrapAsync(synchronousGetTestPersonaLoginCredentials)('xxxtttt'));
        // const title1 = Meteor.wrapAsync(localHttpMethodToWrap_sleep)(utdId, '/');
    } catch (e) {
        const s = '------------ error getting title:' + e;
        UtilLog.logError(s, e);
        throw  '------------ dummy fail test from hbkTestCallToServer4:' + e; // WORKS but returns no string just error 500
    }
    UtilLog.log('======================= getTitleForUrlSynchronous got title for ['+utdurl+'] as [' + title1 + ']');

    return title1;

}


// s://docs.meteor.com/api/methods.html
// https://guide.meteor.com/methods.html

Meteor.methods({
    hbkInsertDocThenUpdateWithTitleForURL: function(utdstr: string, jSONstrngifiedDocToInsert: string) {

        try {

            // publish once:  https://stackoverflow.com/questions/18821014/meteor-one-time-or-static-publish-without-collection-tracking

            if (Meteor.isClient) {
                UtilLog.log('------------ exiting client in hbkTestCallToServer4');
                return;
            } else if (Meteor.isServer) {

                let docToInsert = JSON.parse(jSONstrngifiedDocToInsert);
                let g = Utds42.insert(docToInsert);

                UtilLog.log('g:'+g);


                let saveId = null;
                g.subscribe (
                    (value)=> {
                        UtilLog.log('========================= hbkhbk:value:' + value);
                        saveId = value;


                    }
                    ,
                    (error)=> {
                        UtilLog.log('hbkhbk:error:' + error);
                    },
                    ()=> {
                        UtilLog.log('hbkhbk:complete');
                    }


                );

//Utds42.update(, {text: '[' + title1 + ']' + docToInsert.text});
                asynchHttpTitleGetWrapper (docToInsert, (error, result) =>
                    {
                        if (error) {
                            UtilLog.log ('ERROR in asynchHttpTitleGetWrapper:' + error);
                        }
                        else if (result) {

                            docToInsert.text = 'hihkhkhk ['+ result + '] ' + docToInsert.text;
                            let h = Utds42.update({_id: saveId}, docToInsert);
                            UtilLog.log('========================= h:' + h);

                            UtilLog.log ('NONERROR in asynchHttpTitleGetWrapper got back result:'+result);
                        }
                        else {
                            UtilLog.log ('NEITHER error nor result');
                        }
                    }
                );


                UtilLog.log('------------ SUCCESS inserting [' + jSONstrngifiedDocToInsert + ']');

// WORKS ASYNC  UtilLog.log ('======================= wrap2:'+Meteor.wrapAsync(getTestPersonaLoginCredentials)('xxxtttt'));
//UtilLog.log('=wrap2:' + Meteor.wrapAsync(getTestPersonaLoginCredentials)(utdId));
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

//UtilLog.log ('======================= x:'+x);
//return x;
            }
            else {

                UtilLog.log('------------ neither server nor client in hbkTestCallToServer2');
                throw  '------------ neither server nor client in hbkTestCallToServer2';


            }
        } catch (e) {
            //UtilLog.logError('==============error1 in hbkTestCallToServer2', e)

            console.log('ERROR1 !!!!!!!!! ==================error2 in hbkInsertDocThenUpdateWithTitleForURL [' + e.toString() + ']')
            //e.subscribe(function (todoCount) { return simplefun(todoCount); })
            console.log('ERROR2 !!!!!!!!! ==================error2 in hbkInsertDocThenUpdateWithTitleForURL:' + e.toString())
            throw new Meteor.Error(500, 'server side exception in hbkInsertDocThenUpdateWithTitleForURL:'+e, e);






            // from https://forums.meteor.com/t/exception-handling-best-practices/4301/8

            // do_something: function (message) {
            //     var return_id = '';
            //     try {
            //         return_id = collection_name.insert(message);
            //     } catch (e) {
            //         throw new Meteor.Error(500, 'exception in do_something', e);
            //     } finally {
            //         return return_id;
            //     }
            // }

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