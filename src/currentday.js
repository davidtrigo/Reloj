import { CurrentText } from './currenttext.js'

const CLASSTODAY = "today";
const DAYNOTINMONTH = "notinmonth";
const SELECTDAY = "selected";
const css = new CSSStyleSheet();
css.replaceSync(`
   
    :host{
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    
    }
    :host(.today){
        background-color:  rgb(0, 120, 215);
        padding:0.125rem;
/*         color: white; */
        font-weight: bolder;
        outline: 0.125rem solid rgb(0, 120, 215);
    }

    :host(.selected){
        outline: 0.125rem solid rgb(0, 120, 215);
    }

    :host(.today.selected){
        background-color: rgb(0, 120, 215);
        border: 0.125rem solid black;
        outline: 0.125rem solid rgb(0, 120, 215);
    }

    :host(.today.selected:hover){
        background-color: rgb(0, 120, 215);
        border: 0.125rem solid black;
        outline: 0.125rem solid rgb(102, 174, 231);
    }

    :host(.today:not(.selected):hover){
        background-color: rgb(0, 120, 215);
        outline: 0.125rem solid rgb(102, 174, 231);
    }

    :host(:not(.selected):not(.today):hover) {     
        outline: 0.125rem solid grey;
     }

    :host(:not(.selected):not(.today).notinmonth) {    
        color: grey;
    }


/*     :host(:hover){
        border: 0.063rem solid white;
    }

    :host(.notinmonth){
        color:gray;
    } */
`);

export class Day extends CurrentText {
    #day;
    #objectDay;
    constructor(){
        super();
        this.shadow.adoptedStyleSheets=[css];
    }
    set objectDay(value) {
        this.#objectDay = value;
        let day = value.date.getDate();
        if (!this.#day) {
            this.init(day)
            this.#day = day;
        } else {
            this.update(day)
        }
        this.setClass(value);
    }
    get objectDay(){
        return this.#objectDay;
    }
    selectedDay(){
        this.classList.add(SELECTDAY);
    }
    removeSelectedDay(){
        this.classList.remove(SELECTDAY);
    }
    todayDay(){
        this.#objectDay.isToday = true;
        this.classList.add(CLASSTODAY);
    }
    removeTodayDay(){
        this.#objectDay.isToday = false;
        this.classList.remove(CLASSTODAY);
    }
    setClass(value) {
        this.removeClass();
        if (!value.isCurrentMonth) {
            this.classList.add(DAYNOTINMONTH);
        }
        if (value.isToday) {
            this.classList.add(CLASSTODAY);
        }
    }
    removeClass(){
        this.classList.remove(DAYNOTINMONTH);
        this.classList.remove(CLASSTODAY);
    }
}

customElements.define('bcn-day', Day)