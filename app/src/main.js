import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";

// Import PrimeVue theme
import "primevue/resources/themes/aura-light-green/theme.css"; // or any other theme
import "primevue/resources/primevue.min.css"; // core css
import "primeicons/primeicons.css"; // icons

// Import PrimeVue components
// import Button from "primevue/button";

const app = createApp(App);

// Use PrimeVue plugin
app.use(PrimeVue);

// Register PrimeVue components with multi-word names
// app.component("PrimeButton", Button);

app.mount("#app");
