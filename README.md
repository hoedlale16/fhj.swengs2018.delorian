# DeLorean - Get your Time ⏱

SWENGS Project. A application to track working time for projects. A project manager is able to create a new project and assign projekt team members. All project team members can track their working time, the project manager is able to create reports and analyse the work in process. 

![Delorian - Get your Time](https://media.giphy.com/media/BRpMznCmYTiik/giphy.gif)

## Team Members:
- Alexander Hödl
- Maximilian Steiner
- Nikolaus Spieß
- **FH-JOANNEUM lecturer**: 
    - Stefan Krausler-Baumann
    - Johann Blauensteiner
    
## Installation for Developers
 - Clone this repository to your local machine
 - Switch to **backend** directory
    - Adapt settings in **application.properties** in src/main/resources
 - Switch to **frontend** directory
    - run 'npm install' to install all required libraries
 
### Inport in IDE IntelliJ  (Testet with V. 2018.3)
  - Open IntelligJ
  - File -> Open -> Select **backend** directory -> OK (if requested **open in new window**)
  - File -> Open -> Select **frontend** direcotry -> OK (if reuqested **open in new window**)
  
### Run Project in IDE
  - backend: Start Spring Boot REST Application 
  - frontend: Start via **Angular CLI** (ng serve --open)
  - Check application running on http://localhost:4200 in browser
      - Default Admin:
          - User: admin
          - Password: delorian


# Possible REST Calls
 - /auth -> Post to authenticate user and get a JWT
 - /users -> GET,POST,PUT, DELETE - Manage users [ROLE_ADMIN]
 - /userroles -> GET,POST,PUT, DELETE - Manage userroles [ROLE_ADMIN]
    - POST,PUT, DELETE implemented but not used in Frontend! 
        - DELETE: ROLE_ADMIN,ROLE_PRJMGR and ROLE_USER are protected because used for Spring Security!
        - POST,PUT, DELETE can used in future to create Roles for Client-Side handlings...
 - /projects -> GET,POST,PUT, DELETE - Manage projects [ROLE_PRJMGR]
    - GET: (special GET-Handling)
        - /projects - Get all active projects (to book times). Filter on projectManager is possible
            - If no filter set, just all active Projects (Projectnames) are returned [booking]
            - /projects?projectmanager={username} - Get all project of a user (project manager) [full information]
                - Security: Authanticated user must be projectManger of project!
        - /projects/{projectID} - Get a specific project
 - /projectTimes ->  GET,POST,PUT, DELETE - Manage projects [ROLE_USER]
    - GET: (special GET-Handling)
        - /projectTimes - Get all booked project times of project. Filte required!
            - /projectTimes?projectID={projectId} - Get all booked project times of project.
                - Security: Authenticated user must be project manager of project!
            - /projectTimes?username={username} - Get all booked project times of a user.
                - Security: Authenticated user must be user of requested data
       - /projectTimes/{projectTimesID} - Get specific booked time
