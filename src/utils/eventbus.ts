export default class EventBus {
  listeners: { [index: string]: any };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: () => {}) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: () => {}) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener: () => {}) => listener !== callback,
    );
  }

  emit(event: string, ...args: string[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener: any) => {
      listener(...args);
    });
  }
}
