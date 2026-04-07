import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';
import { TextFieldSet } from './TextFieldSet';

function TextFieldGallery() {
  return (
    <div className='flex w-[36rem] flex-col gap-[1.6rem] bg-[#d8d0fb] p-[2rem]'>
      <TextField label='Email' placeholder='email@example.com' />
      <TextField helperText='Use 8 characters or more.' label='Password' placeholder='Password' />
      <TextField
        error='This field is required.'
        label='Nickname'
        placeholder='Nickname'
        state='error'
      />
      <TextField
        helperText='Up to 200 characters'
        label='Bio'
        multiline
        placeholder='Write a short introduction.'
      />
    </div>
  );
}

function TextFieldSetGallery() {
  return (
    <div className='w-[36rem] bg-[#d8d0fb] p-[2rem]'>
      <TextFieldSet description='Organize related fields as one group.' title='Profile fields'>
        <TextField label='Email' placeholder='email@example.com' />
        <TextField label='Nickname' placeholder='Nickname' />
        <TextField helperText='Up to 200 characters' label='Bio' multiline />
      </TextFieldSet>
    </div>
  );
}

const meta = {
  title: 'Shared/UI/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    placeholder: 'Enter text',
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: 'This field is required.',
    state: 'error',
  },
};

export const Textarea: Story = {
  args: {
    multiline: true,
    helperText: 'Up to 200 characters',
    placeholder: 'Enter detailed content',
  },
};

export const Variants: Story = {
  render: () => <TextFieldGallery />,
};

export const Set: Story = {
  render: () => <TextFieldSetGallery />,
};
