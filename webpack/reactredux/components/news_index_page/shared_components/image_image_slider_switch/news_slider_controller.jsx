import React, { PropTypes } from 'react';
import Slider from 'react-slick'
// import Image from 'dumb_components/image';
// import SliderDropZoneController from './slider_drop_zone_controller'

export const NewsSliderController = React.createClass({
  propTypes: {
    siteEditMode: PropTypes.object.isRequired,
    children:     PropTypes.array.isRequired,
  },

  variableSettings() {
    const settingsHash = {
      false: /* on siteEdtMode.mode === false*/ {
        autoplay: true,
        autoplaySpeed: 2000,
        draggable: true,
        lazyLoad: true
      },
      true: /* on siteEditMode.mode === true */ {
        autoplay: false,
        draggable: false,
        lazyLoad: false,
      }
    }
    return settingsHash[this.props.siteEditMode.mode];
  },

  render() {
    const commonSettings = {
      className: "my-slick-slider-top-level-component",
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      fade: true,
      pauseOnHover: true,
    }
    const settings = Object.assign({}, commonSettings, this.variableSettings())

    return (
      <Slider {...settings}>
        {this.props.children}
      </Slider>
    );
  }
});
