import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import ContextApi from "./Navbar/ContextApi.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ContextApi>
      <BrowserRouter>
        <Toaster  />
        <App />
      </BrowserRouter>
    </ContextApi>
  </Provider>
);
