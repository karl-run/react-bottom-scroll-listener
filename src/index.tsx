/**
 * @class BottomScrollListener
 *
 * A simple React component that lets you listen for when you have scrolled to the bottom.
 *
 */

// @ts-ignore
import debounce from 'lodash.debounce'
import * as React from 'react'

export type Props = {
  /** Required callback that will be invoked when scrolled to bottom */
  onBottom: () => void

  /** Optional debounce in milliseconds, defaults to 200ms */
  debounce: number

  /** Offset from bottom of page in pixels. E.g. 300 will trigger onBottom 300px from the bottom of the page */
  offset: number

  /** Optional children to be rendered */
  children?: React.ReactNode
}

class BottomScrollListener extends React.Component<Props> {
  public static defaultProps = {
    debounce: 200,
    offset: 0,
  }

  constructor(props: Props) {
    super(props)

    if (props.debounce) {
      this.handleOnScroll = debounce(this.handleOnScroll.bind(this), props.debounce, { trailing: true })
    } else {
      this.handleOnScroll = this.handleOnScroll.bind(this)
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleOnScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleOnScroll)
  }

  private handleOnScroll() {
    const scrollNode = document.scrollingElement || document.documentElement

    if (
      scrollNode != null &&
      scrollNode.scrollHeight - this.props.offset <= scrollNode.scrollTop + window.innerHeight
    ) {
      this.props.onBottom()
    }
  }

  public render() {
    if (!this.props.children) return null

    return this.props.children
  }
}

export default BottomScrollListener
