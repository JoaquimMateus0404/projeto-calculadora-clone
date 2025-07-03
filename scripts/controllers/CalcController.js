class CalcController {
    constructor() {
        this.displayCalc = "0";
        this.correntDate = new Date();
    }

    get displayCalc() {
        return this._displayCalc;
    }
    set displayCalc(valor) {
        this._displayCalc = valor;
    }
    get correntDate() {
        return this._correntDate;
    }
    set correntDate(valor) {
        if (valor instanceof Date) {
            this._correntDate = valor;
        } else {
            throw new Error("Data inválida");
        }
    }
}