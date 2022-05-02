import React, { Fragment } from 'react'
import "./styles.scss";

//Import functionalities
import useVisualMode from "../../hooks/useVisualMode";

//Import components
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"

//Mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


//Render appointment component
export default function Appointment(props){

  //Destructure what the hook returns
  const { mode, transition, back } = useVisualMode(
    //Initial mode is SHOW or EMPTY depending on if interview exists
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {

    //Create an interview object from the input data (student name and interviewer choice)
    const interview = {
      student: name,
      interviewer
    };

    //After saving, transition to showing the appointment
    transition(SAVING);

    //Call function in Application component which will update the state
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }
  

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
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}

    </Fragment>
  );

}