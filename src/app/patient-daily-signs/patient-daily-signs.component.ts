import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {RouterExtensions, ModalDialogService, ModalDialogOptions} from "nativescript-angular";
import * as moment from 'moment';

import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import { DataService } from "../services/data.service";
import { SelectListComponent } from "../modals/select-list/select-list.component";
import { getString } from "tns-core-modules/application-settings/application-settings";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./patient-daily-signs.component.html",
    styleUrls: ["./patient-daily-signs.component.css"]
})
export class PatientDailySignsComponent implements OnInit {
    currentDate: string;
    currentTime: string;
    degreeCelcius = "<sup>o</sup>C";

    medicalPractitioners: any[];
    selectedIndex: number = -1;
    errorText: string;
    patientId: string;
    vitalSignsModel = {
        medicalPractitionerId: "",
        bloodPressure: {
            lower: 0,
            higher: 0
        },
        heartRate: "",
        bodyTemperature: "",
        date: "",
        time: ""
    }


    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private dataService: DataService,
        protected modalDialog: ModalDialogService,
        protected vcRef: ViewContainerRef,
    ) { }

    ngOnInit() {
        this.medicalPractitioners = [];
        this.patientId = JSON.parse(getString('userData'))['id'];
        this.vitalSignsModel.bloodPressure.lower = 50;
        this.vitalSignsModel.bloodPressure.higher = 120;
        this.dataService.fetchMedicalPractitioners('medical-practitioners').subscribe(response => {
            for (let key in response) {
                this.medicalPractitioners.push({id: key, value:`${response[key][Object.keys(response[key])[0]].name} ${response[key][Object.keys(response[key])[0]].surname}`});
            }
        });
        const today = new Date();
        this.currentDate = today.toDateString();
        this.currentTime = (today.toTimeString()).split(" ")[0];
    }

    setSelectedText() {
        if (this.selectedIndex > -1) {
            this.vitalSignsModel.medicalPractitionerId = this.medicalPractitioners[this.selectedIndex].id;
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

    public onCreateReadingRecord() {
        this.vitalSignsModel.date = moment().format('YYYY-M-D');
        this.vitalSignsModel.time = moment().format("HH:mm:ss");
        if (this.selectedIndex < 0) {
            this.errorText = 'Please Select a Medical Practitioner!'
            return;
        }
        this.dataService.createReadingRecord(this.vitalSignsModel).subscribe(response => {
            alert('Vitals Created Successfully!');
            this.router.navigate(['patientHome'], { clearHistory: true }).then();
        });
    }

    goToProfile() {
        this.router.navigate(["profile"]).catch();
    }
}
