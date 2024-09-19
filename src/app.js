import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
        // console.log('Корзина:', store.getState().cart);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onOpenModal: useCallback(() => {
      alert('Модалка с корзиной');
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cart={store.getState().cart} goToCart={callbacks.onOpenModal} />
      <List list={list} onAddToCart={callbacks.onAddToCart} onSelectItem={callbacks.onSelectItem} />
    </PageLayout>
  );
}

export default App;
