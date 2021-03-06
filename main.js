const electron = require('electron');
const url = require('url');
const path = require('path');

const { app , BrowserWindow , Menu , ipcMain } = electron;

// Set environment.
process.env.NODE_ENV = 'production';

let mainWindow;
let addWindow;

// Handle create add window
function createAddWindow(){
    // Create new window.
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item',
        webPreferences: { nodeIntegration: true }
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
    mainWindow = new BrowserWindow({webPreferences: { nodeIntegration: true }});
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

// Catch item:add 
ipcMain.on('item:add',(e,item) => {
    mainWindow.webContents.send('item:add',item);
    addWindow.close();
});


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
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
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

// If mac, add empty object to menu
if(process.platform === "darwin"){
    mainMenuTemplate.unshift({});
}

// Add developer tools items if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform === 'darwin'  ? 'Command+I' : 'Ctrl+I',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}