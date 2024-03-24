class Clock extends HTMLElement {

    constructor() {
        super();
        this.interval = null;
    }

    connectedCallback() {
        // Shadow DOM
        //this._root = this.attachShadow({ mode: "open" });
        // oppure
        this._root = this;

        this._update();
        this._start();
    }

    disconnectedCallback() {
        // Elemento rimovuto dal DOM

        clearInterval(this.interval);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Attributi monitorati cambiati
        if (this._root) {
            this._update();
        }
    }

    get format() {
        return this._format || this.getAttribute('format') || 'localDate';
    }

    set format(value) {
        this._format = value;
    }

    get isRunning() {
        return this.interval !== null;
    }

    adoptedCallback() {
        // Elemento spostato in un nuovo padre
    }

    static get observedAttributes() {
        return ['format'];
    }

    _update() {
        const format = this.format.toLowerCase();
        let d = new Date();
        switch (format) {
            case 'localdate':
                d = d.toLocaleDateString();
                break;
            case 'localtime':
                d = d.toLocaleTimeString();
                break;
            case 'date':
                d = d.toDateString();
                break;
            case 'iso':
                d = d.toISOString();
                break;
            default:
                break;
        }

        // Creo lo stile, se necessario
        if (!this._root.querySelector("style")) {
            const style = document.createElement("style");
            style.textContent = `
            p {
                color: red;
            }`;
            this._root.appendChild(style);
        }

        // Creo il paragrafo, se necessario
        let p = this._root.querySelector("p");
        if (!p) {
            p = document.createElement("p");
            this._root.appendChild(p);
        }

        // Aggiorno il testo
        p.textContent = d;

        this.dispatchEvent(new CustomEvent('change', { detail: d }));
    }

    _start() {
        if (this.isRunning) {
            return;
        }

        this.interval = setInterval(() => this._update(), 1000);
    }

    stop() {
        if (!this.isRunning) {
            return;
        }

        clearInterval(this.interval);
        this.interval = null;
    }

    toggle() {
        if (this.isRunning) {
            this.stop();
        } else {
            this._start();
        }
    }
}

customElements.define('my-clock', Clock);