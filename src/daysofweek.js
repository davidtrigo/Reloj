import { CONFIG } from './config.js';
import { CULTURE } from './culture.js'
const css = new CSSStyleSheet();
css.replaceSync(`
    :host{
        display:grid;
        grid-template-columns: repeat(7,2.5rem);
        gap: 0.375rem;
        height:2.5rem;
    }
    div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`);
class DayOfWeek extends HTMLElement {
    constructor() {
        super();
        this.create(CULTURE[CONFIG.culture].daysOfWeek);
    }
    create(days) {
        let shadow = this.attachShadow({ mode: 'open' });
        shadow.adoptedStyleSheets=[css];
        days.forEach(d => {
            let div = document.createElement('div');
            div.appendChild(document.createTextNode(d))
            shadow.appendChild(div);
        })
    }
}
customElements.define('bcn-dayofweek', DayOfWeek)