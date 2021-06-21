/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
<template>
  <button :class="classes" @click="onClick">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import classNames from 'classnames';

export default defineComponent({
  name: 'my-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'medium',
      validator: (propValue: any) => ['small', 'medium', 'large'].indexOf(propValue) !== -1,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes(): string {
      return classNames(
        'w-full',
        // size
        'py-2',
        {
          'px-6': this.size !== 'small',
          'px-4': this.size === 'small',
          'text-xs': this.size !== 'large',
          'leading-6': this.size === 'medium',
          'leading-7': this.size === 'large',
        },
        'font-medium',
        'text-center',
        // text color
        {
          'text-white': !this.outline && this.color !== 'light',
          'text-blue-700':
            (this.color === 'primary' && this.outline) || this.color === 'link',
          'text-pink-500': this.color === 'secondary' && this.outline,
          'text-green-500': this.color === 'success' && this.outline,
          'text-red-500': this.color === 'danger' && this.outline,
          'text-yellow-500': this.color === 'warning' && this.outline,
          'text-indigo-500': this.color === 'info' && this.outline,
          'text-gray-500': this.color === 'light' && this.outline,
          'text-black-500': this.color === 'dark' && this.outline,
        },
        {
          underline: this.color === 'link',
        },
        'uppercase',
        'transition',
        // background
        {
          'bg-blue-700': this.color === 'primary' && !this.outline,
          'bg-pink-500': this.color === 'secondary' && !this.outline,
          'bg-green-500': this.color === 'success' && !this.outline,
          'bg-red-500': this.color === 'danger' && !this.outline,
          'bg-yellow-500': this.color === 'warning' && !this.outline,
          'bg-indigo-500': this.color === 'info' && !this.outline,
          'bg-gray-100': this.color === 'light' && !this.outline,
          'bg-black': this.color === 'dark' && !this.outline,
          'bg-transparent': this.color === 'link' && !this.outline,
        },
        'rounded',
        {
          'rounded-full': this.rounded,
        },
        // border
        {
          'border-2': this.outline,
          'border-blue-700': this.color === 'primary' && this.outline,
          'border-pink-500': this.color === 'secondary' && this.outline,
          'border-green-500': this.color === 'success' && this.outline,
          'border-red-500': this.color === 'danger' && this.outline,
          'border-yellow-500': this.color === 'warning' && this.outline,
          'border-indigo-500': this.color === 'info' && this.outline,
          'border-gray-500': this.color === 'light' && this.outline,
          'border-black-500': this.color === 'dark' && this.outline,
          'border-transparent': this.color === 'link' && this.outline,
        },
        {
          shadow: this.color !== 'link',
        },
        'ripple',
        // hover
        {
          'hover:bg-blue-800': this.color === 'primary' && !this.outline,
          'hover:bg-pink-600': this.color === 'secondary' && !this.outline,
          'hover:bg-green-600': this.color === 'success' && !this.outline,
          'hover:bg-red-600': this.color === 'danger' && !this.outline,
          'hover:bg-yellow-600': this.color === 'warning' && !this.outline,
          'hover:bg-indigo-600': this.color === 'info' && !this.outline,
          'hover:bg-gray-200': this.color === 'light' && !this.outline,
          'hover:bg-black-600': this.color === 'dark' && !this.outline,
          'hover:text-blue-900': this.color === 'link' && !this.outline,
          'hover:bg-blue-100': this.color === 'primary' && this.outline,
          'hover:bg-pink-100': this.color === 'secondary' && this.outline,
          'hover:bg-green-100': this.color === 'success' && this.outline,
          'hover:bg-red-100': this.color === 'danger' && this.outline,
          'hover:bg-yellow-100': this.color === 'warning' && this.outline,
          'hover:bg-indigo-100': this.color === 'info' && this.outline,
          'hover:bg-gray-100': this.color === 'dark' && this.outline,
        },
        {
          'hover:shadow-lg': this.color !== 'link',
        },
        'focus:outline-none',
      );
    },
  },

  methods: {
    onClick() {
      this.$emit('onClick');
    },
  },
});
</script>
