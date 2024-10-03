import React, { useState } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import AuthForm from '../../components/auth-form';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    // Отправка запроса на авторизацию
    try {
      const response = await fetch('http://query.rest/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Сохранение токена в localStorage или в состояние
        localStorage.setItem('token', data.token);
        // Переход на страницу профиля
        history.push('/profile');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Произошла ошибка при авторизации.');
    }
  };

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  return (
    <PageLayout>
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      {/* <Navigation /> */}
      <Spinner active={select.waiting}>
        <AuthForm
          handleSubmit={handleSubmit}
          login={login}
          setLogin={setLogin}
          password={password}
          setPassword={setPassword}
          error={error}
        />
      </Spinner>
    </PageLayout>
  );
}

export default Login;
