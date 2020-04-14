import { CHANELS } from './chanels.js';
import { FormatDate } from './formatdate.js';
import { CurrentTextElement } from './currenttextelement.js'
import { DateService } from './dateservice.js'
import { MixinPubSub } from './mixins.js'

import { CurrentText } from './currenttext.js'
import pubsub from './pubsub.js'



class CurrentMonth extends MixinPubSub(CurrentText) {
    #unsuscribe;
    #date = DateService.getCurrentDate();
    constructor() {
        super();
        this.init(FormatDate.getCurrentMonth(this.#date));
        pubsub.sub(CHANELS.CHANGEMONTH, this.changeAutomaticMonth.bind(this));
    }
    update(date) {
        this.#date = date
        super.update(FormatDate.getCurrentMonth(date));
    }

    changeManualMonth(dif) { 
        this.update(DateService.getNextOrPreviosMonth(this.#date, dif) )
    }

    changeAutomaticMonth(newDate) {
        if (DateService.isNextMonth(this.#date, newDate)) {
            this.update(newDate);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.#unsuscribe = this.pubSub.sub(CHANELS.CHANGEMANUALMONTH, this.changeManualMonth.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.#unsuscribe();
    }
}

customElements.define('bcn-currentmonth', CurrentMonth);


/*
class CurrentMonth extends MixinPubSub(CurrentTextElement) {
    #unsuscribe;
    constructor() {
        super(CHANELS.CHANGEMONTH, FormatDate.getCurrentMonth);
    }
    changeManualMonth(dif) {
        this.date = DateService.getNextOrPreviosMonth(this.date, dif)
    }

    connectedCallback(){
        super.connectedCallback();
        this.#unsuscribe = this.pubSub.sub(CHANELS.CHANGEMANUALMONTH, this.changeManualMonth.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.#unsuscribe();
    }
}

customElements.define('bcn-currentmonth', CurrentMonth);
 */