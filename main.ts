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
const TOTAL_PAGES = 3

// Array to store console text lines for the scrolling console
let consoleLines: string[] = []

// Maximum number of lines to display in the scrolling console
const MAX_CONSOLE_LINES = 8

// Line height in pixels for text rendering
const LINE_HEIGHT = 12

// Counter for demo purposes (adds new lines to console)
let lineCounter = 0

// ----------------------------------------------------------------------------
// SCROLLING CONSOLE FUNCTIONS (Page 1)
// ----------------------------------------------------------------------------

/**
 * Adds a new line to the scrolling console
 * If the console is full, the oldest line is removed (scrolling effect)
 * @param text The text to add to the console
 */
function addConsoleLine(text: string) {
    // Add the new line to the array
    consoleLines.push(text)

    // If we have too many lines, remove the oldest one (first element)
    // This creates the scrolling effect
    if (consoleLines.length > MAX_CONSOLE_LINES) {
        consoleLines.shift()  // Remove first element
    }
}

/**
 * Draws the scrolling console on the screen
 * Each line is drawn at a specific Y position based on its index
 */
function drawScrollingConsole() {
    // Clear the screen with a dark background
    scene.setBackgroundColor(15)  // Dark gray/black

    // Draw title at the top using arcade-text extension
    textsprite.create("SCROLLING CONSOLE", 0, 1)

    // Draw each console line
    // Start at Y position 20 (below the title)
    let yPos = 20
    for (let line of consoleLines) {
        let lineText = textsprite.create(line, 0, 15)
        lineText.setPosition(80, yPos)
        yPos += LINE_HEIGHT  // Move down for next line
    }

    // Draw instructions at the bottom
    let instructions = textsprite.create("A:Next B:Prev", 0, 5)
    instructions.setPosition(80, 110)
}

/**
 * Runs the scrolling console demo
 * Automatically adds new lines every 2 seconds
 */
function runScrollingConsole() {
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

    // Set up a timer to add new lines every 2 seconds
    // This demonstrates the scrolling effect
    game.onUpdateInterval(2000, function () {
        // Only add lines if we're on the console page
        if (currentPage == 0) {
            lineCounter += 1
            addConsoleLine("Line " + lineCounter)
            drawScrollingConsole()
        }
    })
}

// ----------------------------------------------------------------------------
// TEXT DISPLAY METHODS DEMO (Page 2)
// ----------------------------------------------------------------------------

/**
 * Demonstrates different text display methods in MakeCode Arcade
 */
function runTextDisplayDemo() {
    // Clear the screen with a blue background
    scene.setBackgroundColor(8)  // Light blue

    // Draw title using textsprite
    let title = textsprite.create("TEXT METHODS", 0, 1)
    title.setPosition(80, 10)

    // Method 1: Text sprites at different positions
    let method1 = textsprite.create("1. Text Sprites", 0, 15)
    method1.setPosition(80, 30)

    let desc1 = textsprite.create("Positioned text", 0, 6)
    desc1.setPosition(80, 42)

    // Method 2: Colored text (different color codes)
    let method2 = textsprite.create("2. Colored Text", 0, 2)  // Red
    method2.setPosition(80, 60)

    let desc2 = textsprite.create("Multiple colors", 0, 4)  // Green
    desc2.setPosition(80, 72)

    // Instructions
    let instructions = textsprite.create("Press A for splash", 0, 1)
    instructions.setPosition(80, 100)

    // Draw navigation
    let nav = textsprite.create("B:Back", 0, 5)
    nav.setPosition(80, 115)
}

// ----------------------------------------------------------------------------
// ANIMATED SPRITES DEMO (Page 3)
// ----------------------------------------------------------------------------

/**
 * Demonstrates animated sprites moving around the screen
 */
function runAnimatedSpritesDemo() {
    // Clear the screen with a green background
    scene.setBackgroundColor(7)  // Green

    // Draw title using textsprite
    let title = textsprite.create("ANIMATED SPRITES", 0, 1)
    title.setPosition(80, 10)

    // Create a sprite with a simple image (a red square)
    let mySprite = sprites.create(img`
        2 2 2 2 2
        2 2 2 2 2
        2 2 2 2 2
        2 2 2 2 2
        2 2 2 2 2
    `, SpriteKind.Player)

    // Position the sprite in the center
    mySprite.setPosition(80, 60)

    // Set velocity to make it move (pixels per frame)
    mySprite.vx = 30  // Move right at 30 pixels/sec
    mySprite.vy = 20  // Move down at 20 pixels/sec

    // Make sprite bounce off walls
    mySprite.setFlag(SpriteFlag.BounceOnWall, true)

    // Create a second sprite (blue circle)
    let sprite2 = sprites.create(img`
        . . 8 8 8 . .
        . 8 8 8 8 8 .
        8 8 8 8 8 8 8
        8 8 8 8 8 8 8
        8 8 8 8 8 8 8
        . 8 8 8 8 8 .
        . . 8 8 8 . .
    `, SpriteKind.Enemy)

    sprite2.setPosition(40, 80)
    sprite2.vx = -25  // Move left
    sprite2.vy = -15  // Move up
    sprite2.setFlag(SpriteFlag.BounceOnWall, true)

    // Display info text using textsprite
    let info1 = textsprite.create("Sprites bouncing!", 0, 15)
    info1.setPosition(80, 25)

    let info2 = textsprite.create("Red & Blue moving", 0, 15)
    info2.setPosition(80, 37)

    // Draw navigation
    let nav = textsprite.create("A:Next B:Back", 0, 5)
    nav.setPosition(80, 115)
}

// ----------------------------------------------------------------------------
// PAGE NAVIGATION
// ----------------------------------------------------------------------------

/**
 * Switches to the specified page and renders it
 * @param pageNum The page number to display
 */
function switchToPage(pageNum: number) {
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

// ----------------------------------------------------------------------------
// BUTTON CONTROLS
// ----------------------------------------------------------------------------

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
        let nextPage = (currentPage + 1) % TOTAL_PAGES
        switchToPage(nextPage)
    }
})

// B Button: Previous page (with wraparound)
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    // Go to previous page (wrap around to last page if at first page)
    let prevPage = (currentPage - 1 + TOTAL_PAGES) % TOTAL_PAGES
    switchToPage(prevPage)
})

// ----------------------------------------------------------------------------
// MAIN PROGRAM START
// ----------------------------------------------------------------------------

// Show welcome splash screen
game.splash("Retro Arcade", "Text Demo")
game.splash("Use A and B buttons", "to navigate pages")

// Start on the first page (scrolling console)
switchToPage(0)
