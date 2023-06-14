import crypto from 'crypto'

export class ModelBase {
  /** random UUID */
  id: string
  constructor() {
    this.id = crypto.randomUUID()
  }
}
