webpackHotUpdate(0,{

/***/ 264:
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(/*! babel-polyfill */ 266);
	
	var _react = __webpack_require__(/*! react */ 48);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 224);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 100);
	
	var _DistrictFinder = __webpack_require__(/*! ./containers/DistrictFinder */ 261);
	
	var _DistrictFinder2 = _interopRequireDefault(_DistrictFinder);
	
	var _configureStore = __webpack_require__(/*! ./store/configureStore */ 265);
	
	var _configureStore2 = _interopRequireDefault(_configureStore);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var store = (0, _configureStore2.default)();
	
	(0, _reactDom.render)(_react2.default.createElement(
	  _reactRedux.Provider,
	  { store: store },
	  _react2.default.createElement(_DistrictFinder2.default, null)
	), document.getElementById('root'));

/***/ }

})
//# sourceMappingURL=0.399b7f709bb7519fbb16.hot-update.js.map