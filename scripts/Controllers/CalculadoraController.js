class CalculadoraController {
    constructor() {
        this.displayCalc = "0";
        this.dataAtual = new Date();
    }

    get displayCalc() {
        return this._displayCalc;
    }
    set displayCalc(valor) {
        this._displayCalc = valor;
    }
    get dataAtual() {
        return this._dataAtual;
    }
    set dataAtual(valor) {
        if (valor instanceof Date) {
            this._dataAtual = valor;
        } else {
            throw new Error("Data inválida");
        }
    }
}