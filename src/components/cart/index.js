import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import ModalLayout from '../modal-layout';

function CartItem({ item, onDeleteItem }) {
  return (
    <div key={item.code} className="Cart-item">
      <span className="Cart-item-code">{item.code}</span>
      <span className="Cart-item-title">{item.title}</span>
      <div className="Cart-item-price">
        {item.price.toLocaleString('ru-RU', { useGrouping: true, minimumFractionDigits: 0 })}
        &nbsp;&#8381;
      </div>
      <span className="Cart-item-count">{item.count} шт.</span>
      <span>
        <button className="Cart-item-remove" onClick={() => onDeleteItem(item.code)}>
          Удалить{' '}
        </button>
      </span>
    </div>
  );
}

function CartFooter({ totalPrice }) {
  return (
    <div className="Cart-footer">
      <span></span>
      <span></span>
      <span className="Cart-total-text">Итого</span>
      <div className="Cart-total-price">
        {totalPrice.toLocaleString('ru-RU', { useGrouping: true, minimumFractionDigits: 0 })}
        &nbsp;&#8381;
      </div>
      <span></span>
    </div>
  );
}

function Cart({ cart, onClose, onDeleteItem, totalPrice }) {
  if (Object.keys(cart).length === 0) {
    return (
      <ModalLayout onClose={onClose} title={'Корзина'}>
        <div className="Cart">
          <div className="Cart-empty">
            <span>Ваша корзина пуста</span>
          </div>
        </div>
      </ModalLayout>
    );
  }

  const cn = bem('Cart');

  const items = Object.values(cart).map(item => (
    <CartItem key={item.code} item={item} onDeleteItem={onDeleteItem} />
  ));

  return (
    <ModalLayout onClose={onClose} title={'Корзина'}>
      <div className={cn()}>
        <div className={cn('body')}>
          {items}
          <CartFooter totalPrice={totalPrice} />
        </div>
      </div>
    </ModalLayout>
  );
}

export default Cart;
