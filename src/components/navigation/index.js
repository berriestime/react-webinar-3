import { cn as bem } from '@bem-react/classname';
import React from 'react';
import BasketTool from '../basket-tool';
import Breadcrumb from '../breadcrumb';
import './style.css';

const cn = bem('Navigation');

const Navigation = ({ callbacks, basketData }) => (
  <div className={cn()}>
    <Breadcrumb />
    <BasketTool
      onOpen={callbacks.openModalBasket}
      amount={basketData.amount}
      sum={basketData.sum}
    />
  </div>
);

export default Navigation;
