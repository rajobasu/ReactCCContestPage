import React, { Component } from "react";

class Latex extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }
  renderMath() {
    window.MathJax.Hub.Queue([
      "Typeset",
      window.MathJax.Hub,
      this.node.current,
    ]);
  }

  componentDidMount() {
    this.renderMath();
  }
  componentDidUpdate() {
    this.renderMath();
  }

  render() {
    const { text } = this.props;
    return <div ref={this.node}>{this.props.children}</div>;
  }
}

export default Latex;
