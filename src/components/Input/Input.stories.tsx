import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Input } from './Input';
import { InputProps } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email'],
      description: 'Input type',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when input has value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;
 
const InputWrapper = (args: InputProps) => {
  const [value, setValue] = useState(args.value || '');
  return <Input {...args} value={value} onChange={setValue} />;
};
 
export const Default: Story = {
  render: InputWrapper,
  args: {
    type: 'text',
    placeholder: 'Enter your text text',
    label: 'Text Input',
  },
};
 
export const Password: Story = {
  render: InputWrapper,
  args: {
    type: 'password',
    placeholder: 'Enter your password here',
    label: 'Password',
    value: 'some password',
  },
};
 
export const Clearable: Story = {
  render: InputWrapper,
  args: {
    type: 'text',
    placeholder: 'Type something...',
    label: 'Clearable Input',
    clearable: true,
    value: 'Some text',
  },
};
 
export const PasswordClearable: Story = {
  render: InputWrapper,
  args: {
    type: 'password',
    placeholder: 'Enter password...',
    label: 'Password with Clear',
    clearable: true,
    value: 'my password',
  },
};

 
export const Number: Story = {
  render: InputWrapper,
  args: {
    type: 'number',
    placeholder: 'Enter a number...',
    label: 'Number Input',
    clearable: true,
    value: '1234567890',
  },
};
 
export const Email: Story = {
  render: InputWrapper,
  args: {
    type: 'email',
    placeholder: 'you@example.com',
    label: 'Email',
    clearable: true,
  },
};

 
export const WithError: Story = {
  render: InputWrapper,
  args: {
    type: 'email',
    placeholder: 'you@example.com',
    label: 'Email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
    clearable: true,
  },
};

 
export const Disabled: Story = {
  render: (args) => <Input {...args} onChange={() => {}} />,
  args: {
    type: 'text',
    placeholder: 'Disabled input',
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true,
  },
};

 
export const NoLabel: Story = {
  render: InputWrapper,
  args: {
    type: 'text',
    placeholder: 'Input without label',
    clearable: true,
  },
};
 
export const AllVariants: Story = {
  render: () => {
    const [text, setText] = useState('Sample text');
    const [password, setPassword] = useState('password123');
    const [number, setNumber] = useState('42');
    const [email, setEmail] = useState('user@example.com');
    const [errorEmail, setErrorEmail] = useState('invalid');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
        <Input
          type="text"
          value={text}
          onChange={setText}
          label="Text Input"
          placeholder="Enter text..."
          clearable
        />
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          label="Password Input"
          placeholder="Enter password..."
          clearable
        />
        <Input
          type="number"
          value={number}
          onChange={setNumber}
          label="Number Input"
          placeholder="Enter number..."
          clearable
        />
        <Input
          type="email"
          value={email}
          onChange={setEmail}
          label="Email Input"
          placeholder="you@example.com"
          clearable
        />
        <Input
          type="email"
          value={errorEmail}
          onChange={setErrorEmail}
          label="Email with Error"
          placeholder="you@example.com"
          clearable
          error="Please enter a valid email address"
        />
        <Input
          type="text"
          value="Disabled input"
          onChange={() => {}}
          label="Disabled Input"
          disabled
        />
      </div>
    );
  },
};