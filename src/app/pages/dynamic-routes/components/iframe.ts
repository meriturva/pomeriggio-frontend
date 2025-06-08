import { Component, Sanitizer, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dynamic-routes-iframe',
    template: `
                <h1>IFramePage angular per visualizzare un iframe dinamico.</h1>
                @if(url()){
                    <iframe [src]="url()" style="width: 100vw;height: 100vw;max-width: 100%;"></iframe>
                }
               `
})
export class IFramePage {
    protected url = signal<SafeResourceUrl | undefined>(undefined);

    constructor(activatedRoute: ActivatedRoute, sanitizer: DomSanitizer) {
        const urlToShow = activatedRoute.snapshot.data['url'];
        if (urlToShow) {
            const sanitizedUrl = sanitizer.bypassSecurityTrustResourceUrl(activatedRoute.snapshot.data['url']);
            this.url.set(sanitizedUrl);
        }
    }
}
