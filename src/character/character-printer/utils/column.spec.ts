import { column } from './column';

describe('column', () => {
  beforeEach(async () => {});

  it('should be column to 10', () => {
    const str = column([[{ key: 'test', value: 'test' }]], 10);
    expect(str).toEqual(' test:test\n\n==========');
  });

  it('should be column to 20', () => {
    const str = column([[{ key: 'test', value: 'test' }]], 20);
    expect(str).toEqual(' test:         test\n\n====================');
  });
});
