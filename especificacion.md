X PubSub
x CurrentTimer
    x ServiceTimer
        x setInterval-->constructor
        x clearInterval-->dispose-->disconectedCallback
        x Pub->cada Segundo
x CurrentDate
        Sub
CurrentMonth(Ninfas blancas)
        Sub
NextMonth
PreviousMonth
DaysOfWeek
    España
    USA
Month
    ServiceMonth
    Sub
    Day {
        date ->Date
        isCurrentMonth -> boolean
        isToday-->boolean
    }

https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date
culture(ES,USA) Intl https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Intl
["ES":{
    daysOfWeek ["L",M","M"]
    Months ["Ene  ro","Fe"]
    format Month "de"
    format Day
    firstDayOfWeek
},
"EN":{
    daysOfWeek
    Months
    format Month
    format Day
    firstDayOfWeek
}]

ServiceDate
ServiceFormatDate

DaysOfMonth = [31,fn(year),31,30,31,30,31,31,30,31,30,31]

daysOfMonth[new Date().getMonth()]
https://gist.github.com/dabzueta/bda93481a4f9edd7b37ef389294b19da

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

getMonday(new Date()); // Mon Nov 08 2010

Todos los meses tienen dia 1
Por tanto todos los dias 1 pertenecen a una semana
El primer dia de la semana del día 1 es el inicio del bucle y hacer
hasta 42
