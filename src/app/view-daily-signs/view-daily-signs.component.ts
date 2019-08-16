import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {of} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TextField} from "tns-core-modules/ui/text-field";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ListPicker} from "tns-core-modules/ui/list-picker";

let pokemonList = ["Adeyemo Qudus", "Ade Adenrele", "Ola Global"];


@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./view-daily-signs.component.html",
    styleUrls: ["./view-daily-signs.component.css"]
})
export class ViewDailySignsComponent implements OnInit {
    currentDate: string;
    currentTime: string;
    public pokemons: Array<string>;
    degreeCelcius = "<sup>o</sup>C";
    index: number;


    constructor(
        private router: RouterExtensions,
        private authService: AuthService
    ) {
        this.pokemons = [];

        for (let i = 0; i < pokemonList.length; i++) {
            this.pokemons.push(pokemonList[i]);
        }
    }

    ngOnInit() {
        const today = new Date();
        this.currentDate = today.toDateString();
        this.currentTime = (today.toTimeString()).split(" ")[0];
    }

    public selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
        console.log("picker selection: " + picker.selectedIndex);
    }

    goToDoctorHomeScreen() {
        this.router.navigate(["doctorHome"]).then()
    }

    goToHistory() {
        this.router.navigate(["createHistory"]).then()
    }

    onLogout() {
        this.authService.logout();
    }
}
