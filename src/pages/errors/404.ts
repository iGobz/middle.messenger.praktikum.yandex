import { Error } from "../../components/error";
import { renderDOM } from "../../utils/renderdom";

const errorPage = new Error({
    code: 404,
    message: 'Не туда попали'
});

renderDOM('#app', errorPage);