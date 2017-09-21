import { Meteor } from 'meteor/meteor';

import { loadParties } from './imports/fixtures/parties';

import './imports/publications/parties';
import './imports/publications/utds2'; // hbkhbk
import './imports/publications/utds3'; // hbkhbk
import './imports/publications/utds4'; // hbkhbk
import './imports/publications/utds42'; // hbkhbk
import './imports/publications/users';
import '../both/methods/parties.methods';
import './imports/publications/images';

Meteor.startup(() => {
  loadParties();
});
