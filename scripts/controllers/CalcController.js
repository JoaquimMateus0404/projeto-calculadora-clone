class CalcController {
    constructor() {
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._correntDate;
        this.initialize();
    }

    initialize() {

        this.setDisplayDateTime();

        setInterval(() => {

           this.setDisplayDateTime();
           
        }, 1000);
    }

    setDisplayDateTime() {
        this.displayTime = this.correntDate.toLocaleTimeString(this._locale, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        this.displayDate = this.correntDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }


    get displayTime() {
        return this._timeEl.innerHTML;
    }
    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }
    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }


    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }


    get correntDate() {
        return new Date();
    }
    set correntDate(value) {
        if (value instanceof Date) {
            this._correntDate = value;
        } else {
            throw new Error("Data inválida");
        }
    }
}