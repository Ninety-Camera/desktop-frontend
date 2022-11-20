# Ninety Camera - Smart Monitoring Platform for Security Cameras

![GitHub language count](https://img.shields.io/github/languages/count/Ninety-Camera/desktop-frontend)
![GitHub top language](https://img.shields.io/github/languages/top/Ninety-Camera/desktop-frontend)
![GitHub repo size](https://img.shields.io/github/repo-size/Ninety-Camera/desktop-frontend)

Ninety Camera is a smart monitoring platform for security cameras which can detect human intrusions from camera footage and notify users about the intruder. The whole system is come up with a desktop application, mobile applicatin and a web application. This is the frontend of the desktop application.
By using this application you can connect to CCTV cameras. Currently following CCTV cameras are supported.
 - Web Cameras
 - IP cameras

Users can view the live feed of the CCTV cameras. And view the previous intrusions. In addition to that users are able to view the recorded videos of the cameras. Only one user is able to login to this system. To run this system both flask-backend and the web-server needs to be run.

## Main functionalities
 - Sign in and sign up functions.
 - Password forgot functions.
 - Camera adding functions. (users can add both web camera's and ip camera's)
 - Users can view the camera footages which connected to the system.
 - Users can change the detection mode for all the cameras or for selected one camera.
 - View the intrusion details and further we are showing the intrusion images and video playing option.
 - View the processed video details and video view functions. Also users can view the processed videos using the date.
 - Add subcriber option. Application will provide a QR code and then mobile users can scan it and add as a subcriber.


## Technologies used
 - Electron JS
 - React JS
 - MUI as the UI library
 - Formik as the form library
 - Yup for value validation
 
## Setup
 - Clone the Repository
 - Run `npm i` to install the required packages
 - Install the dev dependencies in the package.json using `npm install --save-dev <package-name>`
 - Dev dependencies that used in the project
 - Run `npm run dev` to run the package

## Bulding
 - In the build-app branch all the configurations are setup for the building process.
 - Run `npm run package` to make the package of the frontend
 - Run `npm run make` to make the distributable of the package


