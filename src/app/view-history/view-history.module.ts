import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {ViewHistoryComponent} from "~/app/view-history/view-history.component";
import { ViewHistoryRoutingModule} from "~/app/view-history/view-history.routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        ViewHistoryRoutingModule
    ],
    declarations: [
        ViewHistoryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewHistoryModule { }
