import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "../../actions/employees";

const DeleteEmployee = ({ closeHandler, employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const employees = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  useEffect(() => {
    setEmployee(employees?.find((x) => x.id == employeeId));
  }, [employees]);

  const handleClose = () => closeHandler({ show: false });
  return (
    <Modal show={true} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Press 'Confirm' to delete the record of Employee: {employee?.name}.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            dispatch(deleteEmployee(employeeId));
            handleClose();
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteEmployee;
