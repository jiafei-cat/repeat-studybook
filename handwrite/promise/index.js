const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  status = PENDING
  value = null
  reason = null
  onFulfilledCallback = []
  onRejectedCallback = []

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    }

    return new MyPromise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason))
  }

  resolve = (value) => {
    if (this.status === PENDING) {
      this.value = value
      this.status = FULFILLED

      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value)
      }
    }
  }

  reject = (reason) => {
    if (this.status === PENDING) {
      this.reason = reason
      this.status = REJECTED

      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(value)
      }
    }
  }

  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        const result = onFulfilled(this.value)
        resolvePromise(result, resolve, reject)
      }

      if (this.status === REJECTED) {
        const result = onRejected(this.reason)
        resolvePromise(result, resolve, reject)
      }

      if (this.status === PENDING) {
        this.onFulfilledCallback.push(onFulfilled)
        this.onRejectedCallback.push(onRejected)
      }
    })
  }
}

function resolvePromise(result, resolve, reject) {
  if (result instanceof MyPromise) {
    return result.then(resolve, reject)
  } else {
    resolve(result)
  }
}
