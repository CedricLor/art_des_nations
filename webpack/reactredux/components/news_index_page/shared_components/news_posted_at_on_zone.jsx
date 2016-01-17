import React, { PropTypes } from 'react';

import {intlShape, injectIntl, defineMessages, FormattedMessage, FormattedTime, FormattedDate} from 'react-intl';

import moment from 'moment';

require('react-date-picker/index.css');
require('react-date-picker/theme/hackerone.css');

import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';

const messages = defineMessages({
  postedAtOn: {
    id:             'newArticle.edit.newsForm.postedAtOnMeta',
    description:    'Translation for "posted at" and "on" for time and date at which the article has been posted',
    defaultMessage: 'Posted at {time} on {date}'
  }
});

// ########################################
// ## ArticleBasicForm Component
// ########################################

export const NewsPostedAtOnZone = React.createClass({
  propTypes: {
    siteEditMode: PropTypes.bool.isRequired,
    onChange:     PropTypes.func.isRequired,
    value:        PropTypes.string.isRequired,
    intl:         intlShape.isRequired
  },

  getInitialState() {
    return {displayDateOrTimePicker: 'none'};
  },

  displayDatePicker(e) {
    e.preventDefault();
    this.setState({displayDateOrTimePicker: 'datePicker'});
  },

  displayTimePicker(e) {
    e.preventDefault();
    this.setState({displayDateOrTimePicker: 'timePicker'});
  },

  removeAllPickers(e) {
    e.preventDefault();
    this.setState({displayDateOrTimePicker: 'none'});
  },

  handleChange(momentObj) {
    const newDateStr = momentObj.format('YYYY-MM-DD')
          + "T"
          + momentObj.format('HH:mm:SS.SSS')
          + "Z";
    this.props.onChange(newDateStr);
  },

  handleDateChange(newDate) {
    const momentObj = moment( newDate + 'T' + moment(this.props.value).format('HH:mm') ).subtract(1, "hours");
    this.handleChange(momentObj);
  },

  handleTimeChange(newTime) {
    const momentObj = moment( moment(this.props.value).format('YYYY-MM-DD') + 'T' + newTime ).subtract(1, "hours");
    this.handleChange(momentObj);
  },

  stylesOnEditModeOn() {
    return {
      styleOfTimeAndDateZone: { "position": "relative", "zIndex": "3000" },
      styleForInput: {"display": "block", "zIndex": "2500"},
      styleForPickerRemover: {"position": "fixed", "top": "0", "bottom": "0", "left": "0", "right": "0", "zIndex": "2000"}
    }
  },

  renderDateInput(dateOrTimePicker, locale) {
    const { styleForInput, styleForPickerRemover } = this.stylesOnEditModeOn();
    const dateValue = moment((this.props.value)).format('YYYY-MM-DD');
    dateOrTimePicker =
      <div className="dropdown-menu form-inline" style={styleForInput} aria-labelledby="dLabel">
        <DatePicker
            date=       {dateValue}
            onChange=   {this.handleDateChange}
            locale=     {locale}
            hideFooter= "true"
        />
      </div>

    return [dateOrTimePicker, styleForPickerRemover]
  },

  renderTimeInput(dateOrTimePicker, locale) {
    const { styleForInput, styleForPickerRemover } = this.stylesOnEditModeOn();
    let format;
    format = (( locale === "fr" || locale === "ru") ? "HH:mm" : "hh:mm a");
    let timeValue = moment((this.props.value)).format(format);
    dateOrTimePicker =
      <div className="dropdown-menu form-inline" style={styleForInput} aria-labelledby="dLabel">
        <TimePicker
            value=      {timeValue}
            onChange=   {this.handleTimeChange}
        />
      </div>

    return [dateOrTimePicker, styleForPickerRemover]
  },

  renderTimeAndDateZoneForInputs() {
    const styleOfTimeAndDateZone = this.stylesOnEditModeOn().styleOfTimeAndDateZone;
    const timeElt =
      <FormattedTime value={this.props.value} hour="numeric" minute="numeric">
        {(formattedTime) => (
            <a value={this.props.value} style={styleOfTimeAndDateZone} onClick={this.displayTimePicker}>{formattedTime}</a>
        )}
      </FormattedTime>

    const dateElt =
      <FormattedDate value={this.props.value}>
        {(formattedDate) => (
            <a value={this.props.value} style={styleOfTimeAndDateZone} onClick={this.displayDatePicker}>{formattedDate}</a>
        )}
      </FormattedDate>

    return (
      <FormattedMessage {...messages.postedAtOn} values={{
        time: timeElt,
        date: dateElt
      }} />
    )
  },

  renderTimeAndDateInputs() {
    let dateOrTimePicker;
    let styleForPickerRemover;
    let {locale} = this.props.intl;
    locale = (locale === "zh" ? "zh-cn" : locale);

    switch (this.state.displayDateOrTimePicker) {
      case 'none':
        dateOrTimePicker = '';
        styleForPickerRemover = {};
        break

      case 'datePicker':
        [ dateOrTimePicker, styleForPickerRemover ] = this.renderDateInput(dateOrTimePicker, locale);
        break

      case 'timePicker':
        [ dateOrTimePicker, styleForPickerRemover ] = this.renderTimeInput(dateOrTimePicker, locale);
        break

      default:
        dateOrTimePicker = '';
        styleForPickerRemover = {};
    }

    return (
      <div className="dropdown">
        <span type="button" className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
          {this.renderTimeAndDateZoneForInputs()}
        </span>
          {dateOrTimePicker}
        <div onClick={this.removeAllPickers} style={styleForPickerRemover}></div>
      </div>
    )
  },

  renderTimeAndDateZone() {

    const timeElt = <FormattedTime value={this.props.value} hour="numeric" minute="numeric"/>
    const dateElt = <FormattedDate value={this.props.value} />

    return (
      <FormattedMessage {...messages.postedAtOn} values={{
        time: timeElt,
        date: dateElt
      }} />
    )
  },

  render() {
    let timeAndDate;
    if (this.props.siteEditMode === true ) {
      timeAndDate = this.renderTimeAndDateInputs()
    } else {
      timeAndDate = this.renderTimeAndDateZone()
    }

    return (
      <div className="date-time-zone-wrapper">
        {timeAndDate}
      </div>
    )
  }
})

export default injectIntl(NewsPostedAtOnZone);
