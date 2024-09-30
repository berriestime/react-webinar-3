import React, { memo, useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import DetailsActions from '../../components/details-actions';
import DetailsBody from '../../components/details-body';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import Basket from '../basket';

function Details() {
  const store = useStore();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    store.actions.details.load(id);
  }, [location]);

  const basketData = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const itemData = useSelector(state => state.details.data);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      () => store.actions.basket.addToBasket(itemData._id, itemData),
      [store, itemData],
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const activeModal = useSelector(state => state.modals.name);

  if (!itemData)
    return (
      <PageLayout>
        <Head title="Загрузка..." />
      </PageLayout>
    );

  return (
    <>
      <PageLayout>
        <Head title={itemData.title} />
        <DetailsActions callbacks={callbacks} basketData={basketData} />
        <DetailsBody itemData={itemData} callbacks={callbacks} />
      </PageLayout>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default memo(Details);
