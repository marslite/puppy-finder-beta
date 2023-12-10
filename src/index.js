import React from 'react'; 
import ReactDOM from 'react-dom/client'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import WebFont from 'webfontloader';
import App from './App'; 

WebFont.load({
    google:{
      families:['Pacifico','Silkscreen']
    }
  })




const root = ReactDOM.createRoot(document.getElementById('root')); 





root.render( 
<React.StrictMode> 
    <App />     
</React.StrictMode> );