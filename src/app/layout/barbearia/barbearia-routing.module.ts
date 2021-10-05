import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoStepsComponent } from './agendamento-steps/agendamento-steps.component';

const routes: Routes = [
    {
        path: 'agendar',
        component: AgendamentoStepsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BarbeariaRoutingModule { }
