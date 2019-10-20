import refs from "./refs";
import MicroModal from "micromodal";

export const openAddCard = () => {
  if (refs.adForm.classList.contains("edit")) {
    refs.adForm.classList.replace("edit", "add");
  } else {
    refs.adForm.classList.add("add");
  }
  MicroModal.show("open-addpost");
};

refs.addCard.addEventListener("click", openAddCard);
