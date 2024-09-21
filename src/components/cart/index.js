import React from 'react';
import './style.css';
import Head from '../head';

function Cart({ cart, onClose, onDeleteItem }) {
  if (Object.keys(cart).length === 0) {
    return (
      <div className="Modal-wrapper">
        <div className="Modal">
          <div className="Modal-header">
            <Head title="Корзина" />
            <button className="Modal-close" onClick={onClose}>
              Закрыть
            </button>
          </div>
          <div className="Modal-empty">
            <span>Ваша корзина пуста</span>
          </div>
        </div>
      </div>
    );
  }

  const items = Object.values(cart).map(item => (
    <div key={item.code} className="Modal-item">
      <span className="Modal-item-code">{item.code}</span>
      <span className="Modal-item-title">{item.title}</span>
      <div className="Modal-item-price">
        {item.price.toLocaleString('ru-RU', { useGrouping: true, minimumFractionDigits: 0 })}
        &nbsp;&#8381;
      </div>
      <span className="Modal-item-count">{item.count} шт.</span>
      <span>
        <button className="Modal-item-remove" onClick={() => onDeleteItem(item.code)}>
          Удалить{' '}
        </button>
      </span>
    </div>
  ));

  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price * item.count,
    0,
  );

  return (
    <div className="Modal-wrapper">
      <div className="Modal">
        <div className="Modal-header">
          <Head title="Корзина" />
          <button className="Modal-close" onClick={onClose}>
            Закрыть
          </button>
        </div>
        <div className="Modal-body">
          {items}
          <div className="Modal-footer">
            <span></span>
            <span></span>
            <span className="Modal-total-text">Итого</span>
            <div className="Modal-total-price">
              {totalPrice.toLocaleString('ru-RU', { useGrouping: true, minimumFractionDigits: 0 })}
              &nbsp;&#8381;
            </div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
