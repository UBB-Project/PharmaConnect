import asyncio

import httpx
from googletrans import Translator
from sympy import resultant


async def translate_text(text):
    timeout = httpx.Timeout(connect=20.0, read=20.0, write=20.0, pool=20.0)
    client = httpx.AsyncClient(timeout=timeout)
    translator = Translator()
    result = await translator.translate(text, src='ro', dest='en')
    return result.text