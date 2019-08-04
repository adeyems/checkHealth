import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {LoginComponent} from "~/app/login/login.component";
import {DoctorLoginComponent} from "~/app/login/doctor/doctor-login.component";

const routes: Routes = [
    {
        path: '',
        component: DoctorLoginComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class DoctorLoginRoutingModule { }
