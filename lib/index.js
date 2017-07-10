import { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class BottomScrollListener extends Component {
  constructor(props) {
    super(props);

    this.handleOnScroll = debounce(this.handleOnScroll.bind(this), props.debounce, { trailing: true });
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll() {
    if (document.body.scrollHeight - this.props.offset <= (document.body.scrollTop + window.innerHeight)) {
      this.props.onBottom();
    }
  }

  render() {
    return null;
  }
}

BottomScrollListener.defaultProps = {
  debounce: 200,
  offset: 0,
};

BottomScrollListener.propTypes = {
  onBottom: PropTypes.func.isRequired,
  debounce: PropTypes.number,
  offset: PropTypes.number,
};

export default BottomScrollListener;
