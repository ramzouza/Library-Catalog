# Web-Page
This is the repository containing the web page for Smila. Link for google drive repository [here](https://drive.google.com/drive/folders/0B2lPY7qUCs-aYmRCaVFqTW0wWlk)

Feel free to remove yourself from the front-end team if you don't need notifications. Added everyone so everyone can have access and contribute.

The documentation is intended to *anyone* really so if anything is unclear, please let me know so I can fix it, or do it yourself. Thanks ☺ .




## Installing the project 
**First**, you need the following programs :
* [Git](https://git-scm.com/downloads) to clone the project on your local machine.
* [Nodejs and  npm](https://nodejs.org/en/download/) to bundle up the project, run it and manage dependencies.
* Run `npm install create-react-app` to install react scripts.
* A text editor or IDE. It really doesnt matter which one you use. I suggest [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/3) or my favorite [VSCode](https://code.visualstudio.com/download).  (PS: Notepad and Notepad++ works too)
* The **command-line** for windows or **terminal** for mac/linux. (PS: Both are built in)

**Second**, You need to clone the project on your machine: 
* Open the terminal and: 
    * Run `git clone https://github.com/ImperialTrust/Front-End.git` to get files locally. (You might get prompted for your gitub credentials)
    * Run `cd Front-End` to move into the newly cloned directory. (You might want to keep track of those files on your computer)
    * Run `npm install` to install the project's dependencies.

## Running the project locally
Just start the dev server:
    * Run `npm start` to start serving the page on dev-mode.
    * If it didn't happen automatically, open your browser and go to http://localhost:3000/ (which is your local machine on port 3000). You should see the page up.

    > **PS:** If you cloned the repository, make sure to stay up to date with the changes on the master branch, and try not to push directly to it but instead, create your own branch and create a merger request. 
    Any participant should try and familiarize with git a bit if you aren't already, as it **will** make the process smoother. [Here](https://www.youtube.com/watch?v=HVsySz-h9r4&t=405s) is a video covering fundamentals. 

## Running the project inside a Docker Container

You first need to install Docker, then: 
* Build the image from the Dockerfile. Run `docker build -t smila:latest .`
* Start a container from built image. Run `docker run --name smila_app -v [absolute_path_to_src_file_on_your_machine]:/Smila/src -p 3000:3000 -d  smila:latest`
> **PS:** Check-out reference for [docker run tags](https://docs.docker.com/engine/reference/run/) for explaination on the different tags. The **-v** tag creates a mounting point for the src/ volume. That allows you to write code on your machine, and let the dev server on the container see the changes. 
* Open your browser, and go to localhost:3000.