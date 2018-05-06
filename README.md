
# Ticketing System

The final team project in @ Telerik Alpha Academy

## App Description

Tele Ticket is an issue tracking system that manages and maintains list of issues, as needed by an organization. The system allows you to create, update and resolve reported issues by organization's employees. Once an employee is assigned to particular team, he is able to create new ticket, change the its status or add comments. Additionally each employee can create a team and assign multiple colleagues to this team.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisities

To run the app you must have following technologies installed on your computer:

Front End:

1. Typescript
2. Angular 5
3. Angular-CLI
4. Bootstrap and Paper KIT
5. Code editor

Back End:

1. MySQL/MariaDB client'
2. NodeJS
3. NPM
4. Express

### Installation

To run the project:

Backend: 

1. Go to 'nodeServer/server/app/server.js'
2. Run 'npm install'
3. Run 'npm start'

Front End:

1. Go to 'angular/tele-ticket/src'
2. Run 'npm install'
3. Run 'ng serve'

##  General requirements

#### Public Part

The public part of your projects should be visible without authentication.

1. Application MUST have public home pagе
2. Application MUST have register functionality
3. Application MUST have login functionality

#### Private Part

Registered users MUST have private area in the web application accessible after successful login, where they could see all tickets assigned to them, all tickets where the user is the requester, a list of all the teams the user is part of and optionally a list of pending team invitations (if no other notification method was implemented).

1. Users MUST be able to create teams consisting of other users (company employees). A team MUST have a queue containing the team’s tickets.

2. A user MUST be presented with a UI which allows him to create a ticket for a team he is a member in, enter the required ticket information and then “SUBMIT” the ticket. The newly created ticket is added to the responsible team’s queue and is visible on the assignee’s and requester’s private areas.

3. Each ticket MUST have id, title, description, labels, status, estimated time for finishing the job, requester (normally the creator of the ticket), assignee and comment section.

4. The team members MUST be able to view the newly created ticket and its data, post comments, change its status (e.g. to COMPLETE), or assign it to themselves or another team member or to the requester (asking them to add more info). The assignee SHOULD receive a notification.

5. A user COULD be able to search for а ticket in the team’s queue by: title, label and assignee.

6. The tickets COULD have “escalation” contact who gets notified in case of problems or complaints regarding the ticket. If the outstanding ticket approaches the estimated deadline, the escalation contact SHOULD receive a notification

7. Users COULD be able to create a ticket “on behalf of” someone else as requester

#### Development Requirements

Your Web application should use the following technologies, frameworks and development techniques:

1. Use Angular and preferably Visual Studio Code 
2. Create beautiful and responsive UI
3. Use modules to split your application logic
4. Create several different pipes and use them
5. Create several different directives and use them
6. Create several modules and use them in the routing
7. Use guards to prevent the user to access the routes 
8. All of the data should be loaded from a web server using services
9. Unit test a few components
10. Your project should pass the default TS linting configuration without any errors
11. Your application should compile, work and produce an adequate result
12. Use GitHub and take advantage of the branches for writing your features
13. Documentation of the project and project architecture (as .md file, including screenshots)

## API Reference

### Libraries and Tehnologies

#### Angular 5

	Angular is a TypeScript-based open-source front-end web application platform led by the Angular Team at Google and by a community of individuals and corporations. 

#### NodeJS

	NodeJS - is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side. 

#### Express 

	Express - is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 

#### Bootstrap 

	Bootstrap - is a free and open-source front-end library for designing websites and web applications. It contains HTML- and CSS-based design templates for typography, forms, buttons,navigation and others.

#### MariaDB 

	MariaDB is a community-developed fork of the MySQL relational database management system intended to remain free under the GNU GPL.

## Authors

| #        | First name | Last name  |       
| -------- | --------- 	| ---------- |
| 1.	   | Zhitomir  	| Oreshenski |
| 2.	   | Yavor  	| Stoychev 	 |


## License
 
This project is licensed under the MIT License - see the LICENSE.md file for details

