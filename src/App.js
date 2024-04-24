import { useEffect } from "react";
import './App.css';
import MainPage from "./Pages/MainPage";
import { serverStartAPICall } from "./Network/GenericAPICalls";

function App() {

  useEffect(() => {
    serverStartAPICall()
      .then((res) => console.log("Server Started"))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
