[![GitHub](https://img.shields.io/github/license/timerise-io/open-admin-app)](https://github.com/timerise-io/open-admin-app/blob/main/LICENSE.md) [![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/gugo.svg)](https://status.timerise.io)

[![Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=349830&theme=light)](https://www.producthunt.com/posts/timerise)

# Open Admin App

**Our Admin App** is an open-source admin panel designed to manage and configure the Timerise API. It provides a user-friendly interface for administrators to oversee bookings, services, users, and other essential aspects of the Timerise platform.

We are excited to offer our admin panel as an open-source project. Whether you're looking to customize the admin experience or integrate it into your existing infrastructure, Timerise Admin App is here to help. Happy managing!

Timerise Admin App is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Features](#features)
- [Badges](#badges)
- [Make it Yours](#make-it-yours)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
  - [`npm start`](#npm-start)
  - [`npm run build`](#npm-run-build)
- [See How Timerise Works](#see-how-timerise-works)
- [Learn More](#learn-more)
- [License](#license)

## Features

- **Service Management**: 
  - Create new services with detailed descriptions and pricing.
  - Update existing services to reflect changes or improvements.
  - Delete services that are no longer offered.

- **Booking Management**: 
  - View all bookings in a centralized dashboard.
  - Modify booking details such as date, time, and service type.
  - Update booking statuses (e.g., confirmed, pending, canceled).
  - Send automated notifications and reminders to users.

- **Team Management**: 
  - Create and manage user accounts with different roles (e.g., admin, manager).

- **Customization**: 
  - Customize the appearance of the admin panel to match your brand's colors and logo.
  - Configure workflows to suit your operational needs.
  - Integrate with other tools and services to enhance functionality.

![Admin App](https://cdn-ljnnf.nitrocdn.com/mtmCKdQLxSelMvELfVjJoaGTtVOfuloL/assets/images/optimized/rev-623076e/timerise.io/wp-content/uploads/2024/09/hero-2.png)

## Make it Yours

Customize the appearance and functionality of the admin panel to match your brand and operational requirements.

![Customization Options](https://cdn.timerise.io/landing-page/section-make-it-yours.png)

## Installation

Follow these steps to set up the Timerise Admin App locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/timerise-io/open-admin-app.git
   cd open-admin-app
   ```

2. **Install Dependencies**

   ```
   npm ci
   ```

3. **Configure Environment Variables**
Create a .env file in the root directory and add your configuration settings:
   ```
   REACT_APP_API_URL=https://api.timerise.io
   REACT_APP_ENVIRONMENT=development
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Developer mode is connected to the sandbox environment by default. To connect to a different environment during development, please edit the `.env.development` file in the root folder.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

**Note**: The build command requires a `.env` file in the root directory.

The build is minified, and the filenames include the hashes.\
For more information, click [here](https://create-react-app.dev/docs/production-build/).

# See how Timerise works
[![Vimeo](https://cdn.timerise.io/landing-page/video-placeholder.png?w=2048)](https://vimeo.com/703918323)


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).

### Additional Resources

- **Tutorials and Courses**
  - [FreeCodeCamp - React Tutorial](https://www.freecodecamp.org/learn/front-end-libraries/react/)
  - [Codecademy - Learn React](https://www.codecademy.com/learn/react-101)

- **Communities and Forums**
  - [Stack Overflow - React Tag](https://stackoverflow.com/questions/tagged/reactjs)
  - [Reactiflux Discord Community](https://www.reactiflux.com/)

- **Blogs and Articles**
  - [Overreacted.io by Dan Abramov](https://overreacted.io/)
  - [CSS-Tricks - A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

- **Tools and Libraries**
  - [Redux](https://redux.js.org/) - State management
  - [React Router](https://reactrouter.com/) - Routing for React applications

## License

Distributed under the [MIT License](https://github.com/timerise-io/admin-app/blob/main/LICENSE.md). See `LICENSE.md` for more information.
