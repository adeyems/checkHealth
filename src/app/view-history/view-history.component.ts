import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {RouterExtensions, ModalDialogOptions, ModalDialogService} from "nativescript-angular";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import * as moment from "moment";
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
    errorText: string;

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
        this.startDate = moment().subtract(10, "days").format("dddd, MMMM Do YYYY,");
        this.endDate = moment().subtract(4, "days").format("dddd, MMMM Do YYYY,");

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
                    this.selectedIndex = response;
                    this.setSelectedText();
                }
            });
    }

    goToBrowseRelevantInfo() {
        this.router.navigate(["relevantInfo"]).then();
    }

    onLogout() {
        this.authService.logout();
    }
}
