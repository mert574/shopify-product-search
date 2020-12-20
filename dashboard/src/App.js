import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchPage from './pages/search';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/">
                        <SearchPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
