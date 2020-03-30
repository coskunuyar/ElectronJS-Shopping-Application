const electron = require('electron');
const url = require('url');
const path = require('path');

const { app , BrowserWindow , Menu} = electron;

let mainWindow;
let addWindow;

// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                },

            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin'  ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// Handle create add window
function createAddWindow(){
    // Create new window.
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    });
    // Load html into window.
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,'addWindow.html'),
        protocol:'file:',
        slashes: true
    }));

    // Garbage collection handle
    addWindow.on('close',() => {
        addWindow = null;
    });
}

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

    // Quit app when closed
    mainWindow.on('closed',() => {
        app.quit();
    })

    // Buil menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});