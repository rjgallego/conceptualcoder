import React from 'react';
import '../../resources/css/Home.css';
import {Articles} from './Articles';
import {Cover} from './Cover';
import {Footer} from '../Footer';

export class Home extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         filter: 'all'
      }
      this.setFilter = this.setFilter.bind(this);
   }
   
   setFilter(filter){
      console.log(process.env.NODE_ENV);
      this.setState({
         filter : filter === this.state.filter ? 'all' : filter
      });
   }

   render() {
      return (
          <div className="Home">
             <Cover setFilter={this.setFilter}/>
             <div className="Articles">
               <Articles filter={this.state.filter} />
             </div>
             <Footer />
          </div>
      );
   }
}