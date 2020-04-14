import { CHANELS } from './chanels.js'
import pubsub from './pubsub.js'
import { DateService } from './dateservice.js'
class TimerStrategy {
    pub(oldDate, date) {
        pubsub.pub(CHANELS.CHANGETIMER, date);
    }
}
class DayStrategy {
    pub(oldDate, date) {
        if (
            !DateService.isCurrentDate(oldDate, date)
            && DateService.isCurrentMonth(oldDate, date)
        ) {
            pubsub.pub(CHANELS.CHANGEDAY, date);
        }
    }
}
class MonthStrategy {
    pub(oldDate, date) {
        if (!DateService.isCurrentMonth(oldDate, date)) {
            pubsub.pub(CHANELS.CHANGEMONTH, date);
        }
    }
}

export const Strategies = [
    new TimerStrategy(),
    new DayStrategy(),
    new MonthStrategy()
]
