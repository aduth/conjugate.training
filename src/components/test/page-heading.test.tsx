import { render, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PageHeading from '../page-heading';
import useDocumentState from '#hooks/use-document-state.ts';

describe('PageHeading', () => {
  it('renders with default title from document state', () => {
    const { result } = renderHook(() => useDocumentState((state) => state.setTitle));
    result.current('State Title');
    const { getByRole } = render(<PageHeading />);

    const heading = getByRole('heading', { level: 1, name: 'State Title' });

    expect(heading).toBeTruthy();
    expect(heading.className).toBe('text-2xl font-bold tracking-tight');
  });

  it('renders with provided children', () => {
    const { getByRole } = render(<PageHeading>Custom Title</PageHeading>);

    const heading = getByRole('heading', { level: 1, name: 'Custom Title' });

    expect(heading).toBeTruthy();
  });

  it('applies additional class names', () => {
    const { getByRole } = render(<PageHeading className="custom-class" />);

    const heading = getByRole('heading', { level: 1 });

    expect(heading.className).toBe('text-2xl font-bold tracking-tight custom-class');
  });

  it('passes other props to the h1 element', () => {
    const { getByRole } = render(<PageHeading id="test-id" />);

    const heading = getByRole('heading', { level: 1 });

    expect(heading.id).toBe('test-id');
  });
});
