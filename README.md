# Temporary readme file
# PetPal

## Overview

PetPal is a user-friendly web application designed to help pet lovers adopt pets easily from online pet stores and shelters. Whether you are a pet owner looking to find a new home for your pet or a shelter aiming to facilitate pet adoptions, PetPal provides a seamless and efficient platform to connect pet seekers with their perfect companions.

## Features

- **User Authentication**: Secure login and registration for pet owners and shelters.
- **Pet Listings**: Browse and search for pets available for adoption.
- **User Profiles**: Separate profiles for pet owners and shelters.
- **Pet Details**: View detailed information about each pet, including photos, age, breed, and health status.
- **Adoption Process**: Streamlined process for requesting to adopt a pet.
- **Messaging System**: Communicate directly with pet owners or shelters.
- **Pets Store**: Allow pet owners to buy pet needs from trusted sources.

## User Stories

### As a Pet Seeker

- **Search for Pets**: I want to search for pets based on specific criteria (e.g., breed, age, location) so that I can find a pet that suits my preferences.
- **View Pet Details**: I want to view detailed information about each pet, including photos and health status, so that I can make an informed decision about adoption.
- **Request Adoption**: I want to request to adopt a pet directly through the app, so I can start the adoption process without unnecessary delays.
- **Communication**: I want to communicate with pet owners or shelters to ask questions and get more information about the pet I am interested in.

### As a Pet Owner

- **Create Listings**: I want to create detailed listings for pets I need to rehome, so they can reach a wide audience of potential adopters.
- **Manage Listings**: I want to update or remove my pet listings as needed, to ensure the information is current and accurate.
- **Communicate with Adopters**: I want to communicate with potential adopters directly through the app, so I can find the best home for my pet.

### As a Shelter

- **Post Available Pets**: I want to post listings for all pets available for adoption at my shelter, to increase their chances of finding a home.
- **Manage Shelter Profile**: I want to manage my shelter's profile, including contact information and location, to help users find and contact us easily.
- **Screen Adopters**: I want to review adoption requests and communicate with potential adopters, to ensure pets go to suitable homes.

## How PetPal Helps

### Ease of Use

PetPal simplifies the process of finding and adopting pets by providing an intuitive and user-friendly interface. Users can easily search for pets, view detailed profiles, and initiate the adoption process with just a few clicks.

### Enhanced Communication

The built-in messaging system allows seamless communication between pet seekers, pet owners, and shelters. This ensures that all parties can ask questions, share information, and coordinate the adoption process efficiently.

### Centralized Platform

By bringing pet owners and shelters together on one platform, PetPal increases the visibility of pets available for adoption and streamlines the rehoming process. This helps reduce the time pets spend waiting for a new home and increases the chances of successful adoptions.

### Secure and Trustworthy

PetPal ensures that all users are authenticated and verified, providing a secure environment for pet adoptions. Both pet owners and shelters can manage their listings and profiles confidently, knowing that they are reaching genuine and serious adopters.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Python and Django installed

### Installation

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/yourusername/petpal.git
   ```

2. **Backend Setup**:
   ```sh
   cd petpal/backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

3. **Frontend Setup**:
   ```sh
   cd petpal/frontend
   npm install
   npm start
   ```

### Running the Application

1. Start the Django backend server:
   ```sh
   python manage.py runserver
   ```

2. Start the React frontend server:
   ```sh
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to start using PetPal.


By leveraging the comprehensive features of PetPal, both pet lovers and shelters can find the adoption process significantly more manageable and efficient, ensuring that more pets find loving homes quickly and easily.


Current Updates: The basics frontend part and backend part of the login and multi-part registration pages has been completed. User can now register via the Register For Free hyperlink which leads them to the multi-part registration pages. Upon completion of all the registration steps inside the multi-part registration pages, user can login to the dashboard.

Notes: The login feature via Google or Facebook API and dashboard of the application is yet to be completed. Security measure (ie: Requesting user to have a longer and more secured password) is yet to be implemented. The dashboard and the main features of application is yet to be completed.
