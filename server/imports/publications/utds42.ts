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

        UtilLog.utdmLog("hbkhbk in publish (utdbase)", UtdEnum.Severity.INFO);

        const selector = buildQuery.call(this, null, location);

        Counts.publish(this, 'numberOfUtds', Utds42.collection.find(selector), { noReady: true });

        return Utds42.find(selector, options);
    }



);

Meteor.publish('indivUtdhbkpubname4', function(utdId: string) {
    console.log('=======hbkhbk in publish(utds42)');

    //return Utds42.find(buildQuery.call(this, utdId), {$orderby: { filelineraw : -1 }});
    return Utds42.find(buildQuery.call(this, utdId));
    //, {$orderby: { filelineraw : -1 }});
});


function buildQuery(utdId?: string, location?: string): Object {
    UtilLog.utdmLog("in buildquery", UtdEnum.Severity.INFO);
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
    UtilLog.log(" *************** test hbkhb2");
    // const searchRegEx = { '$regex': '.*' + (location || '') + '.*', '$options': 'i' };
    let himom = 'hbk';
    // works const searchRegEx = {filelineraw: { $regex: /hbk/, $options:'i' }};
             const searchRegEx = {filelineraw: { $regex: /CRD/, $options:'i' }};
    // broken const searchRegEx = {{filelineraw: { $regex: /HBK/, $options:'i' }, sort : { filelineraw : 1 }};
    //sort : { items.date : 1 }

    return searchRegEx;
    // ommented 9/17/17 return {};
    //return {, '$options':''};
    //return {};

} // end buildQuery()

// const MyCollection = MongoObservable.Collection("myCollection");
//
// class MyComponent  {
//     private myData: ObservableCursor<any>;
//
//     constructor() {
//         this.myData = MyCollection.find({}, {limit: 10});
//     }
// }