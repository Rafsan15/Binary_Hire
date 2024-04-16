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

    
    scheduler._$initialized = true;
  }
//   shouldComponentUpdate(nextProps) {
//     if(this.props.events.length>0)
//       return false;
//     else 
//       return true;
//     // return this.props.timeFormatState !== nextProps.timeFormatState;
// }

  componentDidMount() {
    this.initScheduler();
  }

  initScheduler() {
    const { events } = this.props;

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

    // Disable creation of new events
    scheduler.config.readonly = true;
    scheduler.config.drag_create = false;
    scheduler.config.dblclick_create = false;
    scheduler.config.drag_move = false;
    scheduler.config.drag_resize = false;
    scheduler.config.readonly_form = true;

    // Define a function to check if an event is from props.events
    const isExistingEvent = (event_id) => {
      return events.some(ev => ev.id === event_id);
    };

    // Disable editing and dragging for existing events
    scheduler.attachEvent("onEventChanged", (id, ev) => {
      if (isExistingEvent(id)) {
        scheduler.updateEvent(id, ev); // Reset changes
      }
    });

    scheduler.attachEvent("onBeforeDrag", (id, mode, e) => {
      if (isExistingEvent(id)) {
        scheduler.updateEvent(id, ev); // Reset changes
      }
    });

    scheduler.attachEvent("onLightbox", function(){
      var section = scheduler.formSection("description");
      section.control.disabled = true;
   });

    const date = new Date();
    scheduler.init(this.schedulerContainer, new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    scheduler.clearAll();
    scheduler.parse(events);

    // Update lastUpdatedEvents
    this.setState({ lastUpdatedEvents: events });
  }


  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events) {
      // if (this.props.events.length > 0) {
      //   // Prevent event creation
      //   scheduler.deleteEvent(id);
      // }
      // else{
        this.initScheduler();
      // }
      
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
