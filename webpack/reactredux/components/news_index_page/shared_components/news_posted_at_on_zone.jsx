import React, { PropTypes } from 'react';

import { NewsInput } from '../news_cards_container/articles_list/news_card/news_content_zone_switch/commons/news_edit_button_editable_zone_switch/news_input';

import {intlShape, injectIntl, defineMessages} from 'react-intl';

var DatePicker = require('react-datepicker');
var moment = require('moment');

// require('react-datepicker/dist/react-datepicker.css');

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
    onChange: PropTypes.func.isRequired,
    value:    PropTypes.string.isRequired
  },

  handleChange(e) {
    console.log(e)
    // let newValue = "";
    // if ( e.target.valueAsDate !== null ) {
    //   if ( e.target.valueAsNumber < 86400 ) {
    //     const newHour = 'T' + moment(e.target.valueAsNumber).format('HH:mm:SS') + '.000Z';
    //     const unchangedDate = moment(this.props.value).format('YYYY-MM-DD');
    //     newValue = unchangedDate + newHour;
    //   } else {
    //     const unchangedHour = 'T' + moment((this.props.value).toString()).format('HH:mm:SS') + '.000Z';
    //     const newDate = moment(e.target.valueAsNumber).format('YYYY-MM-DD');
    //     newValue = newDate + unchangedHour;
    //   }
    // }
    // // add stuff to handle rebuilding the date from the time and date zones
    // this.props.onChange(newValue);
  },

  renderTimeAndDateInputs() {

    const dateValue = moment((this.props.value).toString()).format('YYYY-MM-DD');
    const timeValue = moment((this.props.value).toString()).format('HH:mm');

    return (
      <div
        className="form-inline">
        <NewsInput
          type=         "date"
          handleChange= {this.handleChange}
          defaultValue= {dateValue}
          value=        {dateValue}
          name=         "newArticleDate_posted_at"/>
        <NewsInput
          type=         "time"
          handleChange= {this.handleChange}
          defaultValue= {timeValue}
          value=        {timeValue}
          name=         "newArticleTime_posted_at"/>
      </div>
    )
    // return (
    //   <div className="form-group">
    //       <div className='input-group date' ref={(datePicker) => {
    //         const locale = this.props.routeParams.locale || 'fr';
    //         $(datePicker).datetimepicker({
    //           locale: locale,
    //           // defaultDate: date, moment, string,
    //           showTodayButton: true
    //         });
    //         $(datePicker).on("dp.change", (e) => {this.handleChange(e)})
    //       }}
    //         >
    //           <input type='text' className="form-control" onChange={this.handleChange} ref={
    //             (input) => input.addEventListener('change', this.handleChange)
    //           } />
    //           <span className="input-group-addon">
    //               <span className="glyphicon glyphicon-calendar"></span>
    //           </span>
    //       </div>
    //   </div>
    // )
  },

  renderTimeAndDateZone() {
    const {formatMessage, formatDate, formatTime} = this.props.intl;

    return formatMessage(
      messages.postedAtOn,
      {
        time: formatTime(this.props.value, {hour: "numeric", minute: "numeric"}),
        date: formatDate(this.props.value)
      }
    )
  },

  render() {
    // const {formatMessage, formatDate, formatTime} = this.props.intl;

    return (
      <div>
        {this.renderTimeAndDateZone()}
        {this.renderTimeAndDateInputs()}
      </div>
    )
  }
})

export default injectIntl(NewsPostedAtOnZone);
