import { CHANELS } from './chanels.js'
import { MixinPubSub } from './mixins.js';
const NEXT = 1;
const PREVIOUS = -1;
const DEFAULTATTRIBUTE = 'previous';

class CalendarButton extends MixinPubSub(HTMLButtonElement) {
    #action
    constructor() {
        super();
        this.addEventListener('click', this.emit.bind(this));
    }
    connectedCallback() {
        super.connectedCallback();
        this.#action = this.hasAttribute(DEFAULTATTRIBUTE) ? PREVIOUS : NEXT;
    }
    emit(ev) {
        ev.stopPropagation();
        this.pubSub.pub(CHANELS.CHANGEMANUALMONTH, this.#action);
    }
}

customElements.define('bcn-calendarbutton', CalendarButton, { extends: 'button' });