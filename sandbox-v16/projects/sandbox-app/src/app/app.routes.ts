import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'luke',
        loadComponent: () => import('./pages/luke/luke.component').then((m) => m.LukeComponent),
    },
    {
        path: 'tauntaun',
        loadComponent: () => import('./pages/tauntaun/tauntaun.component').then((m) => m.TauntaunComponent),
    },
    {
        path: 'at-act',
        loadComponent: () => import('./pages/at-act/at-act.component').then((m) => m.AtActComponent),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/luke',
    }
];
