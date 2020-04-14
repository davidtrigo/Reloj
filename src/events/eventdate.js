import { CurrentTextElement } from '../currenttextelement.js'
import { CHANELS } from '../chanels.js'
import { FormatDate } from '../formatdate.js';
import { MixinPubSub } from '../mixins.js'

import {CurrentText} from '../currenttext.js'

export class EventDate extends CurrentText {
    
    init(objectDay) {
        super.init(FormatDate.getDay(objectDay.date));
    } 

}
customElements.define('bcn-event-date', EventDate);

// Debajo como estaba antes

/* 

export class EventDate extends MixinPubSub(CurrentTextElement) {
    constructor() {
        super(CHANELS.SELECTEDDAY, FormatDate.getDay)
    }
    init(objectDay) {
        super.init(objectDay.date);
    }
    update(objectDay) {
        super.update(objectDay.date);
    }

}
customElements.define('bcn-event-date', EventDate);

 */