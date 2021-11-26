import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoStepsComponent } from './agendamento-steps/agendamento-steps.component';

const routes: Routes = [
    {
        path: ':id/agendar',
        component: AgendamentoStepsComponent,
    },
    { path: '', redirectTo: 'not-found' },
    { path: 'not-found', loadChildren: () => import('../../not-found/not-found.module').then((m) => m.NotFoundModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BarbeariaRoutingModule { }
