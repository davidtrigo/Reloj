import { CULTURE } from '../culture.js'
import { CONFIG } from '../config.js'
import { FormatDate } from '../formatdate.js'
import { DateService } from '../dateservice.js';
const css = new CSSStyleSheet();
css.replaceSync(`
    :host{
       display:grid;
       grid-template-rows: 50% 50%;
       row-gap: 0.125rem;
       align-items: center;
       font-size:0.75rem;
    }
    :host(.allday){
        grid-template-rows: auto;
    }
    .end{
        color:#e3d3d3;
    }
    div{
        display:flex;
        align-items: center;
        width:100%;
        height:100%;
    }
`);
class EventHour extends HTMLElement {
    #end;
    #start;
    #shadow;
    constructor() {
        super();
    }
    init(start, end) {
        this.#start=start;
        this.#end=end;
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#shadow.adoptedStyleSheets = [css];
        
    }
    connectedCallback(){
        let startDate = new Date(this.#start);
        let endDate = new Date(this.#end);
        
        if (DateService.isNaturalDay(startDate, endDate)) {
            this.classList.add('allday')
            let textNode = this.create(CULTURE[CONFIG.culture].allDay);
            this.#shadow.appendChild(textNode);
            
        } else {
            this.classList.remove('allday');
            [
                this.create(FormatDate.getShortTimer(startDate)),
                this.create(FormatDate.getShortTimer(endDate),'end')
            ].forEach(node => this.#shadow.appendChild(node));
        }
    }
    create(data,classEnd) {
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(data));
        if(classEnd){
            div.classList.add(classEnd);
        }
        return div;
    }
}
customElements.define('bcn-event-hour', EventHour);