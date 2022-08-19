import { Bucket } from './bucket';

describe('Bucket', () => {
  it('should be defined', () => {
    expect(new Bucket(2, 'teste')).toBeDefined();
  });
});
