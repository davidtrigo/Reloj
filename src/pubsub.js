export class PubSub {
    constructor() {
        this._map = new Map();
    }
    pub(chanel, data) {
        let suscriptors = this._map.get(chanel);
        suscriptors && suscriptors.forEach(suscriptor => {
            suscriptor(Object.freeze(data));
        });
    }
    sub(chanel, cb) {
        let suscriptors = this._map.get(chanel);
        if (!suscriptors) {
            suscriptors = [cb]
            this._map.set(chanel, suscriptors);
        } else {
            suscriptors.push(cb);
        }
        return () => {
            let indexOf = suscriptors.indexOf(cb);
            if (indexOf !== 1) {
                suscriptors.splice(indexOf, 1);
            }
        }
    }
}

export default new PubSub();