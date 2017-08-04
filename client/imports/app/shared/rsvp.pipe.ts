import {Pipe, PipeTransform} from '@angular/core';
import {Party} from "../../../../both/models/party.model";
import {Parties} from "../../../../both/collections/parties.collection";

@Pipe({
  name: 'rsvp'
})
export class RsvpPipe implements PipeTransform {
  transform(party: Party, type: string): number {
    //alert ('in rsvp.pipe.ts');
    if (!type) {
      alert ('in rsvp.pipe.ts returning early');
      return 0;
    }

    let total = 0;
    //alert ('in rsvp.pipe.ts search for partyid:' + party._id);
    const found = Parties.findOne(party._id);

    if (found) {

      total = found.rsvps ? found.rsvps.filter(rsvp => rsvp.response === type).length : 0;
    }

    // alert ('in rsvp.pipe.ts total :' + total );
    return total;
  }
}