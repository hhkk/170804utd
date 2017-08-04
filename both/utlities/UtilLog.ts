//import { UtilLog } from '../../../../../../both/utlities/UtilLog';
import { UtdEnum } from './UtdEnum';

/**
 * Created by Owner on 10/30/2016.
 */

    // export const enum SEV {
    //     WARN,
    //     ERROR,
    //     INFO,
    //     DEBUG
    // }

// module Severity {
//
//     enum Severity2 {
//         INFO,
//         DEBUG,
//         WARN,
//         ERROR,
//         FATAL
//     }
//
// //    export {Severity2} ;
//
//     //export interface logger {
// //        log(s: String, sev:Severity2) void;
// //    }
//
// }
//
// public static class SEVERITYx {
//     static INFO: number;
//     static ERROR: number;
//     static WARNING: number;
//     static DEBUG: number;
//
//     constructor() {};
// }
// export static class SEVERITYy {
//     static INFO: number;
//     static ERROR: number;
//     static WARNING: number;
//     static DEBUG: number;
//
//     constructor() {};
// }
export class UtilLog {



    // public static logErrorUtd(e, alertbool:boolean, sev:SEVERITYx):string {
    //     let r = '';
    //     if (e.message) {
    //         r += e.message;
    //     }
    //     if (e.stack) {
    //         r += ' | stack: ' + e.stack;
    //     }
    //     if (alertbool)
    //         alert ('hbkerror:' + r);
    //     console.log('hbkerror:' + r);
    //     return r;
    // }
    //

    // export module b
    // {
    //     export enum c
    // {
    //     C1 = 1,
    //     C2 = 2,
    //     C3 = 3,
    // }
    // }
    //
    //


    // works: public static SEV2 = {
    //     DEBUG : {name: "DEBUG", cd: "D"},
    //     INFO  : {name: "INFO", cd: "W"},
    //     WARN  : {name: "WARN", cd: "I"},
    //     ERROR : {name: "ERROR", cd: "E"}
    // };

    // works: public static log(s):void {
    public static utdmLog(s:String, severity:UtdEnum.Severity):void {
        s = 'UTILLOG:sev:' + severity + ', s:' + s;

        //console.log(severity.constructor.name);
        //console.log(severity.????);
        if (Meteor.isServer) {
            console.log (s);
        } else {
            //eval ("alert ('============================= eval in utd2s.methods.ts must be client');");
            alert ('client side log [' + s + ']');
        }
    }
}
