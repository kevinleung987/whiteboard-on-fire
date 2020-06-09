# Whiteboard on Fire(base)
Collaborative real-time whiteboarding app built on Firebase for my first-week project on the Firebase team at Google.

You can check it out [here](https://wbof.kevinleung.dev/).

![](preview.gif?raw=true)

## Development
- Install dependencies by running `yarn install` on the project root and the `functions/` folder
- Run `yarn emulators` to start the realtime database emulator
- Run `yarn start` to start the app

## About
- Hosted on Firebase Hosting
- Authentication handled through Firebase Authentication
- Uses Firebase Realtime Database for presence tracking, messages, and syncing the whiteboard across clients
- Firebase Cloud Functions checks if a board is empty and deletes data
- Serialized line data is compressed using `lz-string` for 50 - 90% reduction in data stored

Note: Touch input is not synced
