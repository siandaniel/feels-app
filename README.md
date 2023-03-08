# Feels App

## Introduction

Feels is an interactive mood tracking and mental health support app which provides users with the unique opportunity to connect to a registered professional to discuss their emotions, all in the same app. The app uses the Feels API to fetch user mood tracking information and allow users to join a waiting room to speak to a professional. Whilst in the waiting room, users are provided with links to tailored content such as articles, videos and support websites, all based upon their previous moods as retrieved from the API.

📝 Manifest:

> https://exp.host/@stacey6105/feel Learn more.

⚙️ Project page:

> https://expo.dev/@stacey6105/feel?serviceType=classic&distribution=expo-go

<br>

## Back End

The production version of the Feels API is hosted via Render and can be accessed at the following URL:

> https://feels-api.onrender.com/api/

Find it here on GitHub:

> https://github.com/StaceyCP/Feels-API

<br>

## Features

With Feels, you can:

- Sign up as a user or a registered health professional, with client-side and server-side validation to ensure your data is correct and verify a professional's status.
- View your information on your own profile page.
- Track your mood daily via our 'Moodal'.
- View a chart to visualise your mood for the previous 7 days.
- View links to recommended content tailored according to your mood.
- Connect with a professional via the 'Get Help' function and provide them with a summary of what you'd like to discuss.
- Partake in a live bidirectional chat with a professional and remember your messages for next time you log in.

<br>

## Run Feels Locally:

1. Clone this repository to your local machine via your terminal using command _'git clone https://github.com/StaceyCP/Feels.git'_ in your chosen directory location.

2. Use your terminal's 'cd' command to navigate into your chosen directory and open it with your chosen software, e.g. VS Code.

3. Run _'npm install'_ to install all dependencies. You will need:

   > - **axios** v1.3.4,
   > - **expo** v47.0.12,
   > - **expo-checkbox** v2.2.2,
   > - **expo-font** v11.0.1,
   > - **expo-status-bar** v1.4.2,
   > - **firebase** v9.17.1,
   > - **react** v18.1.0,
   > - **react-dom** v18.1.0,
   > - **react-native** v0.70.5,
   > - **react-native-safe-area-context** v4.4.1,
   > - **react-native-screens** v3.18.0,
   > - **react-native-web** v0.18.9,
   > - **react-native-webview** v11.26.1,
   > - **socket.io-client** v4.6.1
   > - **@babel/core** v7.12.9,
   > - **@types/react** v18.0.14,
   > - **@types/react-native** v0.70.6,
   > - **typescript** v4.6.3
   > - **@react-native-async-storage/async-storage** v1.17.3,
   > - **@react-native-community/checkbox** v0.5.14,
   > - **@react-navigation/bottom-tabs** v6.5.5,
   > - **@react-navigation/native** v6.1.4,
   > - **@react-navigation/native-stack** v6.9.10,

<br>

4. Install the Expo Go app on your device: https://expo.dev/client.

5. Use command _'npx expo start --tunnel'_ to open up a version of the app on your local server.

6. Code away!
