import service from "../../services/services";
import refs from "./refs";
import MicroModal from "micromodal";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import * as render from "./Filter-by-category/api_category";

const notyf = new Notyf();

const updateValue = () => {
    const [category, title, description, price, phone] = refs.adForm.elements;
    const categoryId = category.value === "Нерухомість" ? 1 :
                     category.value === "Транспорт" ? 2 :
                     category.value === "Робота" ? 3 :
                     category.value === "Електроніка" ? 4 :
                     category.value === "Бізнес та послуги" ? 5 :
                     category.value === "Відпочинок і спорт" ? 6 :
                     category.value === "Віддам безкоштовно" ? 7 :
                     category.value === "Обмін" ? 8 :
                     null;
  const updateValue = {
    category : categoryId,
    title: title.value,
    description: description.value,
    price: price.value,
    phone: phone.value
};

  return updateValue;
};

const updateModal = async event => {
  if (refs.adForm.classList.contains("add")) {
    refs.adForm.classList.replace("add", "edit");
  } else {
    refs.adForm.classList.add("edit");
  }
  if (event.target.className !== "edit") return;
  const idUpdate = event.target.dataset.id;
  service.getIdForUpdate(idUpdate);
  MicroModal.show("open-addpost");
  const adForUpdate = await service.getAdId(idUpdate);
  const [select, title, description, price, phone, image] = refs.adForm.elements;
  title.value = adForUpdate.goal.title;
  description.value = adForUpdate.goal.description;
  price.value = adForUpdate.goal.price;
  phone.value = adForUpdate.goal.phone;
};

const updateContent = event => {
  if (!event.target.classList.contains("edit")) return;
  event.preventDefault();
  const updateContent = updateValue();
  const id = service.throwIdForUpdate();
  service.updateAd(id, updateContent).then(sm => {
    render.renderCards("all");
  });
  refs.adForm.reset();
  MicroModal.close("open-addpost");
  MicroModal.close("user-postiki");
  notyf.success("Оголошення успішно оновлено!");
};

refs.posts.addEventListener("click", updateModal);
refs.adForm.addEventListener("input", updateValue);
refs.adForm.addEventListener("submit", updateContent);
