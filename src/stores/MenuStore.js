import { action, observable } from 'mobx';
import menus from 'pages/Layout/menus';

class MenuStore {
  @observable items;

  constructor() {
    this.items = [menus.About, menus.Upload];
  }

  getItems() {
    return this.items;
  }

  @action
  addItem(item) {
    if (!this.items.some(t => t.id === item.id)) {
      this.items.push(item);
    }
  }

  addLaps() {
    return this.addItem(menus.Laps);
  }

  addGraph() {
    return this.addItem(menus.Graph);
  }
}

export default new MenuStore();
