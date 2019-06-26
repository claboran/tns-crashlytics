import { Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import {delay, filter} from 'rxjs/operators';
import * as app from 'tns-core-modules/application';
import {ActivityIndicatorService} from '~/app/shared/services/activity-indicator.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import * as firebase from 'nativescript-plugin-firebase';
import * as traceModule from 'tns-core-modules/trace';

declare var java: any;

const errorHandler: traceModule.ErrorHandler = {
    handlerError(err) {
        console.log(`Received Crash: ${err.message}`);
        firebase.crashlytics.sendCrashLog(new java.lang.Exception(`${err.stack}`));
    }
};

@Component({
    moduleId: module.id,
    selector: 'ns-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    private readonly _showIndicator$: Observable<boolean>;

    constructor(private router: Router,
                private routerExtensions: RouterExtensions,
                private activityIndicatorService: ActivityIndicatorService) {
        // Use the component constructor to inject services.
        this._showIndicator$ = this.activityIndicatorService.showIndicator$;
    }

    ngOnInit(): void {

        // traceModule.setErrorHandler(errorHandler);

        this.initFireBase();
        this._activatedUrl = '/home';
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        this.router.events
            .pipe(
                filter((event: any) => event instanceof NavigationStart),
                tap(() => this.activityIndicatorService.switchOn())
            ).subscribe();

        this.router.events
            .pipe(
                filter((event: any) => event instanceof NavigationEnd),
                delay(2000),
                tap(() => this.activityIndicatorService.switchOff())
            ).subscribe();

    }


    get showIndicator$(): Observable<boolean> {
        return this._showIndicator$;
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: 'fade',
                duration: 2000

            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    private initFireBase(): void {
        firebase.init({crashlyticsCollectionEnabled: true}).then(
            () => {
                console.log(`firebase init done`);
                firebase.crashlytics.sendCrashLog(new java.lang.Exception('Hello'));
            },
            error => {
                console.log(`firebase init error: ${error}`);
            }
        );
    }
}
