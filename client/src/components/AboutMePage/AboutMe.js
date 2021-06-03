import React from 'react';
import './AboutMe.css';
import {SearchBar} from '../SearchBar';
import {Footer} from '../Footer';

export class AboutMe extends React.Component {

   render() {
      return (
        <div className="AboutMe">
            <SearchBar />
            <div  id="main-div">
                <h1 id="title">About Me</h1>
                <h2 id="subtitle">I've learned that I still have a lot to learn</h2>
                <div id="body-div">
                    <div id="img">
                        <img id="aboutme-img" src={require('../../resources/images/aboutme.jpg')} />
                    </div>
                    <div id="text-div">
                        <h2 id="body-title">Creator. Developer. Student.</h2>
                        <p id="body-text">
                            I've been working with computers since college, I originally got my degree in computer engineering. 
                            But alas, I didn't not end up in the world of software development until only recently. COVID was a 
                            difficult and devestating year for people around the world, but one silver lining (at least for me) was the
                            ability to work from home instead of commuting 2 hours every day to the office. With all this newly found
                            free time, I decided to do something useful and start programming. <br/><br/> I started with Java
                            since I already worked with enterprise applications and was familiar with the language.
                            This led me to learn Spring framework, which I quickly realized I couldn't understand until I learned
                            the basics of web development. And out of this revelation came this very site. I decided to learn
                            web development by using the more commonly used JavaScript and it's frameworks. This entire site is 
                            build using only JavaScript (no Python, sorry guys), and in putting it together I learned about servers, 
                            HTTP requests, databases, user security, React, and much more. <br/><br/> In software there is so much 
                            out there and things are changing all of the time. So in order to help me better understand new ideas, 
                            concepts, and technologies I made this a blog site so I had a space to describe the little things I learn 
                            to cement it into my brain. If it happens to help someone else, then that's just icing on the cake!
                            <br/><br/>However you got here, I hope that one of my articles helps you figure out something that you're 
                            working on, or that if you're not looking for anything in particular that you can take this opportunity
                            to learn something new. 
                        </p>
                        <h3>Happy Coding!</h3>
                    </div>
                </div>
                
            </div>
            <Footer />
          </div>
      );
   }
}