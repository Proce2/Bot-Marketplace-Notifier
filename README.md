# Axie Marketplace Notifier
This is a Node.js application designed to monitor and notify changes in the Axie Infinity marketplace. It automatically checks for new or updated listings of Axies at set times.

## What It Does
- **Checks for new listings**: The application uses scheduled tasks to look for new or changed listings that meet your criteria.
- **Sends notifications**: It lets you know when there are updates or new listings that match your settings.

## How to Install

### Before You Start
1. Check the versions of Node.js and npm installed. You can verify this by running the following commands in your terminal:

    ```bash
    node --version
    npm --version
    ```

1. Clone the repository
2. Install dependencies:

    ```bash
    npm install
    ```

## How to Use

### Start the Server
To turn on the server and get everything running:
```bash
node index.js
```
This command kicks off the server on port 8080 and starts tasks that check the Axie listings.

### Change What You Track
If you want to track different Axies or change what kinds of listings you are looking for, you can do this:
1.  Open the `axies.js` file that contains the settings for fetching data.

2. Look for the `axios.post` request and change the `"criteria"` part to what you want. For 
example:

    ```javascript
    "criteria": {
      "classes": "Aquatic",  // Change this to any class you are interested in
      "pureness": [1, 2],    // Set the pureness levels you want to track
      "price": {"max": 300}  // Set your price limit
    }
    ```
3. Restart the server to see if it now tracks Axies based on your new settings.

