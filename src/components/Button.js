import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {

   //Build a string for class names depending on true/false values of props
   let buttonClass = classNames('button', {"button--confirm": props.confirm, "button--danger": props.danger});

   return (

   <button 
      className={buttonClass}
      onClick={props.onClick} 
      disabled={props.disabled}>

   {props.children}

   </button>

   );
}
