import React from "react";
import Grid from "./Grid";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      flow: [],
      water: 10
    };
    this.init = [44, 40, 28, 16, 16];
    this.sum = this.init.reduce((a, b) => (a = a + b), 0);
    this.directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    // this.directions = [[0, 1]];
    this.addWater = this.addWater.bind(this);
  }

  legal(i, j) {
    return i >= 0 && i < 12 && j >= 0 && j < 12;
  }

  initialize() {
    var num = Math.floor(Math.random() * this.sum);
    var index = 0;
    var sum = 0;
    for (var i = 0; i < 5; i++) {
      sum += this.init[i];
      if (sum < num) {
        index++;
      }
    }
    this.init[index]--;
    this.sum--;
    return index;
  }

  queue = [];

  addWater(row, col) {
    var newNode = [...this.state.nodes];
    newNode[row][col] = (newNode[row][col] + 1) % 5;
    this.setState(newNode);
    if (newNode[row][col] === 0) {
      this.burst(row, col);
    }
  }

  burst = async (row, col) => {
    var newNode = [...this.state.nodes];
    var newFlow = [...this.state.flow];
    this.directions.forEach(async direction => {
      var newRow = row + direction[0];
      var newCol = col + direction[1];
      var flag = true;
      while (flag) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (!this.legal(newRow, newCol)) {
              reject(0);
              return;
            } else {
              if (newFlow[newRow - direction[0]][newCol - direction[1]]) {
                newFlow[newRow - direction[0]][newCol - direction[1]] = false;
              }
              if (newNode[newRow][newCol] === 0) {
                newFlow[newRow][newCol] = true;
                resolve(true);
              } else {
                newNode[newRow][newCol] = (newNode[newRow][newCol] + 1) % 5;
                if (newNode[newRow][newCol] === 0) {
                  reject(1);
                  return;
                }
                reject(0);
              }
              this.setState({ nodes: newNode, flow: newFlow });
            }
          }, 20);
        })
          .then(_ => {
            newRow += direction[0];
            newCol += direction[1];
          })
          .catch(code => {
            if (newFlow[newRow - direction[0]][newCol - direction[1]]) {
              newFlow[newRow - direction[0]][newCol - direction[1]] = false;
            }
            this.setState({ nodes: newNode, flow: newFlow });
            if (code === 1) {
              this.burst(newRow, newCol);
            }
            flag = false;
          });
      }
    });
  };

  componentDidMount() {
    const nodes = [];
    const flow = [];
    for (var i = 0; i < 12; i++) {
      var nodesRow = [];
      var flowRow = [];
      for (var j = 0; j < 12; j++) {
        nodesRow.push(this.initialize());
        flowRow.push(false);
      }
      nodes.push(nodesRow);
      flow.push(flowRow);
    }
    this.setState({ nodes, flow });
  }

  render() {
    return (
      <div id="table">
 
        {this.state.nodes.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="tableRow">
              {row.map((drop, colIndex) => {
                return (
                  <Grid
                    key={rowIndex + "," + colIndex}
                    row={rowIndex}
                    col={colIndex}
                    drop={drop}
                    flow={this.state.flow[rowIndex][colIndex]}
                    addWater={this.addWater}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Table;


       /* <Grid row={0} col={0} drop={1} flow={false} addWater={this.addWater} />
      <Grid row={0} col={0} drop={2} flow={false} addWater={this.addWater} />
      <Grid row={0} col={0} drop={3} flow={false} addWater={this.addWater} />
      <Grid row={0} col={0} drop={4} flow={false} addWater={this.addWater} /> */