import React from "react";
import classNames from "classnames";

export default function Empty (props){

  if (props.last){
    console.log("Last one");
  }

  let customNames = classNames('appointment__add', {"last_hidden_app": props.last});

  return (
    <main className={customNames}>
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}