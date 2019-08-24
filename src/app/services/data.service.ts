import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, take, switchMap } from "rxjs/operators";
import { throwError, of } from "rxjs";
import { alert } from "tns-core-modules/ui/dialogs/dialogs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class DataService {

    static Config = {
        SIGNUP_URL: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqTK1rEZ_-krBUwEwkzMNwAenJxiiCnMY",
        SIGNIN_URL: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqTK1rEZ_-krBUwEwkzMNwAenJxiiCnMY",
        FIREBASE_API_KEY: "AIzaSyAqTK1rEZ_-krBUwEwkzMNwAenJxiiCnMY",
        FIREBASE_URL:"https://checkhealth-51468.firebaseio.com"
    };

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    public fetchMedicalPractitioners(userType: 'patients' | 'medical-practitioners') {
        return this.http.get(`${DataService.Config.FIREBASE_URL}/${userType}.json`)
        .pipe(
            catchError(errorRes => {
                DataService.handleError(errorRes.error.error.message);
                return throwError(errorRes);
            })
        );
    }

    public createReadingRecord(vitalSigns) {
        let dateInSecs = new Date(new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()).getTime();
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.post(
                    `${DataService.Config.FIREBASE_URL}/daily-reading-records/${currentUser.id}.json/?auth=${currentUser.token}`, vitalSigns
                ).pipe(
                    catchError(errorRes => {
                        console.log(errorRes);
                        DataService.handleError(errorRes.error.error.message);
                        return throwError(errorRes);
                    })
                );
            })
        );
    }

    fetchUserVitalsReading() {
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.get(
                    `${DataService.Config.FIREBASE_URL}/daily-reading-records/${currentUser.id}.json?auth=${currentUser.token}`
                ).pipe(
                    catchError(errorRes => {
                        console.log(errorRes);
                        DataService.handleError(errorRes.error.error.message);
                        return throwError(errorRes);
                    })
                );
            })
        );
    }

    createVitalHistory(medPractId: string, startDate: string, payload) {
        return this.http.post(
            `${DataService.Config.FIREBASE_URL}/vitals-history/${medPractId}/${startDate}.json`, payload).pipe(
                catchError(errorRes => {
                    console.log(errorRes);
                    DataService.handleError(errorRes.error.error.message);
                    return throwError(errorRes);
                })
            );
    }

    fetchVitalHistory(patientId: string, startDate: string) {
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.get(
                    `${DataService.Config.FIREBASE_URL}/vitals-history/${currentUser.id}/${patientId}/${startDate}.json?auth=${currentUser.token}`
                ).pipe(
                    catchError(errorRes => {
                        console.log(errorRes);
                        DataService.handleError(errorRes.error.error.message);
                        return throwError(errorRes);
                    })
                );
            })
        );
    }

    private static handleError(errorMessage: string) {
        switch (errorMessage) {
            case 'EMAIL_EXISTS':
                alert('This email address exists already!').catch( error => console.log(error));
                break;
            case 'INVALID_PASSWORD':
                alert('Your password is invalid!').catch( error => console.log(error));
                break;
            default:
                alert('Unable to process your request!.').catch( error => console.log(error));
        }
    }
}
