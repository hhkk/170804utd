import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Utds42 } from '../../../both/collections/utds42.collection';
import {UtilLog} from "../../../both/utlities/UtilLog";
import {UtdEnum} from "../../../both/utlities/UtdEnum";

interface Options {
    [key: string]: any;
}
// this is called by I guess
Meteor.publish('utdbase', function(options: Options, location?: string) {

        let locationTruncated = location.trim();


        if (!(locationTruncated === ""))
        //if ( !locationTruncated || !locationTruncated.length)
        {

            //UtilLog.utdmLog("~~~~~~~~~~~~~~~~~ hbkhbk in publish (utdbase) LOCATION 2 NULL OR NOT NULL ["+locationTruncated+"]", UtdEnum.Severity.INFO);
            // this SERVER side utdbase (42) query
            const selector = buildQuery.call(this, null, locationTruncated);

            Counts.publish(this, 'numberOfUtds', Utds42.collection.find(selector), { noReady: true });

            return Utds42.find(selector, options);
        }
        //else {
        // UtilLog.utdmLog("~~~~~~~~~~~~~~~~~ hbkhbk in publish (utdbase) LOCATION NULL DO NOTHING", UtdEnum.Severity.INFO);

        //}

    }



);

// const MyCollection = MongoObservable.Collection("myCollection");
//
// class MyComponent  {
//     private myData: ObservableCursor<an/
//     constructor() {
//         this.myData = MyCollection.find({#}, {limit: 10});
//     }
// }

Meteor.publish('indivUtdhbkpubname4', function(utdId: string) {
    console.log('=======hbkhbk in publish(utds42)');

    //return Utds42.find(buildQuery.call(this, utdId), {$orderby: { filelineraw : -1 }});
    return Utds42.find(buildQuery.call(this, utdId));
    //, {$orderby: { filelineraw : -1 }});
});


function buildQuery(utdId?: string, utdSearchRaw?: string): Object {
    UtilLog.utdmLog("@@@@@@@@@@@@@@@@@@@ in buildquery location:" + utdSearchRaw, UtdEnum.Severity.INFO);
    const isAvailable = {
        $or:
            [
                {
                    // utd is public
                    public: true
                },
                {
                    // current user is the owner
                    $and: [{
                        owner: this.userId
                    }, {
                        owner: {
                            $exists: true
                        }
                    }]
                }
            ]
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



    let searchArrayRegEx = null;
    if (true)
    {
        // const searchArrayRegEx = { '$regex': '.*' + (location || '') + '.*', '$options': 'i' };
        // works const searchArrayRegEx = {filelineraw: { $regex: /hbk/, $options:'i' }};
        // filelineraw!!!!!!!!!!

        // works as string hbk const  searchArrayRegEx = {filelineraw: { $regex: /.*hbk.*/, $options:'i' }};
        // works searchArrayRegEx = {filelineraw: { $regex: /.*hbk.*/, $options:'i' }};
        // OR operator https://stackoverflow.com/questions/28290021/javascript-regular-expression-or-operator
        // https://stackoverflow.com/questions/1177081/multiple-words-in-any-order-using-regex  (?=.*test)(?=.*long)
        // works 170930 searchArrayRegEx = {filelineraw: { $regex: new RegExp(".*"+location+".*"), $options:'i' }};

        //searchArrayRegEx = {filelineraw: { $regex: new RegExp(
        //                                ".*" + location + ".*" +
        //                                "|.*" + 'hbk' +
        //                                ".*"
        //                           ), $options:'i' }};

        //let regExpStr = buildRegExpStr.call(this, location);

        searchArrayRegEx = {filelineraw: { $regex: new RegExp( buildRegExpStr.call(this, utdSearchRaw)), $options:'i' }};
        // works retired 170930 const searchArrayRegEx = {filelineraw: { $regex: re, $options:'i' }};
        // broken const searchArrayRegEx = {{filelineraw: { $regex: /HBK/, $options:'i' }, sort : { filelineraw : 1 }};
        //sort : { items.date : 1 }
        //    UtilLog.utdmLog("ttt in buildquery searchArrayRegEx:" + searchArrayRegEx.toString(), UtdEnum.Severity.INFO);
        //     UtilLog.utdmLog("ttt in buildquery location:" + location, UtdEnum.Severity.INFO);

    }
    else
    {
            // https://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
        //searchArrayRegEx = {filelineraw: { $regex: new RegExp(".*"+location+".*"), $options:'i' };

    }
    return searchArrayRegEx;
    //  UtilLog.utdmLog("in buildquery searchArrayRegEx:" + searchArrayRegEx.toString(), UtdEnum.Severity.INFO);
    // ommented 9/17/17 return {};
    //return {, '$options':''};
            //return {};

} // end buildQuery()

// hi mom 
function buildRegExpStr(location?: string ): Object {

 try {
     UtilLog.log ("!!!!!!!!!!!!!!!!! in buildRegExpStr) location:" + location);//
     let splitx = location.split(' ');
    let s = "";
     for (var i = 0; i < splitx.length; i++) {
         UtilLog.log (i + '. split%%%%%%%%%%%%%%%%%%%%%%%:' + splitx[i]);
         s += "(?=.*"+splitx[i]+")";
     }
     UtilLog.log ('!@!@!@!@!@final reg exp:' + s);

     // works let s = ".*long.*";
     return s;
//     if (location.trim().toString() === "")
//     {
//         console.log('no split%%%%%%%%%%%%%%%%%%%%%%%:' );
//
//         return "";
//     }
//     else
//         {

//     }
 } catch(e) {
     UtilLog.logError("errorhbk: !!!!!!!!!!!!!!!!! in buildRegExpStr", e);
 }


}