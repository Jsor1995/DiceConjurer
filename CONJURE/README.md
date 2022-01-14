#DiceConjurer: A Conjure Animal Simulator

##What is Dice Conjurer?
During the Pandemic, many Dungeon's and Dragon's games have migrated from in person tables to online table tops. In some ways, the transition to online benefited the community by letting people stay connected during the time of social isolation, however some aspects of the game have been made more challenging with the switch. Combat is one of the core types of gameplay in a Tabletop RPG, and the most complicated feature to run online. Keeping track of multiple characters and enemies at the same time is challenging, now adding spells, like Conjure Animal that creates up to eight new creatures on the board at once, it becomes almost impossible to keep combat moving at a speedy pace. This very scenario kept happening to me as my players kept bogging down the pace of combat having to roll for eight different creatures one at a time. Frustrated, I thought that there should be a better solution so, for my Final Capstone Project, I created DiceConjurer, a Conjure Animal Simulator.

##Files and Specs
Majority of my code is based in my statblock.js and views.py. I used a Django Framework that called APIs on the backend and displayed the dynamic data in the frontend. 

- **views.py** 
  - **index**: Renders my initial html file and populates a list from my dataset in my models.py to display in it's offcanvas menu. 
  - **create_card**: Once a animal has been selected on the view, it prompts a request to create_card to pull data from the dnd5e API and sends the JSON data to my javascript function to create the card on the view.

- **models.py**
    - **AnimalList**: This model holds the list of all animals displayed on the menu and all legal animals able to casted with the spell *Conjure Animals* along with their Challenge Rating that symbolizes relative strength and calculates how many can be summoned with the spell. 

- **templates**
    - **layout.html**: The standard base for my other html files. Includes the following scripts and stylesheets:
      - Jquery
      - Bootstrap
      - React
      - Droll.js: A dice-rolling library
      - statblock.js: DiceConjurer's main js/jquery script
      - CONJURE.css: Main stylesheet for project

    - **index.html**: Main webview that uses bootstraps library to create an offcanvas model and functional cards to roll dice.

- **statblock.js**: The main portion of the website is built on this javascript file and utilizes many jquery functions. Listed below are some of the more significant functions called in this project.
  - createCard: This function is called when an animal is clicked on from the menu and a request is sent to our backend for the creature's JSON file. Once retrieved, the function parses the info creating a small card with the animal conjured along with duplicates stated by the creature's challenge rating. 
  - addAtkButton/addAllAttack: These functions create the attack buttons dynamically on the card depending on the attacks stated in the JSON data.
  - checkMultiAttack: This funciton parses the JSON to see how many attacks the creature is able to make per round and what attacks it holds.

- **droll.js**: A dice rolling library that simplifies the rolling process by breaking down dice attack formulas using RegEx. 

- **CONJURE.css**: Main stylesheet that utilized flexbox to dynamically organize the elements on the page.


##Distinctiveness and Complexity
When brainstorming ideas for projects, I made sure to keep in mind that it should be different from many of the ones I've done in this class as well as the first CS50 course. Unlike many of the projects we focused on during this course, I opted to create a single page application that took more advantage of the dynamic and responsiveness of the javascript language rather than the easy traversal of Django and Python.

###The Case for Distinctiveness
My project is a combat simulator for the spell *Conjure Animals* that tracks the dice rolls of each individual animal summonded against a targets Armor Class. If the question is if my project is distinguishable than the previous projects: *Search, Wiki, Commerce, Mail, Network* I would say that it is different from all of them, however my project borrows the fundamental lessons that each of them challenged us with. 

###The Case for Complexity
DiceConjurer uses the tools given to us by the course and builds upon of that. The main Django framework is admittedly more barebones, holding only one Model that is pulled on initial load to create the animal list, however it utilizes an Async/Await function to call to the view function *create_card* and passes the json to the frontend. The Frontend is where most of where my complexity lies. The file **statblock.js** utilizes Async/Await, Jquery, multiple libraries, and dynamic elements. While creating the project, I also experimented with AJAX and React until cutting it out to maintain a more simple library. 

##How to Run Dice Conjurer
Traverse to the Diceconjurer/DiceConjurer directory and type in the terminal: 
>python manage.py runserver

##Future Implementations
As much as I believe this application has served it's purpose for me, I would like to continue working on it, even after it is grade. I hope to implement targetting so that my creatures can attack different targets with different Armor Classes. Eventually I want a way to keep track of Hit Points and even create your own custom creatures you can save in an account to use in the future. Even farther forward, I want to keep track of combat states so you can close out and it would remember it's previous encounter.



