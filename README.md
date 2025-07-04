# GraphQL Profile Project

[Live Demo](https://noorhalabi911.github.io/graphql-01/)

## Overview

This project is a personal profile dashboard built to learn and demonstrate the use of the GraphQL query language. It allows users to log in, view their school-related data, and visualize their achievements and statistics using interactive SVG-based graphs.

- **Partner:** [@noorhalabi911](https://github.com/noorhalabi911)
- **Repo:** [adam-jerusalem.nd.edu/git/noohalabi/graphql](https://adam-jerusalem.nd.edu/git/noohalabi/graphql)
- **EXAMPLE:**
![image1 of wesbite](/assets/image1.png)
![image2 of wesbite](/assets/image.png)

## Objectives

- Learn GraphQL by querying a real API endpoint.
- Implement authentication using JWT.
- Display user profile information and statistics.
- Visualize data with at least two different SVG-based graphs.
- Host the project online (GitHub Pages).

## Features

- **Login Page:**
  - Supports login with username/email and password.
  - Handles authentication via JWT (obtained from the API).
  - Displays error messages for invalid credentials.
  - Secure logout functionality.

- **Profile Page:**
  - Displays user information: ID, username, full name, XP stats, audits, level, completed projects, and more.
  - Shows technical skills and technologies acquired.
  - **Statistics Section:**
    - **XP Distribution Bar Chart:** Visualizes XP earned from checkpoints, piscine-go, piscine-js, projects, and bonuses using SVG.
    - **XP per Project Bar Chart:** Interactive SVG chart showing XP earned per project.
    - **Skills Pie Chart:** (Canvas/Chart.js) Visualizes technical skills distribution.
  - Responsive, modern UI with custom CSS.

## Technologies Used

- JavaScript (Vanilla)
- HTML5, CSS3
- [SVG.js](https://svgjs.dev/) for SVG chart rendering
- [Chart.js](https://www.chartjs.org/) for pie chart
- GraphQL API: [adam-jerusalem.nd.edu/api/graphql-engine/v1/graphql](https://adam-jerusalem.nd.edu/api/graphql-engine/v1/graphql)

## Setup & Usage

1. **Clone the repository:**

   ```bash
   git clone https://adam-jerusalem.nd.edu/git/noohalabi/graphql
   cd graphql
   ```

2. **Open `index.html` in your browser.**
3. **Login:**
   - Enter your username/email and password.
   - On success, you are redirected to your profile page.
4. **Profile Dashboard:**
   - View your stats, XP, audits, and interactive graphs.
   - Use the logout button to securely end your session.

## GraphQL Queries Used

- **Basic user info:**

  ```graphql
  { user { id login firstName lastName xps { amount path } } }
  ```

- **Audit stats:**

  ```graphql
  { user { auditRatio audits_aggregate { nodes { resultId auditedAt } } } }
  ```

- **Skills and levels:**

  ```graphql
  { transaction { type amount } }
  ```

- **XP per project (with arguments):**

  ```graphql
  query ($regexPattern: String!) {
    xp_view(where: {path: {_regex: $regexPattern}}) {
      amount
      path
    }
  }
  # variables: { "regexPattern": "^/adam/module/[\\w-]+$" }
  ```

## Hosting

- Hosted on GitHub Pages: [https://noorhalabi911.github.io/graphql-01/](https://noorhalabi911.github.io/graphql-01/)

## Project Structure

```
graphql-01/
  ├── assets/           # Images and screenshots
  ├── chart.js          # SVG and chart logic
  ├── index.css         # Login page styles
  ├── index.html        # Login page
  ├── main.js           # Login logic
  ├── profile.css       # Profile page styles
  ├── profile.html      # Profile page
  ├── profile.js        # Profile logic and GraphQL queries
```

## Instructions & Requirements

- Use the provided GraphQL endpoint for all data.
- Authenticate using JWT (via signin endpoint).
- Display at least three user data points and two SVG-based graphs.
- Ensure good UI/UX principles.
- Host the project and provide a live demo link.

## Credits

- Developed by [@noorhalabi911](https://github.com/noorhalabi911) and [@talaamm](https://github.com/talaamm).

---
For more details, see the [project demo](https://noorhalabi911.github.io/graphql-01/)
