import refs from "../refs";
import services from "../../../services/services";
import micromodal from "micromodal";
import { fotoBase64 } from "../saveFoto";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import * as render from "../Filter-by-category/api_category";

const notyf = new Notyf();

const addItem = evt => {
  evt.preventDefault();

  const [img, title, price, category, description, phone] = evt.target.elements;
  let title1 = title.value;
  let price1 = price.value;
  let category1 = category.value;
  let description1 = description.value;
  let phone1 = phone.value;

  if (
    title1 === "" ||
    price1 === "" ||
    category1 === "" ||
    description1 === "" ||
    phone1 === ""
  ) {
    return notyf.error("Заповніть усі поля!");
  } else if (isNaN(price1) === true) {
    return notyf.error("Введіть коректні дані!");
  } else if (isNaN(phone1) === true) {
    return notyf.error("Введіть коректні дані!");
  } else {
    let item = services.addItemFn(
      title1,
      price1,
      category1,
      description1,
      phone1
    );
    services.postNewPost(item);
    refs.formInputs.reset();
    micromodal.close();
  }
};

refs.fileInput.addEventListener("change", fotoBase64);
refs.formInputs.addEventListener("submit", addItem);

export default addItem;
