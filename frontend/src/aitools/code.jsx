import { useState } from "react";

export const AiToolsCodeSolver = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Available programming languages
  const availableLanguages = [
    "Python", "JavaScript", "Java", "C++", "C#", "Ruby", "Go", "TypeScript", "Swift", "Kotlin"
  ];

  // Available libraries/frameworks
  const availableFrameworks = [
    "React", "Node.js", "Django", "Flask", "Spring Boot", "TensorFlow", "PyTorch", "Angular", "Vue.js", "Express.js"
  ];

  function handleFormSubmission(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const params = {
      language: form.get("language"),
      problemDescription: form.get("problemDescription"),
      codeContext: form.get("codeContext"),
      desiredOutput: form.get("desiredOutput"),
      errorMessages: form.get("errorMessages"),
      frameworks: form.get("frameworks"),
      timeComplexity: form.get("timeComplexity"),
      spaceComplexity: form.get("spaceComplexity"),
      codeStyle: form.get("codeStyle"),
      additionalConstraints: form.get("additionalConstraints")
    };
    handleSubmit(params);
  }

  async function handleSubmit(params) {
    setIsLoading(true);
    try {
      const res = await fetch('/api/code', {
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
      setResponse({ error: "Failed to generate code solution" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      {!response ? (
        <div className="code-form-container">
          <h1>Code Solver Tool</h1>
          <p>Describe your coding problem, and we'll generate an optimized solution for you!</p>

          <form onSubmit={handleFormSubmission} className="aitools_code_solver">
            <div className="form-group">
              <label htmlFor="language">Programming Language</label>
              <select id="language" name="language" required>
                <option value="">Select a language</option>
                {availableLanguages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="problemDescription">Problem Description</label>
              <textarea
                id="problemDescription"
                name="problemDescription"
                placeholder="Describe your problem in detail..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="codeContext">Code Context (Optional)</label>
              <textarea
                id="codeContext"
                name="codeContext"
                placeholder="Paste your existing code or context..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="desiredOutput">Desired Output</label>
              <textarea
                id="desiredOutput"
                name="desiredOutput"
                placeholder="What should the code output or achieve?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="errorMessages">Error Messages (Optional)</label>
              <textarea
                id="errorMessages"
                name="errorMessages"
                placeholder="Paste any error messages you're encountering..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="frameworks">Preferred Libraries/Frameworks (Optional)</label>
              <select id="frameworks" name="frameworks" multiple size={3}>
                {availableFrameworks.map(framework => (
                  <option key={framework} value={framework}>{framework}</option>
                ))}
              </select>
              <small>Hold Ctrl/Cmd to select multiple</small>
            </div>

            <div className="form-group">
              <label htmlFor="timeComplexity">Desired Time Complexity (Optional)</label>
              <input
                id="timeComplexity"
                name="timeComplexity"
                type="text"
                placeholder="e.g., O(n), O(log n)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="spaceComplexity">Desired Space Complexity (Optional)</label>
              <input
                id="spaceComplexity"
                name="spaceComplexity"
                type="text"
                placeholder="e.g., O(1), O(n)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="codeStyle">Preferred Code Style (Optional)</label>
              <select id="codeStyle" name="codeStyle">
                <option value="">Any style</option>
                <option value="functional">Functional</option>
                <option value="object-oriented">Object-Oriented</option>
                <option value="procedural">Procedural</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="additionalConstraints">Additional Constraints (Optional)</label>
              <textarea
                id="additionalConstraints"
                name="additionalConstraints"
                placeholder="Any other constraints or requirements..."
              />
            </div>

            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? 'Generating Solution...' : 'Get Solution'}
            </button>
          </form>
        </div>
      ) : (
        <div className="solution-response">
          <h2>Your Code Solution</h2>
          {response.error ? (
            <div className="error-message">{response.error}</div>
          ) : (
            <>
              <div className="solution-code">
                <pre>{response.solution}</pre>
              </div>

              <div className="footnote">
                <p>Need further refinements? Adjust your inputs and try again.</p>
              </div>
            </>
          )}
          <button onClick={() => setResponse(null)} className="reset-button">
            Solve Another Problem
          </button>
        </div>
      )}
    </div>
  );
};