import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import DistrictFinder from './GMaps.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello React!</p>
        <AwesomeComponent />
        <DistrictFinder />
      </div>
    );
  }
}
render(<App/>, document.getElementById('app'));