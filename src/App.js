import logo from './logo.svg';
import './App.css';

function App() {
  
  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  return (
    <div className="body">
      <Switch>
        <Route
          path="/new"
          render={() => {
            return(
              <New
                handleInput={handleInput}
              />
            )
          }}
        />
        <Route
          path="/view"
          render={() => {
            return(
              <View/>
            )
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
