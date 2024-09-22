import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param code {Number} Код товара
   */
  addToCart(code) {
    const cart = this.state.cart;

    const itemInCart = cart.find(item => item.code === code);

    if (itemInCart) {
      this.setState({
        ...this.state,
        cart: cart.map(item => (item.code === code ? { ...item, count: item.count + 1 } : item)),
      });
    } else {
      const item = this.state.list.find(item => item.code === code);
      if (item) {
        this.setState({
          ...this.state,
          cart: [...cart, { ...item, count: 1 }],
        });
      }
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }

  getTotalCount() {
    return this.state.list.reduce((total, item) => total + (item.selected ? item.count : 0), 0);
  }

  getTotalPrice() {
    return this.state.list.reduce(
      (total, item) => total + (item.selected ? item.price * item.count : 0),
      0,
    );
  }
}

export default Store;
