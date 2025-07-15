import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [description, setDescription] = useState('');
  const iframeRef = useRef(null);
  const xmlRef = useRef('');

  const generate = async () => {
    const res = await fetch('/generate-diagram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
    const data = await res.json();
    xmlRef.current = data.xml;
    iframeRef.current?.contentWindow.postMessage({ action: 'load', xml: data.xml }, '*');
  };

  const downloadXml = () => {
    const blob = new Blob([xmlRef.current], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usecase-diagram.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPng = () => {
    iframeRef.current?.contentWindow.postMessage({ action: 'export', format: 'png' }, '*');
  };

  window.addEventListener('message', (event) => {
    if (event.data?.event === 'export') {
      const a = document.createElement('a');
      a.href = event.data.dataUrl;
      a.download = 'usecase-diagram.png';
      a.click();
    }
  });

  return (
    <div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your use cases"
        rows={4}
        style={{ width: '100%' }}
      />
      <button onClick={generate}>Generate</button>
      <button onClick={downloadXml}>Download XML</button>
      <button onClick={exportPng}>Download PNG</button>
      <iframe
        ref={iframeRef}
        title="diagram"
        style={{ width: '100%', height: '500px', border: '1px solid #ccc', marginTop: '1rem' }}
        src="https://embed.diagrams.net/?embed=1&ui=min&proto=json"
      />
    </div>
  );
}

export default App;
