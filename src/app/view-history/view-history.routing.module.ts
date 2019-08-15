import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {ViewHistoryComponent} from "~/app/view-history/view-history.component";

const routes: Routes = [
    {
        path: '',
        component: ViewHistoryComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ViewHistoryRoutingModule { }
