High level dependencies used to run this web app:

- npm v6.4.1
- node v8.10.0
- expressjs v4.15.5
- For more details and other dependencies please see package.json

Instruction to run the app locally (MacOS)

Run the following command on a terminal
- unzip catchemall.zip
- cd catchemall
- npm install
- npm start

- Then go to your browser and navigate to http://localhost:3000/
- Once the page is rendered, inside the provided search field you can search by
  Pokemon ID, and Name (ex. 123, pikachu)
- Results will appear within the table below search input field


Overview of app's components:

- Scaffolding for the app's structure was through express-generator
- bin folder's www contains the http server logic
- Http GET call to http://localhost:3000/ renders the index.html
- index.html contains only the html tags required to render the search page
- Index.html delegates to public/javascripts/indexHandler.js to handle ajax calls
- indexHandler.js passes the search query as a http GET via an AJAX call to /search end-point
  on the server-side
- /search endpoint handles by routes/index.js makes 2 async calls
  - One call to http://pokeapi.co/api/v2/pokemon/{pokemon_id} to extract pokemon's
    id, name, weight, height, species, image, and types
  - Then using the first call JSON object to get 'species.url' (https://pokeapi.co/api/v2/pokemon-species/{id})
    to retrieve habitat and English text flavor data.
  - Sequence of these async calls are managed via blue-bird promises.