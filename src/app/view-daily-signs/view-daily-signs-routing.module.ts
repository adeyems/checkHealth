import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {ViewDailySignsComponent} from "~/app/view-daily-signs/view-daily-signs.component";

const routes: Routes = [
    {
        path: '',
        component: ViewDailySignsComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ViewDailySignsRoutingModule { }
