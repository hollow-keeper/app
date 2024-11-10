import { valueInContainer } from './value-in-container';

describe('valueInContainer', () => {
  beforeEach(async () => {});

  it('should be spearate to 10', () => {
    const str = valueInContainer('test', 10);
    expect(str).toEqual('----------\n|  test  |\n----------');
  });

  it('should be spearate to 20', () => {
    const str = valueInContainer('test', 20);
    expect(str).toEqual(
      '--------------------\n|       test       |\n--------------------',
    );
  });
});
