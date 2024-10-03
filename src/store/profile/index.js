import StoreModule from '../module';

const ENDPOINT_SIGN = 'http://localhost:8010/api/v1/users/sign';
const ENDPOINT_GET = 'http://localhost:8010/api/v1/users/self';

/**
 * Состояние профиля
 */
class ProfileState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      error: null,
      token: null,
      user: null,
      waiting: false,
    };
  }

  async signIn(login, password) {
    this.setState(
      {
        ...this.getState(),
        error: null,
        token: null,
        user: null,
        waiting: true,
      },
      'Авторизация',
    );

    // Отправка запроса на авторизацию
    try {
      const response = await fetch(ENDPOINT_SIGN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password, remember: true }),
      });
      const data = await response.json();
      if (!response.ok) {
        this.setState(
          {
            ...this.getState(),
            error: data.error,
            waiting: false,
          },
          'Авторизация завершилась с ошибкой',
        );
        return false;
      }

      // Сохранение токена в localStorage или в состояние
      localStorage.setItem('berriestime-token', data.token);

      this.setState(
        {
          ...this.getState(),
          token: data.result.token,
          user: data.result.user,
          waiting: false,
        },
        'Авторизация успешна',
      );
      return true;
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          error,
          waiting: false,
        },
        'Авторизация завершилась с ошибкой',
      );
      return false;
    }
  }
}

export default ProfileState;
