import refs from "./refs";
import services from "./../../services/services";
import micromodal from "micromodal";
import { fotoBase64 } from "./saveFoto";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import * as render from "./Filter-by-category/api_category";

const notyf = new Notyf();

const addItem = evt => {
  evt.preventDefault();
  if (!event.target.classList.contains("add")) return;
  const [category, title, description, price, phone] = evt.target.elements;

  const categoryId =
    category.value === "Нерухомість"
      ? 1
      : category.value === "Транспорт"
      ? 2
      : category.value === "Робота"
      ? 3
      : category.value === "Електроніка"
      ? 4
      : category.value === "Бізнес та послуги"
      ? 5
      : category.value === "Відпочинок і спорт"
      ? 6
      : category.value === "Віддам безкоштовно"
      ? 7
      : category.value === "Обмін"
      ? 8
      : null;

  if (
    category.value === "" ||
    title.value === "" ||
    description.value === "" ||
    price.value === "" ||
    phone.value === ""
  ) {
    return notyf.error("Заповніть усі поля!");
  } else if (isNaN(price.value) === true) {
    return notyf.error("Введіть коректні дані!");
  } else if (isNaN(phone.value) === true) {
    return notyf.error("Введіть коректні дані!");
  } else {
    const item = services.addItemFn(
      categoryId,
      title.value,
      description.value,
      price.value,
      phone.value
    );

    services.postNewPost(item).then(dd => {
      render.renderCards("all");
    });
    evt.currentTarget.reset();
    micromodal.close();
  }
};

refs.fileInput.addEventListener("change", fotoBase64);
refs.adForm.addEventListener("submit", addItem);

export default addItem;
