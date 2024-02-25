import React, { Component } from "react";
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../../../app_settings';


const scheduler = window.scheduler;

export default class Scheduler extends Component {
  initSchedulerEvents() {
    if (scheduler._$initialized) {

      return;
    }

    const onDataUpdated = this.props.onDataUpdated;

    scheduler.attachEvent("onEventAdded", (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated("create", ev, id);
      }
    });

    scheduler.attachEvent("onEventChanged", (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated("update", ev, id);
      }
    });

    scheduler.attachEvent("onEventDeleted", (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated("delete", ev, id);
      }
    });

    scheduler.attachEvent("onBeforeLightbox", (id) => {
      const { resultData } = this.props;
      const event = scheduler.getEvent(id);
      if (event) {
        scheduler.setEventText(id,resultData.name+'\n'+resultData.email);
        
      }
      return true;
    });
    scheduler._$initialized = true;
  }

  componentDidMount() {
    this.initScheduler();
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.timeFormatState !== nextProps.timeFormatState;
  // }

  initScheduler() {
    scheduler.skin = "material";
    scheduler.config.header = [
      "day",
      "week",
      "month",
      "date",
      "prev",
      "today",
      "next",
    ];
    scheduler.config.hour_date = "%H:%i";
    scheduler.xy.scale_width = 70;

    this.initSchedulerEvents();

    const date = new Date();

    console.log(date);

    const { events } = this.props;
    scheduler.init(this.schedulerContainer, new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    scheduler.clearAll();
    scheduler.parse(events);
    
    // Update lastUpdatedEvents
    this.setState({ lastUpdatedEvents: events });
  }

  getByResultId() {
    try {
      const authToken = Cookies.get('_auth');
      const userId = Cookies.get('userId');
      const organizationId = Cookies.get('organizationId');

      const requestBody = resultId;

      axios
        .post(`${BASE_URL}result/get-by-id`, requestBody, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            userId,
            organizationId,
          },
        })
        .then((response) => {
          
        })
        .catch((error) => {
          console.error('Error fetching workflow details:', error);
        });
    } catch (error) {
      console.error('Error fetching workflow details:', error);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events) {
      this.initScheduler();
    }
  }

  setHoursScaleFormat(state) {
    scheduler.config.hour_date = state ? "%H:%i" : "%g:%i %A";
    scheduler.templates.hour_scale = scheduler.date.date_to_str(
      scheduler.config.hour_date
    );
  }

  render() {
    const { timeFormatState } = this.props;
    this.setHoursScaleFormat(timeFormatState);
    return (
      <div
        ref={(input) => {
          this.schedulerContainer = input;
        }}
        style={{ width: "100%", height: "600px" }}
      ></div>
    );
  }
}
