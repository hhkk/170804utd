import { Utds42 } from '../../../both/collections/utds42.collection';
import { Utd42 } from '../../../both/models/utd42.model';
import {UtilLog} from "../../../both/utlities/UtilLog";
import {UtdEnum} from "../../../both/utlities/UtdEnum";

export function loadUtds() {
  UtilLog.utdmLog('', UtdEnum.Severity.INFO)
  if (Utds42.find().cursor.count() === 0) {
    UtilLog.log('resetting utd42');
    const utds42: Utd42[] = [{
      text: 'Dubstep-Free Zone',
      public: true
    }, {
      text: 'All dubstep all the time',
      public: true
    }, {
      text: 'Savage lounging',
      public: false
    }];

    utds42.forEach((utd42: Utd42) => Utds42.insert(utd42

    ));
  }
}