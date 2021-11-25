import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgendamentoStepsComponent } from './agendamento-steps/agendamento-steps.component';
import { BarbeariaRoutingModule } from './barbearia-routing.module';
import { BarbeariaHeaderComponent } from './barbearia-header/barbearia-header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { AaDatepickerModule } from 'ngx-animating-datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CofirmacaoAgendamentoComponent } from './cofirmacao-agendamento/cofirmacao-agendamento.component';

@NgModule({
  declarations: [
    AgendamentoStepsComponent,
    BarbeariaHeaderComponent,
    CofirmacaoAgendamentoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BarbeariaRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    SharedPipesModule,    
    AaDatepickerModule,
    FontAwesomeModule
  ]
})
export class BarbeariaModule { }
