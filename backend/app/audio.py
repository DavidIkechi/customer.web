from pathlib import Path
import math
from mutagen.mp3 import MP3
from mutagen.wave import WAVE
from mutagen.flac import FLAC
from mutagen.aac import AAC
from mutagen.mp4 import MP4

def audio_details(filename):
    audio = {}
    file = Path(filename)
    if filename[-3:] == "mp3":
        audio_file = MP3(filename)
    elif filename[-3:] == "wav":
        audio_file = WAVE(filename)
    elif filename[-3:] == "flac":
        audio_file = FLAC(filename)
    elif filename[-3:] == "aac":
        audio_file = AAC(filename)
    elif filename[-3:] == "mp4":
        audio_file = MP4(filename)
    elif filename[-3:] == "m4a":
        audio_file = MP4(filename)
    else:
        raise Exception ("File format not supported")


    audio_info = audio_file.info
    length = int(audio_info.length)
    mins = math.ceil(length / 60)


    audio["size"] = math.ceil(int(file.stat().st_size) / 1048576)
    audio["mins"] = mins
    return audio
