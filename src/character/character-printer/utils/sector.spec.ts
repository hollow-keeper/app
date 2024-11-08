import { sector } from './sector';

describe('sector', () => {
  beforeEach(async () => {});

  it('should be sector to 10', () => {
    const str = sector([{ key: 'test', value: 'test' }, 'test'], 10);
    expect(str).toEqual(' test:test\n test\n----------');
  });

  it('should be sector to 20', () => {
    const str = sector([{ key: 'test', value: 'test' }], 20);
    expect(str).toEqual(' test:         test\n--------------------');
  });
});
