import { store } from "@app/store";
import { Provider } from "react-redux";


export const withStore = (component) => () =>
    <Provider store={store}>{component()}</Provider>;