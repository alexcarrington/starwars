const base_url  = 'https://swapi.co/api/people/',
      ul        = document.querySelector('#characters'),
      curr_team = [];

let curr_char   = 1;

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

function deselector() {
    let el       = this.innerText,
        my_team  = document.querySelector('#my_characters'),
        el_index = curr_team.indexOf(el);

    my_team.removeChild(this);
    curr_team.splice(el_index, 1);
}

function selector() {
    if (curr_team.length < 5) {
        let el      = this.innerText,
            my_team = document.querySelector('#my_characters');

        if (!(curr_team.includes(el))) {
            const clone = this.cloneNode(true);
            clone.addEventListener('click', deselector, false);
            my_team.appendChild(clone);
            curr_team.push(el);
        }
    }
}

function get_character(char_num) {
  // Fetch character from SWAPI

    const url = base_url+char_num;
    
    return fetch(url).then(handler);
}

function load_more() {
  // Add 10 more characters

    for (let i=curr_char; i<curr_char+10; i++) {
      let li = document.createElement('li');

      li.addEventListener('click', selector, false);
      get_character(i).then(function(data) {
          if (data) {
              li.innerText = data.name;
              ul.appendChild(li);
              curr_char++;
          }
      });
    }
}

// Detect when scroll reaches bottom
ul.addEventListener('scroll', function() {
    get_character('').then(function(data) {
        if (ul.scrollTop + ul.clientHeight >= ul.scrollHeight && curr_char <= data.count) {
      load_more();
        }
    });
});

// Load first 10 characters
load_more();