# react-bottom-scroll-listener [![NPM version](https://img.shields.io/npm/v/react-bottom-scroll-listener.svg?style=flat)](https://www.npmjs.com/package/react-bottom-scroll-listener) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/minzip/react-bottom-scroll-listener.svg)](https://github.com/karl-run/react-bottom-scroll-listener)

A simple React component that lets you listen for when you have scrolled to the bottom.

### Window

![Example](./example.gif)


### Container 

![Example](./example_inner.gif)

## Installation

npm:
`npm install react-bottom-scroll-listener`

yarn:
`yarn add react-bottom-scroll-listener`

## Usage

### On bottom of entire screen

Simply have the BottomScrollListener anywhere in your application and pass it a function as `onBottom`-prop.

```
<BottomScrollListener onBottom={callback} />
```

### On bottom of specific container

Pass the BottomScrollListener a function inside the JSX_tag, receive the `scrollRef` in this function from the BottomScrollListener
and pass it to the component you want to listen for a scroll event on.

```
<BottomScrollListener onBottom={callback}>
  {scrollRef => (
    <div ref={scrollRef}>
      Callback will be invoked when this container is scrolled to bottom.
    </div>
  )}
</BottomScrollListener>
```

> Those are some weird children, what's going on?

This pattern is called "function as a child". What this allows is that the BottomScrollListener can pass you a `React.RefObject`. This
`React.RefObject` can then be passed to whatever component you want to be notified when you hit the bottom of. Without this it would be
difficult to attach event listeners for scrolling to an arbitrary element.

**Props**

| Property |           Type           | Default | Description                                                                                                                                                                                                                                                                                 |
| -------- | :----------------------: | :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onBottom |         Function         |  null   | **(required):** callback invoked when bottom is reached                                                                                                                                                                                                                                     |
| debounce |          number          |   200   | milliseconds, how much debounce there should be on the callback                                                                                                                                                                                                                             |
| offset   |          number          |    0    | offset from bottom in pixels. E.g. 300 if it should invoke `onBottom` 300px before the bottom.                                                                                                                                                                                              |
| children | React.Node _or_ Function |  null   | Not required, but you can use this to wrap your components. Most useful when you have some conditional rendering. If this is a function, that function will receive a React.RefObject that _needs_ to be passed to a child element. This element will then be used as the scroll container. |
