# Unicorn Dashboard

A Vue.js application for managing unicorns with CRUD operations, sorting, and pagination.

## Table of Contents

1. [Installation](#installation)
2. [Application Structure](#application-structure)
3. [Design Choices](#design-choices)
4. [State Management](#state-management)
5. [Testing](#testing)
6. [Error Handling](#error-handling)
7. [Form Validation](#form-validation)
8. [Deployment](#deployment)
9. [Challenges and Solutions](#challenges-and-solutions)

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

## State Management

The application uses Pinia for state management with the following features:

1. **Centralized Store**: All unicorn-related state and operations are managed in a dedicated store
2. **Reactive State**: Utilizes Vue's reactivity system through Pinia
3. **Actions**: Async operations for CRUD operations
4. **Getters**: Computed properties for sorted and paginated data
5. **Modular**: Easy to extend and maintain

Key store features:

- State management for unicorns data
- Loading and error states
- Sorting and pagination logic
- CRUD operations
- Computed properties for filtered data

## Testing

Comprehensive test suite using Vitest and Vue Test Utils:

1. **Store Tests:**

   - State mutations
   - Action responses
   - Getter computations
   - Error handling

2. **Component Tests:**

   - Form validation
   - Event emissions
   - User interactions
   - Conditional rendering

3. **API Tests:**
   - Request handling
   - Error scenarios
   - Response parsing

## Error Handling

- Network error detection
- User-friendly messages
- Loading states
- Retry mechanisms

## Deployment

The application is deployed and available at:
[Live Demo](https://unicorn-dashboard.netlify.app/)

Deployment features:

- Continuous deployment from main branch
- Environment variable management
- Build optimization
- Error tracking

## Challenges and Solutions

1. **Challenge**: Complex state management
   **Solution**: Implemented Pinia store with computed properties

2. **Challenge**: Testing async operations
   **Solution**: Used Vitest mocking and async utilities

3. **Challenge**: Form validation
   **Solution**: Created reusable validation logic with real-time feedback

4. **Challenge**: API error handling
   **Solution**: Comprehensive error handling with user feedback

## Bonus Challenges Completed

### 1. State Management ✅

- Implemented Pinia for centralized state management
- Created dedicated unicorn store with actions and getters
- Managed loading states, pagination, and sorting through store

### 2. Testing ✅

- Unit tests for store using Vitest `javascript
- Component tests with Vue Test Utils
- API integration tests

### 3. Error Handling ✅

- Comprehensive API error handling
- User-friendly error messages using vue-toastification
- Loading states for better UX

### 4. Form Validation ✅

- Client-side validation for all form fields
- Real-time validation feedback
- Input constraints:
  - Name: 2-50 characters, letters only
  - Age: 0-100, numeric
  - Color: 3-20 characters, letters only

### 5. Deployment ✅

- Deployed to Netlify
- Live demo: [Unicorn Dashboard](https://unicorn-dashboard.netlify.app/)
- Environment variable management
- Continuous deployment from main branch
