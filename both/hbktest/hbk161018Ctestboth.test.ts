/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';

let s = 'C.test hbk161018testTest.test.ts';

console.log (s);

if (Meteor.isServer) {
    describe('Tasks', () => {
        describe('methods', () => {
            let t = 'isserver ' + s;
            console.log (t);
            it('x:' + t, () => {
            });
        });
    });
}

if (Meteor.isClient) {
    describe('Tasks', () => {
        describe('methods', () => {
            let t = 'isclient ' + s;
            console.log (t);
            it('y:' + t, () => {
            });
        });
    });
}

describe('Tasks', () => {
    describe('methods', () => {
        let t = 'is if ' + s;
        console.log (t);
        it('z:' + t, () => {
        });
    });
});
