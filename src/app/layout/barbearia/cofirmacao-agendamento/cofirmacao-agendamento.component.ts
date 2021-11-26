import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AgendamentoService } from '../agendamento-steps/agendamento.service';

@Component({
  selector: 'app-cofirmacao-agendamento',
  templateUrl: './cofirmacao-agendamento.component.html',
  styleUrls: ['./cofirmacao-agendamento.component.css']
})
export class CofirmacaoAgendamentoComponent implements OnInit {


  @Input()
  agendamentoToSave!: any;
  isSalvandoAgendamento!: boolean;

  constructor(public activeModal: NgbActiveModal,
    private service: AgendamentoService,
    private toastService: ToastrService) { }

  ngOnInit(): void {
    moment.locale('pt-BR');
    this.isSalvandoAgendamento = false;
  }

  confirmar(): void {    
    this.isSalvandoAgendamento = true;    

    const toSave = {
      data: moment(this.agendamentoToSave.data).format('YYYY-MM-DD'),
      horario: this.agendamentoToSave.horario,
      profissional: this.agendamentoToSave.profissional.id,
      servico: this.agendamentoToSave.servico.id,
      nome: this.agendamentoToSave.nome,
      telefone: this.agendamentoToSave.telefone,
      tipo: 'CLIENTE'
    }

    this.service.save(toSave).subscribe(
      () => {
        this.toastService.success("Agendando com sucesso! Aguardamos você, obrigado.");
        this.isSalvandoAgendamento = false;
        this.activeModal.close(true);
      },
      () => {
        this.toastService.error("Ocorreu um erro, tente mais tarde!");
        this.isSalvandoAgendamento = false;
        this.activeModal.close(false);
      });

  }
}
