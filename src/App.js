

import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './context/AuthContextProvider';
import AppRouter from './router/AppRouter';

function App() {
  
  

  return (
    <div className='bg-gray-100 dark:bg-[#23242a]'>
      {/* <AuthContextProvider children={<AppRouter />} /> */}
      <AuthContextProvider >
        <AppRouter />
        <ToastContainer/>
      </AuthContextProvider>

    </div>
  );
}

export default App;
