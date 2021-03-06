import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {PatientHomeScreenComponent} from "~/app/patient-home-screen/patient-home-screen.component";
import { PatientHomeScreenRoutingModule } from "~/app/patient-home-screen/patient-home-screen-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        PatientHomeScreenRoutingModule
    ],
    declarations: [
        PatientHomeScreenComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PatientDailySignsModule { }
