import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {Observable} from "tns-core-modules/data/observable";
import {DownloadManager} from "nativescript-downloadmanager";
import {Progress} from "tns-core-modules/ui/progress";
import {async} from "rxjs/internal/scheduler/async";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./relevant-info.component.html",
    styleUrls: ["./relevant-info.component.css"]
})
export class RelevantInfoComponent extends Observable {
    isVisible = false;

    constructor(
        private router: RouterExtensions,
    ) {
        super();
    }

    goToProfile() {
        this.router.navigate(["profile"]).catch();
    }

    public download(url: string) {
        // Instantiate a Download Manager. The way it's done (it uses a BroadcastReceiver),
        // it's mean to be kept alive during all the application lifetime. But we can kill unsubscribe
        let dm = new DownloadManager();
        // We download a file, in this example a 10mb test file.
        // This is the Most simple version of doing it.
        // Aside from that there are optional parameters for. Directory (always inside android/data/yourapp/),
        // The file name, and title and description for the notification bar. By default it uses the file name
        // as title, and no description.
        this.isVisible = true;

        dm.downloadFile(url,  (result, uri) => {
            // result is a boolean, if the download was successful, it will return true
            console.log(result);
            const filename = (uri.split("downloads")[1]);
            // Uri in file:// format of the downloaded file.
            alert(`File Downloaded. Saved in Android/org.nativescript.checkHealth/files/downloads${filename}`);
            console.log(uri);
            // unregisterBroadcast is used to unregister the broadcast (For example if you just want to
            // download a single file).
            dm.unregisterBroadcast();
            this.isVisible = false;
        });
    }
}
