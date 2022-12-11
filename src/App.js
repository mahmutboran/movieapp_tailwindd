
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './context/AuthContextProvider';
import AppRouter from './router/AppRouter';

function App() {


  return (
    <div className='bg-gray-100 dark:bg-[#23242a]'>
      {/* <AuthContextProvider children={<AppRouter />} /> */}
<h1>3.26
  
</h1>
      <AuthContextProvider >
        <AppRouter />
        <ToastContainer/>
      </AuthContextProvider>
      <h1>2:56:00</h1>
    </div>
  );
}

export default App;
