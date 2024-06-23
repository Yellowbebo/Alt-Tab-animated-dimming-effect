import keyboard
from PIL import Image, ImageEnhance
import time

def capture_screen():
    screen = Image.grab()
    return screen

def dim_image(image, dim_factor):
    enhancer = ImageEnhance.Brightness(image)
    return enhancer.enhance(dim_factor)

def smooth_dimming(image):
    for i in range(10):
        dim_factor = 1 - (i / 10)
        dimmed_image = dim_image(image, dim_factor)
        dimmed_image.show()
        time.sleep(0.1)

def on_alt_tab(e):
    if e.event_type == 'down' and e.name == 'tab' and keyboard.is_pressed('alt'):
        screen = capture_screen()
        smooth_dimming(screen)

keyboard.hook(on_alt_tab)
keyboard.wait('esc')
