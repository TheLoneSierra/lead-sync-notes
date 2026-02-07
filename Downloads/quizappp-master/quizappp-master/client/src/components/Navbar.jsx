
function Navbar() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="https://static.vecteezy.com/system/resources/previews/003/781/387/non_2x/quiz-retro-speech-bubble-vector.jpg" alt="Testline Logo" />
          <span>QuiZup!</span>
        </div>
        <button className="download-btn">Download App</button>
      </nav>

      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome to Testline</h1>
        <p>
          Testline is redefining how students prepare for competitive exams like
          REET, NEET, and State PSCs. With daily test targets, smart revision,
          and gamified routines, we make learning interactive, interesting, and
          impactful. Join Testline to build habits, retain concepts, and
          <strong> ace your confidence!</strong>
        </p>
      </section>
    </div>
  );
}

export default Navbar;
