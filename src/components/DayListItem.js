import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {

  //Create a message about remaining spots depending on the number
  const formatSpots = (numSpots) => {
    if (numSpots===0) {
      return "no spots remaining"
    }
    if (numSpots===1) {
      return "1 spot remaining"
    }
    return `${numSpots} spots remaining`
  }

  let dayListItemClass = classNames('day-list__item', {'day-list__item--selected': props.selected, 'day-list__item--full': props.spots===0})
  return (
    <li 
      className={dayListItemClass} 
      onClick={() => props.setDay(props.name)} 
      data-testid={"day"}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
