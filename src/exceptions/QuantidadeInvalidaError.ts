export class QuantidadeInvalidaError extends Error {
    constructor(quantidade: number) {
        super("A quantidade informada (" + quantidade + ") é inválida para esta operação.");
        this.name = "QuantidadeInvalidaError";
    }
}