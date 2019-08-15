import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import { ReadingsComponent} from "~/app/readings/readings.component";
import { ReadingsRoutingModule} from "~/app/readings/readings-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        ReadingsRoutingModule
    ],
    declarations: [
        ReadingsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ReadingsModule { }
