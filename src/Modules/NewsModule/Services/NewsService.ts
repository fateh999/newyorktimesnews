import {BehaviorSubject} from 'rxjs';
import {fetcher} from 'src/Utils/Helpers';
import PersistStorage from 'src/Utils/PersistStorage';
import {SECTION} from '../Types/CommonTypes';

class NewsService {
  queryKeys = {
    loadNews: (section: SECTION) => `loadNews/${section}`,
  };

  activeSection$ = new BehaviorSubject<SECTION>('home');
  activeLocation$ = new BehaviorSubject<string>('');
  activeKeywords$ = new BehaviorSubject<string>('');

  constructor() {
    const persistStorage = new PersistStorage(
      'activeSection',
      this.activeSection$,
    );
    persistStorage.init();
  }

  loadNews = (section: SECTION) => {
    return fetcher(`/${section}.json`);
  };
}

export default new NewsService();
