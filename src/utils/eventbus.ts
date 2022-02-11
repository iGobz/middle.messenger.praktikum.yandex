export default class EventBus {

    listeners: {[index: string]: any};

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
  }

    off(event: string, callback: Function) {
        
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener: Function) => listener !== callback
        );
  }

    emit(event: string, ...args: string[]) {
        if (!this.listeners[event]) {
                throw new Event(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener: Function) => {
            listener(...args);
        });
    }
} 