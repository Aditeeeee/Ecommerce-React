import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/AllRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const materialTheme = createTheme({
  typography: { fontFamily: ["Poppins"].join(",") },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={materialTheme}>
            <CssBaseline enableColorScheme />
            <RouterProvider router={router} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
