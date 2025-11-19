from PIL import Image, ImageFont, ImageDraw
import numpy as np

text = "چیز کُد"
font = ImageFont.truetype("Vazirmatn-Bold.ttf", 120)


def style2():
    img = Image.new("L", (900, 250), color=255)
    draw = ImageDraw.Draw(img)
    draw.text((20, 20), text, font=font, fill=0)

    ASCII = "@#&$%*+=-:. "
    pixels = np.array(img)

    ascii_art = "\n".join(
        "".join(ASCII[pixel // 25] for pixel in row) for row in pixels
    )
    print(ascii_art)


style2()
