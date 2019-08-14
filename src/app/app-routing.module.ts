import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import {LoginComponent} from "~/app/login/login.component";
import {DoctorLoginComponent} from "~/app/login/doctor/doctor-login.component";
import {PatientLoginComponent} from "~/app/login/patient/patient-login.component";
import {SignupComponent} from "~/app/signup/signup.component";
import {PatientHomeScreenComponent} from "~/app/patient-home-screen/patient-home-screen.component";
import {DoctorHomeScreenComponent} from "~/app/doctor-home-screen/doctor-home-screen.component";
import {RelevantInfoComponent} from "~/app/relevant-info/relevant-info.component";
import {CreateHistoryComponent} from "~/app/create-history/create-history.component";
import {ViewHistoryComponent} from "~/app/view-history/view-history.component";
import {ViewDailySignsComponent} from "~/app/view-daily-signs/view-daily-signs.component";
import {ReadingsComponent} from "~/app/readings/readings.component";

const routes: Routes = [
    { path: "doctorLogin", component: DoctorLoginComponent },
    { path: "patientLogin", component: PatientLoginComponent },
    { path: "login", component: LoginComponent },
    { path: "patientSignup", component: SignupComponent },
    { path: "patientHome", component:  PatientHomeScreenComponent},
    { path: "doctorHome", component:  DoctorHomeScreenComponent},
    { path: "relevantInfo", component: RelevantInfoComponent},
    { path: "createHistory", component:  CreateHistoryComponent},
    { path: "viewHistory", component:  ViewHistoryComponent},
    { path: "viewDailySigns", component: ViewDailySignsComponent },
    { path: "readings", component: ReadingsComponent},
    { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
