import { action, observable } from 'mobx';

class MenuStore {
  static Items = {
    Laps: 'Laps',
    Graph: 'Graph'
  };

  @observable items;

  constructor() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  @action
  addItem(item) {
    this.items.push(item);
  }

  @action
  addLaps() {
    if (!this.hasLaps()) {
      this.addItem(MenuStore.Items.Laps);
    }
  }

  @action
  addGraph() {
    if (!this.hasGraph()) {
      this.addItem(MenuStore.Items.Graph);
    }
  }

  hasLaps() {
    return this.items.includes(MenuStore.Items.Laps);
  }

  hasGraph() {
    return this.items.includes(MenuStore.Items.Graph);
  }
}

export default new MenuStore();
