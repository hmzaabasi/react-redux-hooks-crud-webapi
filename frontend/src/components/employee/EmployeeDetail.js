import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const EmployeeDetail = ({ closeHandler, employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const employees = useSelector((state) => state.employee);
  const handleClose = () => closeHandler({ show: false });

  useEffect(() => {
    setEmployee(
      JSON.stringify(
        employees?.find((x) => x.id == employeeId),
        null,
        4
      )
    );
  }, [employees]);
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Employee Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre>{employee}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeDetail;
