import { beforeAll } from 'vitest';

beforeAll(() => {
  Object.defineProperty(Image.prototype, 'src', {
    set() {
      this.onload();
    },
  });
});
