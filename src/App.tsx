import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  //adds showGraph variable to every instance of Istate
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      //prevent graph from being shown before button is clicked
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    //only render graph when the showGraph property is true
    if (this.state.showGraph) {
    return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    //creates variable x and initializes to zero
    let x = 0;
    //uses set interval to continuously call getData function
    //update graph (set showGraph to true and update with new data) each time function is called
    const interval = setInterval(() => {
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
      this.setState({
        data: serverResponds,
        showGraph: true,
      });
    });
    //once the graph is updated 1000 times, the interval is cleared
    x++;
    if(x>1000) {
      clearInterval(interval);
    }
    //delay each call by 100 milliseconds
   }, 100);
}

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
