//import { UtilLog } from '../../../../../../both/utlities/UtilLog';
import { UtdEnum } from './UtdEnum';


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




// typescript global static variable https://stackoverflow.com/questions/16462839/typescript-global-static-variable-best-practice
module M {
    export class C {
        static count : number = 0;
        constructor() {
            C.count++;
        }
    }
}



export class UtilLog {

    private static x = 1;

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

    private static incr = (function () {
        var i = 1;

        return function () {
            return i++;
        }
    })();



        // NEW WAY
        // public static utdmLog(s:String, severity:UtdEnum.Severity):void {
        //
        //     //global.callCnt_utdmLog  || (global.callCnt_utdmLog = 0);
        //     if (!global.callCnt_utdmLog) {
        //         global.callCnt_utdmLog = 0
        //     };
        //     global.callCnt_utdmLog++;
        //
        //     s = 'UTILLOG:sev:' + severity + ', s:' + s;
        //     //callCnt++;
        //     let cnt = UtilLog.incr();
        //     //console.log(severity.constructor.name);
        //     //console.log(severity.????);
        //     if (Meteor.isServer) {
        //         console.log ("+++++++++++++++++++++++from utillog server: global.callCnt_utdmLog: <" + global.callCnt_utdmLog + "> :" + s);
        //     } else {
        //         //eval ("alert ('============================= eval in utd2s.methods.ts must be client');");
        //         alert ('+++++++++++++++++++++++++++from utillog client: global.callCnt_utdmLog: <' + global.callCnt_utdmLog + "> :" + 'client side log [' + s + ']');
        //     }
        //     // if (Meteor.isServer) {
        //     //     console.log ("+++++++++++++++++++++++from utillog server: cnt: <" + cnt + "> :" + s);
        //     // } else {
        //     //     //eval ("alert ('============================= eval in utd2s.methods.ts must be client');");
        //     //     alert ('+++++++++++++++++++++++++++from utillog client: cnt: <' + cnt + "> :" + 'client side log [' + s + ']');
        //     // }
        // }

    // OLD WAY
    // public static utdmLog(s:String, severity:UtdEnum.Severity):void {
    //
    //     s = 'UTILLOG:sev:' + severity + ', s:' + s;
    //     let cnt = UtilLog.incr();
    //     if (Meteor.isServer) {
    //         console.log ("+++++++++++++++++++++++from utillog server: cnt: <" + cnt + "> :" + s);
    //     } else {
    //         //eval ("alert ('============================= eval in utd2s.methods.ts must be client');");
    //         alert ('+++++++++++++++++++++++++++from utillog client: cnt: <' + cnt + "> :" + 'client side log [' + s + ']');
    //     }
    // }¸¸¸

    // THIRD WAY
    //console.log ('this1:' + this);
    public static log(s:String):void {
        this.utdmLog(s, UtdEnum.Severity.INFO);
    }
    public static logError(s:String, e):void {
        this.utdmLog(e.toString(), UtdEnum.Severity.ERROR);
    }

    public static utdmLog(s:String, severity?:UtdEnum.Severity):void {
        if (UtilLog.x == null)  {
            UtilLog.x = 0;
        }
        UtilLog.x++; // call counter

        let cnt = UtilLog.incr();
        const s2 = cnt + '. ' + UtdEnum.Severity[severity] + ' [' + s + ']';

        if (Meteor.isServer) {
            console.log (s2);
        } else {
            //const errStr = 'logx:: <' + UtilLog.x + "> [" + s + ']';

            if (severity == UtdEnum.Severity.ERROR || severity == UtdEnum.Severity.FATALX)
            {
                if (Meteor.isClient) {
                    eval ("alert ('logx ============================= client error/fatal [" + s2 + "]");
                } else {
                    console.log ("logx ============================= server error/fatal [" + s2 + "]");
                }

            } else if (severity == UtdEnum.Severity.INFO ) {
                console.log ('logx:' + s2);
                //eval ("alert ('============================= eval in utd2s.methods.ts must be client infoStr xx [" + UtdEnum.Severity[severity] + '.' + errStr + "]');");
            }

            if ((<any> window).xxxglobalUtds42List) {
                (<any> window).xxxglobalUtds42List.modelTextArea = s2 + "\r\n" + (<any> window).xxxglobalUtds42List.modelTextArea;


            }
            //eval ("alert ('============================= eval in utd2s.methods.ts must be client');");

        }
        //console.log ("thishbk");
    }



}
