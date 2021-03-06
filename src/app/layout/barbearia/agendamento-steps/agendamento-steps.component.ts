import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Servico } from '../../../shared/model/servico';
import { Barbearia } from '../../../shared/model/barbearia';
import { BarbeariaService } from '../barbearia.service';
import { AgendamentoService } from './agendamento.service';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'ngx-animating-datepicker';
import * as moment from 'moment';
import { ExtractMessageService } from '../../../shared/service/extract-message.service';
import { MSG_PADRAO } from '../../../shared/service/msg-padrao.enum';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CofirmacaoAgendamentoComponent } from '../cofirmacao-agendamento/cofirmacao-agendamento.component';


@Component({
  selector: 'app-agendamento-steps',
  templateUrl: './agendamento-steps.component.html',
  styleUrls: ['./agendamento-steps.component.css']
})
export class AgendamentoStepsComponent implements OnInit {

  identificacao!: FormGroup;
  step = 1;
  barbearia!: Barbearia
  servicos!: Array<Servico>;
  dates!: any;
  horarioSelected!: string | null;
  isServicoEnable = false;
  isSalvandoAgendamento = false;
  isAgendado = false;
  loadingServicos!: boolean;
  isLoading!: boolean
  profissionalSelected!: any;
  servicoSelected!: any;
  horarios!: Array<string>;
  erro!: string | null;
  icon = faCheckCircle

  // https://github.com/koenz/angular-datepicker
  datepickerOptions: Options = {
    selectMultiple: false, // Select multiple dates
    closeOnSelect: false, // Close datepicker when date(s) selected
    animationSpeed: 400, // Animation speed in ms
    easing: 'ease-in', // Easing type string
    hideRestDays: false, // Hide the rest days
    disableRestDays: true, // Disable the click on rest days
    hideNavigation: false, // Hide the navigation
    range: false, // Use range functionality
    currentDate: new Date(), // Tne current displayed date (month, year)
    timeoutBeforeClosing: 5000, // The timeout / delay before closing
    weekdayFormat: 'short', // "narrow", "short", "long"
    weekStart: 'monday', // Set the week start day,
  };

  constructor(private formBuilder: FormBuilder,
    private activedRoute: ActivatedRoute,
    private barbeariaService: BarbeariaService,
    private service: AgendamentoService,
    private toastService: ToastrService,
    private extractMsgService: ExtractMessageService,
    private modalService: NgbModal) { }

  ngOnInit() {
    moment.locale('pt-BR');
    this.horarios = [];
    this.loadingServicos = false;

    this.activedRoute.params.subscribe(
      (param: any) => { this.getProfissionais(param['id']) }
    )

    this.identificacao = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  openResumo() {
    const toSave = {
      data: this.dates[0],
      servico: this.servicoSelected,
      profissional: this.profissionalSelected,
      horario: this.horarioSelected,
      nome: this.identificacao.value["nome"],
      telefone: this.identificacao.value["telefone"],
      tipo: 'CLIENTE'
    }
    const modalRef = this.modalService.open(CofirmacaoAgendamentoComponent);
    modalRef.componentInstance.agendamentoToSave = toSave;
    modalRef.result.then((result) => {
      if (result) {
        this.isAgendado = true;
        this.dates = null;
        this.horarioSelected = null;
        this.horarios = [];                
        window.scroll(0, 0);        
      }
    });
  }

  get isValidHorario() {
    return this.dates != undefined &&
      this.dates[0] != null &&
      this.horarioSelected != null &&
      this.horarioSelected != undefined;
  }

  getProfissionais(barbeariaId: string) {
    this.isLoading = true;
    this.barbeariaService.get(barbeariaId).subscribe(
      (resp) => {
        this.isLoading = false;
        this.barbearia = resp;
        this.erro = null;
      },
      (err) => {
        this.isLoading = false;
        const message = this.extractMsgService.extractMessageFromError(err, MSG_PADRAO.ERROR_SERVER);
        this.erro = message;
        this.toastService.error(message);
      }
    );
  }

  onChangeProfissional(profisional: any): void {
    this.servicoSelected = null;
    this.profissionalSelected = profisional;
    this.service.getServicos(profisional.id).subscribe(
      (resp) => {
        this.servicos = resp;
        this.isServicoEnable = true;
      },
      (err) => {
        this.toastService.error(this.extractMsgService.extractMessageFromError(err, MSG_PADRAO.ERROR_SERVER))
      }
    )
  }

  onChangeServico(servico: any): void {
    this.servicoSelected = servico;
  }

  onChangeData() {
    this.loadingServicos = true;
    this.horarioSelected = null;
    this.horarios = [];
    let data = moment(this.dates[0]).format('YYYY-MM-DD');
    this.service.getHorarios(this.profissionalSelected.id, data, this.servicoSelected.id).subscribe(
      (resp) => {
        if (resp.length == 0) {
          this.toastService.error("Sem hor??rios dispon??ves. Selecione outra data.");
        } else {
          this.horarios = resp;
        }
        this.loadingServicos = false;
      },
      (err) => {
        this.loadingServicos = false;
        this.toastService.error(this.extractMsgService.extractMessageFromError(err, MSG_PADRAO.ERROR_SERVER))
      }
    )
  }

  onChangeHorario(horarioSelected: string) {
    this.horarioSelected = horarioSelected;
  }

  next() {
    this.step++;
  }
  previous() {
    this.dates = undefined;
    this.horarioSelected = "";
    this.horarios = [];
    this.step--;
  }

  onAgendarNovamente() {
    this.isAgendado = false;
    this.step = 1;
  }
}
