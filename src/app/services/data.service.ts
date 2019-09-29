import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, take, switchMap } from "rxjs/operators";
import { throwError, of } from "rxjs";
import { alert } from "tns-core-modules/ui/dialogs/dialogs";
import { AuthService } from "./auth.service";
import {keys} from "~/app/helpers/keys";

@Injectable({ providedIn: 'root' })
export class DataService {

    static Config = {
        SIGNUP_URL: keys.SIGNUP_URL,
        SIGNIN_URL: keys.SIGNIN_URL,
        FIREBASE_API_KEY: keys.FIREBASE_API_KEY,
        FIREBASE_APP_URL: keys.FIREBASE_APP_URL
    };

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    public userDetails(userType: string) {
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.get(`${DataService.Config.FIREBASE_APP_URL}/${userType}/${currentUser.id}.json?auth=${currentUser.token}`)
                .pipe(
                    catchError(errorRes => {
                        DataService.handleError(errorRes.error.error.message);
                        return throwError(errorRes);
                    })
                );
            })
        );
    }

    updateDetails(userType: string, profileId: string, payload) {
        delete payload.fullname;
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.put(`${DataService.Config.FIREBASE_APP_URL}/${userType}/${currentUser.id}/${profileId}.json?auth=${currentUser.token}`,
                payload)
                .pipe(
                    catchError(errorRes => {
                        DataService.handleError(errorRes.error.error.message);
                        return throwError(errorRes);
                    })
                );
            })
        );
    }

    public fetchMedicalPractitioners(userType: 'patients' | 'medical-practitioners') {
        return this.http.get(`${DataService.Config.FIREBASE_APP_URL}/${userType}.json`)
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
                    `${DataService.Config.FIREBASE_APP_URL}/daily-reading-records/${currentUser.id}.json/?auth=${currentUser.token}`, vitalSigns
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

    fetchUserVitalsReading(patientId?: string) {
        if (!patientId) {
            return this.authService.user.pipe(
                take(1),
                switchMap(
                    currentUser => {
                        if (!currentUser || !currentUser.isAuth) {
                            return of(null);
                        }
                        return this.http.get(
                            `${DataService.Config.FIREBASE_APP_URL}/daily-reading-records/${currentUser.id}.json?auth=${currentUser.token}`
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
        return this.http.get(
            `${DataService.Config.FIREBASE_APP_URL}/daily-reading-records/${patientId}.json`
        ).pipe(
            catchError(errorRes => {
                console.log(errorRes);
                DataService.handleError(errorRes.error.error.message);
                return throwError(errorRes);
            })
        );
    }

    createVitalHistory(medPractId: string, startDate: string, payload) {
        return this.authService.user.pipe(
            take(1),
            switchMap(
            currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.post(
                    `${DataService.Config.FIREBASE_APP_URL}/vitals-history/${medPractId}/${currentUser.id}/${startDate}.json?auth=${currentUser.token}`, payload).pipe(
                        catchError(errorRes => {
                            console.log(errorRes);
                            DataService.handleError(errorRes.error.error.message);
                            return throwError(errorRes);
                        })
                    );
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
                    `${DataService.Config.FIREBASE_APP_URL}/vitals-history/${currentUser.id}/${patientId}/${startDate}.json?auth=${currentUser.token}`
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

    fetchPatientVitals(patientId: string) {
        return this.http.get(
            `${DataService.Config.FIREBASE_APP_URL}/daily-reading-records/${patientId}/.json?orderBy="$key"&limitToLast=1`
        ).pipe(
            catchError(errorRes => {
                console.log(errorRes);
                DataService.handleError(errorRes.error.error.message);
                return throwError(errorRes);
            })
        );
    }

    sendPatientMessage(payload) {
        return this.http.post(keys.MESSAGE_CLIENT_URL,
            payload,
            {headers: {"content-type" : "application/json"}});
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
