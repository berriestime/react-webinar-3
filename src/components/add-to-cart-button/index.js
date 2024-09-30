import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const cn = bem('AddToCartButton');

const AddToCartButton = ({ onAddToBasket }) => (
  <div>
    <button className={cn()} onClick={onAddToBasket}>
      Добавить
    </button>
  </div>
);

export default AddToCartButton;
