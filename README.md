# Budgetter App

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Difficulties](#difficulties)

## Introduction

Budgetter is a mobile application designed to help users manage their expenses and track spending across different categories. It provides a user-friendly interface for creating and managing budget categories, adding items with cost details, and visualizing budget progress.

## Features

### User Management:
- **Login:** Users can log in to the app using social media platforms with Kind authentication.
- **Profile Management (Optional):** Users have the option to manage their profiles within the app.

### Budget Management:
- **Create Categories:** Users can create budget categories with custom names, colors, and icons.
- **Set Budget:** Users can set a budget amount for each category to track their spending.
- **Add Items:** Users can add new items to specific categories, including cost details and optional images.
- **View Details:** Users can view category details with a progress bar reflecting spending against the budget.
- **Delete Categories:** Users have the option to delete categories when no longer needed.

### Data Management:
- **Secure Storage:** User data, budget categories, items, and images are securely stored.
- **Retrieve and Display:** The app retrieves and displays user data, categories, and items as needed.

### UI/UX:
- **Home Screen:** The app features a home screen displaying user profile information and a donut chart for budget visualization.
- **Intuitive Interactions:** Users can add new categories and items with clear and intuitive interactions.
- **Visual Tracking:** Each category includes a progress bar to visually track spending against the budget.
- **Delete Option:** Users can delete categories and items with ease, with the option to refresh the screen.

## Installation

To install and run the Budgetter app locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install` or `yarn install`.
4. Start the development server using `expo start`.

## Usage

1. Launch the Budgetter app on your device or emulator.
2. Log in using your preferred social media platform.
3. Navigate through the app to view and manage your budget categories and items.
4. Add new categories and items as needed, set budgets, and track your spending.

## Difficulties 

- **Implemented functionality to delete items from the category list upon user interaction**
  - This commit addressed a crucial user interaction scenario, allowing users to delete items from category lists. By integrating this feature seamlessly, the app's usability was significantly improved, enabling users to manage their budget categories more efficiently.

- **Updated Pie component to dynamically update based on category data**
  - This commit improved data visualization by dynamically updating the Pie component with real-time category data. This enhancement provided users with valuable insights into their spending habits, contributing to a more informed financial management process.

- **Enhanced image upload functionality with loader**
  - Updated the image upload logic to handle cases where no image is selected by the user. Now, if no image is selected, the system proceeds with saving the item details without attempting to upload an image or create an image URL. This adjustment ensures smoother functionality and better handling of scenarios where an image is not mandatory.

- **Implemented category deletion functionality**
  - This feature allowed users to delete entire budget categories, providing them with greater control over their financial management. The implementation of this functionality demonstrates proficiency in backend development and integration with the frontend.

- **Implemented CategoryInfo component to display detailed category information along with delete category functionality and percentage bar**
  - The introduction of the CategoryInfo component enriched the app's feature set by providing users with detailed category information and the ability to delete categories. This enhancement contributed to an improved user experience by offering comprehensive category management options.
