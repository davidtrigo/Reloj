import {} from './currenttimer.js';
import {} from './currentdate.js';
import {flexcolumn} from './css/flexcolumn.js'
import { padding } from './css/padding.js';
const css = new CSSStyleSheet();
css.replaceSync(`
    :host{
        border-bottom: 0.063rem solid;
    }
`);
class CalendarHeader extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({ mode: 'open' });
        shadow.adoptedStyleSheets=[flexcolumn,css,padding];
        shadow.appendChild(this.createTimer());
        shadow.appendChild(this.createCurrentDate());
    }

    createTimer() {
        return document.createElement('bcn-timer');

    }

    createCurrentDate() {
        return document.createElement('bcn-currentdate');

    }
}

customElements.define('bcn-calendar-header', CalendarHeader);




