import { useState } from "react";

export const AiToolsMovieRecommendation = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const availableGenres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime",
    "Documentary", "Drama", "Fantasy", "Horror", "Mystery",
    "Romance", "Sci-Fi", "Thriller", "Western", "Musical"
  ];

  const streamingServices = [
    "Netflix", "Amazon Prime", "Disney+", "Hulu",
    "HBO Max", "Apple TV+", "Peacock", "Paramount+"
  ];

  function handleFormSubmission(e) {
    e.preventDefault();
        const form = new FormData(e.target);

    const genreSelect = document.getElementById('genres');
    const selectedGenres = Array.from(genreSelect.selectedOptions).map(option => option.value);

    const excludeGenreSelect = document.getElementById('excludeGenres');
    const selectedExcludeGenres = Array.from(excludeGenreSelect.selectedOptions).map(option => option.value);

    const selectedStreamingServices = streamingServices
      .filter(service => form.get(`streaming-${service.replace('+', 'Plus').replace(' ', '')}`))
      .map(service => service);

    const params = {
      genres: selectedGenres,
      mood: form.get("mood"),
      decade: form.get("decade"),
      maxRuntime: form.get("maxRuntime") ? parseInt(form.get("maxRuntime")) : undefined,
      minRating: form.get("minRating") ? parseFloat(form.get("minRating")) : undefined,
      excludeGenres: selectedExcludeGenres.length > 0 ? selectedExcludeGenres : undefined,
      directors: form.get("directors") || undefined,
      actors: form.get("actors") || undefined,
      similarTo: form.get("similarTo") || undefined,
      streamingServices: selectedStreamingServices.length > 0 ? selectedStreamingServices : undefined
    };
    handleSubmit(params);
  }

  async function handleSubmit(params) {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Fetch error", error);
      setResponse({ error: "Failed to generate movie recommendations" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      {!response ? (
        <div className="movie-form-container">
          <h1>Movie Recommendation Engine</h1>
          <p>Tell us what you're in the mood for, and we'll find the perfect films for your next movie night!</p>

          <form onSubmit={handleFormSubmission} className="aitools_fitness">
            <div className="form-group">
              <label htmlFor="genres">Genres (Select multiple)</label>
              <select
                id="genres"
                name="genres"
                multiple
                required
                size={5}
              >
                {availableGenres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              <small>Hold Ctrl/Cmd to select multiple</small>
            </div>

            <div className="form-group">
              <label htmlFor="mood">Current Mood</label>
              <select id="mood" name="mood" required>
                <option value="">Select your mood</option>
                <option value="happy">Happy/Uplifting</option>
                <option value="thoughtful">Thoughtful/Reflective</option>
                <option value="excited">Excited/Energetic</option>
                <option value="relaxed">Relaxed/Chill</option>
                <option value="sad">Sad/Melancholic</option>
                <option value="romantic">Romantic</option>
                <option value="scared">Looking for a Scare</option>
                <option value="nostalgic">Nostalgic</option>
                <option value="inspired">Want to be Inspired</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="decade">Preferred Decade</label>
              <select id="decade" name="decade">
                <option value="">Any decade</option>
                <option value="1950s">1950s</option>
                <option value="1960s">1960s</option>
                <option value="1970s">1970s</option>
                <option value="1980s">1980s</option>
                <option value="1990s">1990s</option>
                <option value="2000s">2000s</option>
                <option value="2010s">2010s</option>
                <option value="2020s">2020s</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="maxRuntime">Maximum Runtime (minutes)</label>
              <input
                id="maxRuntime"
                name="maxRuntime"
                type="number"
                min="30"
                max="300"
                placeholder="e.g., 120"
              />
            </div>

            <div className="form-group">
              <label htmlFor="minRating">Minimum Rating (1-10)</label>
              <input
                id="minRating"
                name="minRating"
                type="number"
                min="1"
                max="10"
                step="0.1"
                placeholder="e.g., 7.5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="excludeGenres">Genres to Exclude (Select multiple)</label>
              <select
                id="excludeGenres"
                name="excludeGenres"
                multiple
                size={3}
              >
                {availableGenres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              <small>Hold Ctrl/Cmd to select multiple</small>
            </div>

            <div className="form-group">
              <label htmlFor="similarTo">Similar to Movie/Show</label>
              <input
                id="similarTo"
                name="similarTo"
                type="text"
                placeholder="e.g., The Shawshank Redemption"
              />
            </div>

            <div className="form-group">
              <label htmlFor="directors">Favorite Directors (comma separated)</label>
              <input
                id="directors"
                name="directors"
                type="text"
                placeholder="e.g., Christopher Nolan, Quentin Tarantino"
              />
            </div>

            <div className="form-group">
              <label htmlFor="actors">Favorite Actors (comma separated)</label>
              <input
                id="actors"
                name="actors"
                type="text"
                placeholder="e.g., Tom Hanks, Meryl Streep"
              />
            </div>

            <div className="form-group">
              <label>Available Streaming Services</label>
              <div className="checkbox-group">
                {streamingServices.map(service => (
                  <div key={service} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`streaming-${service.replace('+', 'Plus').replace(' ', '')}`}
                      name={`streaming-${service.replace('+', 'Plus').replace(' ', '')}`}
                    />
                    <label htmlFor={`streaming-${service.replace('+', 'Plus').replace(' ', '')}`}>{service}</label>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? 'Finding Movies...' : 'Get Recommendations'}
            </button>
          </form>
        </div>
      ) : (
        <div className="recommendation-response">
          <h2>Your Movie Recommendations</h2>
          {response.error ? (
            <div className="error-message">{response.error}</div>
          ) : (
            <>
              <div className="recommendations-list">
                {response.recommendations && response.recommendations.map((movie, index) => (
                  <div key={index} className="movie-card">
                    <h3>{movie.title} {movie.year && `(${movie.year})`}</h3>
                    {movie.genre && <p><strong>Genre:</strong> {movie.genre}</p>}
                    {movie.director && <p><strong>Director:</strong> {movie.director}</p>}
                    {movie.description && <p>{movie.description}</p>}
                    {movie.whyRecommended && (
                      <div className="why-recommended">
                        <h4>Why we think you'll like it:</h4>
                        <p>{movie.whyRecommended}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="footnote">
                <p>Looking for something different? Try adjusting your preferences.</p>
              </div>
            </>
          )}
          <button onClick={() => setResponse(null)} className="reset-button">
            Get New Recommendations
          </button>
        </div>
      )}
    </div>
  );
};