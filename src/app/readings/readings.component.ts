import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";

import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment'
import {ListPicker} from "tns-core-modules/ui/list-picker";

let pokemonList = ["Adeyemo Qudus", "Ade Adenrele", "Ola Global"];

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./readings.component.html",
    styleUrls: ["./readings.component.css"]
})
export class ReadingsComponent implements OnInit {
    startDate: string;
    endDate: string;
    public pokemons: Array<string>;
    index: number;
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    degreeCelcius = "B.T.(<sup>o</sup>C)";
    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) {
        this.pokemons = [];

        for (let i = 0; i < pokemonList.length; i++) {
            this.pokemons.push(pokemonList[i]);
        }
    }

    ngOnInit() {
        this.startDate = moment().subtract(10, "days").format("dddd, MMMM Do YYYY,");
        this.endDate = moment().subtract(4, "days").format("dddd, MMMM Do YYYY,");
        this.sunday = moment().subtract(4, "days").format('DD-MM-YY');
        this.monday = moment().subtract(10, "days").format('DD-MM-YY');
        this.tuesday = moment().subtract(9, "days").format('DD-MM-YY');
        this.wednesday = moment().subtract(8, "days").format('DD-MM-YY');
        this.thursday = moment().subtract(7, "days").format('DD-MM-YY');
        this.friday = moment().subtract(6, "days").format('DD-MM-YY');
        this.saturday = moment().subtract(5, "days").format('DD-MM-YY');
    }
    public selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
        console.log("picker selection: " + picker.selectedIndex);
    }
    goToBrowseRelevantInfo() {
        this.router.navigate(["relevantInfo"]).then();
    }
}
