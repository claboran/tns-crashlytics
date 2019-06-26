import {ErrorHandler, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import {HeaderComponent} from '~/app/shared/header/header.component';
import { LoadIndicatorComponent } from './load-indicator/load-indicator.component';
import {enable as traceEnable} from 'tns-core-modules/trace';
import * as firebase from 'nativescript-plugin-firebase';

declare var java: any;

traceEnable();

class MyErrorHandler implements ErrorHandler {
    handleError(error) {
        console.log('### ErrorHandler Error: ' + error.toString());
        // console.log('### ErrorHandler Stack: ' + error.stack);
        firebase.crashlytics.sendCrashLog(new java.lang.Exception(`${error.stack}`));

    }
}


@NgModule({
    imports: [
        NativeScriptCommonModule,
    ],
    exports: [
        HeaderComponent,
        LoadIndicatorComponent
    ],
    declarations: [
        HeaderComponent,
        LoadIndicatorComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        { provide: ErrorHandler, useClass: MyErrorHandler }
    ]

})
export class SharedModule { }
