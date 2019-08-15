import { Component, OnInit } from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import {messageType} from "tns-core-modules/trace";
import error = messageType.error;

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

    constructor(private routerExtensions: RouterExtensions) { }

    // tslint:disable-next-line:no-empty
    ngOnInit(): void {
    }

    goToPatientLogin() {
        console.log("patient");
        this.routerExtensions.navigate(["patientLogin"]).then().catch( error => console.log(error));
    }

    goToMedicalPractitionerLogin() {
        console.log("doctor");
        this.routerExtensions.navigate(["daily-signs"]).catch( error => console.log(error));
    }
}
