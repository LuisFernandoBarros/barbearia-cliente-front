export class Servico {
    id: number;
    descricao: string;
    tempo: number;
    valor: number;
    
    constructor(id: number, descricao: string, tempo: number, valor: number){
        this.id = id;
        this.descricao = descricao;
        this.tempo = tempo;
        this.valor = valor;        
    }
}