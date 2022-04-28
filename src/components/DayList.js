import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  //From raw data contained in props, create an array of Day List Items
  const daysArray = props.days.map(day => {

    return (
    <DayListItem 
      key={day.id} 
      name={day.name} 
      setDay={props.setDay} 
      spots={day.spots} 
      selected={day.name === props.day}
    />
    );
  })

  //Render the array of days
  return (
    <ul>
      {daysArray}      
    </ul>
  );
}