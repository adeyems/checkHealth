import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {RouterExtensions, ModalDialogService, ModalDialogOptions} from "nativescript-angular";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ListPicker} from "tns-core-modules/ui/list-picker";
import { DataService } from "../services/data.service";
import { SelectListComponent } from "../modals/select-list/select-list.component";
import { getString } from "tns-core-modules/application-settings/application-settings";


let pokemonList = ["Adeyemo Qudus", "Ade Adenrele", "Ola Global"];

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

    public patientId: string;
    public medicalPractitioners: any[];
    selectedIndex: number = -1;
    public errorText: string;
    public vitalSignsModel = {
        patientId: "",
        medicalPractitionerId: "",
        bloodPressure: {
            lower: "",
            higher: ""
        },
        heartRate: "",
        bodyTemperature: ""
    }


    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private dataService: DataService,
        protected modalDialog: ModalDialogService,
        protected vcRef: ViewContainerRef,
    ) {
        this.medicalPractitioners = [];
        // for (let i = 0; i < pokemonList.length; i++) {
        //     this.medicalPractitioners.push(pokemonList[i]);
        // }
    }

    ngOnInit() {
        this.patientId = JSON.parse(getString('userData'))['id'];
        console.log(this.patientId);
        this.dataService.fetchMedicalPractitioners('medical-practitioner')
            .subscribe(response => {
                for (let key in response) {
                    this.medicalPractitioners.push({id: key, value:`${response[key].name} ${response[key].surname}`});
                }
            });
        const today = new Date();
        this.currentDate = today.toDateString();
        this.currentTime = (today.toTimeString()).split(" ")[0];
    }

    public selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
        console.log("picker selection: " + picker.selectedIndex);
    }

    setSelectedText() {
        if (this.selectedIndex > -1) {
            this.vitalSignsModel.medicalPractitionerId = this.medicalPractitioners[this.selectedIndex].id;
            return this.medicalPractitioners[this.selectedIndex].value;
        } else {
            return '';
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
        this.dataService.createReadingRecord(this.vitalSignsModel)
            .subscribe(response => {
                this.router.navigate(['patientHome'], { clearHistory: true }).then();
            })
    }

    onLogout() {
        this.authService.logout();
    }
}
