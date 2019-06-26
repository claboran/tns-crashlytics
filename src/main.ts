// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';

import { AppModule } from './app/app.module';
import * as traceModule from 'tns-core-modules/trace';
import * as firebase from 'nativescript-plugin-firebase';
import {enable} from 'tns-core-modules/trace';
declare var java: any;

// enable();
//
// const errorHandler: traceModule.ErrorHandler = {
//     handlerError(err) {
//         console.log(`Received Crash: ${err.message}`);
//         firebase.crashlytics.sendCrashLog(new java.lang.Exception(`${err.stack}`));
//     }
// };
// traceModule.setErrorHandler(errorHandler);
platformNativeScriptDynamic().bootstrapModule(AppModule);
