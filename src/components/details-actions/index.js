import { cn as bem } from '@bem-react/classname';
import React from 'react';
import BasketTool from '../../components/basket-tool';
import Breadcrumb from '../../components/breadcrumb';
import './style.css';

const cn = bem('DetailsActions');

const DetailsActions = ({ callbacks, basketData }) => (
  <div className={cn()}>
    <Breadcrumb />
    <BasketTool
      onOpen={callbacks.openModalBasket}
      amount={basketData.amount}
      sum={basketData.sum}
    />
  </div>
);

export default DetailsActions;
