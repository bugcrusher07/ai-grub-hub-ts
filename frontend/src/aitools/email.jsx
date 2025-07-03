import '../aitools.module.css';
import { useState, useRef } from 'react';

export const AiToolsEmail = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleFormSubmission(e) {
    e.preventDefault(); // Prevent default form submission
    const form = new FormData(e.target);
    const recipient = form.get("recipient");
    const senderAddress = form.get("sender");
    const subject = form.get("subject");
    const wordLimit = form.get("wordLimit");
    const tone = form.get("tone");
    const customRequest = form.get("customRequest");

    handleSubmit(recipient, senderAddress, subject, wordLimit, tone,customRequest);
  }

  async function handleSubmit(recipient, sender, subject, wordLimit, tone,customRequest) {
    setIsLoading(true);
    try {
      const emailParams = {
        recipient: recipient,
        sender: sender,
        subject: subject,
        wordLimit: wordLimit,
        tone: tone,
        customRequest:customRequest,
      };

      const res = await fetch('http://localhost:3000/api/email', {
        method: 'POST',
        headers: { // Fixed 'header' to 'headers'
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailParams)
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Fetch error", error);
      setResponse({ error: "Failed to generate email" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {!response ? (
        <form onSubmit={handleFormSubmission} className="aitools_fitness">
          <label>Recipient's position</label>
          <input name="recipient" required />
          <label>Sender's position</label>
          <input name="sender" required />
          <label>Subject</label>
          <input name="subject" required />
          <label>Word limit</label>
          <input name="wordLimit" type="number" required />
          <label>Tone</label>
          <input name="tone" required />
          <label>customRequest</label>
          <input name="customRequest" required />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Email'}
          </button>
        </form>
      ) : (
        <div className="email-response">
          <h2>Generated Email</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          <button onClick={() => setResponse(null)}>
            Create Another Email
          </button>
        </div>
      )}
    </div>
  );
};