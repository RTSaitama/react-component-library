 import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Sidebar, SidebarProps } from '../components/Sidebar/Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

 
const SidebarWrapper = (args: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen ?? true);

  return (
    <div style={{ height: '100vh', background: '#f9fafb' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          margin: '20px',
          borderRadius: '8px',
          background: '#3b82f6',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Open Sidebar
      </button>

      <Sidebar
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

 const sampleItems: SidebarProps['items'] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    onClick: () => console.log('Dashboard clicked'),
  },
  {
    id: 'products',
    label: 'Products',
    children: [
      {
        id: 'products-all',
        label: 'All Products',
        onClick: () => console.log('All Products'),
      },
      {
        id: 'products-categories',
        label: 'Categories',
        children: [
          { id: 'electronics', label: 'Electronics', onClick: () => console.log('Electronics') },
          { id: 'clothing', label: 'Clothing', onClick: () => console.log('Clothing') },
        ],
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    onClick: () => console.log('Settings clicked'),
  },
];
export const Default: Story  = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    isOpen: false,
    items: sampleItems,
    title: 'Main Menu',
  },
};
 export const Closed: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    isOpen: false,
    items: sampleItems,
    title: 'Main Menu',
  },
};

export const Open: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    isOpen: true,
    items: sampleItems,
    title: 'Main Menu',
  },
};

export const NestedMenu: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    isOpen: true,
    title: 'Nested Menu',
    items: sampleItems,
  },
};
 