import refs from "../refs"
import services from "../../../services/services"
import micromodal from "micromodal"
import {
    fotoBase64
} from "../saveFoto"
import {
    Notyf
} from 'notyf';
import 'notyf/notyf.min.css'
const notyf = new Notyf();

const addItem = evt => {
    evt.preventDefault();

    const [img, title, price, category, description, phone] = evt.target.elements;
    let title1 = title.value;
    let price1 = price.value;
    let category1 = category.value;
    let description1 = description.value;
    let phone1 = phone.value;


    if (title1 === '' || price1 === '' || category1 === '' || description1 === '' || phone1 === '') {
        return notyf.error('ВАСЯ, заполни все поля!')
    } else if (isNaN(price1) === true) {
        return notyf.error('Совсем дурной? Цена - это цифры не буквы!')
    } else if (isNaN(phone1) === true) {
        return notyf.error('Ты тупой? Телефон это цифры не буквы!')
    } else {
        let blabla = services.addItemFn(title1, price1, category1, description1, phone1);
        services.postNewPost(blabla).then(data => console.log('data',data))
        // refs.formInputs.reset()
        micromodal.close()
    }

}




refs.fileInput.addEventListener('change', fotoBase64);




refs.formInputs.addEventListener('submit', addItem);

export default addItem