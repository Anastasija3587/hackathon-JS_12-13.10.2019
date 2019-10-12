import axios from 'axios';
import services from '../../../services/services';

// axios.defaults.baseURL = "https://dash-ads.goit.co.ua/api/v1";

// Получение обьявлений по категориям axios.get('https://dash-ads.goit.co.ua/ads/all?category=${ номер категории }&page=${ номер страницы }')



export const getAallCategories = async () => {
    try {
        // const allCategories = await axios.get(`=${номер категории }&page=${ номер страницы }`);
        const allCategories = await axios.get(services.b)
        return allCategories.data;
    } catch (error) {
        throw new Error("Error");
    }
};

