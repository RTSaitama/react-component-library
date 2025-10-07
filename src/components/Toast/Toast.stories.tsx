import type { Meta, StoryObj } from '@storybook/nextjs';
import { ToastContainer } from './Toast';

const meta: Meta<typeof ToastContainer> = {
  title: 'Components/Toast',
  component: ToastContainer,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof ToastContainer>;

export const Default: Story = { render: (args) => <ToastContainer {...args} /> };
export const Variants: Story = { render: (args) => <ToastContainer {...args} />, name: 'Variants' };
export const Durations: Story = { render: (args) => <ToastContainer {...args} />, name: 'Different Durations' };
export const ManualClose: Story = { render: (args) => <ToastContainer {...args} />, name: 'Manual Close' };
export const ClosableToast = () => <ToastContainer />;