const base_url = 'https://swapi.co/api/people/',
      ul       = document.querySelector('#people');

function add_to_list(character) {
    return character.name;
}

function handler(response) {
    return response.json();
}

function createElement(element) {
    return document.createElement(element);
}

function appendTo(parent, child) {
  return parent.appendChild(child);
}

function getCharacters(n, offset) {
    //fetch all characters from SWAPI
    const names = [];

    for (let i=1; i<=n; i++) {
        const url = base_url+(i+offset);
        names.push(fetch(url).then(handler).then(add_to_list));
    }
    return Promise.all(names).then(function(data) {
        data.map(function(name) {
            let li = createElement('li');

            li.innerHTML = name;
            appendTo(ul, li);
        })
    });
}

console.log(ul);

getCharacters(10,0);