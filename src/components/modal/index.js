import React from 'react';
import './style.css';

function Modal({ cart, onClose, onDeleteItem }) {
  const items = Object.values(cart).map(item => (
    <div key={item.code} className="Modal-item">
      <span className="Modal-item-title">{item.title}</span>
      <span className="Modal-item-price">{item.price * item.count} &#8381;</span>
      <span className="Modal-item-count">{item.count} шт.</span>
      <button className="Modal-item-remove" onClick={() => onDeleteItem(item.code)}>
        Удалить{' '}
      </button>
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
        {items}
        <div className="Modal-footer">
          <span className="Modal-total-price">Итого {totalPrice.toLocaleString()} &#8381;</span>
        </div>
      </div>
    </div>
  );
}

export default Modal;
