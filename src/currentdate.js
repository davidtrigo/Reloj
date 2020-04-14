import {CHANELS} from './chanels.js';
import {FormatDate} from './formatdate.js';
import {CurrentTextElement} from './currenttextelement.js'
import {CurrentText} from './currenttext.js'

import pubsub from './pubsub.js'
const css = new CSSStyleSheet();
css.replaceSync(`
    :host{
      color: white;
    }
`);

class CurrentDate extends CurrentText{
    constructor(){
        super();
        this.init(FormatDate.getCurrentDate(new Date()));
        this.shadow.adoptedStyleSheets=[css];
        pubsub.sub(CHANELS.CHANGEDAY, this.update.bind(this));
        pubsub.sub(CHANELS.CHANGEMONTH, this.update.bind(this));
    }
    update(date){
        super.update(FormatDate.getCurrentDate(date));
    }
}

customElements.define('bcn-currentdate',CurrentDate);

/* class CurrentDate extends CurrentTextElement{
    constructor(){
        super(CHANELS.CHANGEDAY,FormatDate.getCurrentDate);
        this.shadow.adoptedStyleSheets=[css];
    }
}

customElements.define('bcn-currentdate',CurrentDate); */