'use strict';
/*
    author: Anjan Roy <anjanroy@yandex.com>
*/

window.addEventListener('DOMContentLoaded', (ev) => {
  function handleError(error) {
    let errorDiv = document.createElement('div');
    errorDiv.className = 'childDiv';
    let errorArticle = document.createElement('article');
    let errorheading = document.createElement('h1');
    errorheading.innerHTML = 'Error';
    let errorText = document.createElement('p');
    errorText.className = 'playListText';
    errorText.innerHTML = 'Something unexpected happened !!!';
    errorArticle.appendChild(errorheading);
    errorArticle.appendChild(errorText);
    errorDiv.appendChild(errorArticle);
    parentDiv.appendChild(errorDiv);
  }

  function setLightsUpForShow(event) {
    window.navigator.vibrate(200);
    let movieName = event.target.childNodes[0].childNodes[0].innerHTML;
    while (parentDiv.childElementCount > 0) {
      parentDiv.removeChild(document.getElementById('mainDiv').firstChild);
    }
    let childDiv = document.createElement('div');
    childDiv.className = 'childDiv';
    childDiv.style.backgroundColor = 'white';
    childDiv.style.width = `${window.innerWidth - 50}px`;
    childDiv.style.marginTop = '2vmax';
    let videoText = document.createElement('p');
    videoText.style.color = 'black';
    videoText.style.marginLeft = '1vmax';
    videoText.style.marginBottom = '0';
    videoText.style.paddingBottom = '0';
    videoText.style.fontFamily = "Georgia, 'Times New Roman', Times, serif";
    videoText.style.fontWeight = 'bold';
    videoText.style.fontSize = '2vmax';
    videoText.innerHTML = movieName;
    let video = document.createElement('video');
    video.style.width = '100%';
    video.style.outline = 'none';
    video.width = window.innerWidth - 20;
    video.height = (video.width * 9) / 16;
    video.controls = true;
    let source = document.createElement('source');
    source.src = movieName;
    source.type = `video/${movieName.split('.').slice(-1)[0]}`;
    video.appendChild(source);
    childDiv.appendChild(videoText);
    childDiv.appendChild(video);
    parentDiv.appendChild(childDiv);
  }

  let parentDiv = document.getElementById('mainDiv');
  fetch(new URL('movies', window.location.href)).then((resp) => {
    resp.json().then((data) => {
      Object.keys(data).sort().forEach((elem) => {
        let movieDiv = document.createElement('div');
        movieDiv.className = 'childDiv';
        movieDiv.onmouseenter = (ev) => {
          ev.target.style.backgroundColor = 'aqua';
          let text = ev.target.childNodes[0].childNodes[0];
          text.style.color = 'black';
        };
        movieDiv.onmouseleave = (ev) => {
          ev.target.style.backgroundColor = 'cadetblue';
          let text = ev.target.childNodes[0].childNodes[0];
          text.style.color = 'snow';
        };
        movieDiv.onclick = setLightsUpForShow;
        let movieArticle = document.createElement('article');
        let movieName = document.createElement('p');
        movieName.className = 'playListText';
        movieName.innerHTML = elem;
        movieArticle.appendChild(movieName);
        movieDiv.appendChild(movieArticle);
        parentDiv.appendChild(movieDiv);
      });
    }, handleError);
  }, handleError);
});
