import React from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const cn = bem('Breadcrumbs');

const Breadcrumb = () => (
  <Link to="/" className={cn()}>
    Главная
  </Link>
);

export default Breadcrumb;
