import {Component} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import { AuthService } from "~/app/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {getFile} from "tns-core-modules/http";
import {Folder} from "tns-core-modules/file-system";
import {Observable} from "tns-core-modules/data/observable";
import {DownloadManager} from "nativescript-downloadmanager";
import { PDFView } from "nativescript-pdf-view";
import { registerElement } from 'nativescript-angular';
registerElement('PDFView', () => PDFView);

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./relevant-info.component.html",
    styleUrls: ["./relevant-info.component.css"]
})
export class RelevantInfoComponent extends Observable{
    pdfpath: any;


    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) {
        super();
    }


    goToProfile() {
        this.router.navigate(["profile"]).catch();
    }

    downloadAsthma() {
        getFile("https://firebasestorage.googleapis.com/v0/b/checkhealth-51468.appspot.com/o/asthma.pdf?alt=media&token=44e1c71b-308d-4485-bebc-352b0561836a").then((resultFile) => {

        }, (e) => {
        });
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
        dm.downloadFile(url, function(result,uri) {
            // result is a boolean, if the download was successful, it will return true
            console.log(result);
            // Uri in file:// format of the downloaded file.
            alert('File Downloaded. Saved in Android/org.nativescript.checkHealth/files/downloads');
            console.log(uri);
            // unregisterBroadcast is used to unregister the broadcast (For example if you just want to
            // download a single file).
            dm.unregisterBroadcast();

            let self = this;
            self.pdfpath = uri;

        })
    }
}
