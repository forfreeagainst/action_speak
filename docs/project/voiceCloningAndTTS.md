# 语音克隆和文本转语音

::: details

```md
git clone https://github.com/myshell-ai/OpenVoice
cd OpenVoice
pip install -r requirements.txt

准备音频：将目标音频（如target.wav）放在目录中。

from openvoice import clone_voice, tts

# 克隆声音
voice_embedding = clone_voice("target.wav")

# 用克隆声音合成文本
tts("文章内容.txt", voice_embedding, output="output.wav")
```

:::