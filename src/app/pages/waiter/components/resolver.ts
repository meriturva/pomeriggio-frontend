import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';
import { BasePage } from '../../base-page';

@Component({
    selector: 'app-waiter-resolver',
    imports: [Highlight, HighlightLineNumbers, ButtonModule],
    template: `<div class="card">
                    <div class="font-semibold text-xl">E se volessimo legare il waiter con i resolver?</div>

                    <div class="font-semibold text-l mt-2">Route code:</div>
                    <pre>
                        <code [highlight]="routerCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">App component code:</div>
                    <pre>
                        <code [highlight]="appComponentCode" language="ts" lineNumbers></code>
                    </pre>

                    <div class="font-semibold text-l mt-2">Il router ha un life cycle, usiamolo!</div>
               </div>
              `
})
export class ResolverPage extends BasePage {

    protected routerCode = `
        const dataResolverFn: ResolveFn<number> = () => of(Math.random()).pipe(delay(3000))

        export default [
            { path: 'resolver', component: ResolverPage, resolve: { data: dataResolverFn } },
        ] as Routes;
    `;

    protected appComponentCode = `
        this._router.events.pipe(takeUntilDestroyed()) .subscribe((routerEvent) => {
            // Note: https://angular.dev/api/router/ResolveStart
            if (routerEvent instanceof ResolveStart) {
                this._eventsService.onShowWaiter.emit();
            }

            if (routerEvent instanceof NavigationEnd ||
                routerEvent instanceof NavigationCancel ||
                routerEvent instanceof NavigationError) {
                this._eventsService.onCloseWaiter.emit();
            }
        });
        `;

    constructor(route: ActivatedRoute) {
        super();

        console.log('data from resolver:', route.snapshot.data['data']);
    }
}
