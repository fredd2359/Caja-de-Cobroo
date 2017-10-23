import { Component } from '@angular/core';

@Component({
    selector: 'main-component',
    templateUrl: './main.component.html'
})
export class MainComponent
{
    public title: String;

    constructor()
    {
        this.title = "Panel de administración.";
    }
}