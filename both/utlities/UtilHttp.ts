var http = require('http');





export class UtilLog {

    private static x = 1;

    private static incr = (function () {
        var i = 1;

        return function () {
            return i++;
        }
    })();


    public static getHtml(host:string, path:string, callback ):void {

        var options = {
            host: host,
            path: path
            // host: 'google.com',
            // path: '/'
        }
        var request = http.request(options, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                console.log(data);
                callback(data);

            });
        });
        request.on('error', function (e) {
            console.log(e.message);
        });
        request.end();



    }



}




