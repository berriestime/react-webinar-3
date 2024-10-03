import { cn as bem } from '@bem-react/classname';
import './style.css';

function AuthForm({ handleSubmit, login, setLogin, password, setPassword, error }) {
  const cn = bem('AuthForm');
  return (
    <div className={cn()}>
      <h1>Вход</h1>
      <form className={cn('content')} onSubmit={handleSubmit}>
        <div className={cn('field')}>
          <label>Логин</label>
          <input type="text" value={login} onChange={e => setLogin(e.target.value)} />
        </div>
        <div className={cn('field')}>
          <label>Пароль</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Войти</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default AuthForm;
