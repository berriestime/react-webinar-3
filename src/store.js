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
      const newCount = itemInCart.count + 1;
      const newTotalPrice = this.state.totalPrice + itemInCart.price;
      const newTotalCount = this.state.totalCount + 1;

      this.setState({
        ...this.state,
        cart: cart.map(item => (item.code === code ? { ...item, count: newCount } : item)),
        totalPrice: newTotalPrice,
        totalCount: newTotalCount,
      });
    } else {
      const item = this.state.list.find(item => item.code === code);
      if (item) {
        const newTotalPrice = this.state.totalPrice + item.price;
        const newTotalCount = this.state.totalCount + 1;
        this.setState({
          ...this.state,
          cart: [...cart, { ...item, count: 1 }],
          totalPrice: newTotalPrice,
          totalCount: newTotalCount,
        });
      }
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteFromCart(code) {
    const cart = this.state.cart;
    const itemInCart = cart.find(item => item.code === code);

    if (itemInCart) {
      const newCount = itemInCart.count - 1;
      const newTotalPrice = this.state.totalPrice - itemInCart.price;
      const newTotalCount = this.state.totalCount - 1;

      if (newCount > 0) {
        this.setState({
          ...this.state,
          cart: cart.map(item => (item.code === code ? { ...item, count: newCount } : item)),
          totalPrice: newTotalPrice,
          totalCount: newTotalCount,
        });
      } else {
        this.setState({
          ...this.state,
          cart: cart.filter(item => item.code !== code),
          totalPrice: newTotalPrice,
          totalCount: newTotalCount,
        });
      }
    }
  }
}

export default Store;
