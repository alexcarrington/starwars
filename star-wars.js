const base_url = 'https://swapi.co/api/people/',
      ul       = document.querySelector('#characters');

let currChar   = 1,
    team_count = 1;

function parse_name(character) {
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

function selector() {
    if (team_count <= 5) {
        let el = this.innerText,
        my_team = document.querySelector('#my_characters');
        my_team.innerHTML += '<li>' + el + '</li>';
        team_count++;
    }
}

function get_character(char_num) {
  //Fetch character from SWAPI

    const url = base_url+char_num;
    
    return fetch(url).then(handler).then(parse_name);
}

function loadMore() {
  // Add 10 more characters

    for (let i=currChar; i<currChar+10; i++) {
      let li = document.createElement('li');
      li.addEventListener('click', selector, false);
      get_character(i).then(function(data) {
          if (data) {
              li.innerText = data;
              ul.appendChild(li);
              currChar++;
          }
      });
    }
}

// Detect when scrolled to bottom
ul.addEventListener('scroll', function() {
    if (ul.scrollTop + ul.clientHeight >= ul.scrollHeight && currChar <=87) {
      loadMore();
    }
});

// Load first 10 characters
loadMore();