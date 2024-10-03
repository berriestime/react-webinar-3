import React, { useState } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import AuthForm from '../../components/auth-form';
import Auth from '../../components/auth';
import { Link } from 'react-router-dom';
import Navigation from '../../containers/navigation';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    // Отправка запроса на авторизацию
    try {
      const response = await fetch('http://localhost:8010/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Сохранение токена в localStorage или в состояние
        localStorage.setItem('berriestime-token', data.token);
        // Переход на страницу профиля
        <Link to="/profile" />;
      } else {
        setError(data.error.message);
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
    <PageLayout head={<Auth />}>
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
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
