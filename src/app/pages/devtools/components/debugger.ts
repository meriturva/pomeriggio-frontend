import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-devtools-debugger',
    imports: [Highlight, HighlightLineNumbers, ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Utilizzo del Debugger</div>
                    <pre>
                        <code [highlight]="demoCode" language="ts" lineNumbers></code>
                    </pre>
               </div>
               <div class="card">
                    <p-button raised (click)="doSomething()">Do something</p-button>
               </div>`
})
export class DebuggerPage {
    protected demoCode = `export class MyClass {
        public doSomething() {
            console.log('Doing something...');
            debugger; // Interrompe qui l'esecuzione solo se i DevTools sono aperti
            console.log('Did something...');
        }
}`;

    public doSomething() {
        console.log('Doing something...');
        debugger; // Interrompe qui l'esecuzione solo se i DevTools sono aperti
        console.log('Did something...');
    }
}
