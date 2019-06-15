# react-bottom-scroll-listener [![NPM version](https://img.shields.io/npm/v/react-bottom-scroll-listener.svg?style=flat)](https://www.npmjs.com/package/react-bottom-scroll-listener) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/minzip/react-bottom-scroll-listener.svg)](https://github.com/karl-run/react-bottom-scroll-listener)

A simple **React hook** and **React component** that lets you listen for when you have scrolled to the bottom.

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

### Hook

[Full example](/example/src/HookExample.js)

#### On bottom of entire screen

Use the hook in any functional component, the callback will be invoked
when the user scrolls to the bottom of the document

```jsx
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

useBottomScrollListener(callback);
```

#### On bottom of specific container

Use the hook in any functional component, use the ref given from the hook
and pass it to the element you want to use as a scroll container

The callback will be invoked when the user scrolls to the bottom of the container

```jsx
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const containerRef = useBottomScrollListener(callback);

<div ref={scrollRef}>Callback will be invoked when this container is scrolled to bottom.</div>
```

**Parameters**

```
useBottomScrollListener(
   onBottom,       // Required callback that will be invoked when scrolled to bottom
   offset = 0,     //  Offset from bottom of page in pixels. E.g. 300 will trigger onBottom 300px from the bottom of the page
   debounce = 200, //  Optional debounce in milliseconds, defaults to 200ms
) // returns React.MutableRefObject Optionally you can use this to pass to a element to use that as the scroll container
```

### Component

[Full example](/example/src/ComponentExample.js)

#### On bottom of entire screen

Simply have the BottomScrollListener anywhere in your application and pass it a function as `onBottom`-prop.

```jsx
import BottomScrollListener from 'react-bottom-scroll-listener';

<BottomScrollListener onBottom={callback} />
```

#### On bottom of specific container

Pass the BottomScrollListener a function inside the JSX_tag, receive the `scrollRef` in this function from the BottomScrollListener
and pass it to the component you want to listen for a scroll event on.

```jsx
import BottomScrollListener from 'react-bottom-scroll-listener';

<BottomScrollListener onBottom={callback}>
  {scrollRef => (
    <div ref={scrollRef}>Callback will be invoked when this container is scrolled to bottom.</div>
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

# Migrating from 2.x.x to 3.x.x

There are no breaking changes except that the required version of React is now 16.8.0. If you are on an
older version of React you can either upgrade React, or stay on version 2.x.x. If you already
are on a newer version of React you don't have to do anything, except maybe try out the new hook implementation. :)
