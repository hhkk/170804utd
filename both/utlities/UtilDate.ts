
import { UtilLog } from './UtilLog';


export class UtilDate {

    private static x = 1;

    public static getDateStr(datein2):string {
        let datein =  new Date();
        let d = datein.toJSON();

        let  dts =
            d.slice(0,4) + '-' +
            d.slice(5,7) + '-' +
            d.slice(8,10) + ' ' +
            d.slice(11,13) + ':' +
            d.slice(14,16) + ':' +
            d.slice(17,19) ;
        ;

        //UtilLog.log('############################## fromUtilDates:' + dts);

        return dts;

    }



}
