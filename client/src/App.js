import React from 'react';
import './App.css';
import {Home} from './components/HomePage/Home';
import {ArticlePage} from './components/ArticlePage/ArticlePage';
import {NewFormPage} from './components/NewFormPage/NewFormPage';
import {DeletePage} from './components/DeletePage/DeletePage';
import {LoginPage} from './components/LoginPage/LoginPage';
import {AboutMe} from './components/AboutMePage/AboutMe';
import {EditPage} from './components/EditPage/EditPage';
import {Switch, Route} from 'react-router-dom';

class App extends React.Component {
   render() {
      return (
          <div className="App">
             <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/article/:id" component={ArticlePage} />
                <Route path="/form" component={NewFormPage} />
                <Route path="/delete/:id" component={DeletePage} />
                <Route path="/edit/:id" component={EditPage} />
                <Route path="/login" component={LoginPage}/>
                <Route path="/about-me" component={AboutMe}/>
             </Switch>
          </div>
      );
   }
}

export default App;
