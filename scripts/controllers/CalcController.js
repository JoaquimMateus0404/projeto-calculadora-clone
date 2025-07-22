class CalcController {
    constructor() {
        this._operation = [];
        this._lastOperator = '';
        this._lastNumber = '';
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

    // Inicializa os eventos dos botões
    // e adiciona ouvintes de eventos para os botões
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

    // Executa a ação do botão pressionado
    // dependendo do valor do botão
    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'divisao':
                this.addOperation('/');
                break; 
            case 'porcento':
                this.addOperation('%');
                break;
            case 'ponto':
                this.addDot('.');
                break;
            case 'igual':
                this.calc();
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
                this.setLastNumeberToDisplay();
                break;

        
            default:
                this.setError();
                break;
        }
    }

    // Retorna o último item do array de operações
    // se isOperator for true, retorna o último operador
    getLastItem(isOperator = true) {
        // Retorna o último item do array de operações
        // se isOperator for true, retorna o último operador
        // caso contrário, retorna o último número
        let lastItem;
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }
        if (!lastItem && isOperator) {
            lastItem = this._lastOperator; // Se não encontrar um operador, retorna o último operador
        } else if (!lastItem && !isOperator) {
            lastItem = this._lastNumber; // Se não encontrar um número, retorna o último número
        }
        return lastItem;
    }

    // Define o último número a ser exibido no display
    // Percorre o array de operações de trás para frente
    setLastNumeberToDisplay() {
        let lastNumber = this.getLastItem(false); 
        this.displayCalc = lastNumber ? lastNumber : "0";
    }
    // Define o valor de erro no display
    setError() {
        this.displayCalc = "Error";
    }

    // Retorna o último valor da operação
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    // Define o último valor da operação
    // substituindo o último operador do array de operações
    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    // Verifica se o valor é um operador
    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    // Adiciona uma operação ao array de operações
    // e executa o cálculo se o array de operações tiver 3 elementos
    pushOperation(value) {
       
        this._operation.push(value);
        
        if (this._operation.length > 3) {            
            this.calc();        
        }
    }

    // Retorna o resultado da expressão matemática do array de operações
    getResult() {
        return eval(this._operation.join(" ")); 
    }

    // Avalia a expressão matemática do array de operações
    // e substitui o array de operações pelo resultado e o último operador
    calc(){

        let last = '';
        this._lastOperator = this.getLastItem(); // Último operador

        if (this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber]; // Se tiver menos de 3 itens, adiciona o primeiro item, o último operador e o último número
        }

        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult(); // Último resultado  
        } else if (this._operation.length == 3) this._lastNumber = this.getLastItem(false); // Último número


        let result = this.getResult();
        
        if (last == "%") {
            result = result / 100;
            this._operation = [result];          
        } else {
            this._operation = [result];
            if (last) {
                this._operation.push(last);
            }
        }
        this.setLastNumeberToDisplay();
    }

    // Adiciona uma operação ao array de operações  this._operation[this._operation.length - 1]
    addOperation(value) {
        if (isNaN(this.getLastOperation())) { 
            // Última operação é um operador
            if (this.isOperator(value)) {
                // Substitui o operador anterior
                this.setLastOperation(value);
            } else if (!isNaN(value)) {
                // Adiciona um número após um operador
                this.pushOperation(parseInt(value));
                this.setLastNumeberToDisplay();
            } 
        } else {
            // Última operação é um número
            if (this.isOperator(value)) {
                // Adiciona o operador como uma nova posição
                this.pushOperation(value);
            }else {
                // Concatena o número ao último número
                let newValue = parseInt(this.getLastOperation().toString() + value.toString());
                this.setLastOperation(newValue);

                this.setLastNumeberToDisplay();
            }
        }
    }

    addDot(value) {
        // Verifica se o último número já contém um ponto
        let lastOperation = this.getLastOperation();
        if (typeof lastOperation === 'string' && lastOperation.includes('.')) return;

        // Se o último número não for um operador, adiciona o ponto
        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + value.toString());
        }
        
        this.setLastNumeberToDisplay();
    }

    // Limpa todas as operações
    // e redefine o display para "0"
    clearAll() {
        this._lastNumber = '';
        this._lastOperator = '';
        this._operation = [];
        this.setLastNumeberToDisplay();
    }

    // Limpa a última entrada da operação
    // e redefine o display para o último valor da operação
    clearEntry() {
        this._lastNumber = '';
        this._lastOperator = '';
        this._operation.pop();
        this.setLastNumeberToDisplay();
    }

    // Adiciona um ouvinte de eventos a um elemento
    // e executa o manipulador de eventos para os eventos especificados
    addEventListenerAll(element, events, handler) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, handler, false);
        });
    }

    // Define o formato de data e hora para o display
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