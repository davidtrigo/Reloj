import { CHANELS } from './chanels.js'
import { DateService } from './dateservice.js';
import { Day } from './currentday.js';
import pubsub from './pubsub.js'
import { MixinPubSub } from './mixins.js';

const CLASSTODAY = "today";
const DAYNOTINMONTH = "notinmonth";
const SELECTDAY = "selected";


const css = new CSSStyleSheet();
css.replaceSync(`
    :host{
        display:grid;
        grid-template-columns: repeat(7,2.5rem);
        grid-template-rows: repeat(6, 2.5rem);
/*         gap: 0.125rem;
 */ 
        gap: 0.375rem;
    }    
`);
class CalendarPage extends MixinPubSub(HTMLElement) {
    #date = DateService.getCurrentDate();
    #days = [];
    #unsubscribers = [];
    #click;
    #selectDay;
    #selectDate;
    #todayDay;
    constructor() {
        super();
        this.#unsubscribers = [
            pubsub.sub(CHANELS.CHANGEMONTH, this.changeAutomaticMonth.bind(this)),
            pubsub.sub(CHANELS.CHANGEDAY, this.changeDay.bind(this)),
        ];
        this.#click = this.click.bind(this);
        this.addEventListener('click', this.#click);
    }
    click(ev) {
        ev.stopPropagation();
        let day = ev.path.filter(d => d instanceof Day)[0]; //event delegation
        if (day) {
            this.setSelectedDay(day);
        }
    }
    setSelectedDay(day) {
        this.pubSub.pub(CHANELS.SELECTEDDAY, day.objectDay)
        if (this.#selectDay) {
            this.#selectDay.removeSelectedDay();
        }
        day.selectedDay();
        this.#selectDay = day;
        this.#selectDate = new Date(day.objectDay.date.getTime());
    }
    changeDay(date) {
        if (this.isCurrentMonth()) {
            //TODO Cambiar OldToday a false
            //Cambiar newToday a true
            //si #date == #selectedDay o !#selectedDay 
            this.#date = date;
        }
        this.refreshTodayDay(date)
    }

    refreshTodayDay(date) {
        this.#todayDay.removeTodayDay();
        let dateDay = this.getDayInPage(date)
        if (dateDay) {
            dateDay.todayDay();
            this.#todayDay = dateDay
        }
    }

    changeAutomaticMonth(date) {
        if (this.isCurrentMonth()) {
            this.changeMonth(date)
        }
        else {
            this.refreshTodayDay(date);
        }
    }
    changeMonth(date) {
        if (this.#selectDate) {
            this.#selectDay.removeSelectedDay()
        }
        DateService.getMonthCalendar(date).forEach((objectDay, index) => {
            this.updateDay(this.#days[index], objectDay)
        })
        this.#date = date;
    }

    changeManualMonth(dif) {
        this.changeMonth(DateService.getNextOrPreviosMonth(this.#date, dif))
    }
    createDays(date) {
        this.#days = DateService.getMonthCalendar(date)
            .map(objectDay => {
                let day = new Day();
                this.updateDay(day, objectDay);
                return day;
            });
    }
    create(date) {
        this.createDays(date);
        let shadow = this.attachShadow({ mode: 'open' });
        shadow.adoptedStyleSheets = [css];
        this.#days.forEach(day => {
            if (day.objectDay.isToday) {
                this.setSelectedDay(day);
            }
            shadow.appendChild(day);
        });
    }
    updateDay(day, objectDay) {
        day.objectDay = objectDay;
        if (this.#selectDate && DateService.isCurrentDate(objectDay.date, this.#selectDate)) {
            day.selectedDay();
            this.#selectDay = day;
        }
        if (objectDay.isToday) {
            this.#todayDay = day;
        }
        /*         if (objectDay.isToday) {
                    this.setSelectedDay(day);
                } */
    }
    isCurrentMonth() {
        return this.#days.map(d => d.objectDay).filter(o => o.isToday && o.isCurrentMonth)[0]
    }
    getDayInPage(date) {
        return this.#days.filter(d => DateService.isCurrentDate(d.objectDay.date, date))[0]
    }

    connectedCallback() {
        super.connectedCallback();
        this.#unsubscribers.push(this.pubSub.sub(CHANELS.CHANGEMANUALMONTH, this.changeManualMonth.bind(this)));
        this.create(this.#date);
    }
    disconnectedCallback() {
        this.#unsubscribers.forEach(unsubscriber => {
            unsubscriber();
        });
        this.removeEventListener('click', this.#click);
        this.#days = null;
    }
}
customElements.define('bcn-month', CalendarPage)