import ReactDOM from 'react-dom/client';
import React, { ReactNode } from 'react';
import Countdown, { CountdownProps } from './countdown';

export class CountdownElement extends HTMLElement {
    public static observedAttributes = ['start-seconds', 'runnning'];

    private _root: ReactDOM.Root;
    private _startSeconds?: number;
    private _running?: boolean;
    private _onChange?: (ev: Event) => void;

    constructor() {
        super();
        this._root = ReactDOM.createRoot(this);
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        // Ad ogni campo dell'attributo effettuo un nuovo render
        this._render();
    }

    connectedCallback() {
        this._render();
    }

    get running() {
        return typeof this._running !== 'undefined' ? this._running : this.getAttribute('running') === 'true';
    }
    set running(value: boolean) {
        this._running = value;
    }

    get startSeconds(): number {
        return this._startSeconds || parseInt(this.getAttribute('start-seconds') || '10');
    }
    set startSeconds(value: number | undefined) {
        this._startSeconds = value;
    }

    get onChange(): ((ev: Event) => void) | undefined {
        return this._onChange;
    }
    set onChange(value: (ev: Event) => void) {
        if (value) {
            this.addEventListener('change', value);
        } else if (this._onChange) {
            this.removeEventListener('change', this._onChange);
        }
        this._onChange = value;
    }

    toggle() {
        this._running = !this._running;
        this._render();
    }

    private _render() {
        // Preparo le props
        const propsValues: CountdownProps = {
            startSeconds: this.startSeconds,
            running: this.running,
            onChange: (seconds) => {
                this.dispatchEvent(new CustomEvent('change', {
                    detail: {
                        seconds
                    }
                }));
            }
        };

        // Renderizzo il componente
        const element = React.createElement(Countdown, propsValues);
        this._root.render(element);
    }
};
customElements.define('rc-countdown', CountdownElement);