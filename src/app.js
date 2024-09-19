import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const list = store.getState().list;

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
        // console.log('Корзина:', store.getState().cart);
      },
      [store],
    ),

    onDeletefromCart: useCallback(
      code => {
        store.deleteFromCart(code);
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
      setIsModalOpen(true);
    }, []),

    onCloseModal: useCallback(() => {
      setIsModalOpen(false);
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cart={store.getState().cart} goToCart={callbacks.onOpenModal} />
      <List list={list} onAddToCart={callbacks.onAddToCart} onSelectItem={callbacks.onSelectItem} />
      {isModalOpen && (
        <Modal
          onClose={callbacks.onCloseModal}
          cart={store.getState().cart}
          onDeleteItem={callbacks.onDeletefromCart}
        />
      )}
    </PageLayout>
  );
}

export default App;
