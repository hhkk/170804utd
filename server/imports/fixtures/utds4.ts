import { Utds4 } from '../../../both/collections/utds4.collection';
import { Utd4 } from '../../../both/models/utd4.model';
import {UtilLog} from "../../../both/utlities/UtilLog";
import {UtdEnum} from "../../../both/utlities/UtdEnum";

export function loadUtds() {
  UtilLog.utdmLog('', UtdEnum.Severity.INFO)
  if (Utds4.find().cursor.count() === 0) {
    const utds4: Utd4[] = [{
      utdstr: 'Dubstep-Free Zone',
      public: true
    }, {
      utdstr: 'All dubstep all the time',
      public: true
    }, {
      utdstr: 'Savage lounging',
      public: false
    }];

    utds4.forEach((utd4: Utd4) => Utds4.insert(utd4));
  }
}