import { action, autorun, observable } from 'mobx';

class Lap {
  @observable lap = observable.map();

  constructor(lapData = {}, selected = true) {
    this.lap.merge(lapData);
    this.lap.set('selected', selected);
  }

  @action
  toggle() {
    this.lap.set('selected', !this.lap.get('selected'));
  }
}

class LapsStore {
  @observable laps;

  constructor() {
    this.laps = [];
  }

  getLaps() {
    return this.laps;
  }

  getSelectedLaps() {
    return this.laps.filter(lapStore => lapStore.lap.get('selected'));
  }

  @action
  setLaps(laps) {
    this.laps = laps.map(lap => new Lap(lap));
  }
}

const lapsStore = new LapsStore();

autorun(() => {
  console.log(lapsStore.getLaps().toJS());
});

export default lapsStore;
