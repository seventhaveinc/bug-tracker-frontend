# Bug Tracker/Feature Request Tracker

## Overview
This app is meant to be a tracker for user submitted bugs and feature requests. It uses React for the frontend and an express backend found in another repository.

## View Page
The view page is where the comprehensive list of all of the feature requests and bugs that have been submitted resides. It contains four sections, divided into two columns. One side for bugs and completed bugs, and the other for features and completed features. For a general name for both of them, I call them 'forms'.

### sortCompleted
This function filters the completed 'forms' into the category of completed and not completed.

### handleUnCompleteRemove
This function handles the removal of the completed tickets from state when they are reset so that they may be put back into the open section.

### handleCompleteRemove
This function does the same thing except in reverse, and removes from the open tickets when they are completed. One improvement I could make on this in the future is to combine these into the same function.

### changeCompleted
This function spreads the original 'completedBugs' array in and adds the newly completed ticket into it as completed

### changeUnCompleted
This function does the same as the previous except in reverse. Again, an improvement I can make in the future is to combine these two functions.

### sortType
This function filters the bugs from the feature requests and is used when the data is originally received from the backend.

### first useEffect
This function is where the data is retreived from the backend. It calls the sortCompleted function to sort the completed forms from the not-completed forms.

### second useEffect
This function triggers when the state variable notCompleted is changed, which happens once the data received from the backend. I put this in a separate useEffect because when it was in the original, it triggered before the data was received because it did not directly use response.data.

### JSX
I sorted the entire page into a div which I used with CSS Grid to organize into sections. The 'topbar' class is the bar with the 'New Ticket' link and the title on it. Then, the 'bugCards' div is where all of the ticket cards are put into. They are again separated using CSS Grid. The cards are mapped in with their unique key being the id received from MongoDB. Right now they provide information organized very basically, the top line being the username, followed by the email on the second line, and the message that the user left with their ticket on the third line.

## New Page
This page is for submitting a new ticket to the system.
### validateEmail
This function contains the Regular Expression for checking if an email is in the right format. It is not very advanced and currently only checks whether there is an '@' symbol followed by a period later in the submission.

### handleSubmit
This function handles the submission of data to the backend. It first checks to see if all of the fields have been filled out, and then checks to see if the email is in the correct format. If the first one comes back false, it shows a message in the DOM that says that the user must fill out all fields to be able to submit. If the email is not in the correct format, it shows a message in the DOM that the email is not in the correct format.

### handleInput
This function handles adding the input of information into the form to the DOM. it spreads in the previous state and then changes the specified key-value pair in state to be what is currently in the text box.

### JSX
The JSX for this page is relatively simple. I did not use CSS Grid for this page and instead elected to use basic Flexbox. I used basic input fields for 'username' and 'email'. For the type of request I used radio buttons, and for the message I used a 'textarea'. I also elected to add a reset button, which I just learned exists through this project.

### Things to add
Things I could add in the future are possibly a delete button to weed out unintenional submissions or spam. The backend supports a delete route, I just did not include it in the React app yet. Another item would be a sort feature for sorting by date added or date completed for the completed section.