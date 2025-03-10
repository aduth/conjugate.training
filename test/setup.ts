import 'fake-indexeddb/auto';
import { beforeEach, beforeAll, vi } from 'vitest';
import { db } from '../src/db';

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

  // @radix-ui uses DOM element functions not implemented by happy-dom
  HTMLElement.prototype.hasPointerCapture = vi.fn().mockImplementation(() => false);
});

beforeEach(async () => {
  await db.activities.clear();
});
