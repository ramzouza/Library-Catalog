# [TheLoanZone.ca](http://theloanzone.ca/login)
Web application for a Software Architecture and Design course
[Check out the wiki](https://github.com/ramzouza/Library-Catalog/wiki)

## Collaborators of TEAM 13

* **Ramez Zaid** (*) - [Ramez Zaid](https://github.com/ramzouza) 
* **William-Andrew Lussier**  -[William-Andrew Lussier](https://github.com/lussier115) 
* **Berfin Saricam** - [Berfin Saricam](https://github.com/GitBsrc) 
* **Karl-Joey Chami** - [Karl-Joey Chami](https://github.com/karlchami)
* **Skander Ben Mekki** - [Skander Ben Mekki](https://github.com/skanderbm123)
* **Eric Kokmanian** - [Eric Kokmanian](https://github.com/EricKokmanian)
* **Yanis Sibachir** - [Sibachir Ahmed-Yanis](https://github.com/yanis333)
* **Jon Mongeau** - [Jonathan Mongeau](https://github.com/jonthemango)
* **Ribal Aladeeb**  - [Ribal Aladeeb](https://github.com/ribal-aladeeb)
* **Yann Cedric** - [Yann Cedric](https://github.com/YannCedric)

# Frontend

To run the frontend application : 

* Move into the frontend folder
* Run `npm install` if you haven't already
* Run `npm start` to start the dev server. 

This will start the server and open the browser at http://localhost:3001.  
React's dev server allows you to perform code changes and automatically reload the web-page. 

>> PS: The frontend application expects a backend server running on port **3000** to work.

# Backend API 

To access the database, go to this address on your browser http://18.221.83.136.

Admin credentials: 
* **username**: root
* **password**: ribalestbeau
* **db**: mysql

To run the backend tests, simply run the command `npm test` inside the backend directory.

To run the backend server : 

* Make sure you have the latest version of nodejs
* Move into the backend folder
* Run `npm install` if you haven't already
* Run `npm start` to start the server. 
* If you are on windows, try running `npm run start-windows`

For development, we use `nodemon`.
* Run `npm run dev` inside the backend folder.  
That will allow you to perform code changes and automatically reload the server. 

>> PS: The scripts allow for a port parameter. You can run the server on any port adding **-p**. Example: `npm start -p 3001` will start the server on port 3001

