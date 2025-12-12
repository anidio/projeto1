import { ProdutoBase } from "../model/ProdutoBase";
import { ProdutoRepository } from "../repository/ProdutoRepository";
import { colors } from "../util/Colors";
import { ProdutoFisico } from "../model/ProdutoFisico";

export class ProdutoController implements ProdutoRepository {

    private listaProdutos: Array<ProdutoBase> = new Array<ProdutoBase>();
    private id: number = 0;

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
        let buscaProduto = this.buscarNoArray(id);

        if(buscaProduto != null) {
            buscaProduto.visualizar();
        } else {
            console.log(colors.fg.redstrong, "\nO Produto ID: " + id + " não foi encontrado!", colors.reset);
        }
    }

    cadastrar(produto: ProdutoBase): void {
        this.listaProdutos.push(produto);
        console.log(colors.fg.green, "\nO Produto ID: " + produto.id + " foi cadastrado com sucesso!", colors.reset);
    }

    atualizar(produto: ProdutoBase): void {
        let buscaProduto = this.buscarNoArray(produto.id);

        if (buscaProduto != null) {
            this.listaProdutos[this.listaProdutos.indexOf(buscaProduto)] = produto;
            console.log(colors.fg.green, "\nO Produto ID: " + produto.id + " foi atualizado com sucesso!", colors.reset);
        } else {
            console.log(colors.fg.redstrong, "\nO Produto ID: " + produto.id + " não foi encontrado!", colors.reset);
        }
    }
    
    deletar(id: number): void {
        let buscaProduto = this.buscarNoArray(id);

        if(buscaProduto != null) {
            this.listaProdutos.splice(this.listaProdutos.indexOf(buscaProduto), 1);
            console.log(colors.fg.green, "\nO Produto ID: " + id + " foi excluído com sucesso!", colors.reset);
        } else {
            console.log(colors.fg.redstrong, "\nO Produto ID: " + id + " não foi encontrado!", colors.reset);
        }
    }

    comprar(id: number, quantidade: number): void {
        let produto = this.buscarNoArray(id);

        if (produto != null) {
            let total = produto.preco * quantidade;
            console.log(colors.fg.yellowstrong, "\nCompra de " + quantidade + "x " + produto.nome + " efetuada com sucesso!", colors.reset);
            console.log(colors.fg.yellowstrong, "Valor total: R$ " + total.toFixed(2), colors.reset);
        } else {
            console.log(colors.fg.redstrong, "\nProduto ID: " + id + " não encontrado para compra.", colors.reset);
        }
    }

    aplicarDesconto(id: number, percentual: number): void {
        let produto = this.buscarNoArray(id);

        if (produto != null) {
            let novoPreco = produto.preco * (1 - percentual / 100);
            
            if (percentual > 50) {
                 console.log(colors.fg.redstrong, "\nDesconto muito alto! Limite máximo de 50%.", colors.reset);
                 return;
            }

            produto.preco = novoPreco;
            this.atualizar(produto);
            console.log(colors.fg.cyan, "\nNovo preço com desconto de " + percentual + "%: R$ " + produto.preco.toFixed(2), colors.reset);

        } else {
            console.log(colors.fg.redstrong, "\nProduto ID: " + id + " não encontrado para aplicar desconto.", colors.reset);
        }
    }

    public gerarId(): number {
        return ++ this.id;
    }

    public buscarNoArray(id: number): ProdutoBase | null {
        for(let produto of this.listaProdutos) {
            if(produto.id === id) {
                return produto;
            }
        }
        return null; 
    }
}