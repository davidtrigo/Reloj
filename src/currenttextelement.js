import pubsub from './pubsub.js'
import {DateService} from './dateservice.js'
import {CurrentText} from './currenttext.js'
export class CurrentTextElement extends CurrentText {
    #format;
    #unsuscribe
    #date = DateService.getCurrentDate();
    constructor(chanel,format){
        super()
        this.#format = format;        
        this.init(this.#date);
        this.#unsuscribe = pubsub.sub(chanel,this.update.bind(this));
    }  
    get date(){
        return this.#date;
    }
    set date(value){
        if(value!=this.date){
            this.#date = value;
            this.update(value);
        }
    }
    format(date){
        return this.#format(date);
    }
    create(date){
        return super.create(this.format(date));
    }
    update(date){
        super.update(this.format(date));
    }
    disconnectedCallback(){
        this.#unsuscribe();
    }
}
