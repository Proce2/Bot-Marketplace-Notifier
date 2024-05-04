# Axie Marketplace Notifier
This is a Node.js application designed to monitor and notify changes in the Axie Infinity marketplace. It automatically checks for new or updated listings of Axies at set times.

## How to Install

### Before You Start
Make sure you have Node.js and npm installed on your computer. You can check if you have them and see which versions you have by typing these commands in your terminal:
```bash
node --version
npm --version
```

### Set Up the Project
Here’s how you get the application ready on your computer:
1. **Get the code**:
   - Copy the code from the online repository:
     ```bash
     git clone [Repository URL]
     cd [Repository Name]
     ```
2. **Install needed parts**:
   - Set up all the necessary parts of the project:
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
1. **Find where to make changes**: Open the `axies.js` file that contains the settings for fetching data.
2. **Change the settings**: Look for the `axios.post` request and change the `"criteria"` part to what you want. For example:
    ```javascript
    "criteria": {
      "classes": "Aquatic",  // Change this to any class you are interested in
      "pureness": [1, 2],    // Set the pureness levels you want to track
      "price": {"max": 300}  // Set your price limit
    }
    ```
3. **Check your changes**: Restart the server to see if it now tracks Axies based on your new settings.
4. **Keep notes on changes**: Make sure to update any comments or notes in the code to reflect what you changed. This helps you or others understand what was done.

## What It Does
- **Checks for new listings**: The application uses scheduled tasks to look for new or changed listings that meet your criteria.
- **Sends notifications**: It lets you know when there are updates or new listings that match your settings.

---

### Note
This app works internally and does not offer a way to interact with it over the internet through HTTP requests. All settings and interactions are done directly on the server.



