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
        
        this.initButtonEvents();

        setInterval(() => {

           this.setDisplayDateTime();

        }, 1000);
    }

    initButtonEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {
                console.log(btn.className.baseVal.replace("btn-", ""));
            });
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });
    }
    
    addEventListenerAll(element, events, handler) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, handler);
        });
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