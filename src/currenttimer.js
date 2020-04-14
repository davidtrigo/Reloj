import {CHANELS} from './chanels.js';
import {FormatDate} from './formatdate.js';
import {CurrentTextElement} from './currenttextelement.js'

const css = new CSSStyleSheet();
css.replaceSync(`
    :host{
      font-size:3rem;

      font-weight: lighter;
    }
`);
class CurrentTimer extends CurrentTextElement{
    constructor(){
        super(CHANELS.CHANGETIMER,FormatDate.getTimer);
        this.shadow.adoptedStyleSheets=[css];
    }
    
}
customElements.define('bcn-timer',CurrentTimer);

