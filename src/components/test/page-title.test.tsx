import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PageTitle from '../page-title';

describe('PageTitle', () => {
  it('sets the document title correctly', () => {
    render(<PageTitle>Home</PageTitle>);

    expect(document.title).toBe(`Conjugate Training - Home`);
  });
});
