'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSize(props) {
  var width = props.diagonal;
  var height = props.diagonal;

  if (props.flatTop) {
    width *= 1.05;
    height *= 1.05;
  }

  if (props.backgroundScale) {
    width *= props.backgroundScale;
    height = width;
  } else if (props.backgroundWidth) {
    width = props.backgroundWidth;
    height = props.backgroundHeight;
  } else if (props.backgroundSize) {
    width = props.backgroundSize;
    height = props.backgroundSize;
  }

  return { width: width, height: height };
}

function BackgroundDef(props) {
  var diagonal = props.diagonal;

  var _getSize = getSize(props),
      width = _getSize.width,
      height = _getSize.height;

  var hasSize = width !== diagonal;
  var imgWidth = hasSize ? width : '100%';
  var imgHeight = hasSize ? height : '100%';
  var yOffset = props.yOffset || 0;
  var xOffset = typeof props.xOffset === 'undefined' && props.flatTop ? 0 - imgWidth * 0.065 : 0;

  return _react2.default.createElement(
    'defs',
    null,
    _react2.default.createElement(
      'pattern',
      { id: props.id, width: width, height: height, patternUnits: 'userSpaceOnUse' },
      _react2.default.createElement('image', { x: xOffset, y: yOffset, width: imgWidth, height: imgHeight, xlinkHref: props.backgroundImage })
    )
  );
}

/* eslint-disable react/no-typos */
BackgroundDef.propTypes = {
  id: _propTypes.string.isRequired,
  flatTop: _propTypes.bool,
  backgroundImage: _propTypes.string.isRequired,
  backgroundScale: _propTypes.number,
  backgroundWidth: _propTypes.number,
  backgroundHeight: _propTypes.number,
  backgroundSize: _propTypes.number,
  xOffset: _propTypes.number,
  yOffset: _propTypes.number,
  diagonal: _propTypes.number
};

exports.default = BackgroundDef;