import TollBar from './component /TollBar/TollBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './container/Home/Home.tsx';
import ContactsAdd from './component /ContactsAdd/ContactsAdd.tsx';

  const App = () => {
    return (
      <div className='container'>
        <header>
          <TollBar/>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/add-new-contact' element={<ContactsAdd/>}/>
          </Routes>
        </main>
      </div>
    );

  };

  export default App;
