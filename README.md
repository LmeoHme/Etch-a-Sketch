# Etch-a-Sketch v1.0

This is the project for practicing CSS flexbox model and JS event handling.

  First, there'll a input box taking input from user and validate it, a valid 
input will be an integer smaller than 100, and taken to be a argument for a
function which draw a grid of input row(s) and input column(s). User will 
have 3 chances to insert an invalid input, depends on specific type of 
invalid input, there'll be many type of output to the screen:
 - With string/non-number invalid input: Input box will be remove after 3 
chances are ran out.
 - Non-integer number invalid input: Same result like above.
 - Non-positive number invalid input: Well, if the user want, the input.
will be forcely accepted, the grid drawn by this input will ofcourse, not seem
to be normal.
 - Number that bigger than 100: Same result like above, and user will take
 responsibility for the performance of their device.

  After the grid is drawn, each time user move the mouse pointer to the 1 single 
square, its color changed randomly, and its opacity will decrease by 10% also.
