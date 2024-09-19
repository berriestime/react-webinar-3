import React from 'react';
import './style.css';

function Modal({ cart, onClose, onDeleteItem }) {
  if (Object.keys(cart).length === 0) {
    return (
      <div className="Modal-wrapper">
        <div className="Modal">
          <div className="Modal-header">
            <h2 className="Modal-title">Корзина</h2>
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
      <span className="Modal-item-price">{item.price * item.count} &#8381;</span>
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
          <h2 className="Modal-title">Корзина</h2>
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
            <span className="Modal-total-price">{totalPrice.toLocaleString()} &#8381;</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
