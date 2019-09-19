import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {RouterExtensions, ModalDialogService, ModalDialogOptions} from "nativescript-angular";

import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';
import { SelectListComponent } from "../modals/select-list/select-list.component";
import { DataService } from "../services/data.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./readings.component.html",
    styleUrls: ["./readings.component.css"]
})
export class ReadingsComponent implements OnInit {
    startDate: string;
    endDate: string;
    degreeCelcius = '<span style="color: white"><sup>o</sup>C</span>';

    medicalPractitioners: any[] = [];
    medPractitionerId: string;
    selectedIndex: number = -1;
    errorText: string;
    startHistory: string;
    historyDates: string[] = [];
    vitalsHistory = {};
    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        protected modalDialog: ModalDialogService,
        protected vcRef: ViewContainerRef,
    ) { }

    ngOnInit() {
        this.generateHistoryDate();

        this.dataService.fetchMedicalPractitioners('medical-practitioners').subscribe(response => {
            for (let key in response) {
                this.medicalPractitioners.push({id: key, value:`${response[key][Object.keys(response[key])[0]].name} ${response[key][Object.keys(response[key])[0]].surname}`});
            }
        });
        this.dataService.fetchUserVitalsReading().subscribe(res => {
            for (let key in res) {
                if (this.historyDates.indexOf(res[key].date) > -1) {
                    this.vitalsHistory[res[key].date] = res[key];
                }
            }
        }, err => {
            alert(err);
        })
    }

    setSelectedText() {
        if (this.selectedIndex > -1) {
            this.medPractitionerId = this.medicalPractitioners[this.selectedIndex].id;
            return this.medicalPractitioners[this.selectedIndex].value;
        } else {
            return 'Select';
        }
    }

    public openMedicalPractitionerBox() {
        const options: ModalDialogOptions = {
            context: {
                boxItems: this.medicalPractitioners,
                boxName: 'Medical Practitioner',
                selectedIndex: this.selectedIndex
            },
            fullscreen: false,
            viewContainerRef: this.vcRef
        }
        this.modalDialog.showModal(SelectListComponent, options)
            .then(response => {
                if (response != undefined) {
                    this.selectedIndex = response;
                    this.setSelectedText();
                }
            });
    }

    goToBrowseRelevantInfo() {
        this.router.navigate(["relevantInfo"]).then();
    }

    onCreateRecordHistory() {
        if (!this.medPractitionerId) {
            alert('Please select a medical practitioner');
            return;
        }
        this.dataService.createVitalHistory(this.medPractitionerId, this.historyDates[0], this.vitalsHistory).subscribe(res => {
            alert('History Successfully Created!');
            this.router.navigate(['patientHome']).catch();
        }, err => {
            alert(err);
        })
    }

    goToProfile() {
        this.router.navigate(["profile"]).catch();
    }

    private generateHistoryDate() {
        let currentDay = new Date(new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()).getDay();

        switch(currentDay) {
            case 0:
                this.startHistory = moment().subtract(6, "days").format('YYYY-M-D');
                break;
            case 1:
                this.startHistory = moment().subtract(7, "days").format('YYYY-M-D');
                break;
            case 2:
                this.startHistory = moment().subtract(8, "days").format('YYYY-M-D');
                break;
            case 3:
                this.startHistory = moment().subtract(9, "days").format('YYYY-M-D');
                break;
            case 4:
                this.startHistory = moment().subtract(10, "days").format('YYYY-M-D');
                break;
            case 5:
                this.startHistory = moment().subtract(11, "days").format('YYYY-M-D');
                break;
            case 6:
                this.startHistory = moment().subtract(12, "days").format('YYYY-M-D');
                break;
            default:
                break;
        }

        this.historyDates.push(`${this.startHistory}`);
        for (let i = 1; i < 7; i++) {
            let temp = moment(this.startHistory, ["YYYY-M-D"]).add(i, 'days').format('YYYY-M-D');
            this.historyDates.push(`${temp}`);
        }
        this.startDate = moment(this.historyDates[0], ["YYYY-M-D"]).format("dddd, MMMM Do YYYY");
        this.endDate = moment(this.historyDates[6], ["YYYY-M-D"]).format("dddd, MMMM Do YYYY");
    }
}
