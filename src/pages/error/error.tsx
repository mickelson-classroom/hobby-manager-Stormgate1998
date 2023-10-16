import Navbar from '../NavBar';

export const ErrorPage = () => {

  return (
    <div>
      <Navbar />
      
        <div>
          <h2 className="text-success">Click Button To Set Off Error</h2>
       <button
            className="btn btn-secondary my-3"
            onClick={() => {
                  throw new Error("This is a deliberate error.");
            }}
          >
            Trigger Error
          </button>
        </div>
      
    </div>
  );
};
