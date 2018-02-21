import { action, observable } from 'mobx';

class MenuStore {
  static Items = {
    Laps: 'Laps'
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

  hasLaps() {
    return this.items.includes(MenuStore.Items.Laps);
  }
}

export default new MenuStore();
