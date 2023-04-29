import React from "react";
import { useParams } from "react-router-dom";
import MentorRegister from "pages/mentor/register";
import MentorRegisterCareer from 'pages/mentor/register/career';
import MentorRegisterInfo from 'pages/mentor/register/info';
import MentorRegisterType from 'pages/mentor/register/type';
import MentorRegisterFinish from 'pages/mentor/register/finish';

const mentorRegisterData = {
  birth: '',
  careerFile: null,
  company: '',
  divisIsPub: true,
  sector: null,
  job: '',
  jobInComp: '',
  department: '',
  tags: [],
  consultList: [],
  typeList: [],
};

function GetComponent({ subPage }:
  {
    subPage: string;
  }) {
  if (subPage === 'career') {
    return <MentorRegisterCareer mentorRegisterData={mentorRegisterData} />;
  } else if (subPage === 'info') {
    return <MentorRegisterInfo mentorRegisterData={mentorRegisterData} />;
  } else if (subPage === 'type') {
    return <MentorRegisterType mentorRegisterData={mentorRegisterData} />;
  } else if (subPage === 'finish') {
    return <MentorRegisterFinish />;
  } else {
    return <MentorRegister />;
  }
}


export default function SubPage() {
  const { subPage } = useParams();

  return <GetComponent subPage={subPage!} />;

};