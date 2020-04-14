import {} from './eventtext.js';
import {} from './eventhour.js';

const css = new CSSStyleSheet();
css.replaceSync(`
    :host{
        display:grid;
        grid-template-columns:20% auto;
        grid-template-rows: 3.125rem;
        column-gap: 0.75rem;
        align-items: center;
    }
    
    :host(:hover){
       background-color:gray;
    }
`);
export class EventItem extends HTMLElement{
  
     create(event){
         let shadow = this.attachShadow({mode:'open'});
         shadow.adoptedStyleSheets = [css];
         shadow.appendChild(this.createHour(event.start,event.end));
         shadow.appendChild(this.createText(event.text));
        
     }
    
     createText(text){
        let eventText = document.createElement('bcn-event-text');
        eventText.init(text)
        return eventText;
     }
     createHour(start,end){
        let eventHour = document.createElement('bcn-event-hour');
        eventHour.init(start, end)
        return eventHour;
     }

}
customElements.define('bcn-event-item',EventItem)

