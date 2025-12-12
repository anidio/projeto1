import readlinesync = require("readline-sync");
import { colors } from './src/util/Colors'; 

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
    let opcao: number;
    let produtos = ["Notebook Gamer", "Mouse Sem Fio", "Teclado Mecânico", "Monitor UltraWide"];

    while (true) {

        console.log(colors.bg.black, colors.fg.green, 
                    "*****************************************************");
        console.log("                                                     ");
        console.log("                @Devisaias STORE                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Listar Produtos                      ");
        console.log("            2 - Buscar Produto por Nome              ");
        console.log("            3 - Adicionar Produto ao Carrinho        ");
        console.log("            4 - Finalizar Compra                     ");
        console.log("            5 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ", 
        colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao === 5) {
            console.log(colors.fg.greenstrong, 
                "\n @devisaias Store - Volte sempre!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong, "\n\nListar Produtos\n\n", colors.reset);
                
                if (produtos.length === 0) {
                    console.log("Nenhum produto cadastrado.");
                } else {
                    console.log("Produtos disponíveis:");
                    for (let i = 0; i < produtos.length; i++) {
                        console.log(`[${i + 1}] - ${produtos[i]}`);
                    }
                }
                keyPress();
                break;
            
            case 2:
                console.log(colors.fg.whitestrong, "\n\nBuscar Produto por Nome\n\n", colors.reset);
                
                let nomeBusca = readlinesync.question("Digite o nome do produto para buscar: ");
                let encontrado = false;

                for (let i = 0; i < produtos.length; i++) {
                    if (produtos[i].toLowerCase().includes(nomeBusca.toLowerCase())) {
                        console.log(colors.fg.cyanstrong, `\nProduto Encontrado: ${produtos[i]}`, colors.reset);
                        encontrado = true;
                        break; 
                    }
                }

                if (!encontrado) { 
                    console.log(colors.fg.redstrong, `\nProduto '${nomeBusca}' não encontrado.`, colors.reset);
                }

                keyPress();
                break;
            
            case 3:
                console.log(colors.fg.whitestrong, "\n\nAdicionar Produto ao Carrinho\n\n", colors.reset);
                
                let nomeProduto = readlinesync.question("Digite o nome do produto a adicionar: ");
                let quantidade = readlinesync.questionInt("Digite a quantidade: ");

                if (quantidade > 0) {
                    for (let i = 0; i < quantidade; i++) {
                    }
                    console.log(colors.fg.greenstrong, `\n${quantidade}x ${nomeProduto} adicionado(s) ao carrinho (simulação).`, colors.reset);
                } else {
                     console.log(colors.fg.redstrong, "\nQuantidade inválida. Operação cancelada.", colors.reset);
                }
                
                keyPress();
                break;
            
            case 4:
                console.log(colors.fg.whitestrong, "\n\nFinalizar Compra\n\n", colors.reset);
                console.log(colors.fg.yellowstrong, "Sua compra foi finalizada com sucesso!", colors.reset);
                keyPress();
                break;
            
            default:
                console.log(colors.fg.redstrong, "\nOpção Inválida!\n", colors.reset);
                keyPress();
                break;
        }
    }
}

main();