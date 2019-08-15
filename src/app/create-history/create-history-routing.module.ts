import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {CreateHistoryComponent} from "~/app/create-history/create-history.component";

const routes: Routes = [
    {
        path: '',
        component: CreateHistoryComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CreateHistoryRoutingModule { }
