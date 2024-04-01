# ArtHub

ArtHub is an application designed for art lovers and art students. It serves as a platform to engage with artworks, participate in communal art projects, and utilize digital art tools for personal creations.

## Features

- **User Accounts**: Secure authentication to manage personal accounts with features like 'liking gallery artworks', 'sharing original artworks' and 'liking and commenting on original artworks'. User account details can be updated and deleted by the user.
- **Admin Account**: Administrators account to manage content moderation, account suspension and deletion according to Terms and Conditions.
- **Artwork Interaction**: Users can interact with an extensive gallery, share via URLs, upload to a 'User Gallery', and make artworks public for broader audience appreciation.
- **Discover**: Explore random artworks from the database and learn about artists with links to their respective Getty.edu page.
- **Create**: Access in-app digital art tools to create new artworks and participate in collaborative art projects.
- **Share**: Share personal artworks with the community for feedback and engagement.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed. You can download them from [here](https://nodejs.org/).
- A MySQL server running locally or remotely which you can access.

### Installation

1. Clone the repo:

   ```sh
   git clone https://github.com/institutedata/capstone-SimianPrimus

   ```

2. Install NPM packages:

   ```sh
   npm install

   ```

3. Start the development server:
   ```sh
   npm run start:dev
   ```

## Testing

To run the automated tests for this system:

npm test

## Built With

- [Express.js](https://expressjs.com/) - The backend framework used
- [MySQL](https://www.mysql.com/) - Database system
- [Sequelize](https://sequelize.org/) - Promise-based Node.js ORM for MySQL
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [MUI (Material-UI)](https://mui.com/) - React UI framework for faster and easier web development

## Usage

ArtHub is designed to be intuitive and user-friendly, allowing art enthusiasts and creators to interact with art, create, and share within a community. Here's a quick guide on how to get started and use the app's main features.

### Logging In

Upon launching ArtHub, you'll be greeted by the homepage. To login or sign up you can use the login icon or navigation link to the login/sign up page. If you're not already a member, you can sign up by clicking on the `Create an Account` button. If you're returning, click on `Login` and enter your credentials to access your account.

### Interacting with Artworks

Once logged in, you can browse through various artworks showcased on the main gallery page. Click on any artwork to view it in detail. Here, you can:

- **Like Artwork**: Express your appreciation by clicking the 'like' button.
- **Explore Artwork**: Click to enlarge artwork, link to artists getty.edu page for educational resources about artwork and artist.
- **Share**: Use the social sharing options to share your favorite artworks with friends on different social media platforms.

### Using Art Creation Tools

To access the art creation suite, navigate to the `Create` tab in the menu. Within the art creation module, you'll find a variety of digital tools at your disposal:

- **Brushes**: Choose from different brush types and sizes for various strokes and effects.
- **Colors**: Pick from a color palette or create your custom colors for your artwork.
- **Layers**: Organize your creation with multiple layers that can be individually edited.

As you create, you can save your work in progress, and once complete, upload it to your gallery or submit it to community challenges.

### Sharing and Social Features

ArtHub promotes community engagement through various social features:

- **Upload**: Share your creations by uploading them to your gallery. Provide a title, detailed description, and tags to make it discoverable.
- **Follow Artists**: Connect with other artists by following their profiles. You'll get updates on their new uploads and activities.
- **Participate in Challenges**: Engage with the community by taking part in art challenges posted on ArtHub. Your submissions will be viewable by the entire community, garnering feedback and fostering a collaborative spirit.

For any additional help or information on using ArtHub, please refer to our `Help` section or contact support.

## Contributing

Any contributions you make are **greatly appreciated**. If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Sarah McGregor - [Sarah McGregor](https://www.linkedin.com/in/sarah-leigh-mcgregor/) - sarahmcgregor24@gmail.com

Project Link: [https://github.com/institutedata/capstone-SimianPrimus](https://github.com/institutedata/capstone-SimianPrimus)

## Acknowledgements

- [The Metropolitan Museum of Art Collection API](https://metmuseum.github.io/)
- [React Router](https://reactrouter.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- And all the other libraries and frameworks that have made this possible.

## Troubleshooting/Common Issues

Having issues with the application? Here are some common fixes:

- Failed API Calls:
  Check the network tab in your browser dev tools for failed requests and ensure the backend server is running and accessible.

Feel free to open an issue if you encounter a problem that isn't addressed here.

## Project Status

As of [01/04/2024, Version 1.0.0], this project is in a [development/production/testing] phase. Updates and improvements are continuously being added, and contributions are welcome.

## Releases

For a detailed changelog, please refer to the [Releases](https://github.com/your_username/ArtHub/releases) section of the GitHub repository.
