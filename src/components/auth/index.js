import React from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Auth({ isAuthenticated, userName, onLogout }) {
  const cn = bem('Auth');
  return (
    <div className={cn()}>
      {isAuthenticated ? (
        <>
          <span>
            Привет, <Link to="/profile">{userName}</Link>!
          </span>
          <button type="button" className={cn('logout')} onClick={onLogout}>
            Выход
          </button>
        </>
      ) : (
        <Link to="/login">
          <button type="button">Вход</button>
        </Link>
      )}
    </div>
  );
}

export default Auth;
