export class ProdutoNaoEncontradoError extends Error {		
constructor(id: number) {		
super("O Produto ID: " + id + " não foi encontrado!");		
this.name = "ProdutoNaoEncontradoError";		
}		
}