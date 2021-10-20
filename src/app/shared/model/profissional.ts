import { ConfiguracaoProfissional } from "../model/configuracao-profissional";
import { Expediente } from "../model/expediente";
import { Servico } from "../model/servico";

export class Profissional {
    id: number;
    nome: string;
    email: string;
    isDono: boolean;    
    senha: string;
    telefone: string;
    expedientes: Array<Expediente>;
    servicos: Array<Servico>;
    configuracoesProfissional: Array<ConfiguracaoProfissional>;
    constructor(id: number, nome: string, email: string, isDono: boolean, senha: string, telefone: string, expedientes: Array<Expediente>,
        servicos: Array<Servico>, configuracoesProfissional: Array<ConfiguracaoProfissional>) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.isDono = isDono;
        this.senha = senha;
        this.telefone = telefone;
        this.expedientes = expedientes;
        this.servicos = servicos;
        this.configuracoesProfissional = configuracoesProfissional;
    }
}