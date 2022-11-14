import { useState } from "react";
import AlertMessage from "./AlertMessage";
import "./App.css";
import NotificationForm from "./NotificationForm";

const getInitialAlertMsg = () => ({ show: false, message: "", error: false });

function App() {
  const [alertMsg, updateAlertMsg] = useState(getInitialAlertMsg());

  const showAlert = (data) => {
    updateAlertMsg(data);
    setTimeout(() => {
      updateAlertMsg(getInitialAlertMsg());
    }, 3000);
  };

  return (
    <div className="container">
      <h1 className="title">Notification Form</h1>
      <NotificationForm showAlert={showAlert} />
      {alertMsg.show && (
        <AlertMessage message={alertMsg.message} error={alertMsg.error} />
      )}
    </div>
  );
}

export default App;
