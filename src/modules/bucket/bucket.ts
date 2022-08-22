export class Bucket {
  private _size: number;
  private _name: string;
  private _amount = 0;

  constructor(size: number, name: string) {
    this._size = size;
    this._name = name;
  }

  fill(): string {
    if (this._amount === 0) {
      this._amount = this._size;
      return `Fill ${this._name}`;
    }
  }

  empty() {
    this._amount = 0;
    return `Empty ${this._name}`;
  }

  transfer(from: Bucket, to: Bucket, value: number) {
    to._amount = to.amount + value;
    from._amount = from.amount - value;
    return `Tranfer from ${from._name} to ${to._name}`;
  }

  get amount(): number {
    return this._amount;
  }

  get name(): string {
    return this._name;
  }

  get size(): number {
    return this._size;
  }
}
