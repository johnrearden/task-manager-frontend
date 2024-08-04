# Task Manager

## UX/UI

### Strategy

### Scope

### Structure

#### Data models

##### Profile model

##### Task model

Tasks should remain intact even when their creator (owner) or assignee are deleted (e.g., when a team memeber leaves an organization). In this case, the respective fields for the deleted user are set to `null`. Accordingly, the `owner` and `assignee` fields are allowed to be `null`.

##### Watch model

#### Access management structure

#### CRUD

#### UI information design

##### Navigation bar design

##### Footer design

### Skeleton

#### Home page wireframes

#### Task list wireframes

#### Task detail wireframes

### Surface

#### Visual design

##### Logo

##### Minimalism

##### Color schemes

#### UX Improvements

## Project Management | Agile Methodologies

### Themes, Epics, Stories & Tasks

### Estimation

### Project Board

### Labels

#### Prioritization: MoSCoW

#### Timeboxing

#### Sprint planning

#### Sprint retroactives

## Features

### Navigation bar

### Footer

#### Home page

### Create task page

#### Assignee dropdown

Fetches the list of profiles from the API, and displays them as options in the dropdown.

It displays the first and/or last name of the user if these are filled in. Otherwise, it displays the username.

The Profile ID is sent to the API. Since a profile is automatically created whenever a user is created, profile ID and user ID should be the same.

#### Task list

##### Filtering

##### Searching

#### Task detail page

#### Watch/unwatch function

Users can choose if they want to watch tasks created by them, as this might be required for some tasks but not others.

The watch button is an eye icon and a toolip instruction is show when hovering over it. This changes dynamically depending on whether the logged-in user is already watching the task or not.

#### Profile list

#### Profile detail page

### Access management

### Admin Panel

### Future features

### Code features

#### Regular testing

#### Adequate commenting

#### DRY

#### Security

## Technologies used

### Languages used

### Other dependencies used

### Tools used

## Deployment

### Prerequisites

### Fork the repository

### Deploy in the development environment

### Deploy to production

#### Pre#deployment steps

#### Steps on Heroku

## Credits

### Code credits

This project was developed on the basis of the [DRF-API](https://github.com/Code-Institute-Solutions/drf-api) by [Code Institute](https://github.com/Code-Institute-Solutions/).

I have also consulted the project [Tick It](https://github.com/Code-Institute-Submissions/ci_pp5_tick_it_react) by [Jamie King](https://github.com/jkingportfolio) and implemented the Task deletion confirmation modal based on it.

Front End based on [Moments](https://github.com/Code-Institute-Solutions/moments0) by [Code Institute](https://github.com/Code-Institute-Solutions/).

### Related advice

### Study/lookup sources

- [React Bootstrap documentation](https://react-bootstrap-v4.netlify.app/)
- [Rect Bootstrap Form props](https://react-bootstrap-v4.netlify.app/components/forms/#form-group-props)
- [React Bootstrap date form input field](https://stackoverflow.com/a/66271815)
- [`exact` & `strict` props](https://stackoverflow.com/a/52275337s)
- [ternary conditional](https://www.w3schools.com/react/react_es6_ternary.asp)
- [swimlanes in GitHub Projects](https://github.com/blahosyl/spicy?tab=readme-ov-file)

### Text

### Media

#### Images

### Readmes

### Acknowledgements
