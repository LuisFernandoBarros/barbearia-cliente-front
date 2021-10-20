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


@Component({
  selector: 'app-agendamento-steps',
  templateUrl: './agendamento-steps.component.html',
  styleUrls: ['./agendamento-steps.component.css']
})
export class AgendamentoStepsComponent implements OnInit {

  identificacao!: FormGroup;
  servico!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;
  barbearia!: Barbearia
  servicos!: Array<Servico>;
  //dates!: Date;
  dates: {[index: number]:any} = {}
  horarioSelected!: string
  horarioWtihClasses: Array<any> = [];
  isServicoEnable = false;
  isSalvandoAgendamento = false;
  isAgendado = false;

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
    private extractMsgService: ExtractMessageService) { }

  ngOnInit() {
    moment.locale('pt-BR');

    this.activedRoute.params.subscribe(
      (param: any) => { this.getProfissionais(param['id']) }
    )

    this.identificacao = this.formBuilder.group({
      nome: ['', Validators.required],      
      telefone: ['', Validators.required]
    });
    this.servico = this.formBuilder.group({
      profissonal: ['', [Validators.required]],
      servico: ['', [Validators.required]],
    });
  }

  get isValidHorario() {
    return this.dates != undefined &&
      this.dates[0] != null &&
      this.horarioSelected != null &&
      this.horarioSelected != undefined;
  }

  getProfissionais(barbeariaId: string) {
    this.barbeariaService.get(barbeariaId).subscribe(
      (resp) => {
        this.barbearia = resp;
      }
    );
  }

  onChangeProfissional(): void {
    let profissionalSelected = this.servico.value["profissonal"];
    this.service.getServicos(profissionalSelected).subscribe(
      (resp) => {
        this.servicos = resp;
        this.isServicoEnable = true;
      }
    )
  }

  onChangeData() {
    this.horarioWtihClasses = [];
    let data = moment(this.dates[0]).format('YYYY-MM-DD');
    let idProfissional = this.servico.value['profissonal'];
    let idServico = this.servico.value['servico'];
    this.service.getHorarios(idProfissional, data, idServico).subscribe(
      (resp) => {
        if (resp.length == 0) {
          this.toastService.error("Sem horários disponíves. Selecione outra data.");
        } else {
          resp.forEach(horario => {
            this.horarioWtihClasses.push({ horario: horario, classe: "" })
          });
        }
      },
      (err) => {
        this.toastService.error(this.extractMsgService.extractMessageFromError(err, MSG_PADRAO.ERROR_SERVER))
      }
    )
  }


  onChangeHorario(horarioSelected: string) {
    this.horarioSelected = horarioSelected;
    this.horarioWtihClasses.forEach(it => {
      if (it.horario != horarioSelected) {
        it.classe = "horario-disabled"
      } else {
        it.classe = "";
      }
    });
  }

  next() {
    this.step++;
  }
  previous() {
    //this.dates = undefined;
    //this.horarioSelected = undefined;
    this.horarioWtihClasses = [];
    this.step--;
  }

  onAgendarNovamente(){
    this.isAgendado = false;
    this.step = 1;    
  }

  submit() {
    this.isSalvandoAgendamento = true;

    const toSave = {
      data: moment(this.dates[0]).format('YYYY-MM-DD'),
      horario: this.horarioSelected,
      profissional: this.servico.value["profissonal"],
      servico: this.servico.value["servico"],
      nome: this.identificacao.value["nome"],
      telefone: this.identificacao.value["telefone"],
      tipo: 'CLIENTE'
    }

    this.service.save(toSave).subscribe(
      (resp) => {
        this.toastService.success("Agendando com sucesso! Aguardamos você, obrigado.");        
        //this.dates = undefined;
        //this.horarioSelected = undefined;
        this.horarioWtihClasses = [];
        this.isAgendado = true;
        this.isSalvandoAgendamento = false;
        window.scroll(0,0);
      },
      (err) => {
        this.toastService.error("Ocorreu um erro, tente mais tarde!");
        this.isSalvandoAgendamento = false;
      });
  }
}
