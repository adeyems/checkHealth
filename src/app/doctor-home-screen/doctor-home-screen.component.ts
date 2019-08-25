import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./doctor-home-screen.component.html",
    styleUrls: ["./doctor-home-screen.component.css"]
})
export class DoctorHomeScreenComponent implements OnInit {
    pageTitle: string;
    public currentUser: string;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.queryParams.subscribe( params => {
            this.currentUser = params["user"];
            console.log(this.currentUser);
        });
    }

    ngOnInit() {
    }

    goToPatientHome() {

    }

    goToPatientDailySigns(){
        this.router.navigate(["viewDailySigns"]).catch();
    }

    goToHistory() {
        this.router.navigate(["viewHistory"]).catch();
    }

    goToProfile() {
        this.router.navigate(["profile"]).catch();
    }

}
