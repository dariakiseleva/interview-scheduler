import React, { Fragment } from 'react'
import "./styles.scss";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"

export default function Appointment(props){
  return (
    <Fragment>
      <Header time={props.time} />
      {props.interview ? 
        <Show 
          inerviewer={props.interview.interviewer} 
          student={props.interview.student}
        /> 
        : <Empty/>
      }
    </Fragment>
  );

}