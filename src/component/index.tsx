import { MutableRefObject } from 'react';
import useBottomScrollListener, { DebounceOptions } from '../hook';

export interface BottomScrollListenerProps {
  /**
   * Required callback that will be invoked when scrolled to bottom
   */
  onBottom: () => void;

  /**
   * Offset from bottom of page in pixels. E.g. 300 will trigger onBottom 300px from the bottom of the page
   */
  offset?: number;

  /**
   * Optional debounce in milliseconds, defaults to 200ms
   */
  debounce?: number;

  /**
   * Options passed to lodash.debounce, see https://lodash.com/docs/4.17.15#debounce
   */
  debounceOptions?: DebounceOptions;

  /**
   * Triggers the onBottom callback when the page has no scrollbar, defaults to false
   */
  triggerOnNoScroll?: boolean;

  /**
   *   Optional children to be rendered.
   *
   *   If children passed is a function, that function will be passed a React.RefObject<HTMLElement>
   *   that ref shall be passed to a child tag that will be used for the scrolling container.
   * */
  children?:
    | JSX.Element
    | (<T>(ref: ((instance: T | null) => void) | MutableRefObject<T | null> | null) => JSX.Element);
}

/**
 * A simple React component that lets you listen for when you have scrolled to the bottom.
 *
 * @param {BottomScrollListenerProps} props
 */
const BottomScrollListener = ({
  children,
  onBottom,
  offset,
  debounce,
  debounceOptions,
  triggerOnNoScroll,
}: BottomScrollListenerProps): JSX.Element | null => {
  const optionalScrollContainerRef = useBottomScrollListener(onBottom, {
    offset,
    debounce,
    debounceOptions,
    triggerOnNoScroll,
  });

  if (!children) return null;
  else if (typeof children === 'function') return children(optionalScrollContainerRef);
  else return children;
};

export default BottomScrollListener;
