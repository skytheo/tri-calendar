import { EventInput } from '@fullcalendar/core';
import React, { useEffect, useState } from 'react';
import Days from './days';
import { setWorkouts } from './distances';

const Run = (props: any) => {

    const [runDays, setRunDays] = useState<string[]>([]);
    useEffect(() => {
      props.setEvents(getRunDays(props.events, runDays, props.date, props.distance));
    }, [runDays]);

function getRunDays(events: EventInput[], RunDays: string[], date: Date, distance: string): EventInput[] {
  let total = 0;
  let newEvents = [];
  if (RunDays.length >= 1) {
    newEvents[0] = {
      startRecur: new Date(),
      endRecur: date,
      title: "Long Run",
      daysOfWeek: [RunDays[0]],
      color: "#006633",
      description: "Long Run"
    };
    total++;
  }
  if (RunDays.length >= 2) {
    newEvents[total] = {
      startRecur: new Date(),
      endRecur: date,
      title: "Speed Run",
      daysOfWeek: [RunDays[1]],
      color: "#00CC00",
      description: "Speed Run"
    };
    total++;
    if (RunDays.length >= 5) {
      newEvents[total] = {
        startRecur: new Date(),
        endRecur: date,
        title: "Tempo Run",
        daysOfWeek: [RunDays[2]],
        color: "#00CC00",
        description: "Tempo Run"
      };
      total++;
    }
  }
  if (total < RunDays.length) {
    newEvents[total] = {
      startRecur: new Date(),
      endRecur: date,
      title: "Maintence Run",
      daysOfWeek: RunDays.length >= 5 ? RunDays.slice(3) : RunDays.slice(2),
      color: "#009900",
      description: "Maintenence Run"
    };
  }
  //newEvents = setWorkouts(newEvents, distance, runDays.length, date, "run");
  let temp = events.filter(x => !x.title?.includes("Run"));
  return [
    ...temp,
    ...newEvents,
  ]
}

return (
  <div className='parent'>
    <div className='child'>Days a week of running: </div>
    <Days setDays={setRunDays} Days={runDays}/>
  </div>);
}
export default Run;