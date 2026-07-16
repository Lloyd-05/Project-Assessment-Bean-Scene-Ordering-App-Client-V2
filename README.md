# Project-Assessment-Bean-Scene-Ordering-App-Client

### Developed by: Lloyd Ryu

## Overview
The Bean Scene Ordering Client is a React Native mobile application used by restaurant staff to take orders quickly and accurately using Android tablets. It communicates with the Bean Scene Ordering API to retrieve menu data, submit orders, and manage staff access. The app is optimized for both small and large tablets and supports portrait and landscape orientations.

## Features

### Ordering
- Browse menu items by category
- Search menu items based on name
- Place orders for tables, ranging from M1–M10, O1–O10, B1–B10
- Add dietary notes, allergens, and special requests
- Update order status either in‑progress or completed
- Add notes, special requests, and timestamps for when the order is placed

### Offline Support
- Local caching of menu items
- Staff can browse menus even when the network is unavailable
- Automatic reconnection notifications

### Data Management
- Retrieve/add/edit/delete menu items
- Retrieve/add/edit/delete menu ategories
- Retrieve/add/edit/delete staff accounts
- View order activity reports

### Usability
- Intuitive UI for non‑technical staff
- Clear navigation and gestures
- Error and success messages throughout the app
- Supports portrait + landscape
- Works on small and large Android tablets

## Technology Stack
- React Native
- Expo
- AsyncStorage for saving user's preferences
- Zustand
- Render

## Setup Instructions
- Open up  Windows Powershall
- git clone https://github.com/Lloyd-05/Project-Assessment-Bean-Scene-Ordering-App-Client-V2
- cd Bean-Scene-Ordering-App-Client-V2
- Run npx expo start in Windows Powershall

## Logins Credentials
- Staff Accounts
    *  Username: staff1
    *  Password: password456
    *  Username: staff2
    *  Password: password789
- Manager Account
    *  Username: manager1
    *  Password: password123

## Navigation
- Application starts with the login screen.
    * User can log in as a staff by entering the staff credentials.
    * User can log in as a manager with the provided details.

### Staff Navigation
- User can change the theme between light and dark mode by navigating to settings from the home screen.
- User is able to log out of the application by clicking on the log out button in the home screen
- User can view current orders by clicking on the WaiterCurrentOrders button of the bottom tab navigator.
    *  User is able to create a new order by entering the table code, special requests, and notes.
        +  User can add menu items by navigating to the select menu items screen from the create order screen.
        + User can the final new order by clicking the create button.
    * User is able to navigate to the Past Orders List from waiter current orders screen.
        + User can view  all orders with in from the Past Orders List screen.
- User can view current orders by clicking on the KitchenCurrentOrders button of the bottom tab navigator.
    * User is able to navigate to the Past Orders List from kitchen current orders screen.
        + User can view all orders with in from the Past Orders List screen.

### Manager Navigation
- User can change the theme between light and dark mode by navigating to settings from the home screen.
- User is able to log out of the application by clicking on the log out button in the home screen
- User can display all menu items in a screen by clicking on the menu items button of the bottom tab navigator
    * User can display all menu categories in menu items list screen by clicking manage categories
        + User can create a new menu category by clicking on create new category
        + User can update a menu category by clicking on update
        + User can delete a  menu category by clicking on delete
    * User can create a new menu item by clicking on create new item
    * User can update a menu item by clicking on update
    * User can delete a menu item by clicking on delete
- User can display all user accounts in a screen by clicking on the users button of the bottom tab navigator
    * User can create a new user account by clicking on create new user
    * User can update a user account by clicking on update
    * User can delete a user account by clicking on delete
- User can navigate to the Past Orders List by clicking on the orders button of the bottom tab navigator
    * User can view all orders with in from the Past Orders List screen.