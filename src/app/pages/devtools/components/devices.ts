import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-devtools-devices',
    imports: [ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Ispezionare i devices</div>
                    <p>Quante volte vi è capitato di dover ispezionare i DevTools di un disposiivo mobile?</p>
                    <p>Per farlo, basta connettere il dispositivo al computer e visitare l'URL <a href="chrome://inspect#devices" target="_blank">chrome://inspect#devices</a>.</p>
               </div>
               <div class="card">
                    <div class="font-semibold text-xl">Alternativa commerciale</div>
                    <p>
                        <a href="https://www.browserstack.com" target="_blank"><img src="/img/browserstack.svg" alt="BrowserStack Logo" class="m-4"></a>
                        <img src="/img/browserstack-devices-list.jpg" alt="BrowserStack Device list" class="m-4">
                    </p>
               </div>`
})
export class DevicesPage { }
