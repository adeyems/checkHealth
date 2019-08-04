import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {PatientLoginRoutingModule} from "~/app/login/patient/patient-login-routing.module";
import {PatientLoginComponent} from "~/app/login/patient/patient-login.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PatientLoginRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        PatientLoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PatientLoginModule { }
