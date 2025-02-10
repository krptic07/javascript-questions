// How does the EventEmitter class handle multiple event subscriptions and
// allow unsubscribing from individual events?

class EventEmitter<T extends unknown[]> {
  public _subscriptionMap: Map<string, Map<Symbol, (...args: T[]) => any>>;

  constructor() {
    this._subscriptionMap = new Map();
  }

  subscribe(eventName: string, callbackFunc: (...args: T[]) => any) {
    if (typeof callbackFunc !== "function") {
      throw TypeError("Not a function");
    } else {
      if (!this._subscriptionMap.has(eventName)) {
        this._subscriptionMap.set(eventName, new Map());
      }
      let subscriptionId = Symbol();
      let subscription = this._subscriptionMap.get(eventName);
      subscription.set(subscriptionId, callbackFunc);
      return {
        remove: function (): void {
          if (!subscription.has(subscriptionId)) {
            throw TypeError("Subscription already removed");
          }
          subscription.delete(subscriptionId);
        },
      };
    }
  }

  removeAll(eventName: string): void {
    if (!this._subscriptionMap.has(eventName)) {
      throw TypeError("Event is not present");
    }
    this._subscriptionMap.delete(eventName);
  }

  emit(eventName: string, ...args: T[]) {
    if (!this._subscriptionMap.has(eventName)) {
      throw TypeError("event not subscribed");
    } else {
      this._subscriptionMap
        .get(eventName)
        ?.forEach(
          (callbackFunc: (...args: T[]) => any, subscriptionId: Symbol) => {
            callbackFunc(...args);
          }
        );
    }
  }
}

const emitter = new EventEmitter<any>();
const sub1 = emitter.subscribe("getName", (name) => {
  console.log(name);
});

const sub2 = emitter.subscribe("getName", (name, age) => {
  console.log(name, age);
});

// emitter.emit("getName", "Krishna");
emitter.emit("getName", "Krishna", 5);

sub1.remove();

emitter.emit("getName", "Aman", 10);

emitter.removeAll("getName");

// emitter.emit("getName", "Subham", 10);
