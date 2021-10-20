export class ConfiguracaoProfissional {
    id: number;
    configuracao: string;
    valor: string;
    criadoEm: string;
    vistoEm: string;
    constructor(id: number, configuracao: string, valor: string, criadoEm: string, vistoEm: string) {
        this.id = id;
        this.configuracao = configuracao;
        this.valor = valor;
        this.criadoEm = criadoEm;
        this.vistoEm = vistoEm;
    }
}