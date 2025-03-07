import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';
import Gravatar from '../gravatar';

describe('Gravatar', () => {
  it('renders gravatar image for given email', async () => {
    const { findByRole } = render(<Gravatar email="andrew@andrewduthie.com" />);

    const image = (await findByRole('img')) as HTMLImageElement;

    expect(image.src).to.equal(
      'https://www.gravatar.com/avatar/f4226aad00975bb106756610d04b6bb3bd65027d37d1839dbd6c285f12c8a49d?d=mp',
    );
  });
});
