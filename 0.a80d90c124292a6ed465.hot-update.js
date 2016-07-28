webpackHotUpdate(0,{

/***/ 262:
/*!****************************!*\
  !*** ./containers/GMap.js ***!
  \****************************/
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
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 100);
	
	var _actions = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../actions\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _components = {
	  GMap: {
	    displayName: 'GMap'
	  }
	};
	
	var _homeTklemReduxExamplesAsyncNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	  filename: '/home/tklem/redux/examples/async/containers/GMap.js',
	  components: _components,
	  locals: [module],
	  imports: [_react3.default]
	});
	
	var _homeTklemReduxExamplesAsyncNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	  filename: '/home/tklem/redux/examples/async/containers/GMap.js',
	  components: _components,
	  locals: [],
	  imports: [_react3.default, _index2.default]
	});
	
	function _wrapComponent(id) {
	  return function (Component) {
	    return _homeTklemReduxExamplesAsyncNode_modulesReactTransformHmrLibIndexJs2(_homeTklemReduxExamplesAsyncNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	  };
	}
	
	var GMap = _wrapComponent('GMap')(function (_Component) {
	  _inherits(GMap, _Component);
	
	  function GMap(props) {
	    _classCallCheck(this, GMap);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GMap).call(this, props));
	
	    _this.initMap = _this.initMap.bind(_this);
	    _this.initGeocode = _this.initGeocode.bind(_this);
	    return _this;
	  }
	
	  _createClass(GMap, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _props = this.props;
	      var fetchingMaps = _props.fetchingMaps;
	      var mapsLoaded = _props.mapsLoaded;
	      var dispatch = _props.dispatch;
	      var initialize = _props.initialize;
	
	      if (!fetchingMaps || !mapsLoaded) {
	        dispatch((0, _actions.initializeMaps)());
	      } else {
	        this.initMap();
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var mapsLoaded = nextProps.mapsLoaded;
	
	      if (!this.props.mapsLoaded && mapsLoaded) {
	        // load finished
	        this.initMap();
	      } else if (mapsLoaded && this.mapsLoaded) {
	        this.initGeocode(nextProps);
	      }
	    }
	  }, {
	    key: 'initGeocode',
	    value: function initGeocode(nextProps) {
	      var _this2 = this;
	
	      this.geocoder.geocode({ address: nextProps.address }, function (results, status) {
	        if (status == _this2.props.mapService.GeocoderStatus.OK) {
	          console.log("Component props received.");
	          dispatch((0, _actions.changeAddress)(nextProps.address));
	          dispatch((0, _actions.changeLatLng)(results[0].geometry.location));
	          _this2.map.setCenter(results[0].geometry.location);
	          _this2.map.setZoom(14);
	          _this2.marker.setMap(null);
	          _this2.marker = _this2.props.mapsService.Marker({
	            position: results[0].geometry.location
	          });
	          _this2.marker.setMap(_this2.map);
	        } else {
	          console.log("No update.");
	          console.log(nextProps.address);
	          console.log(status);
	          console.log("^ address");
	        }
	      });
	    }
	  }, {
	    key: 'initMap',
	    value: function initMap() {
	      var mapService = this.props.mapService;
	
	      this.map = new mapService.Map(this.refs.map, {
	        center: this.props.latLng,
	        zoom: 6,
	        mapTypeId: mapService.ROADMAP
	      });
	      this.geocoder = new mapService.Geocoder();
	      this.marker = new mapService.Marker({});
	      this.congLayer = new mapService.KmlLayer({
	        url: 'http://www.google.com/maps/d/u/0/kml?mid=1g4GcUoUk9gcYd5ZNHdW3gOFTdAk',
	        suppressInfoWindows: true,
	        map: this.map
	      });
	      this.congLayer.addListener('click', function (kmlEvent) {
	        console.log('Got clicked');
	        var congNumber = kmlEvent.featureData.name;
	        dispatch((0, _actions.changeDistrict)(congNumber));
	      });
	      console.log("Component mounted.");
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var mapStyle = {
	        width: 800,
	        height: 600,
	        border: '1px solid black',
	        display: 'block'
	      };
	
	      return _react3.default.createElement(
	        'div',
	        null,
	        _react3.default.createElement('div', { ref: 'map', style: mapStyle })
	      );
	    }
	  }]);
	
	  return GMap;
	}(_react2.Component));
	
	GMap.propTypes = {
	  address: _react2.PropTypes.string.isRequired,
	  fetchingMaps: _react2.PropTypes.bool.isRequired,
	  mapsLoaded: _react2.PropTypes.bool.isRequired,
	  latLng: _react2.PropTypes.object.isRequired,
	  mapService: _react2.PropTypes.object,
	  dispatch: _react2.PropTypes.func.isRequired
	};
	
	function mapStateToProps(state) {
	  var _state$infoChange = state.infoChange;
	  var address = _state$infoChange.address;
	  var latLng = _state$infoChange.latLng;
	  var _state$createMap = state.createMap;
	  var fetchingMaps = _state$createMap.fetchingMaps;
	  var mapsLoaded = _state$createMap.mapsLoaded;
	  var mapService = _state$createMap.mapService;
	
	  return {
	    address: address,
	    fetchingMaps: fetchingMaps,
	    mapsLoaded: mapsLoaded,
	    mapService: mapService,
	    latLng: latLng
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(GMap);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../~/webpack/buildin/module.js */ 109)(module)))

/***/ },

/***/ 263:
/*!************************************!*\
  !*** ./containers/MapsAddrForm.js ***!
  \************************************/
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
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 100);
	
	var _actions = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../actions\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _components = {
	  MapsAddrForm: {
	    displayName: 'MapsAddrForm'
	  }
	};
	
	var _homeTklemReduxExamplesAsyncNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	  filename: '/home/tklem/redux/examples/async/containers/MapsAddrForm.js',
	  components: _components,
	  locals: [module],
	  imports: [_react3.default]
	});
	
	var _homeTklemReduxExamplesAsyncNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	  filename: '/home/tklem/redux/examples/async/containers/MapsAddrForm.js',
	  components: _components,
	  locals: [],
	  imports: [_react3.default, _index2.default]
	});
	
	function _wrapComponent(id) {
	  return function (Component) {
	    return _homeTklemReduxExamplesAsyncNode_modulesReactTransformHmrLibIndexJs2(_homeTklemReduxExamplesAsyncNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	  };
	}
	
	var MapsAddrForm = _wrapComponent('MapsAddrForm')(function (_Component) {
	  _inherits(MapsAddrForm, _Component);
	
	  function MapsAddrForm(props) {
	    _classCallCheck(this, MapsAddrForm);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapsAddrForm).call(this, props));
	
	    _this.state = {
	      addressField: ""
	    };
	    _this.handleAddrChange = _this.handleAddrChange.bind(_this);
	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	    return _this;
	  }
	
	  _createClass(MapsAddrForm, [{
	    key: 'handleAddrChange',
	    value: function handleAddrChange(e) {
	      this.setState({ addressField: e.target.value });
	    }
	  }, {
	    key: 'handleSubmit',
	    value: function handleSubmit(e) {
	      e.preventDefault();
	      var address = this.state.addressField.trim();
	      if (!address) {
	        return;
	      }
	      var dispatch = this.props.dispatch;
	
	      dispatch((0, _actions.changeAddress)(this.state.addressField));
	      this.setState({ addressField: "" });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react3.default.createElement(
	        'form',
	        { className: 'addrForm', onSubmit: this.handleSubmit },
	        _react3.default.createElement('input', {
	          type: 'text',
	          placeholder: 'Your address',
	          value: this.state.addressField,
	          onChange: this.handleAddrChange
	        }),
	        _react3.default.createElement('input', { type: 'submit', value: 'Submit' })
	      );
	    }
	  }]);
	
	  return MapsAddrForm;
	}(_react2.Component));
	
	MapsAddrForm.propTypes = {
	  dispatch: _react2.PropTypes.func.isRequired
	};
	
	exports.default = (0, _reactRedux.connect)()(MapsAddrForm);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../~/webpack/buildin/module.js */ 109)(module)))

/***/ }

})
//# sourceMappingURL=0.a80d90c124292a6ed465.hot-update.js.map