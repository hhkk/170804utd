import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { Utds2ListComponent } from './obj/utds2/list/utds2-list.component';
import { Utds3ListComponent } from './obj/utds3/list/utds3-list.component';
import { Utd2DetailsComponent } from './obj/utds2/details/utd2-details.component';
import { Utd3DetailsComponent } from './obj/utds3/details/utd3-details.component';
import { PartiesListComponent } from './parties/parties-list.component';
import { PartyDetailsComponent } from './parties/party-details.component';
import {SignupComponent} from "./auth/signup.component";
import {RecoverComponent} from "./auth/recover.component";
import {LoginComponent} from "./auth/login.component.web";

export const routes: Route[] = [
  { path: '', component: PartiesListComponent },
  { path: 'ustodo', component: Utds2ListComponent },
  { path: 'ustodo3', component: Utds3ListComponent },
  //{ path: 'ouis', component: OuisList },
  { path: 'utd2/:utdId', component: Utd2DetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'utd3/:utdId', component: Utd3DetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'parties', component: PartiesListComponent },
  { path: 'party/:partyId', component: PartyDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
