import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const cn = bem('ProductDescription');

const ProductDescription = ({ itemData }) => (
  <div className={cn()}>
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
    <div className={cn('price')}>Цена: {itemData.price.toLocaleString('ru')} ₽</div>
  </div>
);

export default ProductDescription;
