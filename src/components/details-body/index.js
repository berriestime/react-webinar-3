import { cn as bem } from '@bem-react/classname';
import React from 'react';
import AddToCartButton from '../../components/add-to-cart-button';
import ProductDescription from '../../components/product-description';
import './style.css';

const cn = bem('DetailsBody');

const DetailsBody = ({ callbacks, itemData }) => (
  <div className={cn()}>
    <ProductDescription itemData={itemData} />
    <AddToCartButton onAddToBasket={callbacks.addToBasket} />
  </div>
);

export default DetailsBody;
