import 'fake-indexeddb/auto';
import { beforeAll, vi } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { beforeEach } from 'node:test';

beforeAll(() => {
  // Dexie uses `console.debug` internally for general debugging. This suppress those messages.
  vi.spyOn(console, 'debug').mockImplementation(() => {});

  // @radix-ui Avatar elements show placeholder while loading image, but images don't load by
  // default in happy-dom environment, so this simulates load finishing as soon as src is set.
  Object.defineProperty(Image.prototype, 'src', {
    set() {
      this.onload();
    },
  });
});

beforeEach(() => {
  global.indexedDB = new IDBFactory();
});
