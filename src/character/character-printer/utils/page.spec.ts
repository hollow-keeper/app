import { page } from './page';

describe('sector', () => {
  beforeEach(async () => {});

  it('should be page to 10', () => {
    const str = page([[[{ key: 'test', value: 'test' }, 'test']]], 10);
    expect(str).toEqual(' test:test\n test\n\n==========');
  });

  it('should be page to 20', () => {
    const str = page([[[{ key: 'test', value: 'test' }]]], 20);
    expect(str).toEqual(' test:         test\n\n====================');
  });
});
