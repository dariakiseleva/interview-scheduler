import React from "react";
import { render, cleanup, fireEvent, queryByText } from "@testing-library/react";
//import {queryByText} from '@testing-library/jest-dom'

//Import components
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {

  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={() => {}} onCancel={() => {}}/>
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" onSave={() => {}} onCancel={() => {}}/>
    );

    const result = getByTestId("student-name-input");
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {

    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} interviewer={interviewers[0].id} onSave={onSave} />
    );

    fireEvent.click(getByText('Save'));
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });


  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn();
  
    const { getByText } = render(
      <Form interviewers={interviewers} interviewer={null} student="Daria Kiseleva" onSave={onSave} />
    );

    fireEvent.click(getByText('Save'));
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name and interviewer is defined", () => {
    const onSave = jest.fn();
    const { getByText, queryByText } = render(
      <Form interviewers={interviewers} interviewer={interviewers[0].id} student="Lydia Miller-Jones" onSave={onSave} />
    );

    fireEvent.click(getByText('Save'));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

});
