import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";

import { getAllEmployees } from "../../actions/employees";
import EmployeeDetail from "./EmployeeDetail";
import DeleteEmployee from "./DeleteEmployee";

import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [tableHeaders] = useState([
    "#",
    "Name",
    "Designation",
    "Mobile",
    "Email",
    "",
  ]);
  const [employeeList, setEmployeeList] = useState([]);
  const [showEmployeeDetail, setshowEmployeeDetail] = useState({
    show: false,
    id: null,
  });
  const [showDeleteConfirmation, setshowDeleteConfirmation] = useState({
    show: false,
    id: null,
  });
  const employees = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  useEffect(() => {
    setEmployeeList(employees);
  }, [employees]);

  const onViewButtonClick = (employeeId) => {
    setshowEmployeeDetail({ show: !showEmployeeDetail.show, id: employeeId });
  };
  const onDeleteButtonClick = (employeeId) => {
    setshowDeleteConfirmation({
      show: !showDeleteConfirmation.show,
      id: employeeId,
    });
  };

  return (
    <>
      <pre>
        {JSON.stringify(
          {
            developer: "Hamza Iftikhar",
            email: "hmzaiftikhar@gmail.com",
            linkedIn: "https://www.linkedin.com/in/hmza-iftikhar-abasi/",
            whatsapp: "+923110855677",
          },
          null,
          4
        )}
      </pre>
      <Table striped={false} bordered hover>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!employeeList?.length ? (
            <tr>
              <td colSpan={5} className="text-center">
                - No data -
              </td>
            </tr>
          ) : (
            employeeList.map((employee, index) => (
              <tr key={index}>
                <th scope="row">{++index}</th>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>{employee.mobileNo}</td>
                <td>{employee.email}</td>
                <td className="text-center">
                  <span
                    className="action-icon-space"
                    onClick={() => onViewButtonClick(employee.id)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </span>
                  <span className="action-icon-space">
                    <Link to={`/upsert/${employee.id}`} className="d-inline">
                      <FontAwesomeIcon icon={faPenSquare} />
                    </Link>
                  </span>
                  <span onClick={() => onDeleteButtonClick(employee.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {showEmployeeDetail.show && (
        <EmployeeDetail
          closeHandler={setshowEmployeeDetail}
          employeeId={showEmployeeDetail.id}
        />
      )}
      {showDeleteConfirmation.show && (
        <DeleteEmployee
          closeHandler={setshowDeleteConfirmation}
          employeeId={showDeleteConfirmation.id}
        />
      )}
    </>
  );
};

export default EmployeeList;
