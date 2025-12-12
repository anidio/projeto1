import readlinesync = require("readline-sync");
import { colors } from './src/util/Colors';
import { ProdutoFisico } from "./src/model/ProdutoFisico";
import { ProdutoBase } from "./src/model/ProdutoBase";
import { ProdutoController } from "./src/controller/ProdutoController";

function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto E-commerce Desenvolvido por: @Devisaias");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione Enter para continuar...");
    readlinesync.prompt();
}

export function main() {
    
    let produtos: ProdutoController = new ProdutoController();
    const produtoFisico = new ProdutoFisico(produtos.gerarId(), "Notebook Gamer", 8500.00, 1, 3.5);
    produtos.cadastrar(produtoFisico);
    const produtoDigital = new ProdutoFisico(produtos.gerarId(), "Ebook 'Aprenda POO'", 59.90, 2, 0); 
    produtos.cadastrar(produtoDigital);

    let opcao: number;
    let id: number;
    let nome: string;
    let tipo: number;
    let preco: number;
    let pesoKg: number;
    let percentual: number;

    while (true) {

        console.log(colors.bg.black, colors.fg.green, 
                    "*****************************************************");
        console.log("                                                     ");
        console.log("                @Devisaias STORE                     ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Cadastrar Produto                    ");
        console.log("            2 - Listar Todos os Produtos             ");
        console.log("            3 - Buscar Produto por ID                ");
        console.log("            4 - Atualizar Dados do Produto           ");
        console.log("            5 - Deletar Produto                      ");
        console.log("            6 - Comprar Produto (Simulação)          ");
        console.log("            7 - Aplicar Desconto (Simulação)         ");
        console.log("            8 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ", 
        colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 8) {
            console.log(colors.fg.greenstrong, 
                "\n @devisaias Store - Volte sempre!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong, "\n\nCadastrar Produto\n\n", colors.reset);

                console.log("Digite o Nome do Produto: ");
                nome = readlinesync.question("");

                console.log("Digite o Preço do Produto (R$): ");
                preco = readlinesync.questionFloat("");

                console.log("\nDigite o Tipo do Produto: ");
                tipo = readlinesync.keyInSelect(['Produto Físico', 'Produto Digital'], "", { cancel: false }) + 1;

                switch (tipo) {
                    case 1:
                        console.log("Digite o Peso do Produto em Kg: ");
                        pesoKg = readlinesync.questionFloat("");

                        produtos.cadastrar(
                            new ProdutoFisico(produtos.gerarId(), nome, preco, tipo, pesoKg)
                        );
                        break;
                    
                    case 2:
                         produtos.cadastrar(
                            new ProdutoFisico(produtos.gerarId(), nome, preco, tipo, 0)
                        );
                        break;
                }

                keyPress();
                break;

            case 2:
                console.log(colors.fg.whitestrong, 
                    "\n\nListar Todos os Produtos\n\n", colors.reset);
                produtos.listarTodos();
                keyPress()
                break;
            
            case 3:
                console.log(colors.fg.whitestrong, 
                    "\n\nBuscar Produto por ID\n\n", colors.reset);
                
                console.log("Digite o ID do Produto: ");
                id = readlinesync.questionInt("");

                produtos.buscarPorId(id);
                keyPress()
                break;

            case 4:
                console.log(colors.fg.whitestrong, 
                    "\n\nAtualizar Dados do Produto\n\n", colors.reset);
                
                console.log("Digite o ID do Produto para Atualizar: ");
                id = readlinesync.questionInt("");
                
                let produto = produtos.buscarNoArray(id);

                if (produto != null) {
                    
                    console.log("Digite o Nome do Produto (" + produto.nome + "): ");
                    nome = readlinesync.question("") || produto.nome; 

                    console.log("Digite o Preço do Produto (R$ " + produto.preco.toFixed(2) + "): ");
                    let novoPrecoInput = readlinesync.questionFloat("");
                    preco = novoPrecoInput || produto.preco;
                    
                    tipo = produto.tipo;

                    if (tipo == 1) { 
                        let produtoFisicoUpdate = produto as ProdutoFisico;
                        
                        console.log("Digite o Peso (Kg " + produtoFisicoUpdate.pesoKg.toFixed(2) + "): ");
                        let novoPesoInput = readlinesync.questionFloat("");
                        pesoKg = novoPesoInput || produtoFisicoUpdate.pesoKg;

                        produtos.atualizar(
                            new ProdutoFisico(id, nome, preco, tipo, pesoKg)
                        );
                    } else { 
                        produtos.atualizar(
                            new ProdutoFisico(id, nome, preco, tipo, 0)
                        );
                    }


                } else {
                    console.log(colors.fg.redstrong, 
                            "\nProduto ID: " + id + " não encontrado!", colors.reset);
                }

                keyPress()
                break;

            case 5:
                console.log(colors.fg.whitestrong, 
                    "\n\nDeletar Produto\n\n", colors.reset);
                
                console.log("Digite o ID do Produto para Deletar: ");
                id = readlinesync.questionInt("");

                produtos.deletar(id);

                keyPress()
                break;
            
            case 6:
                console.log(colors.fg.whitestrong, 
                    "\n\nComprar Produto (Simulação)\n\n", colors.reset);
                
                console.log("Digite o ID do Produto que deseja Comprar: ");
                id = readlinesync.questionInt("");
                
                console.log("Digite a Quantidade: ");
                let quantidade = readlinesync.questionInt("");

                produtos.comprar(id, quantidade);

                keyPress()
                break;

            case 7:
                 console.log(colors.fg.whitestrong, 
                    "\n\nAplicar Desconto (Simulação)\n\n", colors.reset);
                
                console.log("Digite o ID do Produto para Aplicar o Desconto: ");
                id = readlinesync.questionInt("");

                console.log("Digite o Percentual de Desconto (ex: 10): ");
                percentual = readlinesync.questionInt("");

                produtos.aplicarDesconto(id, percentual);

                keyPress()
                break;

            default:
                console.log(colors.fg.redstrong, 
                    "\nOpção Inválida!\n", colors.reset);
                keyPress()
                break;
        }
    }
}

main();