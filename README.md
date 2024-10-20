# Unicorn Dashboard

A Vue.js application for managing unicorns with CRUD operations, sorting, and pagination.

## Table of Contents

1. [Installation](#installation)
2. [Application Structure](#application-structure)
3. [Design Choices](#design-choices)
4. [Challenges and Solutions](#challenges-and-solutions)
5. [Bonus Features](#bonus-features)
6. [Live Demo](#live-demo)

## Installation

1. **Clone the repository:**
   `git clone https://github.com/soykot2910/unicorn-dashboard.git`

2. **Change into the project directory**
   `cd unicorn-dashboard`

3. **Install dependencies:**
   `npm install`

4. **Copy the .env.example file to create a .env file:**
   `cp .env.example .env`

5. **Configure the CRUD API key in the .env file:**
   Open the `.env` file and replace `YOUR_API_KEY` with your actual API key:
   `VITE_API_ID=YOUR_API_KEY`

6. **Start the development server:**
   `npm run dev`

Now, the application is up and running. You can access it at `http://localhost:5173`

## Application Structure

The application follows a component-based architecture using Vue.js 3 with the Composition API. Here's an overview of the main components:

- `App.vue`: The root component that manages the overall layout and state.
- `SidebarMenu.vue`: Handles the sidebar navigation.
- `MainHeader.vue`: Contains the header with sorting controls and create button.
- `UnicornCard.vue`: Displays individual unicorn information.
- `UnicornFormPopup.vue`: Manages the create/edit form for unicorns.
- `CustomPagination.vue`: Handles pagination controls.

## Design Choices

1. **Vue.js 3 with Composition API**: Chosen for its reactivity system and improved performance.
2. **Tailwind CSS**: Used for rapid UI development and consistent styling.
3. **Component-based architecture**: For better code organization and reusability.
4. **Vue-toastification**: Implemented for user-friendly notifications.
5. **Responsive design**: Ensures the application works well on various screen sizes.

## Challenges and Solutions

1. **Challenge**: Implementing sorting and pagination with the API.
   **Solution**: Implemented client-side sorting and pagination to improve performance and reduce API calls.

2. **Challenge**: Managing form state for both create and edit operations.
   **Solution**: Created a reusable `UnicornFormPopup` component that handles both create and edit functionalities.

3. **Challenge**: Responsive design for mobile devices.
   **Solution**: Utilized Tailwind CSS classes and custom media queries to ensure a smooth mobile experience.

## Bonus Features

1. Added form validation for creating and editing unicorns.
2. Implemented error handling and user-friendly error messages.

## Live Demo

[Live Demo](https://unicorn-dashboard.netlify.app/)
