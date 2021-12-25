import http from "../utilities/http";

const getAll = () => http.get("/Employees/GetAll");

const get = (id) => http.get(`/Employees?id=${id}`);

const create = (data) => http.post("/Employees", data);

const update = (data) => http.put(`/Employees`, data);

const remove = (id) => http.delete(`/Employees?id=${id}`);

const EmployeeService = {
  get,
  getAll,
  create,
  update,
  remove,
};

export default EmployeeService;
