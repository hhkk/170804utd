//import {PartiesListComponent} from "./parties-list.component";

//import {PartiesListComponent} from "./parties-list.component";

export class GetEmailFromUserBoth {

    public static  get(userid: string) :string {
        //alert('in get with id:' + userid);
        return 'xx:' + Meteor.users.find({_id: userid}).fetch()[0].emails[0].address;
        //var usersFindFetch = Meteor.users.find().fetch();
        //hkthis.hbkemailremote = 'hihkhk2!';

        //return 'sdfsdf';
        //     var usersFindFetch2 = Meteor.users.find({_id: 'wAJeKr9op8vEt6FMH'}).fetch();
        //     var usersFindFetch3email = Meteor.users.find({_id: 'wAJeKr9op8vEt6FMH'}).fetch()[0].emails[0].address;
        //hkthis.hbkemail = usersFindFetch[0].emails[0].address;
        // hkthis.hbkuserid = Meteor.user()._id;
        // hkthis.userhk = 1;
        // hkthis.userhk = Meteor.user();
        //
        //
        //     console.log('usersFindFetch2[0]._id:' + usersFindFetch[0]._id);
        //     console.log('usersFindFetch[0]._id:' + usersFindFetch[0]._id);
        //     console.log('usersFindFetch[0].emails[0].address:' + usersFindFetch[0].emails[0].address);
        //
        //     for (var i in window) {
        //         if (window.hasOwnProperty(i))
        //             console.log(i);
        //     }
        //
        //     alert('in addparty');
        //
        //     // if (Meteor.userId()) {
        //     Utd2s.insert(Object.assign({}, {hhkk: 'hhkkjj'}, {owner: Meteor.userId()}));
        //     alert('post addparty');
        //     //
        //     //   // XXX will be replaced by this.addForm.reset() in RC5+
        //     // } else {
        //     //   alert('Please log in to add a user');
        //     // }
        //
        //     //alert('this.hbkemail:' + value + ':' + this.hbkemail);
    }

}