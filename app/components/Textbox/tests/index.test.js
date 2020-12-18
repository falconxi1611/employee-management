import React from 'react';
import { render } from 'react-testing-library';

import Textbox from '../index';

describe('<Textbox />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const { container } = render(<Textbox id={id} />);
    expect(container.querySelector('h3').id).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const { container, queryByText } = render(<Textbox>{children}</Textbox>);
    const { childNodes } = container.querySelector('h3');
    expect(childNodes).toHaveLength(1);
    expect(queryByText(children)).not.toBeNull();
  });
});
