# Notesify

Low-quality audio (e.g., 64 kbps): The duration could be longer than the estimated time, perhaps around 50 minutes or more.

Standard quality (e.g., 128 kbps): The estimated time of 26 minutes and 40 seconds is a good reference.

Higher quality (e.g., 192 kbps): The duration could be shorter than the estimated time, perhaps around 15 minutes or less.

# Whisper

Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multi-task model that can perform multilingual speech recognition as well as speech translation and language identification. The Whisper v2-large model is currently available through our API with the whisper-1 model name.

Currently, there is no difference between the open source version of Whisper and the version available through our API. However, through our API, we offer an optimized inference process which makes running Whisper through our API much faster than doing it through other means. For more technical details on Whisper, you can read the paper.

The Audio API provides two speech to text endpoints, transcriptions and translations, based on our state-of-the-art open source large-v2 Whisper model. They can be used to:

Transcribe audio into whatever language the audio is in.
Translate and transcribe the audio into english.
File uploads are currently limited to 25 MB and the following input file types are supported: mp3, mp4, mpeg, mpga, m4a, wav, and webm.

# Translations(Provided by whisper)

The translations API takes as input the audio file in any of the supported languages and transcribes, if necessary, the audio into English. This differs from our /Transcriptions endpoint since the output is not in the original input language and is instead translated to English text.

# TTS

TTS is an AI model that converts text to natural sounding spoken text. We offer two different model variates, tts-1 is optimized for real time text to speech use cases and tts-1-hd is optimized for quality. These models can be used with the Speech endpoint in the Audio API.

MODEL DESCRIPTION
tts-1 Text-to-speech 1New
The latest text to speech model, optimized for speed.
tts-1-hd Text-to-speech 1 HDNew
The latest text to speech model, optimized for quality.

# Streaming real time audio(coming soon...)

The Speech API provides support for real time audio streaming using chunk transfer encoding. This means that the audio is able to be played before the full file has been generated and made accessible.

# API References

https://platform.openai.com/docs/api-reference/audio/createSpeech
