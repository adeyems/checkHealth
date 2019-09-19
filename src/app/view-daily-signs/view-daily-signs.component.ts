import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {RouterExtensions, ModalDialogService, ModalDialogOptions} from "nativescript-angular";
import * as moment from 'moment';

import { AuthService } from "~/app/services/auth.service";
import { DataService } from "../services/data.service";
import { SelectListComponent } from "../modals/select-list/select-list.component";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./view-daily-signs.component.html",
    styleUrls: ["./view-daily-signs.component.css"]
})
export class ViewDailySignsComponent implements OnInit {
    currentDate: string;
    currentTime: string;

    patientId: string;
    patientPhone;
    patientFullname = '';
    patientList: any[] = [];
    selectedIndex: number = -1;
    errorText: string;
    vitalSignsModel;


    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private dataService: DataService,
        protected modalDialog: ModalDialogService,
        protected vcRef: ViewContainerRef,
    ) {

    }

    ngOnInit() {
        const today = new Date();
        this.currentDate = today.toDateString();
        this.currentTime = (today.toTimeString()).split(" ")[0];

        this.dataService.fetchMedicalPractitioners('patients').subscribe(response => {
            for (let key in response) {
                this.patientList.push(
                    {
                        id: key,
                        value:`${response[key][Object.keys(response[key])[0]].name} ${response[key][Object.keys(response[key])[0]].surname}`,
                        phone: response[key][Object.keys(response[key])[0]].phone
                    }
                );
            }
        });
    }

    setSelectedText() {
        if (this.selectedIndex > -1) {
            this.patientId = this.patientList[this.selectedIndex].id;
            this.patientFullname = this.patientList[this.selectedIndex].value;
            this.patientPhone = this.patientList[this.selectedIndex].phone;
            console.log('??????', this.patientPhone);
            console.log('------', this.patientFullname);
            return this.patientFullname;
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
                    this.selectedIndex = response;
                    this.setSelectedText();
                    this.getPatientVitals(this.patientId);
                }
            });
    }

    getPatientVitals(patientId: string) {
        this.dataService.fetchPatientVitals(patientId).subscribe(res => {
            if (res) {
               const currentDate = moment().format("YYYY-M-D");
                if (res[Object.keys(res)[0]].date === currentDate) {
                    this.vitalSignsModel = res[Object.keys(res)[0]];
                } else {
                    this.vitalSignsModel = null;
                }
            } else {
                this.vitalSignsModel = null;
            }

        }, err => {
            alert(err);
        })
    }

    goToDoctorHomeScreen() {
        this.router.navigate(["doctorHome"]).then()
    }

    goToHistory() {
        this.router.navigate(["createHistory"]).then()
    }

    goToProfile() {
        this.router.navigate(["profile"]).catch();
    }

    sendMessageToPatient() {
        let receiver = this.patientPhone;
        let messageBody = `Dear ${this.patientFullname}, Abnormal readings have been detected. Please make appointment as soon as possible to visit me.`
        const payload = {
            to: receiver,
            body: messageBody
        };
        this.dataService.sendPatientMessage(payload).subscribe(res => {
            alert('Message sent successfully!');
        }, err => {
            alert(err);
        })
    }
}
