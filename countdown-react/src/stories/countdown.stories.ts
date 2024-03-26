import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from '@storybook/test';
import { CountdownElement } from '../countdown.customelement';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Countdown',
  component: 'rc-countdown',
  parameters: {
    layout: 'centered'   
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj;

export const Simple: Story = { 
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Try: Story = {
  render: () => html`
      <rc-countdown start-seconds="20"></rc-countdown>
      <p>
        <button type="button" onclick="document.querySelector('rc-countdown').toggle()">Toggle</button>
      </p>
    `,
};