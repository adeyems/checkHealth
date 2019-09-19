import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { PatientDailySignsComponent } from "./patient-daily-signs.component";

const routes: Routes = [
    {
        path: '',
        component: PatientDailySignsComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PatientDailySignsRoutingModule { }
