import { useState } from 'react';
import { Menu, MapPin, Calendar, Users, Search, ArrowRight, Star } from 'lucide-react';
import './App.css';

const destinations = [
  { name: 'Bali, Indonesia', type: 'Tropical Paradise', price: '$850', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900' },
  { name: 'Swiss Alps, Switzerland', type: 'Mountain Escape', price: '$1200', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900' },
  { name: 'Santorini, Greece', type: 'Coastal Beauty', price: '$950', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=900' }
];

export default function App() {
  const [menu, setMenu] = useState(false);

  return (
    <main>
      <section className="hero">
        <nav className="navbar">
          <a className="logo" href="#">WANDER<span>LY.</span></a>
          <button className="menu" onClick={() => setMenu(!menu)}><Menu /></button>
          <div className={menu ? 'navlinks show' : 'navlinks'}>
            <a href="#home">Home</a>
            <a href="#destinations">Destinations</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="navbutton" href="#destinations">Explore Now ↗</a>
        </nav>

        <div className="hero-content" id="home">
          <span className="eyebrow">✦ DISCOVER THE WORLD</span>
          <h1>Explore the<br />world, <em>your way.</em></h1>
          <p>Find extraordinary places, create unforgettable memories and experience the beauty of travelling.</p>
          <a className="primary" href="#destinations">Discover Places <ArrowRight size={17}/></a>
        </div>

        <div className="stats">
          <div><b>120+</b><small>Destinations</small></div>
          <div><b>15k+</b><small>Happy travellers</small></div>
          <div><b>4.9/5</b><small>Customer rating</small></div>
        </div>
      </section>

      <section className="search-section">
        <div className="searchbox">
          <div><MapPin/><label>DESTINATION<input placeholder="Where do you want to go?"/></label></div>
          <div><Calendar/><label>TRAVEL DATE<input type="date"/></label></div>
          <div><Users/><label>TRAVELLERS<select><option>2 People</option><option>1 Person</option><option>3 People</option><option>4 People</option></select></label></div>
          <button onClick={() => document.getElementById('destinations').scrollIntoView({behavior:'smooth'})}><Search/> Search</button>
        </div>
      </section>

      <section className="section" id="destinations">
        <span className="eyebrow dark">✦ EXPLORE THE WORLD</span>
        <div className="section-heading">
          <div><h2>Popular <em>destinations</em></h2><p>Places that make you fall in love with travelling.</p></div>
          <a href="#contact">View all destinations ↗</a>
        </div>
        <div className="cards">
          {destinations.map(place => (
            <article className="card" key={place.name}>
              <div className="photo">
                <img src={place.image} alt={place.name}/>
                <span>From {place.price}</span>
              </div>
              <small>{place.type}</small>
              <h3>{place.name}</h3>
              <div className="rating"><Star size={15} fill="currentColor"/> 4.9</div>
            </article>
          ))}
        </div>
      </section>

      <section className="about section" id="about">
        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1100" alt="Mountain lake"/>
        <div>
          <span className="eyebrow dark">✦ WHY WANDERLY</span>
          <h2>Travel more.<br/>Worry <em>less.</em></h2>
          <p>Travelling is more than visiting a destination. It is about discovering cultures, meeting people and collecting moments that last forever.</p>
          <h3>01 — Curated experiences</h3>
          <p>Handpicked destinations for extraordinary adventures.</p>
          <h3>02 — Easy planning</h3>
          <p>Everything you need to plan your perfect journey.</p>
          <a className="primary" href="#contact">Discover our story ↗</a>
        </div>
      </section>

      <section className="cta" id="contact">
        <span>YOUR NEXT ADVENTURE STARTS HERE</span>
        <h2>Let's make your next trip<br/><em>unforgettable.</em></h2>
        <a href="#destinations">Start exploring ↗</a>
      </section>

      <footer>
        <a className="logo" href="#">WANDER<span>LY.</span></a>
        <p>Explore more. Experience life.</p>
        <small>© 2026 Wanderly. All rights reserved.</small>
      </footer>
    </main>
  );
}
