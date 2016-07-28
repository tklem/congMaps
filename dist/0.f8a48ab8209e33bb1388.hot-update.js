webpackHotUpdate(0,{

/***/ 265:
/*!*********************************!*\
  !*** ./store/configureStore.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;
	
	var _redux = __webpack_require__(/*! redux */ 165);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 625);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reduxLogger = __webpack_require__(/*! redux-logger */ 624);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	var _reducers = __webpack_require__(/*! ../reducers */ 109);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function configureStore(preloadedState) {
	  var store = (0, _redux.createStore)(_reducers2.default, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reduxLogger2.default)()));
	
	  return store;
	}

/***/ }

})
//# sourceMappingURL=0.f8a48ab8209e33bb1388.hot-update.js.map