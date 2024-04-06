# Testing Documentation for ArtHub

This document outlines the testing procedures, methodologies, and results for the ArtHub application. We aim to cover an extensive range of test cases to ensure the application's functionality, stability, and usability. This includes both common use cases and edge cases.

## Test Environment

- **Browsers**: Chrome, Firefox, Safari, Edge
- **Devices**: Desktop, Laptop,
- **Operating Systems**: Windows, macOS

## Test Methodologies

- **Manual Testing**: Interactive engagement with the app through all supported devices and browsers.
- **Automated Testing**: Implemented using testing frameworks to simulate user behavior and verify app responses.
- **User Acceptance Testing (UAT)**: Conducted with real users to ensure the app meets user expectations and usability standards.

## Test Scenarios

### Common Use Cases

1. **User Registration**: Testing the account creation process for new users.
2. **User Login**: Verifying secure login functionality and error handling.
3. **Dashboard Accessibility**: Ensuring the user can access and interact with the dashboard features.
4. **Artwork Interaction**: Assessing like and unlike functionality and its impact on the user's favorites gallery.
5. **Gallery Browsing**: Validating the random artwork fetching mechanism and the user's ability to navigate through selections.

### Edge Cases

1. **Simultaneous Logins**: Testing the app's behavior when multiple users attempt to log in to the same account concurrently.
2. **Profile Picture Update**: Evaluating the profile picture update feature, especially using non-standard image URLs or file formats.
3. **Interrupted User Flow**: Examining the app's response when a user's liking process is interrupted by a login prompt and the subsequent redirect behavior after successful authentication.
4. **Gallery State Persistence**: Ensuring the gallery state remains consistent for the user during session refreshes or when navigating away and returning to the gallery page.
5. **Input Validation**: Testing the system's response to unusual or unexpected user inputs, including excessively long text, special characters, and scripting attempts.

## Test Cases and Results

The following table outlines various test cases, their expected outcomes, and the actual results observed during the testing phase. Wherever discrepancies occur, brief notes are included to aid in the debugging and resolution process.

| Test Case ID | Description                               | Expected Outcome                                                         | Actual Result                                                                     | Pass/Fail | Notes                                                               |
| ------------ | ----------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------- |
| TC001        | User Registration with valid data         | User is registered and logged in automatically.                          | User is registered and logged in automatically.                                   | Pass      | More validation account required                                    |
| TC002        | User Login with correct details           | User is logged into their account.                                       | User is logged into their account.                                                | Pass      |                                                                     |
| TC003        | User redirect to previous page upon login | User is navigated to previous viewed page from login after login prompt. | User id navigated to login screen after login.                                    | Fail      | TODO                                                                |
| TC004        | Dashboard Edit Functionality              | User can edit and save changes.                                          | User can edit and save changes to all fields except uploading profile image file. | Fail      | Feature branch open with file upload functionality changes underway |
| TC005        | Like/Unlike Artwork                       | Artwork like state toggles.                                              | Artwork like state toggles on user click.                                         | Pass      |                                                                     |
| TC006        | Like counter updates                      | Like count updates when like state changes.                              | Like count updates when like state changes.                                       | Pass      |                                                                     |
| TC007        | Favourites Gallery Persistence            | Liked artworks appear in favorites.                                      | Liked artworks appear in favorites.                                               | Pass      | Like toggle required in favourites gallery for easy un-liking.      |

## Detected Issues and Bugs

The following issues and bugs were detected during the testing process and are documented for further investigation and resolution by the development team:

1. **TC003 - User Redirection Post-Login**

   - **Description**: After being prompted to log in when trying to like an artwork and subsequently logging in, the user should be navigated back to the artwork they were viewing. Instead, the user is redirected to the login screen.
   - **Status**: Open
   - **Priority**: High
   - **Note**: Must implement a solution to track the user's last page before login and redirect accordingly.

2. **TC004 - Dashboard Profile Image Upload**

   - **Description**: Users are currently unable to save changes when uploading a new profile image due to an issue with the URL not saving correctly in the database.
   - **Status**: In Progress
   - **Priority**: Medium
   - **Note**: A feature branch is open with changes to the file upload functionality underway. Further validation and testing will be required once the branch is merged.

3. **Enhancement Request - Like Toggle in Favorites Gallery**
   - **Description**: For an improved user experience, a toggle option for liking and un-liking artworks within the favorites gallery is suggested to facilitate easier management of favored items.
   - **Status**: Planned
   - **Priority**: Low
   - **Note**: Additional feature for future development; allows users to manage likes directly from the favorites gallery.
