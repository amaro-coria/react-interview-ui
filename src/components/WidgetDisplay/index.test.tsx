// src/components/WidgetDisplay/index.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import WidgetDisplay from '.';
import { Widget } from '../../lib/apiConnect';

describe('WidgetDisplay', () => {
  it('renders widget information', () => {
    const widget: Widget = { 
      description: 'German movie star', 
      name: 'Widget von Hammersmark', 
      price: 19.45 
    };

    render(
      <WidgetDisplay 
        widget={widget} 
        onEdit={() => {}} 
        onDelete={() => {}} 
      />
    );

    expect(screen.queryByText(widget.description, { exact: false })).toBeInTheDocument();
    expect(screen.queryByText(widget.name, { exact: false })).toBeInTheDocument();
  });
});