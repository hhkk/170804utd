//var http = require('http');

import { HTTP } from 'meteor/http'
import {UtilLog} from "./UtilLog";




export class UtilHttp {

    private static x = 1;

    private static incr = (function () {
        var i = 1;

        return function () {
            return i++;
        }
    })();


    // https://stackoverflow.com/questions/6287297/reading-content-from-url-with-node-js


    public static getHtmlTitle(host:string, path:string, callback ):string {

        //callback ('hkdone');

        host = 'http://' + host;

        UtilLog.log('in getHtml-- host ['+ host +']');


        try {
            // https://docs.meteor.com/api/http.html

            let result = null;
            try {
                result = HTTP.call('GET', host+path, {});
            } catch (e) {
                UtilLog.logError('11111a err', e);
            }
            UtilLog.log('11111');
            let result2 = JSON.stringify(result);
            UtilLog.log('22222');
            let title = null;
            try {
                title = result2.match(/<title[^>]*>([^<]+)<\/title>/)[1];
            } catch (e) {
                UtilLog.logError('11111b err', e);
            }

            //const title = result2.match(/<TITLE[^>]*>([^<]+)<\/TITLE>/)[1];

            // params: { user: userId }

           // UtilLog.log('return http get <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<' + JSON.stringify(result) + '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            UtilLog.log('return http get <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<' + title + '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            callback(null, title);
        } catch (e) {
            // Got a network error, timeout, or HTTP error in the 400 or 500 range.
            return e.getMessage();
        }








        // var options = {
        //     host: host,
        //     path: path
        //     // host: 'google.com',
        //     // path: '/'
        // };
        // var request = http.request(options, function (res) {
        //     var data = '';
        //     res.on('data', function (chunk) {
        //         data += chunk;
        //     });
        //     res.on('end', function () {
        //         console.log(data);
        //         callback(data);
        //
        //     });
        // });
        // request.on('error', function (e) {
        //     console.log(e.message);
        // });
        // request.end();



    }



}




