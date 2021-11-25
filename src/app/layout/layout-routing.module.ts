import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
const routes: Routes = [
    { path: '', redirectTo: 'barbearia', pathMatch: 'prefix' },
    {
        path: 'barbearia',
        //omponent: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./barbearia/barbearia.module').then((m) => m.BarbeariaModule),
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
