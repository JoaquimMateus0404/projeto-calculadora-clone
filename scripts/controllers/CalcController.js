class CalcController {
    constructor() {
        this._operation = [];
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
                //console.log(btn.className.baseVal.replace("btn-", ""));
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
            });
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });
    }
    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':

                break;
            case 'subtracao':
                break;
            case 'multiplicacao':
                break;
            case 'divisao':
                break; 
            case 'porcento':
                break;
            case 'ponto':
                break;
            case 'igual':
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                console.log(this._operation);
                this.displayCalc = this._operation;
                break;

        
            default:
                this.setError();
                break;
        }
    }
    setError() {
        this.displayCalc = "Error";
    }
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }
    addOperation(value){
        if (isNaN(this.getLastOperation())) {
           
            this._operation.push(value);
        } else {
            this._operation[this._operation.length - 1] = this.getLastOperation().toString() + value.toString();

            
        }


    }
    clearAll() {
        this._operation = [];
        this.displayCalc = "0";
    }
    clearEntry() {
        this._operation.pop();
        this.displayCalc = this._operation.join("");
    }
    addEventListenerAll(element, events, handler) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, handler, false);
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