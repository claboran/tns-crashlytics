import { Component, OnInit } from '@angular/core';
declare var java: any;

@Component({
    selector: 'Home',
    moduleId: module.id,
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {


    constructor() {
        // Use the component constructor to inject providers.
    }



    ngOnInit(): void {
        // Init your component properties here.
        throw new java.lang.Exception('Crash');
    }

}
