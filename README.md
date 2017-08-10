Alex Davis
Anti-Linear-Incremental

aledavis@pdx.edu

This is a project focusing on the development of an incremental game. The design goals of the game are to provide an experience that minimizes the idle gameplay that is central to the majority of incremental games while maximizing both the length and difficulty of the game as a whole. 

These goals will be met by having the game regularly introduce game-play mechanics of increasing difficulty such that the majority of the game-play time will be spent understanding how the different mechanics interact with each other. To minimize confusion, there will be periods of time where inexperienced players will be able to progress at some speed so that there is a sense of progression, followed by times where only players who have understood the game mechanics properly will succeed to ensure that players do not fall behind in understanding later on.

Please look in the license file included in the project for copyright information.

Run the project by opening the .html file in your preferred browser

Week 3 Status:
HTML, CSS, and JS files created
HTML and CSS have one tab with 3 columns of numbers and buttons implemented. Prototype dropdown information on top of left column.
JS has generic functions for updating resource values and writing to the locations where values are displayed in the html.
JS also has functions for handling updates to resource values and calculating their velocitys, and a global clock for updating these values.
Future updates will hopefully improve in speed as more generic functions are added.

The main issues met so far have been making sure that numbers are properly aligned to the corresponding words in the HTML while
still hiding information from the user about buttons and resources that cannot be used, and grouping variables in html
into classes and objcts to minimize repeated lines of code.

The next goal is to add sliders to the html, and cycling numbers behaviour to the JS.
