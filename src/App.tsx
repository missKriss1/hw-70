import TollBar from './component /TollBar/TollBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './container/Home/Home.tsx';
import AddContacts from './container/AddContacts/AddContacts.tsx';
import EditContacts from './container/EditContacts/EditContacts.tsx';

  const App = () => {
    return (
      <div className='container'>
        <header>
          <TollBar/>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/add-new-contact' element={<AddContacts/>}/>
            <Route path='/edit-contact/:id' element={<EditContacts/>}/>
          </Routes>
        </main>
      </div>
    );

  };

  export default App;
