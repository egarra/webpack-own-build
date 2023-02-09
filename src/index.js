import './index.html';
import './index.scss';
import gf from './img/gf.jpg'

import { hello } from './js/script';


function component() {
    const element = document.createElement('div');

    element.classList.add('red')
    element.innerHTML = 'Hello Webpack';
    hello()
    return element;
  }
 
  document.body.appendChild(component());
  const img = new Image();
  img.src = gf;
  
  document.body.appendChild(img);