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

  transfer(smallerBucket: Bucket, biggerBucket: Bucket) {
    if (biggerBucket._size - biggerBucket._amount >= smallerBucket._amount) {
      biggerBucket._amount += smallerBucket._amount;
      smallerBucket._amount = 0;
      return `Tranfer from ${smallerBucket._name} to ${biggerBucket._name}`;
    }
  }

  transfer2(bucketX: Bucket, bucketY: Bucket): string {
    if (bucketX > bucketY) {
      if (bucketX._size - bucketX._amount >= bucketY._amount) {
        bucketX._amount += bucketY._amount;
        bucketY._amount = 0;
        return `Tranfer from ${bucketY._name} to ${bucketX._name}`;
      }
    }

    if (bucketY > bucketX) {
      if (bucketY._size - bucketY._amount >= bucketX._amount) {
        bucketY._amount += bucketX._amount;
        bucketX._amount = 0;
        return `Tranfer from ${bucketX._name} to ${bucketY._name}`;
      }
    }
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
