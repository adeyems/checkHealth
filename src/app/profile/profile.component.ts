import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {AuthService} from "~/app/services/auth.service";
import { DataService } from "../services/data.service";
import { getString } from "tns-core-modules/application-settings/application-settings";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
    userType: string;
    profileModel;
    profileId: string;
    fullname: string;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private dataService: DataService
    ) {
    }

    ngOnInit() {
        this.userType = JSON.parse(getString('userType'));
        this.dataService.userDetails(this.userType).subscribe(res => {
            this.profileId = Object.keys(res)[0];
            this.profileModel = res[this.profileId];
            this.fullname = `${this.profileModel.name} ${this.profileModel.surname}`;
        }, err => {
            alert(err);
        })
    }

    onUpdatePhone() {
        this.dataService.updateDetails(this.userType, this.profileId, this.profileModel).subscribe(res => {
            console.log(res);
            alert('Phone updated successfully!');
        }, err => {
            alert(err);
        })
    }

    onLogout() {
        this.authService.logout();
    }
}
