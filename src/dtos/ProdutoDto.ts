export class ProdutoDto {
    nome: string;
    marca: string;
    valor: number;
    data: number;
    corid: number | string;
    imagem: string;

    constructor(nome?:string, marca?:string, valor?:number, data?:number, cor?:number, imagem?:string) {
        this.nome = nome;
        this.marca= marca;
        this.valor= valor;
        this.data= data;
        this.corid= cor;
        this.imagem= imagem;
    }

   
}