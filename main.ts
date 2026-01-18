/**
 * // jwc 26-0116-1300 - Removed hold-down scrolling (was causing white page on navigation)
 * 
 * // game.onUpdateInterval(150, function() {
 * 
 * //     if (currentPage == 0) {
 * 
 * //         if (controller.up.isPressed()) {
 * 
 * //             isScrollPaused = 1
 * 
 * //             scrollOffset = Math.max(0, scrollOffset - 1)
 * 
 * //             drawScrollingConsole()
 * 
 * //         }
 * 
 * //         if (controller.down.isPressed()) {
 * 
 * //             isScrollPaused = 1
 * 
 * //             let maxOffset = Math.max(0, consoleLines.length - MAX_CONSOLE_LINES)
 * 
 * //             scrollOffset = Math.min(maxOffset, scrollOffset + 1)
 * 
 * //             drawScrollingConsole()
 */
// Up Button: Scroll up (pause auto-scroll)
// Single press = single scroll (reliable, no page navigation issues)
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentPage == 0) {
        // Pause auto-scrolling
        isScrollPaused = 1
        scrollOffset = Math.max(0, scrollOffset - 1)
        drawScrollingConsole()
    }
})
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
    // Draw title using textsprite
    title3 = textsprite.create("ANIMATED SPRITES", 0, 1)
    title3.setPosition(80, 10)
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
    enemySprite_01 = sprites.create(img`
        . . 8 8 8 . . 
        . 8 8 8 8 8 . 
        8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 
        8 8 8 8 8 8 8 
        . 8 8 8 8 8 . 
        . . 8 8 8 . . 
        `, SpriteKind.Enemy)
    enemySprite_01.setPosition(40, 80)
    // Move left
    enemySprite_01.vx = -25
    // Move up
    enemySprite_01.vy = -15
    enemySprite_01.setFlag(SpriteFlag.BounceOnWall, true)
    // Display info text using textsprite
    info1 = textsprite.create("Sprites bouncing!", 0, 15)
    info1.setPosition(80, 25)
    info2 = textsprite.create("Red & Blue moving", 0, 15)
    info2.setPosition(80, 37)
    // Draw navigation
    nav2 = textsprite.create("A:Next B:Back", 0, 5)
    nav2.setPosition(80, 115)
}
// Demonstrates different text display methods in MakeCode Arcade
// // jwc 26-0116-1300 - Removed animation (mySprite doesn't exist on this page)
// // animation.runImageAnimation(
// //     mySprite,
// //     assets.animation`Shark_Animate`,
// //     500,
// //     false
// // )
function runTextDisplayDemo () {
    // Clear the screen with a blue background
    // Light blue
    scene.setBackgroundColor(8)
    // Draw title using textsprite
    title2 = textsprite.create("TEXT METHODS", 0, 1)
    title2.setPosition(80, 10)
    // Method 1: Text sprites at different positions
    method1 = textsprite.create("1. Text Sprites", 0, 15)
    method1.setPosition(80, 30)
    desc1 = textsprite.create("Positioned text", 0, 6)
    desc1.setPosition(80, 42)
    // Method 2: Colored text (different color codes)
    // Red
    method2 = textsprite.create("2. Colored Text", 0, 2)
    method2.setPosition(80, 60)
    // Green
    desc2 = textsprite.create("Multiple colors", 0, 4)
    desc2.setPosition(80, 72)
    // Instructions
    instructions2 = textsprite.create("Press A for splash", 0, 1)
    instructions2.setPosition(80, 100)
    // Draw navigation
    nav = textsprite.create("B:Back", 0, 5)
    nav.setPosition(80, 115)
}
// Right Button: Resume auto-scrolling
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentPage == 0 && isScrollPaused == 1) {
        // Resume auto-scrolling
        isScrollPaused = 0
        scrollOffset = Math.max(0, consoleLines.length - MAX_CONSOLE_LINES)
        drawScrollingConsole()
    }
})
// Generates a random 5-letter string
// @returns A random 5-letter uppercase string
function generateRandomDriver () {
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let index = 0; index < 5; index++) {
        result = "" + result + letters.charAt(Math.floor(Math.random() * letters.length))
    }
    return result
}
// Adds a new line to the scrolling console
// Keeps up to MAX_HISTORY_LINES (50) for scroll-back
// @param text The text to add to the console
function addConsoleLine (text: string) {
    // Add the new line to the array
    consoleLines.push(text)
    // If we have too many lines, remove the oldest one
    // Keep up to 50 lines for history
    if (consoleLines.length > MAX_HISTORY_LINES) {
        // Remove first element
        consoleLines.shift()
    }
    // If not paused, auto-scroll to show latest lines
    if (isScrollPaused == 0) {
        scrollOffset = Math.max(0, consoleLines.length - MAX_CONSOLE_LINES)
    }
}
// Down Button: Scroll down (pause auto-scroll)
// Single press = single scroll (reliable, no page navigation issues)
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentPage == 0) {
        // Pause auto-scrolling
        isScrollPaused = 1
        maxOffset = Math.max(0, consoleLines.length - MAX_CONSOLE_LINES)
        scrollOffset = Math.min(maxOffset, scrollOffset + 1)
        drawScrollingConsole()
    }
})
// Draws the scrolling console on the screen
// Each line is drawn at a specific Y position based on its index
// Draw instructions at the bottom
function drawScrollingConsole () {
    // Clear old text sprites first to prevent overlapping
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    // Clear the screen with a dark background
    // Dark gray/black
    scene.setBackgroundColor(15)
    // Draw title at the top using arcade-text extension
    title = textsprite.create("SCROLLING CONSOLE", 0, 1)
    title.setPosition(80, 10)
    // Draw each console line based on scroll offset
    // Start at Y position 25 (below the title)
    yPos = 25
    let linesToShow = consoleLines.slice(scrollOffset, scrollOffset + MAX_CONSOLE_LINES)
for (let line of linesToShow) {
        // Yellow text (color 5)
        lineText = textsprite.create(line, 0, 5)
        lineText.setPosition(80, yPos)
        // Move down for next line
        yPos += LINE_HEIGHT
    }
    if (isScrollPaused == 1) {
        navText = "Up/Dn:Scroll Right:Resume"
    } else {
        navText = "Up/Dn:Pause A:Next"
    }
    // Bright green text (color 7)
    instructions = textsprite.create(navText, 0, 7)
    instructions.setPosition(80, 110)
}
// Switches to the specified page and renders it
// @param pageNum The page number to display
function switchToPage (pageNum: number) {
    // Clear the screen completely
    scene.setBackgroundColor(0)
    // Destroy ALL sprites to clean up (including text sprites)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
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
let botId = 0
let instructions: TextSprite = null
let navText = ""
let lineText: TextSprite = null
let yPos = 0
let title: TextSprite = null
let maxOffset = 0
let result = ""
let letters = ""
let nav: TextSprite = null
let instructions2: TextSprite = null
let desc2: TextSprite = null
let method2: TextSprite = null
let desc1: TextSprite = null
let method1: TextSprite = null
let title2: TextSprite = null
let nav2: TextSprite = null
let info2: TextSprite = null
let info1: TextSprite = null
let enemySprite_01: Sprite = null
let mySprite: Sprite = null
let title3: TextSprite = null
let nextPage = 0
let lineCounter = 0
let prevPage = 0
let isScrollPaused = 0
let currentPage = 0
let LINE_HEIGHT = 0
let MAX_HISTORY_LINES = 0
let TOTAL_PAGES = 0
let consoleLines: string[] = []
let MAX_CONSOLE_LINES = 0
let scrollOffset = 0
// Total number of pages
TOTAL_PAGES = 3
// Maximum number of lines to display in the scrolling console
MAX_CONSOLE_LINES = 7
// Maximum history to keep (50 lines)
MAX_HISTORY_LINES = 50
// Line height in pixels for text rendering
LINE_HEIGHT = 12
// Show welcome splash screen
game.splash("Retro Arcade", "Text Demo")
game.splash("Use A and B buttons", "to navigate pages")
// Start on the first page (scrolling console)
switchToPage(0)
// Set up a timer to add new lines every 2 seconds (outside the function)
// This demonstrates the scrolling effect
game.onUpdateInterval(2000, function () {
    // Only add lines if we're on the console page
    if (currentPage == 0) {
        lineCounter += 1
        // // jwc 26-0116-1300 - Original simple line format
        // // addConsoleLine("Line " + lineCounter)
        // New format: "%d | BotId: %d | Student_%d"
        // Random number 11-50
        botId = Math.floor(Math.random() * 40) + 11
        addConsoleLine("" + lineCounter + "|BotId:" + botId + "|Student_" + botId)
        drawScrollingConsole()
    }
})
