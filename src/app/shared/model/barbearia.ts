import { Profissional } from "../model/profissional";

export class Barbearia {
    id: number;
    nome: string;
    rua: string;
    numero: string;
    complemento: string;
    cidade: string;
    bairro: string;
    cep: string;
    estado: string;
    telefone: string;
    profissionais: Array<Profissional>;
    linkAgendamento: string;
    site: string;

    constructor(id: number, nome: string, rua: string, numero: string, complemento: string, cidade: string,
        bairro: string, cep: string, estado: string, telefone: string, profissionais: Array<Profissional>,
        linkAgendamento: string, site: string) {
        this.id = id;
        this.nome = nome;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.bairro = bairro;
        this.cep = cep;
        this.estado = estado;
        this.telefone = telefone;
        this.profissionais = profissionais;
        this.linkAgendamento = linkAgendamento;
        this.site = site;
    }
}
