In order to set this up, you need to:
1. Create a mongodb account [here](https://www.mongodb.com/cloud/atlas/register).
2. Click on "Create a new cluster".
3. Make sure your settings match the image below. By selecting "preload dataset", MongoDB Atlas will automatically add data to our database cluster for us to play around with.
![alt text](./assets/cluster-setup-1.PNG "Cluster settings")
4. In the "Connect to Cluster0" modal, copy the username and password it generates using the "Copy" button and hit "Create user".
5. Click "Choose a connection method", then "Drivers", and select Node.js (version 6.7 or later). It should look like this:
![alt text](./assets/cluster-setup-2.PNG "Connect to cluster final screen").
6. Above the URI, check "Show password". Copy the connection string and place it in an .env file in this directory like this: MONGODB_URI="mongodb+srv://username:password@cluster0.j5t8r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
7. Click the "Done" button.
8. Run `npm i` in this directory.
9. Install nodemon via `npm i -g nodemon`.
10. Run `nodemon db-examples.js` in this directory.

Note: If you want to access your database outside of your current network, go to the "Network Access" tab in MongoDB Atlas, click "+ADD IP ADDRESS", click "ALLOW ACCESS FROM ANYWHERE", then hit "Confirm".

Another Note: