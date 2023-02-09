import './index.html';
import './index.css';


function component() {
    const element = document.createElement('div');
 
    element.classList.add('red')
    element.innerHTML = 'Hello Webpack';
 
    return element;
  }
 
  document.body.appendChild(component());