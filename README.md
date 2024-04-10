# Groceries App Documentation

## Overview
The Groceries App is a web application designed to facilitate the online shopping experience for groceries. This documentation provides an overview of the app's features, technologies used, and implementation details.

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **Context API**: Used for managing global state across different pages such as wishlist and checkout.
- **Axios**: A promise-based HTTP client for making API calls to fetch data.
- **Tailwind CSS**: A utility-first CSS framework for styling the components.
- **React Router**: Used for routing between different pages like home page, wishlist page, and checkout page.
- **Hooks**: Various React hooks like useState, useEffect, useMemo, useCallback, and useRef are employed for managing state, side effects, and references efficiently.
- **SVG**: Utilized for image optimization and displaying vector graphics.
- **Suspense and Fallback**: Implemented for lazy loading of components to improve performance.
- **Local Storage**: Used for persisting cart and wishlist data on the client-side.
- **Responsive Design**: Ensured that the application is responsive and works well on various screen sizes and devices.
- **Search Functionality**: Implemented search functionality to allow users to search for specific groceries.

## Features
1. **Home Page**
   - Displays a catalog of available groceries.
   - Users can browse and search for items using the search functionality.
   - Add items to the cart or wishlist.

2. **Wishlist Page**
   - Shows a list of items that users have added to their wishlist.
   - Users can remove items from the wishlist or move them to the cart.

3. **Checkout Page**
   - Allows users to review items in their cart and proceed to checkout.
   - Users can update quantities, remove items.

4. **Offer Functionality**
   - Implements various offers and discounts as per task rules.
   - Offers are applied automatically and removed on product quantity increase and decrease.

## Implementation Details
- **Component-Based Structure**: Follows a component-based architecture for better reusability and maintainability.
- **Data Flow**: Utilizes React Context API for managing state and data flow across different pages like wishlist and checkout.
- **API Calls**: Axios is used to make API calls to fetch data from the server.
- **Routing**: React Router is employed for routing between different pages within the application.
- **Lazy Loading**: Implemented with Suspense and Fallback for lazy loading of components to improve performance.
- **LocalStorage**: Utilized for storing cart and wishlist data locally to maintain persistence across sessions.
- **Search Functionality**: Implemented search functionality using React state and filtering logic.
- **Error Page**: Created an error page for invalid routes.

## Links
- **Live Link**: [Groceries App](https://ecom-grocery-app.vercel.app)
- **GitHub Repository**: [GitHub](https://github.com/trilochan-behera-dev/Grocery-App)


In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
