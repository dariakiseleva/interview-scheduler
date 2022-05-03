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
import Confirm from "./Confirm"
import Error from "./Error"

//Mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


//Render appointment component
export default function Appointment(props){

  //Destructure what the hook returns
  const { mode, transition, back } = useVisualMode(
    //Initial mode (upon refreshing page) is SHOW or EMPTY depending on if interview exists
    props.interview ? SHOW : EMPTY
  );

  //When Save button is pressed in Form component
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
    .then(() => transition(SHOW))
    //If there is an error, display the error message, but go back to before the Status component
    .catch(error => transition(ERROR_SAVE, true));
  }

  //When Remove is pressed in Show component
  const remove = () => {
    transition(CONFIRM);
  }

  //When Confirm is pressed to remove an appointment
  const confirmRemove = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    //If there is an error, display the error message, but go back to before the Status component
    .catch(error => transition(ERROR_DELETE, true))
  }

  //When Edit is pressed in Show mode
  const edit = () => {
    transition(EDIT);
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
          onDelete={remove}
          onEdit={edit}
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
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={confirmRemove}
          onCancel={() => {back()}}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="Could not save appointment." 
          onClose={() => back()} 
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="Could not delete appointment." 
          onClose={() => back()} 
        />
      )}

    </Fragment>
  );

}