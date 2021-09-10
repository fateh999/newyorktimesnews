import AsyncStorage from '@react-native-async-storage/async-storage';
import {BehaviorSubject} from 'rxjs';

class PersistStorage {
  keyName;
  observer;

  constructor(keyName: string, observer: BehaviorSubject<any>) {
    this.keyName = keyName;
    this.observer = observer;
  }

  init = async () => {
    const lastDataString = await AsyncStorage.getItem(this.keyName);

    if (lastDataString) {
      this.observer.next(JSON.parse(lastDataString));
    }

    this.observer.subscribe(next =>
      AsyncStorage.setItem(this.keyName, JSON.stringify(next)),
    );
  };
}

export default PersistStorage;
