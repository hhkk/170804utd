import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utds4 } from '../../../../../../both/collections/utds4.collection';
//import {UtilLog} from '../../../../../../both/utlities/UtilLog';
import { UtilLog } from '../../../../../../both/utlities/UtilLog';
import { UtdEnum } from '../../../../../../both/utlities/UtdEnum';

import { InjectUser } from "angular2-meteor-accounts-ui";
import template from './utds4-form.component.html';
import style from './utds4-form.component.scss';

@Component({
    selector: 'utds-formx2634',
    template,
    styles: [ style ]
})
@InjectUser("user")
export class Utds4FormComponent implements OnInit {
    addForm: FormGroup;

    images: string[] = [];

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            utdstr: ['', Validators.required],
            public: [false]
        });
    }


    addUtd(): void {
        //UtilLog.utdmLog('in utds4 utdsxx2-form.component.ts', UtilLog.SEVERITYy.INFO);
        UtilLog.utdmLog('in utds4-form.component.ts.addUtd', UtdEnum.Severity.INFO);
        if (!Meteor.userId()) {
            alert('Please log in to add a utd');
            return;
        }

        if (this.addForm.valid) {
            let i;
            for (i = 0; i < 1; i++) {
                if (this.addForm.valid) {
                    UtilLog.log('pre save in client/imports/app/obj/utds4/form/utds4-form.component.ts');
                    try {
                        Utds4.insert({
                            //utd: this.addForm.value.name + '.' + i,
                            utdstr: this.addForm.value.utdstr,
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
