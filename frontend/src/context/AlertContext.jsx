import { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ isOpen: false, message: '', type: 'info' });

  const showAlert = (message, type = 'info') => {
    setAlert({ isOpen: true, message, type });
  };

  const closeAlert = () => {
    setAlert({ isOpen: false, message: '', type: 'info' });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.isOpen && (
        <div className="custom-alert-overlay">
          <div className={`custom-alert-box custom-alert-${alert.type}`}>
            <p>{alert.message}</p>
            <button onClick={closeAlert} className="custom-alert-btn">OK</button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};
