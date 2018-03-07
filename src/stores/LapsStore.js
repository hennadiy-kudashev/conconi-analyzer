import { action, observable } from 'mobx';

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
    this.laps = laps.map(
      (lap, index) =>
        new Lap(
          {
            ...lap,
            index: index + 1
          },
          lap.distance > 150 && lap.distance < 250
        )
    );
  }
}

export default new LapsStore();
