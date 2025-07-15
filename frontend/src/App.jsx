import { useState, useRef, useEffect } from 'react';
import './App.css';

// Main React component for the UI
function App() {
  // Text entered by the user
  const [description, setDescription] = useState('');
  // Reference to the diagrams.net iframe
  const iframeRef = useRef(null);
  // Hold generated XML so it can be downloaded later
  const xmlRef = useRef('');

  // Send the description to the backend and load the resulting diagram
  const generate = async () => {
    if (!description.trim()) return;
    const res = await fetch('/generate-diagram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
    const data = await res.json();
    xmlRef.current = data.xml;
    iframeRef.current?.contentWindow.postMessage({ action: 'load', xml: data.xml }, '*');
  };

  // Download the generated diagram as XML
  const downloadXml = () => {
    const blob = new Blob([xmlRef.current], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usecase-diagram.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Request a PNG export from the iframe
  const exportPng = () => {
    iframeRef.current?.contentWindow.postMessage({ action: 'export', format: 'png' }, '*');
  };

  // Handle messages from the diagrams.net iframe
  useEffect(() => {
    const handler = (event) => {
      if (event.data?.event === 'export') {
        const a = document.createElement('a');
        a.href = event.data.dataUrl;
        a.download = 'usecase-diagram.png';
        a.click();
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <div className="container">
      <h1>Use Case Diagram Generator</h1>
      <textarea
        className="description-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your use cases"
        rows={4}
      />
      <div className="buttons">
        <button onClick={generate}>Generate</button>
        <button onClick={downloadXml}>Download XML</button>
        <button onClick={exportPng}>Download PNG</button>
      </div>
      <iframe
        ref={iframeRef}
        className="diagram-frame"
        title="diagram"
        src="https://embed.diagrams.net/?embed=1&ui=min&proto=json"
      />
    </div>
  );
}

export default App;
