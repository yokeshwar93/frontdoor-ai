# frontdoor-ai

## Installation & Setup

### Server
Please refer for available scripts
### frontdoor-pitch-server/README.md

### UI
Please refer for available scripts
### frontdoor-pitch-ui/README.md

## Extension

Open chrome -> chrome://extensions -> Enable Developer mode <br>
Click on load unpacker -> Select **frontdoor-pitch-ui/build** folder

## Libraries Used

- react-query (To fetch data from server and render)
- styled-components (For styling material ui  components)
- Material UI (For UI Components)
- web-components (For rendering custom elements on DOM from extension script)
- mongose (ORM for mongodb connection)
- jwt (For signing access and refresh tokens)
- passport (For user authentication)
- openAI (For accessing OpenAI apis)

# To DO

- [x] Initial setup for server using Nestjs using nest cli
- [x] Initial setup for chrome extension ui using CRA
- [x] Mongodb connection
- [x] OpenAI config
- [x] Swagger API documentation
- [x] Login
- [x] Signup
- [x] JWT access token and refresh token
- [x] Get summary from OpenAI
- [x] Save summary to mongodb 
- [ ] Save and fetch tags
- [x] Unit testing using jest
- [ ] E2E testing using Supertest
- [x] Default popup for chrome extension
- [x] Context for storing user information
- [x] Rsusable Component for displaying summary list
- [ ] Sort and filter components
- [x] Save summary action
- [x] Highlight text and get summary
- [ ] Show summary as tooltip on click of highlight text
- [ ] Unit testing using react-testing-library and jest
- [ ] Add tags