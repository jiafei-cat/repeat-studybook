const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class XPromise {
  constructor(executor) {
    // executor错误处理
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  status = PENDING;
  value = null;
  reason = null;
  onFulfilledCallback = [];
  onRejectedCallback = [];

  static resolve(value) {
    if (value instanceof XPromise) {
      return value;
    }

    return new XPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new XPromise((resolve, reject) => reject(reason));
  }

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value);
      }
    }
  };

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
  
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason);
      }
    }
  };

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

    const returnNewPromise = new XPromise((resolve, reject) => {
      const fulfilledMicrotask = () => queueMicrotask(() => {
        try {
          const result = onFulfilled(this.value);
          resolvePromise(result, returnNewPromise, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });

      const rejectedMicrotask = () => queueMicrotask(() => {
        try {
          const result = onRejected(this.reason);
          resolvePromise(result, returnNewPromise, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });

      if (this.status === FULFILLED) {
        fulfilledMicrotask();
      }

      if (this.status === REJECTED) {
        rejectedMicrotask();
      }

      if (this.status === PENDING) {
        this.onFulfilledCallback.push(fulfilledMicrotask);
        this.onRejectedCallback.push(rejectedMicrotask);
      }
    });

    return returnNewPromise;
  }
}

function resolvePromise(result, returnPromise, resolve, reject) {
  // then return 自己promise的情况
  if (result === returnPromise) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }

  if (typeof result === 'function' || typeof result === 'object') {
    if (result === null) {
      return resolve(result)
    }

    let then
    try {
      then = result.then
    } catch (error) {
      return reject(error)
    }

    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          result,
          y => {
            if (called) return;
            called = true;
            resolvePromise(returnPromise, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          });
      } catch (error) {
        if (called) return;
        reject(error);
      }
    } else {
      resolve(result);
    }
  } else {
    resolve(result)
  }
}

XPromise.deferred = function () {
  var result = {};
  result.promise = new XPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}

module.exports = XPromise;
