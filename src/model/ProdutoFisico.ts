import { ProdutoBase } from "./ProdutoBase";

export class ProdutoFisico extends ProdutoBase {

    private _pesoKg: number; 

    constructor(id: number, nome: string, preco: number, tipo: number, pesoKg: number) {
        super(id, nome, preco, tipo);
        this._pesoKg = pesoKg;
    }

    public get pesoKg(): number {
        return this._pesoKg;
    }

    public set pesoKg(pesoKg: number) {
        this._pesoKg = pesoKg;
    }

    public visualizar(): void {
        super.visualizar();
        console.log("Peso (Kg): " + this._pesoKg.toFixed(2));
    }

}