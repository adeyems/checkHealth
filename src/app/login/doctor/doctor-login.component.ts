import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {of} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TextField} from "tns-core-modules/ui/text-field";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./doctor-login.component.html",
    styleUrls: ["./doctor-login.component.css"]
})
export class DoctorLoginComponent implements OnInit {
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    isLoading = false;
    @ViewChild("passwordEl", {static: false}) passwordEl: ElementRef<TextField>;
    @ViewChild("emailEl", {static: false}) emailEl: ElementRef<TextField>;
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
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(6)]
            })
        });

        this.form.get('email').statusChanges.subscribe(status => {
            this.emailControlIsValid = status === 'VALID';
        });

        this.form.get('password').statusChanges.subscribe(status => {
            this.passwordControlIsValid = status === 'VALID';
        });
    }

    onSubmit() {
        this.router.navigate(["doctorHome"]).then()
    }

    onDone() {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();
    }
}
