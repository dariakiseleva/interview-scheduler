import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props){

  //Create array of interviewer list items, wrapped in an h4 tag
  const interviewersArray = props.interviewers.map(interviewer => {
    let selectedValue = false;
    if (props.interviewer===interviewer.id){
      selectedValue = true;
    }

    return (
      <InterviewerListItem key={interviewer.id} name={interviewer.name} avatar={interviewer.avatar} setInterviewer={props.setInterviewer} selected={selectedValue}/>
    );
    
  })

  //Render interviewer list
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersArray}</ul>
    </section>
  );
}