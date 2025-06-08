import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';
import { IFramePage } from './iframe';

@Component({
    selector: 'app-dynamic-routes-example',
    imports: [Highlight, HighlightLineNumbers, ButtonModule, RouterLink],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Esempio con pagine configurabili</div>
                    Una semplice pagina con un iframe <strong>configurabile</strong> tramite <strong>data</strong> della rotta.
                    <pre>
                        <code [highlight]="iframePageCode" language="ts" lineNumbers></code>
                    </pre>

                     <pre>
                        <code [highlight]="appendIFrameRoutesCode" language="ts" lineNumbers></code>
                    </pre>
               </div>

               <div class="card">
                    <p-button raised (click)="appendIFrameRoutes()">Append iframe routes</p-button>
                    <p-button raised class="ms-2" routerLink="/iframe1">Go to iframe1</p-button>
                    <p-button raised class="ms-2" routerLink="/iframe2">Go to iframe2</p-button>
               </div>
               `
})
export class ExamplePage {
    private _router = inject(Router);

     protected iframePageCode = `@Component({
    selector: 'app-dynamic-routes-iframe',
    template: '
                @if(url()){
                    <iframe [src]="url()"></iframe>
                }
            '
})
export class IFamePage {
protected url = signal<SafeResourceUrl | undefined>(undefined);

constructor(activatedRoute: ActivatedRoute, sanitizer: DomSanitizer) {
    const urlToShow = activatedRoute.snapshot.data['url'];
    if (urlToShow) {
        const sanitizedUrl = sanitizer.bypassSecurityTrustResourceUrl(activatedRoute.snapshot.data['url']);
        this.url.set(sanitizedUrl);
    }
}
}`;

    protected appendIFrameRoutesCode = `public appendIFrameRoutes() {
    const routerConfig = this._router.config;
    routerConfig.unshift(
        { path: 'iframe1', component: IFamePage, data: { url: 'https://dev.marche.it' } },
        { path: 'iframe2', component: IFamePage, data: { url: 'https://www.bonura.dev' } },
    );

    this._router.resetConfig(routerConfig);
    alert("Rotte aggiunte con successo!");
}`;

    public appendIFrameRoutes() {
        const routerConfig = this._router.config;
        routerConfig.unshift(
            { path: 'iframe1', component: IFramePage, data: { url: 'https://dev.marche.it' } },
            { path: 'iframe2', component: IFramePage, data: { url: 'https://www.bonura.dev' } },
        );

        this._router.resetConfig(routerConfig);
        alert("Rotte aggiunte con successo!");
    }
}
