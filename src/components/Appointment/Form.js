import React, { useState } from 'react';
import Button from "../Button"
import InterviewerList from "../InterviewerList";


export default function Form(props){

  //States are set from props, or to default empty values
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //Reset states to default empty values
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  //Function that runs when Cancel is clicked
  const cancel = () => {
    props.onCancel();
    reset();
  }




  //RENDER FORM
  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            //When change in input detected, update the state for the student's name
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}> Cancel</Button>
          <Button confirm onClick={props.onSave} > Save</Button>
        </section>
      </section>
    </main>

  );
}