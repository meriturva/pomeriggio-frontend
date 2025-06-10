import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-dynamic-routes-info',
    imports: [Highlight, HighlightLineNumbers, ButtonModule, RouterLink],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Cosa sono?</div>
                    <p><a href="https://angular.dev/api/router/Router#resetConfig" target="_blank">https://angular.dev/api/router/Router#resetConfig</a></p>
                    <p>Il metodo <strong>resetConfig</strong> del Router di Angular permette di modificare la configurazione delle rotte dell'applicazione in fase di esecuzione.</p>
                    <div class="font-semibold text-l mt-2">Esempio:</div>
                     <pre>
                        <code [highlight]="replaceRoutesCode" language="ts" lineNumbers></code>
                    </pre>
               </div>
               <div class="card">
                    <p-button raised (click)="replaceRoutes()">Replace routes</p-button>
                    <p-button raised class="ms-2" routerLink="/info1">Go to info1</p-button>
                    <p-button raised class="ms-2" routerLink="/info2">Go to info2</p-button>
               </div>

               <div class="card">
                    <div class="font-semibold text-xl">Modifica di rotte?</div>
                    <p>Il router ha una proprietà <strong><a href="https://angular.dev/api/router/Router#config" target="_blank">config</a></strong> per avere accesso alla configurazione corrente delle rotte.</p>
                    <div class="font-semibold text-l mt-2">Esempio:</div>
                     <pre>
                        <code [highlight]="appendRoutesCode" language="ts" lineNumbers></code>
                    </pre>
               </div>
               <div class="card">
                    <p-button raised (click)="appendRoutesNotWorking()">Append routes (not working)</p-button>
                    <p-button raised class="ms-2" (click)="appendRoutesWorking()">Append routes (working)</p-button>
                    <p-button raised class="ms-2" routerLink="/info1">Go to info1</p-button>
                    <p-button raised class="ms-2" routerLink="/info2">Go to info2</p-button>
               </div>
               `
})
export class InfoPage {
    private _router = inject(Router);

    protected replaceRoutesCode = `public replaceRoutes() {
    this._router.resetConfig([
        { path: 'info1', component: InfoPage },
        { path: 'info2', component: InfoPage },
    ]);
    alert("Rotte sostituite con successo!");
}`;

    protected appendRoutesCode = `public appendRoutes() {
    // Aggiunge le rotte alla configurazione corrente, ma non funziona come previsto
    const routerConfig = this._router.config;
    routerConfig.push(
        { path: 'info1', component: InfoPage },
        { path: 'info2', component: InfoPage }
    );

    this._router.resetConfig(routerConfig);
    alert("Rotte aggounte con successo!");
}`;

    public replaceRoutes() {
        this._router.resetConfig([
            { path: 'info1', component: InfoPage },
            { path: 'info2', component: InfoPage },
        ]);
        alert("Rotte sostituite con successo!");
    }

    public appendRoutesNotWorking() {
        const routerConfig = this._router.config;
        // Aggiunge le rotte alla configurazione corrente, ma non funziona come previsto
        routerConfig.push(
            { path: 'info1', component: InfoPage },
            { path: 'info2', component: InfoPage }
        );

        debugger;
        this._router.resetConfig(routerConfig);
        alert("Rotte aggiunte con successo!");
    }

    public appendRoutesWorking() {
        const routerConfig = this._router.config;
        // Aggiungiamo le nuove rotte all'inizio della configurazione
        routerConfig.unshift(
            { path: 'info1', component: InfoPage },
            { path: 'info2', component: InfoPage }
        );

        debugger;
        this._router.resetConfig(routerConfig);
        alert("Rotte aggiunte con successo!");
    }
}
