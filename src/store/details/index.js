import { codeGenerator } from '../../utils';
import StoreModule from '../module';

const getArticleEndpoint = id => `/api/v1/articles/${id}`;

const constructURL = ({ id }) => {
  const target = new URL(getArticleEndpoint(id), window.location.origin);
  target.searchParams.set('fields', '*,madeIn(title,code),category(title)');
  return target;
};

class Details extends StoreModule {
  initState() {
    return {
      id: null,
      data: null,
    };
  }

  async load(id) {
    this.setState(
      {
        ...this.getState(),
        id,
        data: null,
      },
      'Сохранен номер текущего товара',
    );

    const response = await fetch(constructURL({ id }));
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        data: json.result,
      },
      'Загружена информация о товаре из АПИ',
    );
  }
}

export default Details;
