import { Error } from "../../components/error";
import { renderDOM } from "../../utils/renderdom";

const errorPage = new Error({
    code: 500,
    message: 'Уже фиксим'
});

renderDOM('#app', errorPage);