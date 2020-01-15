/**
 * @class BottomScrollListener
 *
 * A simple React component that lets you listen for when you have scrolled to the bottom.
 *
 */

import debounce from 'lodash.debounce'
import React, { Component } from 'react'

export interface Props {
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

  private optionalScrollContainerRef: React.RefObject<HTMLElement> = React.createRef()

  public constructor(props: Props) {
    super(props)

    if (props.debounce) {
      this.handleOnScroll = debounce(this.handleOnScroll.bind(this), props.debounce, { leading: true, trailing: true })
    } else {
      this.handleOnScroll = this.handleOnScroll.bind(this)
    }
  }

  public componentDidMount() {
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

  public componentWillUnmount() {
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

  public handleOnScroll() {
    if (this.props.children instanceof Function) {
      const scrollNode = this.optionalScrollContainerRef.current

      if (scrollNode != null) {
        const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + scrollNode.clientHeight)
        const scrollPosition = Math.round(scrollNode.scrollHeight - this.props.offset)

        if (scrollPosition <= scrollContainerBottomPosition) {
          this.props.onBottom()
        }
      }
    } else {
      const scrollNode = document.scrollingElement || document.documentElement
      const scrollContainerBottomPosition = Math.round(scrollNode.scrollTop + window.innerHeight)
      const scrollPosition = Math.round(scrollNode.scrollHeight - this.props.offset)

      if (scrollPosition <= scrollContainerBottomPosition) {
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
