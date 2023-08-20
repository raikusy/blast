import { app, BrowserWindow, globalShortcut } from "electron";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

declare const NODE_INSTALLER_WEBPACK_ENTRY: string;
declare const NODE_INSTALLER_PRELOAD_WEBPACK_ENTRY: string;

const isMac = process.platform === "darwin";

let mainWindow: BrowserWindow | null = null;
let nodeInstallerWindow: BrowserWindow | null = null;

export const toggleMainWindowVisibility = (): void => {
  if (!mainWindow) {
    return;
  }

  if (mainWindow.isFocused()) {
    mainWindow.hide();
  } else {
    mainWindow.show();
    mainWindow.focus();
  }
};

export const hideMainWindow = (): void => {
  if (mainWindow) {
    mainWindow.hide();
  }
}

export const createApplicationWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 475,
    width: 750,
    darkTheme: true,
    frame: false,
    vibrancy: isMac ? "ultra-dark" : undefined,
    transparent: isMac,
    resizable: false,
    backgroundColor: "#00000000",
    visualEffectState: "followWindow",
    thickFrame: false,
    minimizable: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.setVisibleOnAllWorkspaces(true);

  // register global shortcut to toggle window
  // Default to command + ; (semi-colon)
  globalShortcut.register("CommandOrControl+;", toggleMainWindowVisibility);

  app.dock?.hide();
};

export const showMainWindow = (): void => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  }
}

export const createNodeInstallerWindow = (): void => {
  nodeInstallerWindow = new BrowserWindow({
    height: 475,
    width: 750,
    darkTheme: true,
    frame: false,
    vibrancy: "ultra-dark",
    transparent: true,
    resizable: false,
    backgroundColor: "#00000000",
    visualEffectState: "followWindow",
    thickFrame: false,
    minimizable: false,
    webPreferences: {
      preload: NODE_INSTALLER_PRELOAD_WEBPACK_ENTRY,
    },
  });

  nodeInstallerWindow.loadURL(NODE_INSTALLER_WEBPACK_ENTRY);

  if (process.env.NODE_ENV === "development") {
    nodeInstallerWindow.webContents.openDevTools();
  }
}

export const closeNodeInstallerWindow = (): void => {
  if (nodeInstallerWindow) {
    nodeInstallerWindow.close();
  }
}

