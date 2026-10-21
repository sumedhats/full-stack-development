import { useState } from "react";
import "./index.css";

const workouts = [
  {
    title: "Upper Body Strength",
    category: "Strength",
    duration: "30 min",
    level: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Full Body HIIT",
    category: "HIIT",
    duration: "25 min",
    level: "Advanced",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Lower Body Workout",
    category: "Strength",
    duration: "35 min",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Core & Abs",
    category: "Core",
    duration: "20 min",
    level: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  "All",
  "Strength",
  "HIIT",
  "Core",
  "Cardio",
  "Yoga",
];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const filteredWorkouts = workouts.filter((workout) => {
    const categoryMatch =
      activeCategory === "All" || workout.category === activeCategory;

    const searchMatch = workout.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const toggleFavorite = (title) => {
    setFavorites((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title]
    );
  };

  return (
    <div className="app">
      {/* Announcement */}
      <div className="announcement">
        Free workouts, programs and fitness resources for everyone.
      </div>

      {/* Navigation */}
      <header className="navbar">
        <div className="logo">
          <span>FIT</span>NESS
          <small>YOUR FITNESS JOURNEY</small>
        </div>

        <nav>
          <a href="#workouts">Workouts</a>
          <a href="#programs">Programs</a>
          <a href="#nutrition">Nutrition</a>
          <a href="#community">Community</a>
        </nav>

        <div className="nav-actions">
          <button className="search-icon">⌕</button>
          <button className="login-btn">Sign In</button>
          <button className="join-btn">Join</button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">YOUR FITNESS. YOUR WAY.</p>

          <h1>
            Workouts that
            <br />
            <span>fit your life.</span>
          </h1>

          <p className="hero-text">
            Find effective workouts, training programs and healthy living
            resources designed to help you reach your goals.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Explore Workouts</button>
            <button className="secondary-btn">View Programs</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=85"
            alt="Fitness workout"
          />
        </div>
      </section>

      {/* Search */}
      <section className="workout-search">
        <div>
          <p className="section-label">FIND YOUR WORKOUT</p>
          <h2>What do you want to train today?</h2>
        </div>

        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search workouts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </section>

      {/* Workouts */}
      <section className="workouts" id="workouts">
        <div className="section-heading">
          <div>
            <p className="section-label">WORKOUT LIBRARY</p>
            <h2>Featured workouts</h2>
          </div>

          <button className="view-all">View all →</button>
        </div>

        <div className="workout-grid">
          {filteredWorkouts.map((workout) => (
            <article className="workout-card" key={workout.title}>
              <div className="card-image">
                <img src={workout.image} alt={workout.title} />

                <button
                  className="favorite"
                  onClick={() => toggleFavorite(workout.title)}
                >
                  {favorites.includes(workout.title) ? "♥" : "♡"}
                </button>

                <span className="play">▶</span>
              </div>

              <div className="card-content">
                <span className="category-tag">{workout.category}</span>

                <h3>{workout.title}</h3>

                <div className="workout-meta">
                  <span>◷ {workout.duration}</span>
                  <span>• {workout.level}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="programs" id="programs">
        <div className="program-text">
          <p className="section-label">TRAINING PROGRAMS</p>

          <h2>
            A plan that keeps
            <br />
            you moving.
          </h2>

          <p>
            Follow structured programs created to help you build strength,
            improve endurance and stay consistent.
          </p>

          <button className="primary-btn">Explore Programs</button>
        </div>

        <div className="program-cards">
          <div className="program-card dark">
            <span>01</span>
            <h3>Strength & Conditioning</h3>
            <p>8 weeks · Intermediate</p>
          </div>

          <div className="program-card light">
            <span>02</span>
            <h3>Full Body Fitness</h3>
            <p>4 weeks · Beginner</p>
          </div>

          <div className="program-card image-card">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be5013a?auto=format&fit=crop&w=700&q=80"
              alt="Training"
            />
            <div>
              <span>03</span>
              <h3>HIIT Challenge</h3>
              <p>6 weeks · Advanced</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition */}
      <section className="nutrition" id="nutrition">
        <div className="nutrition-image">
          <img
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80"
            alt="Healthy food"
          />
        </div>

        <div className="nutrition-content">
          <p className="section-label">HEALTHY LIVING</p>

          <h2>Fitness is more than a workout.</h2>

          <p>
            Discover simple nutrition ideas, healthy recipes and practical
            wellness advice to support your fitness journey.
          </p>

          <button className="secondary-btn">Explore Healthy Living</button>
        </div>
      </section>

      {/* Community */}
      <section className="community" id="community">
        <p className="section-label">OUR COMMUNITY</p>

        <h2>Find motivation. Build consistency.</h2>

        <p>
          Join a community of people working toward stronger, healthier lives.
        </p>

        <button className="primary-btn">Join the Community</button>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-brand">
          <div className="logo">
            <span>FIT</span>NESS
            <small>YOUR FITNESS JOURNEY</small>
          </div>

          <p>
            Effective workouts and healthy living resources designed for real
            people and real life.
          </p>
        </div>

        <div className="footer-column">
          <h4>Workouts</h4>
          <a href="#workouts">Workout Videos</a>
          <a href="#workouts">Strength</a>
          <a href="#workouts">HIIT</a>
          <a href="#workouts">Cardio</a>
        </div>

        <div className="footer-column">
          <h4>Programs</h4>
          <a href="#programs">Programs</a>
          <a href="#programs">Challenges</a>
          <a href="#programs">Routines</a>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <a href="#community">About</a>
          <a href="#community">Community</a>
          <a href="#community">Contact</a>
        </div>
      </footer>

      <div className="copyright">
        © 2026 Fitness Replica. Built with React.
      </div>
    </div>
  );
}

export default App;