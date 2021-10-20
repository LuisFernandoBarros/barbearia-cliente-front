import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgendamentoStepsComponent } from './agendamento-steps/agendamento-steps.component';
import { BarbeariaRoutingModule } from './barbearia-routing.module';
import { BarbeariaHeaderComponent } from './barbearia-header/barbearia-header.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AgendamentoStepsComponent,
    BarbeariaHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BarbeariaRoutingModule,
    SharedModule
  ]
})
export class BarbeariaModule { }
