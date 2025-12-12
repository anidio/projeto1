export abstract class ProdutoBase {
    
    private _id: number;
    private _nome: string;
    private _preco: number;
    private _tipo: number; 

constructor(id: number, nome: string, preco: number, tipo: number) {
    this._id = id;
    this._nome = nome;
    this._preco = preco;
    this._tipo = tipo;
}

public get id(): number {
    return this._id;
}

public set id(id: number) {
    this._id = id;
}

public get nome(): string {
    return this._nome;
}

public set nome(nome: string) {
    this._nome = nome;
}

public get preco(): number {
    return this._preco;
}

public set preco(preco: number) {
    this._preco = preco;
}

public get tipo(): number {
    return this._tipo;
}

public set tipo(tipo: number) {
    this._tipo = tipo;
}

public visualizar(): void {
    let tipo: string = "";

    switch (this._tipo) {
        case 1:
            tipo = "Produto Físico";
            break;
        case 2:
            tipo = "Produto Digital";
            break;
    }

    console.log("\n\n*****************************************************");
    console.log("Dados do Produto:");
    console.log("*****************************************************");
    console.log("ID do Produto: " + this._id);
    console.log("Nome: " + this._nome);
    console.log("Tipo: " + tipo);
    console.log("Preço: R$ " + this._preco.toFixed(2));
}
}