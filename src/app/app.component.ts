import {Component, OnInit} from "@angular/core";
import {LocalNotifications} from "nativescript-local-notifications/local-notifications.android";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit{

    constructor() {
        LocalNotifications.addOnMessageReceivedCallback(notificationData => {
            console.log("Notification received: " + JSON.stringify(notificationData));
        }).then(r => console.log(r));
    }

    ngOnInit(): void {
        this.schedule();
    }

    schedule(): void {
        let d = new Date();
        d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
        LocalNotifications.schedule(
            [{
                id: 5,
                thumbnail: true,
                title: 'Check Health.',
                body: 'Take your health readings now.',
                forceShowWhenInForeground: true,
                at: d,
                actions: [
                    {
                        id: "patient",
                        type: "input",
                        title: "Check Health",
                        placeholder: "Check your health",
                        submitLabel: "Reply",
                        launch: true,
                        editable: true,
                        // choices: ["Red", "Yellow", "Green"] // TODO Android only, but yet to see it in action
                    }
                ]
            }])
            .then(() => {
                console.log("notification set");
                /*alert({
                    title: "Notification scheduled to remind you the next day.",
                    message: "",
                    okButtonText: "OK, thanks"
                });*/
            })
            .catch(error => console.log("doScheduleId5WithInput error: " + error));
    }
}
