# react-bottom-scroll-listener [![NPM version](https://img.shields.io/npm/v/react-bottom-scroll-listener.svg?style=flat)](https://www.npmjs.com/package/react-bottom-scroll-listener)

A simple React component that lets you listen for when you have scrolled to the bottom.

## Installation

npm:
`npm install react-bottom-scroll-listener`

yarn:
`yarn add react-bottom-scroll-listener`

## Usage

```
<BottomScrollListener onBottom={callback} />
```
__Props__

* `onBottom` __(required):__ callback invoked when bottom is reached
* `debounce`: _(default: 200)_ integer in ms, how much debounce there should be on callback
* `offset`: _(default: 0)_ offset from bottom in pixels. E.g. 300 if it should invoke `onBottom` 300px before the bottom.
* `children`: _(default: null)_ Not required, but you can use this to wrap your components. Most useful when you have some conditional rendering.
