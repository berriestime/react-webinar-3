import React from 'react';
import './style.css';
import Head from '../head';

function CartHeader({ onClose }) {
  return (
    <div className="Modal-header">
      <Head title="Корзина" />
      <button className="Modal-close" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
}

function CartItem({ item, onDeleteItem }) {
  return (
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
  );
}

function CartFooter({ totalPrice }) {
  return (
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
  );
}

function Cart({ cart, onClose, onDeleteItem }) {
  if (Object.keys(cart).length === 0) {
    return (
      <div className="Modal-wrapper">
        <div className="Modal">
          <CartHeader onClose={onClose} />
          <div className="Modal-empty">
            <span>Ваша корзина пуста</span>
          </div>
        </div>
      </div>
    );
  }

  const items = Object.values(cart).map(item => (
    <CartItem key={item.code} item={item} onDeleteItem={onDeleteItem} />
  ));

  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price * item.count,
    0,
  );

  return (
    <div className="Modal-wrapper">
      <div className="Modal">
        <CartHeader onClose={onClose} />
        <div className="Modal-body">
          {items}
          <CartFooter totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
