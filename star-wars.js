const base_url = 'https://swapi.co/api/people/',
      ul       = document.querySelector('#characters');
let   count    = 0;

function add_to_list(character) {
    if (character) {
        return character.name;    
    }
    return;
}

function handler(response) {
    if (response.ok) {
        return response.json();    
    }
    return;
}

function createElement(element) {
    return document.createElement(element);
}

function appendTo(parent, child) {
    return parent.appendChild(child);
}

function loadMore() {
    console.log(this);
}

function getCharacters(n, offset) {
    //fetch all characters from SWAPI
    const names = [];

    for (let i=1; i<=n; i++) {
        const url = base_url+(i+offset);
        names.push(fetch(url).then(handler).then(add_to_list));
        count++;
    }
    return Promise.all(names).then(function(data) {
        data.map(function(name) {
            if (name) {
                let li = createElement('li');

                li.innerHTML = name;
                appendTo(ul, li);
            }
        })
        let current = ul.getElementsByTagName('li').length;
        ul.addEventListener("click", loadMore, false);
        return current;
    });
}

getCharacters(10,0);