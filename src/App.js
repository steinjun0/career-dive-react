import logo from './logo.svg';
import './App.css';
import Gnb from './component/gnb'
import HomeBanner from './component/home/HomeBanner';
import JobCategoryGroup from './component/home/JobCategoryGroup'
import { GrayBackground } from './util/styledComponent';

function App() {
  return (
    <div className="App">
      <Gnb />
      <HomeBanner></HomeBanner>
      <GrayBackground>
        <JobCategoryGroup></JobCategoryGroup>
      </GrayBackground>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
