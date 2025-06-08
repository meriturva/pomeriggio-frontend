import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
    selector: 'app-dynamic-routes-resolver',
    imports: [Highlight, HighlightLineNumbers],
    template: `<div class="card">
                    <div class="font-semibold text-xl">Esempio con resolver</div>
                    In alcuni progetti utilizzo un resolver per chiedere al backend il menu che l'utente può visualizzare.

                    <p>Le rotte dell'appplicazione vengono configurate in modo dinamico tramite un resolver che recupera i dati dal backend.</p>
                    <pre>
                        <code [highlight]="routesCode" language="ts" lineNumbers></code>
                    </pre>

                    <p>Il resolver configura il router e restituisce un array di menu che vengono poi utilizzati per creare l'alberto di voci nella <strong>sidebar</strong>.</p>
                    <p><em>Nota: esempio semplificato, in un'applicazione reale il resolver risulta più complesso!</em></p>
                    <pre>
                        <code [highlight]="resolverCode" language="ts" lineNumbers></code>
                    </pre>
               </div>
               `
})
export class ResolverPage {

    protected routesCode = `{
    path: 'main',
    component: AppLayout,
    resolve: { menu: DynamicMenuResolver }
}`;

     protected resolverCode = `@Injectable({ providedIn: 'root' })
export class DynamicMenuResolver  {

    constructor(
        private router: Router,
        private menuService: MenuService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Menu[]> {
        return this.menuService.get().pipe(
            map(menus => {
                // Prendo la rotta principale
                const mainRoute = this.router.config.find(c => c.path == 'main');
                // Creo le rotte per ogni menu restituito dal backend
                const userRoutes = menus.map(menu => this.createRoutes(menu));
                // Aggiungo le rotte al mainRoute come figli
                mainRoute.children = userRoutes;
                // Resetto la configurazione del router con le nuove rotte
                this.router.resetConfig([...this.router.config]);
                // Navigo alla rotta richiesta
                this.router.navigateByUrl(state.url);
                }
                return menus;
            })
        );
    }
}
      `;
}
