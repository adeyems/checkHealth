import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import {ReactiveFormsModule} from "@angular/forms";
import {ViewDailySignsComponent} from "~/app/view-daily-signs/view-daily-signs.component";
import { ViewDailySignsRoutingModule } from "~/app/view-daily-signs/view-daily-signs-routing.module";
import { NativeScriptFormsModule } from "nativescript-angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        ViewDailySignsRoutingModule
    ],
    declarations: [
        ViewDailySignsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewDailySignsScreenModule { }
