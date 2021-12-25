import * as Yup from "yup";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { getEmployeeById, upsertEmployee } from "../../actions/employees";
import ValidateFile from "../../utilities/validator";
import moment from "moment";

const messages = {
  required: "* Required",
  email: "Invalid email format",
};
const schema = Yup.object().shape({
  id: Yup.string(),
  name: Yup.string().required(messages.required),
  designation: Yup.string().required(messages.required),
  employeeType: Yup.number().required(messages.required),
  location: Yup.string().required(messages.required),
  mobileNo: Yup.string().required(messages.required),
  email: Yup.string().email(messages.email).required("Required"),
  passportNo: Yup.string().required(messages.required),
  passportExpiryDate: Yup.date().required(messages.required),
  profilePhoto: Yup.array().nullable().required(messages.required),
  passport: Yup.array().nullable().required(messages.required),
});

const formInitialValues = {
  name: "",
  designation: "",
  employeeType: "",
  location: "",
  mobileNo: "",
  email: "",
  passportNo: "",
  passportExpiryDate: "",
};

const UpsertEmployee = () => {
  const [initialValues, setInitialValues] = useState({ ...formInitialValues });
  const [isUpdate, setIsUpdate] = useState(false);
  const employeeState = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  let params = useParams();
  let navigate = useNavigate();

  const onFormSubmit = (event) => {
    var data = { ...event };
    data.profilePhoto = data.profilePhoto[0];
    data.passport = data.passport[0];
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    dispatch(upsertEmployee(formData, data.id))
      .then((response) => {
        if (response.success) {
          navigate("/");
        }
      })
      .catch((e) => console.log(e));
    console.log(data);
  };

  const onFileChange = (event, field, setFieldValue) => {
    const files = event.target.files;
    let photo = Array.from(files);
    if (ValidateFile(files[0])) {
      setFieldValue(field, photo);
    } else {
      setFieldValue(field, null);
      event.target.value = null;
    }
  };

  useEffect(() => {
    if (employeeState?.length || !params?.id) return;
    dispatch(getEmployeeById(params.id));
  }, []);

  useEffect(() => {
    if (params?.id && employeeState?.length) {
      const currentEmployee = employeeState?.find(
        (x) => x.id === parseInt(params.id)
      );
      if (!currentEmployee) return;
      setIsUpdate(true);
      console.log(
        moment(currentEmployee.passportExpiryDate).format("yyyy-MM-DD")
      );
      setInitialValues({
        id: parseInt(params.id),
        name: currentEmployee.name,
        designation: currentEmployee.designation,
        employeeType: currentEmployee.employeeType,
        location: currentEmployee.location,
        mobileNo: currentEmployee.mobileNo,
        email: currentEmployee.email,
        passportNo: currentEmployee.passportNo,
        passportExpiryDate: moment(currentEmployee.passportExpiryDate).format(
          "yyyy-MM-DD"
        ),
        profilePhoto: currentEmployee.profilePhotoPath,
        passport: currentEmployee.passportFilePath,
      });
    } else setInitialValues({ ...formInitialValues });
  }, [employeeState, params]);

  return (
    <>
      <h3 className="pt-3 mb-5">{!isUpdate ? "Add" : "Update"} Employee</h3>
      <Formik
        validationSchema={schema}
        onSubmit={onFormSubmit}
        initialValues={initialValues}
        enableReinitialize={true}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
          setFieldValue,
          setFieldError,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  name="designation"
                  value={values.designation}
                  onChange={handleChange}
                  isInvalid={!!errors.designation}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.designation}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formEmployeeType"
              >
                <Form.Label>Employee Type</Form.Label>
                <Form.Select
                  name="employeeType"
                  value={values.employeeType}
                  onChange={handleChange}
                  isInvalid={!!errors.employeeType}
                >
                  <option value="0">Select...</option>
                  <option value="1">Contractual</option>
                  <option value="2">Permanent</option>
                  <option value="3">Daily wages</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.employeeType}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formMobileNo">
                <Form.Label>MobileNo</Form.Label>
                <Form.Control
                  type="string"
                  name="mobileNo"
                  value={values.mobileNo}
                  onChange={handleChange}
                  isInvalid={!!errors.mobileNo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mobileNo}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  isInvalid={!!errors.location}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.location}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="formPassportNo">
                <Form.Label>PassportNo</Form.Label>
                <Form.Control
                  type="text"
                  name="passportNo"
                  value={values.passportNo}
                  onChange={handleChange}
                  isInvalid={!!errors.passportNo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passportNo}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formPassportExpiryDate"
              >
                <Form.Label>PassportExpiryDate</Form.Label>
                <Form.Control
                  type="date"
                  name="passportExpiryDate"
                  value={values.passportExpiryDate}
                  onChange={handleChange}
                  isInvalid={!!errors.passportExpiryDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passportExpiryDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFile" className="mb-3">
                <Form.Label>Profile photo</Form.Label>
                <Form.Control
                  type="file"
                  name="profilePhoto"
                  isInvalid={!!errors.profilePhoto}
                  onChange={(event) =>
                    onFileChange(event, "profilePhoto", setFieldValue)
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.profilePhoto}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formFile" className="mb-3">
                <Form.Label>Passport soft copy</Form.Label>
                <Form.Control
                  type="file"
                  name="passport"
                  isInvalid={!!errors.passport}
                  onChange={(event) =>
                    onFileChange(event, "passport", setFieldValue)
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passport}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpsertEmployee;
