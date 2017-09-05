import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utds3 } from '../../../../../../both/collections/utds3.collection';
//import {UtilLog} from '../../../../../../both/utlities/UtilLog';
import { UtilLog } from '../../../../../../both/utlities/UtilLog';
import { UtdEnum } from '../../../../../../both/utlities/UtdEnum';

import { InjectUser } from "angular2-meteor-accounts-ui";
import template from './utds3-form.component.html';
import style from './utds3-form.component.scss';

@Component({
    selector: 'utds-formx263',
    template,
    styles: [ style ]
})
@InjectUser("user")
export class Utds3FormComponent implements OnInit {
    addForm: FormGroup;
    newUtdPosition: {lat:number, lng: number} = {lat: 37.4292, lng: -122.1381};
    images: string[] = [];

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [],
            location: ['', Validators.required],
            public: [false]
        });
    }

    mapClicked($event) {File
        this.newUtdPosition = $event.coords;
    }

    addUtd(): void {
        //UtilLog.utdmLog('in utds3 utdsxx2-form.component.ts', UtilLog.SEVERITYy.INFO);
        UtilLog.log('in utds3-form.component.ts.addUtd');
        if (!Meteor.userId()) {
            alert('Please log in to add a utd');
            return;
        }

        if (this.addForm.valid) {
            let i;
            for (i = 0; i < 1; i++) {
                if (this.addForm.valid) {
                    UtilLog.log('pre save in obj utds3');
                    try {
                        Utds3.insert({
                            //utd: this.addForm.value.name + '.' + i,
                            name: this.addForm.value.name + '.' + i,
                            description: this.addForm.value.description,
                            location: {
                                name: this.addForm.value.location,
                                lat: this.newUtdPosition.lat,
                                lng: this.newUtdPosition.lng
                            },
                            images: this.images,
                            public: this.addForm.value.public,
                            owner: Meteor.userId()
                        });
                    } catch (err) {
                        console.log(err.stack);
                        console.log(err.toString());
                        alert('error in save');
                    }
                } else {
                    alert ('invalid form');
                }
                //alert('post save');

            } // for

            this.addForm.reset();
        }
    }

    onImage(imageId: string) {
        this.images.push(imageId);
    }
}
