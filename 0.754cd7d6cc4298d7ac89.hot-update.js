webpackHotUpdate(0,{

/***/ 261:
/*!**************************************!*\
  !*** ./containers/DistrictFinder.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(/*! ./~/redbox-react/lib/index.js */ 165);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(/*! ./~/react-transform-catch-errors/lib/index.js */ 144);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _react2 = __webpack_require__(/*! react */ 48);
	
	var _react3 = _interopRequireDefault(_react2);
	
	var _index5 = __webpack_require__(/*! ./~/react-transform-hmr/lib/index.js */ 145);
	
	var _index6 = _interopRequireDefault(_index5);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _GMap = __webpack_require__(/*! ./GMap */ 262);
	
	var _GMap2 = _interopRequireDefault(_GMap);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 100);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _components = {
	  DistrictFinder: {
	    displayName: 'DistrictFinder'
	  }
	};
	
	var _homeTklemReduxExamplesAsyncNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	  filename: '/home/tklem/redux/examples/async/containers/DistrictFinder.js',
	  components: _components,
	  locals: [module],
	  imports: [_react3.default]
	});
	
	var _homeTklemReduxExamplesAsyncNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	  filename: '/home/tklem/redux/examples/async/containers/DistrictFinder.js',
	  components: _components,
	  locals: [],
	  imports: [_react3.default, _index2.default]
	});
	
	function _wrapComponent(id) {
	  return function (Component) {
	    return _homeTklemReduxExamplesAsyncNode_modulesReactTransformHmrLibIndexJs2(_homeTklemReduxExamplesAsyncNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	  };
	}
	//import MapsAddrForm from './MapsAddrForm'
	
	
	var DistrictFinder = _wrapComponent('DistrictFinder')(function (_Component) {
	  _inherits(DistrictFinder, _Component);
	
	  function DistrictFinder(props) {
	    _classCallCheck(this, DistrictFinder);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DistrictFinder).call(this, props));
	  }
	
	  _createClass(DistrictFinder, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var address = _props.address;
	      var district = _props.district;
	
	      return _react3.default.createElement(
	        'div',
	        null,
	        _react3.default.createElement(
	          'h1',
	          null,
	          'Find your district!'
	        ),
	        _react3.default.createElement(_GMap2.default, null),
	        '//',
	        _react3.default.createElement(MapsAddrForm, null),
	        _react3.default.createElement(
	          'p',
	          null,
	          'My district number is: ',
	          district
	        )
	      );
	    }
	  }]);
	
	  return DistrictFinder;
	}(_react2.Component));
	
	DistrictFinder.propTypes = {
	  district: _react2.PropTypes.string.isRequired,
	  dispatch: _react2.PropTypes.func.isRequired
	};
	
	function mapStateToProps(state) {
	  var district = state.infoChange.district;
	
	  return {
	    district: district
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(DistrictFinder);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../~/webpack/buildin/module.js */ 109)(module)))

/***/ }

})
//# sourceMappingURL=0.754cd7d6cc4298d7ac89.hot-update.js.map