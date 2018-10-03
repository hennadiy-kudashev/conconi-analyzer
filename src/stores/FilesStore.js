import { action, observable } from 'mobx';
import LapsStore from './LapsStore';

class File {
  @observable file = observable.map();

  constructor(name, laps) {
    this.file.set('name', name);
    this.file.set('laps', laps);
  }

  getName() {
    return this.file.get('name');
  }

  getLaps() {
    return this.file.get('laps');
  }
}

class FilesStore {
  @observable files;

  constructor() {
    this.files = [];
  }

  getFiles() {
    return this.files;
  }

  @action
  addFile(name, laps) {
    this.files.push(new File(name, new LapsStore(laps)));
  }

  @action
  removeFile(name) {
    this.files = this.files.filter(file => file.getName() !== name);
  }
}

export default new FilesStore();
