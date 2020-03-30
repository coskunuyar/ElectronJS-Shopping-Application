const electron = require('electron');
const url = require('url');
const path = require('path');

const { app , BrowserWindow , Menu} = electron;

let mainWindow;


// Create menu template
const mainMenuTemplate = [
    {
        label: 'File'
    }
];

// Listen for app to be ready
app.on('ready',() => {
    // Create new window.
    mainWindow = new BrowserWindow({});
    // Load html into window.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));

    // Buil menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});