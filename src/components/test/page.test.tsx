import { render } from '@testing-library/react';
import { memoryLocation } from 'wouter/memory-location';
import { describe, it, expect } from 'vitest';
import Page from '../page';
import { Route, Router } from 'wouter';
import PageTitle from '#components/page-title';

describe('Page', () => {
  it('renders active tab, with title and labelled tab panel', () => {
    const { hook } = memoryLocation({ path: '/activities/new', static: true });

    const { getByRole } = render(
      <Router hook={hook}>
        <Route>
          <Page>Example Content</Page>
        </Route>
      </Router>,
    );

    expect(getByRole('tab', { selected: true, name: 'Add New' })).toBeTruthy();
  });

  it('renders page title and uses title as tab panel label', () => {
    const { getByRole } = render(
      <Page>
        <PageTitle>Example Title</PageTitle>
        <p>Example Content</p>
      </Page>,
    );

    expect(getByRole('tabpanel', { name: 'Example Title' })).toBeTruthy();
    expect(getByRole('heading', { level: 1, name: 'Example Title' })).toBeTruthy();
  });

  it('renders children content', () => {
    const { getByText } = render(
      <Page>
        <p>Example Content</p>
      </Page>,
    );

    expect(getByText('Example Content')).toBeTruthy();
  });
});
