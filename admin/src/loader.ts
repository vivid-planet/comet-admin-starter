import App from "./App";

const loadHtml = () => {
    const baseEl = document.querySelector<HTMLElement>("react-admin-starter");
    if (!baseEl) return false;

    App.render(baseEl);
};

if (["interactive", "complete"].indexOf(document.readyState) !== -1) {
    loadHtml();
} else {
    document.addEventListener("DOMContentLoaded", loadHtml, false);
}
