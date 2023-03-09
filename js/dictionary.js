const searchBtn = document.getElementById("search-btn");
const inputForm = document.getElementById("input-form");
const inputField = document.getElementById("input-field");

function showData(res) {
  console.log(JSON.parse(res));
  const data = JSON.parse(res);

  const app = document.getElementById("app");
  if (Array.isArray(data)) {
    app.innerHTML = `
        <div class='split'>
            <div class='word'>
                <h1 style='margin-top:0;'>${data[0].word}</h1>
                <p style='margin-bottom:0;' >${
                  data[0].phonetic ? data[0].phonetic : ""
                } </p>
            </div>
            <div>
                ${
                  data[0].phonetics[0].audio &&
                  `<div class='play-icon'> <i class='fa-solid fa-play fa-2xl' onclick='this.nextElementSibling.play()'></i>  <audio src='${data[0].phonetics[0].audio}'/>  </div>`
                }
               
            </div>
        </div>


        ${data[0]?.meanings
          .map(
            (x) => `
              <div class='align-center'><h3>${
                x.partOfSpeech
              }</h3> <p class='hr'></p></div>
              <div class='meaning'> <p>Meanings</p><ul>${x.definitions
                .map((meaning) => `<p>${meaning.definition}</p>`)
                .join("")} </ul>

                ${x.synonyms[0] ? `<p>Synonyms : ${x.synonyms[0]}</p>` : ""}
        `
          )
          .join("")}

          ${
            data[0].sourceUrls[0]
              ? `<div class='hr'></div>
                <p>Source : <a href='${data[0].sourceUrls[0]}'>${data[0].sourceUrls[0]}</a></p>
          `
              : ""
          }
          
          

  `;
  } else {
    app.innerHTML = `
        <h1>${data.title}</h1>
        <p>${data.message}</p>
    `;
  }
}

// get data form the dictionary API
const getData = (searchWord, callback) => {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`;

  const xhr = new XMLHttpRequest();

  //   function call when get the response form API
  xhr.onload = function () {
    console.log(xhr);
    callback(xhr.responseText);
  };

  xhr.onerror = function () {
    console.log("errow found");
  };

  xhr.open("GET", url);
  xhr.send();
};

// add event listener to form
inputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(this);
  const userSearch = this.querySelector("#input-field").value;

  getData(userSearch, showData);
});
