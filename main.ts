/**
 * ----------------------------------------------------------------------------
 * 
 * ANIMATED SPRITES DEMO (Page 3)
 * 
 * ----------------------------------------------------------------------------
 */
/**
 * ----------------------------------------------------------------------------
 * 
 * PAGE NAVIGATION
 * 
 * ----------------------------------------------------------------------------
 */
/**
 * ----------------------------------------------------------------------------
 * 
 * BUTTON CONTROLS
 * 
 * ----------------------------------------------------------------------------
 */
/**
 * ----------------------------------------------------------------------------
 * 
 * MAIN PROGRAM START
 * 
 * ----------------------------------------------------------------------------
 */
/**
 * Array to store console text lines for the scrolling console
 */
// B Button: Previous page (with wraparound)
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    // Go to previous page (wrap around to last page if at first page)
    prevPage = (currentPage - 1 + TOTAL_PAGES) % TOTAL_PAGES
    switchToPage(prevPage)
})
// Runs the scrolling console demo
// Automatically adds new lines every 2 seconds
function runScrollingConsole () {
    // Clear any existing console lines
    consoleLines = []
    lineCounter = 0
    // Add initial welcome messages
    addConsoleLine("Welcome!")
    addConsoleLine("This is a")
    addConsoleLine("scrolling console")
    addConsoleLine("---")
    // Draw the initial console
    drawScrollingConsole()
    game.onUpdateInterval(2000, function () {
        // Only add lines if we're on the console page
        if (currentPage == 0) {
            lineCounter += 1
            addConsoleLine("Line " + lineCounter)
            drawScrollingConsole()
        }
    })
}
// A Button: Next page (with wraparound)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentPage == 1) {
        // On text methods page, show splash demo first
        game.splash("This is game.splash()")
        game.splash("It pauses the game", "and shows dialog boxes")
        // Then go to next page
        switchToPage(2)
    } else {
        // Go to next page (wrap around to 0 if at last page)
        nextPage = (currentPage + 1) % TOTAL_PAGES
        switchToPage(nextPage)
    }
})
// Demonstrates animated sprites moving around the screen
function runAnimatedSpritesDemo () {
    // Clear the screen with a green background
    // Green
    scene.setBackgroundColor(7)
    screen.print("ANIMATED SPRITES", 5, 5, 1, image.font8)
screen.drawLine(0, 15, 160, 15, 1)
    // Create a sprite with a simple image (a red square)
    mySprite = sprites.create(img`
        2 2 2 2 2 
        2 2 2 2 2 
        2 2 2 2 2 
        2 2 2 2 2 
        2 2 2 2 2 
        `, SpriteKind.Player)
    // Position the sprite in the center
    mySprite.setPosition(80, 60)
    // Set velocity to make it move (pixels per frame)
    // Move right at 30 pixels/sec
    mySprite.vx = 30
    // Move down at 20 pixels/sec
    mySprite.vy = 20
    // Make sprite bounce off walls
    mySprite.setFlag(SpriteFlag.BounceOnWall, true)
    // Create a second sprite (blue circle)
    sprite2 = sprites.create(img`
        . . 8 8 8 . . 
        . 8 8 8 8 8 . 
        8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 
        . 8 8 8 8 8 . 
        . . 8 8 8 . . 
        `, SpriteKind.Enemy)
    sprite2.setPosition(40, 80)
    // Move left
    sprite2.vx = -25
    // Move up
    sprite2.vy = -15
    sprite2.setFlag(SpriteFlag.BounceOnWall, true)
    screen.print("Sprites bouncing!", 5, 25, 7, image.font5)
screen.print("Red & Blue moving", 5, 35, 7, image.font5)
screen.print("A:Next B:Back", 5, 115, 5, image.font5)
}
// Demonstrates different text display methods in MakeCode Arcade
function runTextDisplayDemo () {
    // Clear the screen with a blue background
    // Light blue
    scene.setBackgroundColor(8)
    screen.print("TEXT METHODS", 10, 5, 1, image.font8)
screen.drawLine(0, 15, 160, 15, 1)
    screen.print("1. Direct Print", 5, 25, 7, image.font5)
screen.print("   Fixed position", 5, 35, 6, image.font5)
// Red
    screen.print("2. Colored Text", 5, 50, 2, image.font5)
// Green
    screen.print("   Multiple colors", 5, 60, 4, image.font5)
screen.print("3. Graphics", 5, 75, 7, image.font5)
// Draw a green rectangle
    screen.drawRect(5, 85, 30, 10, 4)
    screen.print("Press A for splash", 5, 105, 1, image.font5)
screen.print("B:Back", 5, 115, 5, image.font5)
}
// Adds a new line to the scrolling console
// If the console is full, the oldest line is removed (scrolling effect)
// @param text The text to add to the console
function addConsoleLine (text: string) {
    // Add the new line to the array
    consoleLines.push(text)
    // If we have too many lines, remove the oldest one (first element)
    // This creates the scrolling effect
    if (consoleLines.length > MAX_CONSOLE_LINES) {
        // Remove first element
        consoleLines.shift()
    }
}
// Draws the scrolling console on the screen
// Each line is drawn at a specific Y position based on its index
function drawScrollingConsole () {
    // Clear the screen with a dark background
    // Dark gray/black
    scene.setBackgroundColor(15)
    screen.print("SCROLLING CONSOLE", 5, 5, 1, image.font8)
// Horizontal line separator
    screen.drawLine(0, 15, 160, 15, 1)
    // Draw each console line
    // Start at Y position 20 (below the title)
    yPos = 20
    for (let line of consoleLines) {
        // White text, small font
        screen.print(line, 5, yPos, 7, image.font5)
// Move down for next line
        yPos += LINE_HEIGHT
    }
    screen.print("A:Next B:Prev", 5, 110, 5, image.font5)
}
// Switches to the specified page and renders it
// @param pageNum The page number to display
function switchToPage (pageNum: number) {
    // Clear the screen
    scene.setBackgroundColor(0)
    // Destroy all existing sprites to clean up
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    // Update current page
    currentPage = pageNum
    // Render the appropriate page
    if (currentPage == 0) {
        // Page 0: Scrolling Console
        runScrollingConsole()
    } else if (currentPage == 1) {
        // Page 1: Text Display Methods
        runTextDisplayDemo()
    } else if (currentPage == 2) {
        // Page 2: Animated Sprites
        runAnimatedSpritesDemo()
    }
}
let yPos = 0
let sprite2: Sprite = null
let mySprite: Sprite = null
let nextPage = 0
let consoleLines: string[] = []
let prevPage = 0
let LINE_HEIGHT = 0
let MAX_CONSOLE_LINES = 0
let TOTAL_PAGES = 0
// Counter for demo purposes (adds new lines to console)
let lineCounter = 0
// ============================================================================
// RETRO ARCADE TEXT DEMO
// ============================================================================
// This project demonstrates text display and scrolling console for micro:bit
// Retro Arcade. Navigate between pages using A (next) and B (previous) buttons.
// ============================================================================
// ----------------------------------------------------------------------------
// GLOBAL VARIABLES
// ----------------------------------------------------------------------------
// Current page number (0 = scrolling console, 1 = text display methods, 2 = animated sprites)
let currentPage = 0
// Total number of pages
TOTAL_PAGES = 3
// Maximum number of lines to display in the scrolling console
MAX_CONSOLE_LINES = 8
// Line height in pixels for text rendering
LINE_HEIGHT = 12
// Show welcome splash screen
game.splash("Retro Arcade", "Text Demo")
game.splash("Use A and B buttons", "to navigate pages")
// Start on the first page (scrolling console)
switchToPage(0)
