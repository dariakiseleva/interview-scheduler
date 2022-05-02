import React, { Fragment } from 'react'
import "./styles.scss";

//Import functionalities
import useVisualMode from "../../hooks/useVisualMode";

//Import components
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"

//Mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


//Render appointment component
export default function Appointment(props){

  //Destructure what the hook returns
  const { mode, transition, back } = useVisualMode(
    //Initial mode is SHOW or EMPTY depending on if interview exists
    props.interview ? SHOW : EMPTY
  );

  return (
    <Fragment>
      <Header time={props.time} />

      {/* Choose display depending on the mode, and add transition functions to each that change the mode */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
        />
      )}


    </Fragment>
  );

}