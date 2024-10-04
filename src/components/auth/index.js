import React from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Auth({ isAuthenticated, onLogout, user }) {
  const cn = bem('Auth');
  return (
    <div className={cn()}>
      {isAuthenticated ? (
        <>
          <Link to="/profile">
            <div>{user.name}</div>
          </Link>
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
