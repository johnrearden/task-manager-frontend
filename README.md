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

##### Tasks without an image

The Moments project that this app is based on requires an image to be added to every task created. 
This makes sense for the use case of the Moments app, being a photo sharing platform.

For the current task manager app, however, images play a much less important role than other types of content, also reflected in the layout of the [Task Detail page](#task-detail-page).Thus, it would be unpractical to force users to add a photo to every task they create, so this is made optional.

I also decided not to use a placeholder image for tasks that do not have an image attached,
as this would create an unnecessary distraction without adding information or a positive UX experience. 
instead, the `CardImage` is displayed conditionally only if there is an image.

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

On small screen sizes, the Navbar includes an extra link to the [profile list page](#profile-list).

### Teammates component

This appears on mid and larger viewports, and shows the list of teammates in descending order.

Users' names are shown conditionally: the first and/or last name is show if it is available,
otherwise, the username is displayed.

Clicking on a profile avatar or name leads to the relevant [profile detail page](#profile-detail-page).
Clicking on the heading **Teammates** leads to the [profile list page](#profile-list).

On small screen sizes, the [Navbar](#navigation-bar) includes an extra link to the [profile list page](#profile-list).


### Footer

#### Home page

### Create task page

#### Assignee dropdown

Fetches the list of profiles from the API, and displays them as options in the dropdown.

It displays the first and/or last name of the user if these are filled in. Otherwise, it displays the username.

The Profile ID is sent to the API. Since a profile is automatically created whenever a user is created, profile ID and user ID should be the same.

#### Task list

The task list features a more compact version of the task cards, with only the following information shown:

- assignee
- priority
- status
- title
- excerpt
- due date
- watch/unwatch icon

The card body can be clicked to go to the [Task Detail](#task-detail-page) page.
This link is not stretched to the whole card, because the card header contains a link to the [assigned user's profile](#profile-detail-page),
and the bottom part of the card contains the [watch/unwatch icon](#watchunwatch-function).

The Color scheme of the card changes based on the priority of the task:

- low
- med
- high
- no priority

##### Filtering

##### Searching

#### Task detail page

The card header contains an avatar with a link to the [assigned user's profile](#profile-detail-page),
the due date / watch box contains the [watch/unwatch icon](#watchunwatch-function),
and the bottom part of the card displays the avatar of the tasks's owner (creator) with a link to their [profile](#profile-detail-page).

XXXX Which fields are shown with placeholders, which fields aren't 

The Color scheme of the card changes based on the priority of the task:

- low
- med
- high
- no priority

The date fields are shown in a format the includes the day of the week, to facilitate processing.

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

`npm audit fix` was run after every time a new package was installed. It is beyond the scope of the currect project to fix all dependency warnings, as these are typically handled by more senior developers or dedicated security engineers.

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

Following a [suggestion](https://code-institute-room.slack.com/archives/C02MTH5MBDG/p1723026165340779?thread_ts=1722951810.045149&cid=C02MTH5MBDG) by [Kelly Hutchison](https://github.com/quiltingcode), I added Frontend validation by adding the `required` prop to the form fields in the SignInForm ([Issue](https://github.com/blahosyl/task-manager-frontend/issues/20)). I then extended this to required fields in all forms in the project [#96](https://github.com/blahosyl/task-manager-frontend/issues/96).

### Study/lookup sources

- [React Bootstrap documentation](https://react-bootstrap-v4.netlify.app/)
- [Rect Bootstrap Form props](https://react-bootstrap-v4.netlify.app/components/forms/#form-group-props)
- [React Bootstrap date form input field](https://stackoverflow.com/a/66271815)
- [`exact` & `strict` props](https://stackoverflow.com/a/52275337s)
- [ternary conditional](https://www.w3schools.com/react/react_es6_ternary.asp)
- [swimlanes in GitHub Projects](https://github.blog/changelog/2023-07-27-github-issues-projects-july-27th-update/#%F0%9F%8F%8A-board-swimlanes)
- [use template literals for multiple `className` props](https://stackoverflow.com/a/39053038)
- [CSS `border` shorthand](https://www.w3schools.com/css/css_border_shorthand.asp)
- [CSS `border-radius` shorthand](https://www.w3schools.com/cssref/css3_pr_border-radius.php)
- [Warning/Caution in Markdown](https://gist.githubusercontent.com/cseeman/8f3bfaec084c5c4259626ddd9e516c61/raw/9e223c88ea8e445098a9c54d9df8a48e1c2c7151/markdown_examples.md)
- [`dayjs` documentation](https://day.js.org/docs/en/display/format)

### Text

### Media

#### Images

### Readmes

### Acknowledgements
