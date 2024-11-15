import { Link } from 'react-router-dom';

const TollBar = () => {
  return (
    <div>
      <div>
        <nav className="navbar navbar-dark bg-white mt-4 ">
          <div className="container-fluid d-flex justify-content-between">
            <div>
              <Link to="/" className="navbar-brand text-black fw-bold fs-2">
                Contacts
              </Link>
            </div>
            <div>
              <button className=" btn bg-black">
                  <Link to="/add-new-contact" className="navbar-brand text-white fw-bold">
                    Add new contacts
                  </Link>
              </button>
            </div>
          </div>
        </nav>
        <hr/>
      </div>
    </div>
  );
};

export default TollBar;