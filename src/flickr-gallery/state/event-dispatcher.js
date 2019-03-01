export function create() {
  let listeners = {};

  return {
    on,
    off,
    trigger
  };

  function on(eventName, listener) {
    if (!Array.isArray(listeners[eventName])) {
      listeners[eventName] = [];
    }
    listeners[eventName].push(listener);
  }

  function trigger(eventName, payload) {
    const list = listeners[eventName];
    if (!Array.isArray(list)) {
      return;
    }
    list.forEach(fn => fn(payload));
  }

  function off(eventName, listener) {
    const list = listeners[eventName];
    if (!Array.isArray(list)) {
      return;
    }
    listeners[eventName] = list.filter(fn => fn !== listener);
  }
}
