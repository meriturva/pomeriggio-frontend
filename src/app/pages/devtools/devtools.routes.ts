import { Routes } from '@angular/router';
import { DebuggerPage } from './components/debugger';
import { DevicesPage } from './components/devices';
import { NetworkPage } from './components/network';
import { ConsolePage } from './components/console';

export default [
    { path: 'console', component: ConsolePage },
    { path: 'debugger', component: DebuggerPage },
    { path: 'devices', component: DevicesPage },
    { path: 'network', component: NetworkPage },
] as Routes;
