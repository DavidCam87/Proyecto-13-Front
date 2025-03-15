import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./utils/Context";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <AppProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </AppProvider>
    </ChakraProvider>
  </BrowserRouter>
);