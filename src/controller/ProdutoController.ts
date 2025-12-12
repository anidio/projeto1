import { ProdutoBase } from "../model/ProdutoBase";
import { ProdutoRepository } from "../repository/ProdutoRepository";
import { colors } from "../util/Colors";
import { ProdutoFisico } from "../model/ProdutoFisico";
import { ProdutoNaoEncontradoError } from "../exceptions/ProdutoNaoEncontradoError";
import { QuantidadeInvalidaError } from "../exceptions/QuantidadeInvalidaError";

export class ProdutoController implements ProdutoRepository {

    private listaProdutos: Array<ProdutoBase> = new Array<ProdutoBase>();
    private id: number = 0;

    public buscarNoArray(id: number): ProdutoBase {
        for(let produto of this.listaProdutos) {
            if(produto.id === id) {
                return produto;
            }
        }
        throw new ProdutoNaoEncontradoError(id);
    }
    
    listarTodos(): void {
        if(this.listaProdutos.length === 0){
            console.log(colors.fg.redstrong, "\nNão há produtos cadastrados!", colors.reset);
            return;
        }

        for(let produto of this.listaProdutos) {
            produto.visualizar();
        } 
    }

    buscarPorId(id: number): void {
        try {
            let buscaProduto = this.buscarNoArray(id);
            buscaProduto.visualizar();
        } catch (error: any) {
             console.log(colors.fg.redstrong, "\nErro na busca: " + error.message, colors.reset);
        }
    }

    cadastrar(produto: ProdutoBase): void {
        this.listaProdutos.push(produto);
        console.log(colors.fg.green, "\nO Produto ID: " + produto.id + " foi cadastrado com sucesso!", colors.reset);
    }

    atualizar(produto: ProdutoBase): void {
        try {
            let buscaProduto = this.buscarNoArray(produto.id);
            this.listaProdutos[this.listaProdutos.indexOf(buscaProduto)] = produto;
            console.log(colors.fg.green, "\nO Produto ID: " + produto.id + " foi atualizado com sucesso!", colors.reset);
        } catch (error: any) {
             console.log(colors.fg.redstrong, "\nErro na atualização: " + error.message, colors.reset);
        }
    }
    
    deletar(id: number): void {
        try {
            let buscaProduto = this.buscarNoArray(id);
            this.listaProdutos.splice(this.listaProdutos.indexOf(buscaProduto), 1);
            console.log(colors.fg.green, "\nO Produto ID: " + id + " foi excluído com sucesso!", colors.reset);
        } catch (error: any) {
             console.log(colors.fg.redstrong, "\nErro ao deletar: " + error.message, colors.reset);
        }
    }

    comprar(id: number, quantidade: number): void {
        try {
            if (quantidade <= 0) {
                throw new QuantidadeInvalidaError(quantidade);
            }
            
            let produto = this.buscarNoArray(id);

            let total = produto.preco * quantidade;
            console.log(colors.fg.yellowstrong, "\nCompra de " + quantidade + "x " + produto.nome + " efetuada com sucesso!", colors.reset);
            console.log(colors.fg.yellowstrong, "Valor total: R$ " + total.toFixed(2), colors.reset);

        } catch (error: any) {
            console.log(colors.fg.redstrong, "\nErro na compra: " + error.message, colors.reset);
        }
    }

    aplicarDesconto(id: number, percentual: number): void {
        try {
            let produto = this.buscarNoArray(id);

            let novoPreco = produto.preco * (1 - percentual / 100);
            
            if (percentual > 50) {
                 console.log(colors.fg.redstrong, "\nDesconto muito alto! Limite máximo de 50%.", colors.reset);
                 return;
            }

            produto.preco = novoPreco;
            this.atualizar(produto); 
            console.log(colors.fg.cyan, "\nNovo preço com desconto de " + percentual + "%: R$ " + produto.preco.toFixed(2), colors.reset);

        } catch (error: any) {
            console.log(colors.fg.redstrong, "\nErro ao aplicar desconto: " + error.message, colors.reset);
        }
    }

    public gerarId(): number {
        return ++ this.id;
    }
}