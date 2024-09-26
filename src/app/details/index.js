import { memo, useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Head from '../../components/head';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import BasketTool from '../../components/basket-tool';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const cn = bem('Details');

function Details() {
  const store = useStore();
  const { id } = useParams();

  useEffect(() => {
    store.actions.details.load(id);
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const itemData = useSelector(state => state.details.data);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  if (!itemData)
    return (
      <PageLayout>
        <Head title="Загрузка..." />
      </PageLayout>
    );

  return (
    <PageLayout>
      <Head title={itemData.title} />
      <div className={cn('actions')}>
        <Link to="/" className={cn('breadcrumbs')}>
          Главная
        </Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </div>
      <>
        <div className={cn('item')}>
          <div>{itemData.description}</div>
          <div>
            Страна производитель:{' '}
            <b>
              {itemData.madeIn.title} ({itemData.madeIn.code})
            </b>
          </div>
          <div>
            Категория: <b>{itemData.category.title}</b>
          </div>
          <div>
            Год выпуска: <b>{itemData.edition}</b>
          </div>
          <div className={cn('item-price')}>Цена: {itemData.price.toLocaleString('ru')} ₽</div>
          {/* <button onClick={callbacks.addToBasket(itemData._id)}>Добавить</button> */}
        </div>
      </>
    </PageLayout>
  );
}

export default memo(Details);
