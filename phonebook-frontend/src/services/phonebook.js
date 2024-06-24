import axios from "axios";

const url = "api/persons";
// console.log(url);

const getData = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(url, newObject);
  return request.then((response) => response.data);
};

const edit = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject);
  return request.then((response) => response.data);
};

const removePerson = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request.then(() => {
    console.log(`Deleted post with Id ${id}`);
  });
};

export default {
  getData,
  create,
  edit,
  removePerson,
};
