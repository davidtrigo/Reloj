import { } from './calendarbutton.js'
import { } from './currentmonth.js'
import { } from './daysofweek.js'
import { } from './events/events.js'
import { } from './calendarpage.js'
import { flexcolumn } from './css/flexcolumn.js'
import { padding } from './css/padding.js'
import { button } from './css/button.js'

import { CONFIG } from './config.js';
import { CULTURE } from './culture.js'

const css = new CSSStyleSheet();
css.replaceSync(`
    :host{
        border-bottom: 0.063rem solid;
    }
   
    .container{
        display:grid;
        grid-template-columns: repeat(7,2.5rem);
        grid-template-rows:2.5rem;
        gap: 0.375rem;
        align-items: center;
    }
    bcn-currentmonth{
        grid-column-start: 1;
        grid-column-end:6;
    } 
`);
class CalendarBody extends HTMLElement {
    constructor() {
        super();


        let shadow = this.attachShadow({ mode: 'open' });
        shadow.adoptedStyleSheets = [flexcolumn, css, padding, button];
        this.components().forEach(element => {
            shadow.appendChild(element);
        });
    }
    components() {
        return [this.createContainer,
            'bcn-dayofweek',
            'bcn-month',
        ].map(c => {
            if (typeof c === 'function') {
                return c.bind(this)();
            } else {
                return document.createElement(c);
            }
        }).flat();
    }
    createContainer() {
        let div = document.createElement('div');
        [
            document.createElement('bcn-currentmonth'),
            this.createCalendarButtons()
        ].flat().forEach(element => {
            div.appendChild(element);
            div.classList.add('container')
        })
        return div;
    }
    createCalendarButtons() {
        return [
            this.createButton('previous'),
            this.createButton('next')
        ]
    }
    createButton(attr) {
        let button = document.createElement('button', { is: 'bcn-calendarbutton' });
        button.setAttribute(attr, '');
        if (CULTURE[CONFIG.culture][attr] === undefined) {
            button.setAttribute('alt', attr);
        }
        else {
            button.setAttribute('alt', CULTURE[CONFIG.culture][attr]);
        }
        let i = document.createElement('i');
        i.classList.add(attr);
        button.appendChild(i);
        return button;
    }
}

customElements.define('bcn-calendar-body', CalendarBody);


