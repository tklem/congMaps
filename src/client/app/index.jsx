import 'babel-polyfill'
import React, { Component } from 'react'
import ReactDOM  from 'react-dom'
import { Provider } from 'react-redux'
import DistrictFinder from './components/DistrictFinder.jsx'
import configureStore from './store/configureStore.jsx'

let store = configureStore();

class App extends Component {
	render() {
	  return (
	  	<Provider store={store}>
	    	<DistrictFinder />
	  	</Provider>
	  );
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));

