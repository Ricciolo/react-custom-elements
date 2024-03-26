import ReactDOM from 'react-dom/client';
import React, { ReactNode } from 'react';
import Countdown, { CountdownProps } from './countdown';

export class CountdownElement extends HTMLElement {
    public static observedAttributes = ['startseconds', 'run'];

    private _root: ReactDOM.Root;
    private _childrenReplaced = false;
    private _children: ReactNode[] = [];
    private _startSeconds?: number;
    private _run = false;

    constructor() {
        super();
        this._root = ReactDOM.createRoot(this);
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        // Ad ogni campo dell'attributo effettuo un nuovo render
        this._render();
    }

    connectedCallback() {

        var observer = new MutationObserver(s => {
            // Ho sostiuito quindi sono i children originali
            if (!this._childrenReplaced && s.length > 0 && s[0].removedNodes.length > 0) {
                s[0].removedNodes.forEach(n => {
                    this._children.push(n as any);
                });
                this._childrenReplaced = true;
                this._render();
            }
        });

        observer.observe(this, {
            childList: true
        });

        this._render();
    }

    get run() {
        return this._run || this.getAttribute('run') === 'true';
    }
    set run(value: boolean) {
        this._run = value;
    }

    get startSeconds(): number {
        return this._startSeconds || parseInt(this.getAttribute('startSeconds') || '10');
    }
    set startSeconds(value: number | undefined) {
        this._startSeconds = value;
    }

    toggle() {
        this._run = !this._run;
        this._render();
    }

    private _render() {
        // Preparo le props
        const propsValues: CountdownProps = {
            startSeconds: this.startSeconds,
            run: this.run,
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