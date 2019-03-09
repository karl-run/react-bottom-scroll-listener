/**
 * @class BottomScrollListener
 *
 * A simple React component that lets you listen for when you have scrolled to the bottom.
 *
 */

// @ts-ignore
import debounce from 'lodash.debounce'
import React, { Component } from 'react'

export type Props = {
  /** Required callback that will be invoked when scrolled to bottom */
  onBottom: () => void

  /** Optional debounce in milliseconds, defaults to 200ms */
  debounce: number

  /** Offset from bottom of page in pixels. E.g. 300 will trigger onBottom 300px from the bottom of the page */
  offset: number

  /**
   *   Optional children to be rendered.
   *
   *   If children passed is a function, that function will be passed a React.RefObject<HTMLElement>
   *   that ref shall be passed to a child tag that will be used for the scrolling container.
   * */
  children?: React.ReactNode | (<T extends HTMLElement>(ref: React.Ref<T>) => React.ReactNode)
}

class BottomScrollListener extends Component<Props> {
  public static defaultProps = {
    debounce: 200,
    offset: 0,
  }

  optionalScrollContainerRef: React.RefObject<HTMLElement> = React.createRef()

  constructor(props: Props) {
    super(props)

    if (props.debounce) {
      this.handleOnScroll = debounce(this.handleOnScroll.bind(this), props.debounce, { trailing: true })
    } else {
      this.handleOnScroll = this.handleOnScroll.bind(this)
    }
  }

  componentDidMount() {
    if (this.props.children instanceof Function) {
      if (this.optionalScrollContainerRef.current) {
        this.optionalScrollContainerRef.current.addEventListener('scroll', this.handleOnScroll)
      } else {
        throw Error(
          'Unable to use scroll container: Ref to child not available, did you pass the ref prop to an element?',
        )
      }
    } else {
      document.addEventListener('scroll', this.handleOnScroll)
    }
  }

  componentWillUnmount() {
    if (this.props.children instanceof Function) {
      if (this.optionalScrollContainerRef.current) {
        this.optionalScrollContainerRef.current.removeEventListener('scroll', this.handleOnScroll)
      } else {
        throw Error('Unable to clean up scroll container: Ref has been unmounted prematurely.')
      }
    } else {
      document.removeEventListener('scroll', this.handleOnScroll)
    }
  }

  handleOnScroll() {
    if (this.props.children instanceof Function) {
      const scrollNode = this.optionalScrollContainerRef.current

      if (
        scrollNode != null &&
        scrollNode.scrollHeight - this.props.offset <= scrollNode.scrollTop + scrollNode.clientHeight
      ) {
        this.props.onBottom()
      }
    } else {
      const scrollNode = document.scrollingElement || document.documentElement

      if (
        scrollNode != null &&
        scrollNode.scrollHeight - this.props.offset <= scrollNode.scrollTop + window.innerHeight
      ) {
        this.props.onBottom()
      }
    }
  }

  public render() {
    if (!this.props.children) return null

    if (this.props.children instanceof Function) {
      return this.props.children(this.optionalScrollContainerRef)
    } else {
      return this.props.children
    }
  }
}

export default BottomScrollListener
