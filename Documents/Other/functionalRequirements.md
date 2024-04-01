# ArtHub Requirements Documentation

## Table of Contents
- [Functional Requirements](#functional-requirements)
- [Non-Functional Requirements](#non-functional-requirements)
- [User Stories](#user-stories)
- [Roadmap](#roadmap)
- [Change Log](#change-log)

## Functional Requirements

### User Account Management
- FR1: Users shall be able to create a new account with a unique username, profile pic and password.
- FR2: Users shall be able to log in with the correct username and password.
- FR3: Users shall be able to log out of their account.
- FR4: Users shall be able to edit and update their profile.

### Artwork Interaction
- FR5: Users shall be able to view a gallery of artworks.
- FR6: Users shall be able to 'like' artworks and view a tally of likes.
- FR7: Users shall be able to share artwork links via social media.
- FR8: Users shall be able to upload their artworks.

### Art Discovery
- FR9: Users shall be able to explore random artworks from the database.
- FR10: Users shall be able to view details about artists and their works.

### Art Creation
- FR11: Users shall have access to basic digital creation tools within the app.

### Collaboration and Social Engagement
- FR12: Users shall be able to comment on and discuss artworks within the community.
- FR13: Users shall be able to participate in community art challenges and events.

## Non-Functional Requirements

### Performance
- NFR1: The application shall handle up to 100 concurrent users without performance degradation.
- NFR2: Artwork images shall load within 2 seconds over a standard broadband connection.

### Usability
- NFR3: The application shall be intuitive, requiring no user action to take more than three clicks.
- NFR4: The application shall be fully responsive, ensuring usability on devices of various sizes.

### Security
- NFR5: User passwords shall be hashed and salted before being stored in the database.
- NFR6: The application shall protect against common security threats like SQL injection and cross-site scripting (XSS).

### Reliability
- NFR7: The application shall have an uptime of 99.9%, excluding planned maintenance windows.

### Scalability
- NFR8: The system shall be designed to scale horizontally to support an increasing number of users, aiming at 10,000 concurrent users with similar response times.

## User Stories

### User Story 1: Account Creation
_As a new visitor, I want to create an account so that I can engage with the gallery features._
- Acceptance Criteria:
  1. Given I am on the homepage, when I navigate to 'Sign Up', then I should be able to register by entering a unique username and password.
  2. Given I've entered valid registration information and submitted the form, then I should be automatically logged in to my new account.

### User Story 2: Artwork Liking
_As a logged-in user, I want to 'like' artwork so that I can save it for later viewing._
- Acceptance Criteria:
  1. Given I'm logged in and viewing an artwork, when I click the 'like' button, then the artwork's like count should increment, and it should be added to my 'Favourites'.
  2. Given I return to my 'Favourites' at any time, I should see all the artworks I have 'liked'.

### User Story 3: Artwork Upload
_As an artist, I want to upload my artwork to share it with the community._
- Acceptance Criteria:
  1. Given I'm logged in, when I navigate to the 'Upload Artwork' section, then I should be able to select an image file and input a title, description, and tags.
  2. Given I've uploaded an artwork with valid information, then it should be visible in the 'User Gallery' under my profile.

### User Story 4: Viewing Random Artworks
_As a user, I want to discover new artworks randomly so I can experience a variety of art styles._
- Acceptance Criteria:
  1. Given I'm on the 'Discover' page, when it loads, then I should see a randomly selected collection of artworks.
  2. Given I'm interested in learning more about an artwork, when I click on its details, then I should be taken to a page with more information about the artwork and its artist.

### User Story 5: Community Art Challenges
_As a user interested in community engagement, I want to participate in art challenges to improve my skills and connect with others._
- Acceptance Criteria:
  1. Given I'm logged in and interested in challenges, when I visit the 'Community Challenges' section, then I should see a list of current and upcoming challenges.
  2. Given I submit my artwork for a challenge, when it is uploaded successfully, then my submission should be added to the community gallery for that challenge.

## Roadmap

The ArtHub application's development trajectory includes:

- **User-Generated Content Moderation**: Systems for reporting and moderating inappropriate content.
  Targeted for [Release v2.2](#).
- **Live Collaboration Feature**: Tools that will enable artists to collaborate in real-time on joint projects.
  Targeted for [Release v3.1](#).
- **Expanded Art Tools**: Additional features for the art creation module, including more brushes and effects.
  Targeted for [Release v3.2](#).
- **Mobile App Development**: A full-featured mobile application for ArtHub, with offline functionality.
  Targeted for [Release v4.0](#).

## Change Log

- **[v1.0.0](#link-to-release-notes)** - Initial release with basic functionality such as account management, artwork viewing, and liking.

