import { ProdutoBase } from "../model/ProdutoBase";

export interface ProdutoRepository {
	listarTodos(): void;
	buscarPorId(id: number): void;
	cadastrar(produto: ProdutoBase): void;
	atualizar(produto: ProdutoBase): void;
	deletar(id: number): void;
	
	comprar(id: number, quantidade: number): void;
	aplicarDesconto(id: number, percentual: number): void;
	
}