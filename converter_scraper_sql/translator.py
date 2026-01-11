import asyncio
from googletrans import Translator
from sympy import resultant


async def translate_text(text):
    translator = Translator()
    result = await translator.translate(text, src='ro', dest='en')
    return result.text