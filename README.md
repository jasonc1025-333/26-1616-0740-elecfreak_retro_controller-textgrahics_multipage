 # Retro Arcade Text & Graphics Demo

A MakeCode Arcade project demonstrating text display, scrolling console, and animated sprites for the **micro:bit Retro Arcade** expansion board.

## 🎮 Features

### Page 0: Scrolling Console
- Custom scrolling text display that shows multiple lines (8 lines visible)
- New text appears at the bottom and old text scrolls up automatically
- Simulates a console-like interface on the game screen
- Automatically adds new lines every 2 seconds for demonstration

### Page 1: Text Display Methods
- Demonstrates different ways to display text in MakeCode Arcade
- Shows `game.splash()` for dialog boxes (press A to see)
- Displays colored text at fixed positions (red, green, white)
- Shows graphics drawing with rectangles

### Page 2: Animated Sprites ⭐ NEW!
- **Red square sprite** that bounces around the screen
- **Blue circle sprite** moving in opposite direction
- Both sprites have velocity (vx, vy) for automatic movement
- Sprites bounce off walls using `SpriteFlag.BounceOnWall`
- Demonstrates sprite creation, positioning, and animation

## 🕹️ Controls

- **A Button**: Navigate to next page (wraps around: 0→1→2→0)
- **B Button**: Navigate to previous page (wraps around: 0→2→1→0)
- On Page 1, pressing A shows splash dialog demo before advancing

## 📦 How to Import into MakeCode Arcade

### Method 1: Copy and Paste Code (Recommended)

1. Go to [https://arcade.makecode.com](https://arcade.makecode.com)
2. Create a **New Project**
3. Switch to **JavaScript** view (toggle at top)
4. Delete all existing code
5. Copy the entire contents of `main.ts` from this project
6. Paste it into the editor
7. Switch back to **Blocks** view to see the visual blocks!

### Method 2: Import URL (If you have this on GitHub)

1. Push this project to a GitHub repository
2. Go to [https://arcade.makecode.com](https://arcade.makecode.com)
3. Click **"Import"**
4. Click **"Import URL"**
5. Paste your GitHub repository URL
6. Click **"Go ahead!"**

## 🔧 Code Structure Explained

### Global Variables
- `currentPage`: Tracks which page is currently displayed (0, 1, or 2)
- `TOTAL_PAGES`: Total number of pages (3)
- `consoleLines`: Array storing all text lines for the scrolling console
- `MAX_CONSOLE_LINES`: Maximum number of lines shown (8 lines)
- `LINE_HEIGHT`: Pixel spacing between lines (12 pixels)
- `lineCounter`: Counter for generating demo text

### Key Functions

#### `addConsoleLine(text: string)`
Adds a new line to the scrolling console. When the console reaches maximum capacity, it removes the oldest line (creating the scroll effect).

#### `drawScrollingConsole()`
Renders the scrolling console on screen:
- Draws title and separator line
- Displays all console lines with proper spacing
- Shows navigation instructions

#### `runScrollingConsole()`
Initializes and runs the scrolling console demo:
- Clears previous console data
- Adds welcome messages
- Sets up automatic line generation every 2 seconds

#### `runTextDisplayDemo()`
Demonstrates various text display methods:
- Direct screen printing at fixed positions
- Colored text rendering
- Graphics drawing with shapes

#### `runAnimatedSpritesDemo()`
Creates and animates sprites on screen:
- Creates two sprites (red square and blue circle)
- Sets velocity for automatic movement
- Enables bouncing off walls
- Demonstrates sprite physics

#### `switchToPage(pageNum: number)`
Handles page navigation:
- Clears the screen and destroys old sprites
- Updates current page number
- Renders the appropriate page content

### Button Event Handlers
- **A Button**: Advances to next page with wraparound (0→1→2→0)
- **B Button**: Goes to previous page with wraparound (0→2→1→0)

## 🎨 Customization Ideas

You can modify this project to:
- Change the number of console lines (`MAX_CONSOLE_LINES`)
- Adjust line spacing (`LINE_HEIGHT`)
- Add more pages with different demos
- Change colors (color codes: 0-15)
- Modify the auto-scroll timing (currently 2000ms = 2 seconds)
- Add more text display methods
- Create interactive text-based games

## 📱 Hardware Requirements

- **micro:bit V2** (or compatible board)
- **Elecfreak Retro Arcade** expansion board with TFT display
- The display resolution is **160x128 pixels**

## 🎓 Learning Points

This project teaches:
1. **Array manipulation** - Using push() and shift() for scrolling effect
2. **Screen rendering** - Drawing text at specific coordinates
3. **Event handling** - Responding to button presses
4. **State management** - Tracking current page and switching views
5. **Timers** - Using game.onUpdateInterval() for periodic updates
6. **Sprite creation** - Creating sprites with custom images
7. **Sprite physics** - Setting velocity and bounce behavior
8. **Page navigation** - Implementing wraparound navigation with modulo operator

## 📝 Notes

- The code is heavily commented to explain each section
- All text rendering uses MakeCode Arcade's built-in functions
- The scrolling console manually manages text positioning (MakeCode doesn't have built-in scrolling text)
- Colors are specified using palette indices (0-15)
- Font options: `image.font5` (small) and `image.font8` (larger)

## 🚀 Next Steps

After importing:
1. Test in the **simulator** to see how it works
2. Switch to **Blocks** view to see the visual representation
3. Download to your **micro:bit Retro Arcade** device
4. Experiment with modifying the code
5. Create your own text-based programs!

---

**Enjoy coding for your Retro Arcade! 🎮✨**



> Open this page at [https://jasonc1025-333.github.io/26-1616-0740-elecfreak_retro_controller-textgrahics_multipage/](https://jasonc1025-333.github.io/26-1616-0740-elecfreak_retro_controller-textgrahics_multipage/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/jasonc1025-333/26-1616-0740-elecfreak_retro_controller-textgrahics_multipage** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/jasonc1025-333/26-1616-0740-elecfreak_retro_controller-textgrahics_multipage** and click import

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
