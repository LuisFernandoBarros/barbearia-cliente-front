import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgendamentoStepsComponent } from './agendamento-steps/agendamento-steps.component';
import { BarbeariaRoutingModule } from './barbearia-routing.module';



@NgModule({
  declarations: [
    AgendamentoStepsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BarbeariaRoutingModule
  ]
})
export class BarbeariaModule { }
