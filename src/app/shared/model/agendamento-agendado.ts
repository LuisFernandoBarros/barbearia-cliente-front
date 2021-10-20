export class AgendamentoAgendado {
    data: string;
    horario: string;
    nomeCliente: string;
    nomeProfissonal: string;
    servico: string;
    telefone: string;
    valor: number;
    idBarbearia: string

    constructor(data: string, horario: string, nomeCliente: string, nomeProfissonal: string, servico: string, telefone: string, valor: number,
        idBarbearia: string) {
        this.data = data;
        this.horario = horario;
        this.nomeCliente = nomeCliente;
        this.nomeProfissonal = nomeProfissonal;
        this.servico = servico;
        this.telefone = telefone;
        this.valor = valor;
        this.idBarbearia = idBarbearia;
    }
}