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
      token: localStorage.getItem('berriestime-token'),
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
      localStorage.setItem('berriestime-token', data.result.token);

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

  async getSelf() {
    if (this.getState().user) return true;
    if (!this.getState().token) return false;

    this.setState(
      {
        ...this.getState(),
        error: null,
        waiting: true,
      },
      'Получение профиля',
    );

    try {
      const response = await fetch(ENDPOINT_GET, {
        method: 'GET',
        headers: {
          'X-Token': this.getState().token,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        this.setState(
          {
            ...this.getState(),
            error: data.error,
            token: null,
            waiting: false,
          },
          'Получение профиля завершилось с ошибкой',
        );

        localStorage.removeItem('berriestime-token');

        return false;
      }

      this.setState(
        {
          ...this.getState(),
          user: data.result,
          waiting: false,
        },
        'Получение профиля успешно',
      );
      return true;
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          error,
          token: null,
          waiting: false,
        },
        'Получение профиля завершилось с ошибкой',
      );
      return false;
    }
  }
}

export default ProfileState;
