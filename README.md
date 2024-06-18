# [HealthFULL](https://project-2-recipe-finder.onrender.com/)

![image alt text](/public/images/HealthFULL.png)

HealthFULL is a web application designed to help users search for and save healthy recipes. Users can search for recipes based on keywords and dietary preferences, save their favorite recipes, and manage their saved recipes through an intuitive interface.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Future Development](#future-development)
- [Questions](#questions)

## Features

- **Recipe Search**: Search for recipes using keywords and dietary preferences.

- **Save Recipes**: Save favorite recipes for easy access.

- **User Authentication**: Register and log in to manage saved recipes.

- **Responsive Design**: Mobile-friendly design using Tailwind CSS.

## Installation

To get a local copy up and running, follow these simple steps:

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Clone the Repository

```bash
git clone https://github.com/your-username/healthFULL.git
cd healthFULL
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Use .env.EXAMPLE and remove '.EXAMPLE'. Add your credentials.

### Set Up the Database

Log in to psql and create the database:

```bash
postgres=#\i db/schema.sql
```

Seed the database:

```bash
node seeds/index.js
```

### Build CSS

Run the CSS builder to apply styles:

```bash
npm run build:css
```

### Start the Application

The application will be available at `http://localhost:3001`

```bash
npm start
```

## Usage

- Register for an account with your desired username, email, and password. You will be redirected to the homepage where the search function will be made available.

- Search for Recipes: Use the search bar on the homepage to find recipes based on keywords and dietary preferences.

- Save Recipes: Click the "Save Recipe" button on a recipe card to save it to your account.

- View Saved Recipes: Scroll down the page to view your saved recipes.

## Technologies Used

- Frontend: Handlebars, Tailwind CSS

- Backend: Node.js, Express.js

- Database: MySQL, Sequelize ORM

- Authentication: Express-Session, bcrypt

- API: Edamam API for recipe search

## Future Development

- The search results will be recipe card previews including simple info (title, image, macros).

- Implement macro chart in recipe preview cards.

- Delete saved recipes from lists

- Add additional search filters

- Create a macro counter based on serving size

## Questions

For questions about the project, please contact us:
 - [@ReyG18](https://github.com/ReyG18)

 - [@anullator](https://github.com/anullator)
