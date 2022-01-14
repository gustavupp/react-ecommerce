import React from 'react'
import '../styles/about.css'
import our_story from '../assets/our_story.jpeg'

const About = () => {
  return (
    <div className="about-container">
      <div className="about-img-container">
        <img src={our_story}></img>
      </div>
      <article className="about-article-container">
        <h1 className="about-title">How It All Started...</h1>
        <p className="about-main-text">
          The purpose of our lives is to be happy. Get busy living or get busy
          dying. Many of life’s failures are people who did not realize how
          close they were to success when they gave up. If you want to live a
          happy life, tie it to a goal, not to people or things. Never let the
          fear of striking out keep you from playing the game. Money and success
          don’t change people; they merely amplify what is already there. Your
          time is limited, so don’t waste it living someone else’s life. Don’t
          be trapped by dogma – which is living with the results of other
          people’s thinking.
        </p>
      </article>
    </div>
  )
}

export default About
