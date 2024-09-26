import { codeGenerator } from '../../utils';
import StoreModule from '../module';

const ARTICLES_ENDPOINT = '/api/v1/articles';
const PAGE_LIMIT = 10;

const constructURL = ({ fields = ['_id', 'title', 'price'], page = 0 }) => {
  const target = new URL(ARTICLES_ENDPOINT, window.location.origin);
  const skip = PAGE_LIMIT * page;
  target.searchParams.set('limit', PAGE_LIMIT);
  target.searchParams.set('skip', skip);
  target.searchParams.set('fields', `items(${fields.join(',')}),count`);
  return target;
};

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      count: 0,
      list: [],
      currentPage: 0,
      totalPages: 0,
    };
  }

  async load(page = 0) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,
      },
      'Сохранен номер текущей страницы',
    );

    const response = await fetch(constructURL({ page }));
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        count: json.result.count,
        list: json.result.items,
        totalPages: Math.ceil(json.result.count / PAGE_LIMIT),
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
