import {Parties} from "../collections/parties.collection";
import {Meteor} from 'meteor/meteor';
import {Users} from "../collections/users.collection";

export class BothUtilGetMongoCollectionIterate {

    public static testGetParties() {

        {
            let x = Parties.find();

            // while(this.parties.hasNext()) {
            //   item = this.parties.next();
            //   console.log(item); // 9,2,5
            // }

            // this.parties.forEach( )
            //var someArray = [9, 2, 5];
            // for (var item of this.parties) {
            //   console.log(item); // 9,2,5
            // }

            let y = 0;
            x.forEach(function(item) {
                console.log(y++ + '. ddd:' + item); // 9,2,5
                /* do something */
            });

            console.log ('donehk1');

        }

        {
            let x = Users.find();

            // while(this.parties.hasNext()) {
            //   item = this.parties.next();
            //   console.log(item); // 9,2,5
            // }

            // this.parties.forEach( )
            //var someArray = [9, 2, 5];
            // for (var item of this.parties) {
            //   console.log(item); // 9,2,5
            // }

            let y = 0;
            x.forEach(function(item) {
                console.log(y++ + '. ddd:' + item); // 9,2,5
                /* do something */
            });

            console.log ('donehk2');

        }





   }

}