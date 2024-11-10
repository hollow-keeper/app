import { horizontalSeparator } from "./horizontal-serparator";

describe('horizontalSeparator', () => {
  
  beforeEach(async () => {});

  it('should be spearate to 10', () => {
    const str = horizontalSeparator(10);
    expect(str).toEqual('----------');
  });

  it('should be spearate to 20', () => {
    const str = horizontalSeparator(20);
    expect(str).toEqual('--------------------');
  });
});
