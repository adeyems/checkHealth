import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ReadingsComponent} from "~/app/readings/readings.component";

const routes: Routes = [
    {
        path: '',
        component: ReadingsComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ReadingsRoutingModule { }
