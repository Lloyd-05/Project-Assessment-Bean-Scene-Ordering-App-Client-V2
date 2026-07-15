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

## Tech Stack
- React Native
- Expo
- AsyncStorage for saving user's preferences
- Zustand

## Setup Instructions
- Open up  Windows Powershall
- git clone Project-Assessment-Bean-Scene-Ordering-App-Client-V2
- cd Bean-Scene-Ordering-App-Client-V2
-  Run npx expo start in Windows Powershall