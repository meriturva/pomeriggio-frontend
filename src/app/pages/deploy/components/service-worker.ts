import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-deploy-service-worker',
    imports: [Highlight, HighlightLineNumbers, ButtonModule],
    template: `<div class="card">
                   <div class="font-semibold text-xl">Utilizzo del service worker</div>
                    <p>Aggiungiamo il service worker di angular con il comando <em>ng add &#64;angular/pwa</em>.</p>
                    <p>Eliminiamo il <em>manifest.webmanifest</em> file per utilizzare solo la funzionalità di update del service worker</p>
               </div>
               <div class="card">
                <p>Ad ogni build del pogetto, Angular aggiorna il file <em>ngsw-config.json</em> che contiene le informazioni per la gestione degli aggiornamenti.</p>
                <img src="/img/ngsw-json.png" alt="Ngsw" class="m-4">
               </div>
               <div class="card">
                <p>Angular ci mette a disposizione il servizio <strong><a href="https://angular.dev/api/service-worker/SwUpdate" target="_blank">SwUpdate</a>   </strong> per gestire gli aggiornamenti del service worker.</p>

                <pre>
                    <code [highlight]="checkForUpdateServiceCode" language="ts" lineNumbers></code>
                </pre>

                <pre>
                    <code [highlight]="appComponentPage" language="ts" lineNumbers></code>
                </pre>
               <div>`
})
export class ServiceWorkerPage {
    protected checkForUpdateServiceCode = `import { concat, interval, first } from 'rxjs';

import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class CheckForUpdateService {

    constructor(appRef: ApplicationRef, updates: SwUpdate) {
        if (updates.isEnabled) {
            // Allow the app to stabilize first, before starting
            // polling for updates with 'interval()'.
            const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
            const everySixHours$ = interval(6 * 60 * 60 * 1000);
            concat(appIsStable$, everySixHours$).subscribe(() => updates.checkForUpdate());
        }
    }
}`;

    protected appComponentPage = `constructor(
    // Add cfus just to enable interval
    cfus: CheckForUpdateService,
    private updates: SwUpdate) {
  }

  public ngAfterViewInit(): void {
    if (this.updates.isEnabled) {
      this.updates.versionUpdates.subscribe((event) => {
        if (event.type == 'VERSION_READY') {
          this.promptUpdate();
        }
      });
    }
  }

  private promptUpdate() {
    this.showConfirmDialog('Aggiornamento applicazione: ricaricare la pagina.').pipe(
                concatMap(() => document.location.reload())
            ).subscribe();
  }`;
}
