import React from "react";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: props.row,
      col: props.col,
      drop: props.drop,
      flow: props.flow,
      
    };
  }


  componentDidUpdate(prevProps) {
    if (this.props.drop !== prevProps.drop || this.props.flow !== prevProps.flow) {
      
      this.setState({
        drop: this.props.drop,
        flow: this.props.flow
      });
    }
  }

  render() {
    return (
      <div className="grid">
        <a
          href="/#"
          className={this.state.flow? "flow" : "grid"+this.state.drop}
          onClick={e => {
              e.preventDefault();
              this.props.addWater(this.state.row, this.state.col);
            }
          }
        >
        </a>
      </div>
    );
  }
}

export default Grid;
