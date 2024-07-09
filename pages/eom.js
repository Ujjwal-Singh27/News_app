import React from "react";
import styles from "../styles/eom.module.css";
import { Toolbar } from "@/components/toolbar";

export const eom = ({ employee }) => {
  console.log(employee);
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Employee of the month</h1>
        <div className={styles.eom}>
          <h3>Mark</h3>
          <h6>{employee.position}</h6>
          <img src={employee.image} />
          <p>{employee.description}</p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const apiResponse = await fetch(
    "https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth"
  );
  const employee = await apiResponse.json();
  return {
    props: {
      employee,
    },
  };
};
export default eom;
