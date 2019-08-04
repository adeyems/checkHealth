import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {DoctorLoginComponent} from "~/app/login/doctor/doctor-login.component";
import { DoctorLoginRoutingModule } from "~/app/login/doctor/doctor-login-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        DoctorLoginRoutingModule
    ],
    declarations: [
        DoctorLoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DoctorLoginModule { }
