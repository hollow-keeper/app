import { pair } from './pair';

describe('valueInContainer', () => {
  beforeEach(async () => {});

  it('should be pair to 10', () => {
    const str = pair({ key: 'test', value: 'test' }, 10);
    expect(str).toEqual('test: test');
  });

  it('should be pair to 20', () => {
    const str = pair({ key: 'test', value: 'test' }, 20);
    expect(str).toEqual(
      'test:           test',
    );
  });
});
