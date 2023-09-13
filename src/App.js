import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { useRef } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

function App() {
  const [stringToConvert, setStringToConvert] = useState('https://google.com')
  const qrCodeRef = useRef();

  // const handleDownload = () => {
  //   const link = document.createElement('a');
  //   link.href = logo;
  //   link.download = 'qr-code';
  //   link.click();
  // };

  const handleDownload = () => {
    const svgElement = qrCodeRef.current;

    // Convert the SVG element to a data URL
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const dataURL = `data:image/svg+xml;base64,${btoa(svgData)}`;


    const qrNode = document.querySelector('#qr-div')
    // Create a link to initiate the download
    // const link = document.createElement('a');
    // link.href = dataURL;
    // link.download = 'qrcode';
    // link.click();

    toPng(svgElement)
      .then((dataUrl) => {
        // Create a download link
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qrcode.png'; // Specify the filename

        // Trigger a click event on the link to initiate the download
        link.click();
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // const canvas = qrCodeRef.current.toCanvas(); // Get the canvas element

    // // Convert the canvas to a data URL (PNG format)
    // const dataURL = canvas.toDataURL('image/png');

    // // Create a download link
    // const link = document.createElement('a');
    // link.href = dataURL;
    // link.download = 'qrcode.png'; // Specify the filename

    // // Trigger a click event on the link to initiate the download
    // link.click();
  };

  return (
    <div className="App">
      <div className='input-div'>
        <input placeholder='Type your link here' value={stringToConvert} onChange={(e) => setStringToConvert(e.target.value)} />
      </div>
      <br />
      <hr />
      <div id='qr-div'>
        <QRCode
          ref={qrCodeRef}
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={stringToConvert}
          viewBox={`0 0 256 256`}
        />
      </div>
      <br />
      {/* <QRCodeSVG ref={qrCodeRef} value={stringToConvert} /> */}
      <br />
      {/* <QRCodeCanvas ref={qrCodeRef} value={stringToConvert} /> */}
      <br />
      <hr />
      <button onClick={handleDownload}>Download QR Image</button>
    </div>
  );
}

export default App;
