import keyboard
from PIL import ImageGrab, ImageEnhance
import pygame
import time

def capture_screen():
    screen = ImageGrab.grab()
    return screen

def dim_image(image, dim_factor):
    enhancer = ImageEnhance.Brightness(image)
    return enhancer.enhance(dim_factor)

def smooth_dimming(screen, surface):
    for i in range(10):
        dim_factor = 1 - (i / 10)
        dimmed_image = dim_image(screen, dim_factor)
        mode = dimmed_image.mode
        size = dimmed_image.size
        data = dimmed_image.tobytes()

        pygame_image = pygame.image.fromstring(data, size, mode)
        surface.blit(pygame_image, (0, 0))
        pygame.display.update()
        time.sleep(0.1)

def on_alt_tab(e):
    if e.event_type == 'down' and e.name == 'tab' and keyboard.is_pressed('alt'):
        screen = capture_screen()
        smooth_dimming(screen, screen_surface)

pygame.init()
screen_size = (pygame.display.Info().current_w, pygame.display.Info().current_h)
screen_surface = pygame.display.set_mode(screen_size, pygame.NOFRAME)
pygame.display.set_caption('Alt-Tab Dimming Effect')

keyboard.hook(on_alt_tab)
try:
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
except KeyboardInterrupt:
    pygame.quit()
