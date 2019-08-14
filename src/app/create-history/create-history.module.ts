import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {CreateHistoryComponent} from "~/app/create-history/create-history.component";
import { CreateHistoryRoutingModule} from "~/app/create-history/create-history-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        CreateHistoryRoutingModule
    ],
    declarations: [
        CreateHistoryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CreateHistoryModule { }
