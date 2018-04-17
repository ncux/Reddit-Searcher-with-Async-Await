const searchForm = document.querySelector('#form');
const searchInput = document.querySelector('#searchIn');
const output = document.querySelector('#output');

searchForm.addEventListener('submit', submitForm);

function submitForm(e) {
    const searchTerm = searchInput.value;
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    const limit = document.querySelector('#limit').value;

    // check input is not empty:
    if(searchTerm === '') {
        promptForInput();
    }

    searchInput.value = '';

    searchReddit(searchTerm, sortBy, limit);

    e.preventDefault();
}

function promptForInput() {
    const warning = document.querySelector('#warning');
    warning.removeAttribute('hidden');
    setTimeout(() => warning.setAttribute("hidden", ""), 3000);
}

async function searchReddit(searchTerm, sortBy, limit) {
   let response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${limit}`);
   let data = await response.json();
   let results = data.data.children.map((data) => data.data);
   console.log(results);

   // iterate though the posts
    results.forEach((post) => {
                    let li = document.createElement('li');
                    li.classList.add("list-group-item", "list-group-item-action", "mb-2", "py-auto");
                    let a = document.createElement('a');
                    a.classList.add("btn", "btn-success", "ml-5");
                    let link = post.url;
                    a.setAttribute('href', link);
                    a.setAttribute('target', '_blank');
                    li.textContent = post.title;
                    a.textContent = "Go to Site";
                    li.append(a);
                    output.append(li);
                })
}




