import PropTypes from 'prop-types'; 

import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props){

  //Create array of interviewer list items, wrapped in an h4 tag
  const interviewersArray = props.interviewers.map(interviewer => {

    return (
      <InterviewerListItem 
        key={interviewer.id} 
        name={interviewer.name} 
        avatar={interviewer.avatar} 
        setInterviewer={() => props.onChange(interviewer.id)} 
        selected={interviewer.id === props.value}
      />
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


//Type check the props
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;

