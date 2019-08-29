import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {RouterExtensions, ModalDialogOptions, ModalDialogService} from "nativescript-angular";
import {ActivatedRoute} from "@angular/router";
import * as moment from "moment";
import { DatePicker } from "tns-core-modules/ui/date-picker";

import { AuthService } from "~/app/services/auth.service";
import { DataService } from "../services/data.service";
import { SelectListComponent } from "../modals/select-list/select-list.component";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./view-history.component.html",
    styleUrls: ["./view-history.component.css"]
})
export class ViewHistoryComponent implements OnInit {
    startDate: string;
    endDate: string;
    patientId: string;
    patientList: any[] = [];
    selectedIndex: number = -1;
    selectedDay;
    selectedDate;
    selectedEndDate;
    vitalsHistory = [];
    historyDates: string[] = [];
    viewMode: boolean = false;
    isLoading: boolean = false;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        protected modalDialog: ModalDialogService,
        protected vcRef: ViewContainerRef,
    ) {

    }

    ngOnInit() {
        this.dataService.fetchMedicalPractitioners('patients').subscribe(response => {
            for (let key in response) {
                this.patientList.push({id: key, value:`${response[key][Object.keys(response[key])[0]].name} ${response[key][Object.keys(response[key])[0]].surname}`});
            }
        });
    }

    setSelectedText() {
        if (this.selectedIndex > -1) {
            this.patientId = this.patientList[this.selectedIndex].id;
            return this.patientList[this.selectedIndex].value;
        } else {
            return 'Select';
        }
    }

    public openPatientBox() {
        const options: ModalDialogOptions = {
            context: {
                boxItems: this.patientList,
                boxName: 'Patient',
                selectedIndex: this.selectedIndex
            },
            fullscreen: false,
            viewContainerRef: this.vcRef
        }
        this.modalDialog.showModal(SelectListComponent, options)
            .then(response => {
                if (response != undefined) {
                    this.vitalsHistory = [];
                    this.viewMode = false;
                    this.selectedIndex = response;
                    this.setSelectedText();
                }
            });
    }

    onPickerLoaded(args) {
        let datePicker = <DatePicker>args.object;

        datePicker.year = 2019;
        datePicker.month = 1;
        datePicker.day = 0;
        datePicker.minDate = new Date(2019, 0, 1);
        datePicker.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    }

    onEndDatePickerLoaded(args) {
        let datePicker = <DatePicker>args.object;
        datePicker.year = 2019;
        datePicker.month = 1;
        datePicker.day = 0;
        datePicker.minDate = new Date(2019, 0, 1);
        datePicker.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    }

    onDateChanged(args) {
        this.selectedDate = moment(args.value, ["ddd MMM MM YYYY HH:mm:ss"]).format("YYYY-M-D");
        this.selectedDay = moment(this.selectedDate, ["YYYY-MM-DD"]).format("e");
        this.startDate = moment(this.selectedDate, ["YYYY-M-D"]).format("dddd, MMMM Do YYYY");
    }

    onEndDateChanged(args) {
        this.selectedEndDate = moment(args.value, ["ddd MMM MM YYYY HH:mm:ss"]).format("YYYY-M-D");
        this.endDate = moment(this.selectedEndDate, ["YYYY-M-D"]).format("dddd, MMMM Do YYYY");
    }

    generateHistoryDate() {
        let daysDiff = moment(this.selectedEndDate, ["YYYY-M-D"]).diff(moment(this.selectedDate, ["YYYY-M-D"]), 'days');
        this.historyDates = [];
        this.historyDates.push(`${this.selectedDate}`);
        for (let i = 1; i < daysDiff + 1; i++) {
            let temp = moment(this.selectedDate, ["YYYY-M-D"]).add(i, 'days').format('YYYY-M-D');
            this.historyDates.push(`${temp}`);
        }
    }

    viewHistory() {
        this.vitalsHistory = [];
        this.generateHistoryDate();

        if (this.selectedDay != 1) {
            alert('Start of History must be Monday!');
            return;
        }
        if (!this.patientId) {
            alert('Please select a patient!');
            return;
        }

        this.viewMode = true;
        this.isLoading = true;

        // this.dataService.fetchVitalHistory(this.patientId, this.selectedDate).subscribe(res => {
        //     if (res) {
        //         this.vitalsHistory = res[Object.keys(res)[0]];
        //     }
        //     this.isLoading = false;
        // }, err => {
        //     alert(err);
        // })
        this.dataService.fetchUserVitalsReading(this.patientId).subscribe(res => {
            if (res) {
                for (let key in res) {
                    if (this.historyDates.indexOf(res[key].date) > -1) {
                        res[key]['day'] = moment([res[key].date], ["YYYY-M-D"]).format("dddd");
                        this.vitalsHistory.push(res[key]);
                        // this.vitalsHistory[res[key].date] = res[key];
                        // this.vitalsHistory[res[key].date]['day'] = moment([res[key].date], ["YYYY-M-D"]).format("dddd");
                    }
                }
            }
        }, err => {
            alert(err);
        })
    }

    goToBrowseRelevantInfo() {
        this.router.navigate(["relevantInfo"]).then();
    }

    goToProfile() {
        this.router.navigate(["profile"]).catch();
    }
}
