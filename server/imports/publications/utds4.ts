import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Utds4 } from '../../../both/collections/utds4.collection';
import {UtilLog} from "../../../both/utlities/UtilLog";
import {UtdEnum} from "../../../both/utlities/UtdEnum";

interface Options {
    [key: string]: any;
}

Meteor.publish('utds4ahbkpubname', function(options: Options, location?: string) {

        UtilLog.utdmLog("=====hbkhbk in publish (utds4ahbkpubnam e)", UtdEnum.Severity.INFO);

        const selector = buildQuery.call(this, null, location);

        Counts.publish(this, 'numberOfUtds', Utds4.collection.find(selector), { noReady: true });

        return Utds4.find(selector, options);
    }



);

Meteor.publish('indivUtdhbkpubname4', function(utdId: string) {
    console.log('=======hbkhbk in publish(indivUtdhbkpubname4)');

    return Utds4.find(buildQuery.call(this, utdId));
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

    const searchRegEx = { '$regex': '.*' + (location || '') + '.*', '$options': 'i' };

    //return searchRegEx;
    return {};
}