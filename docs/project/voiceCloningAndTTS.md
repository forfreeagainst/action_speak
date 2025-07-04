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

## 经验

::: details

### Python解释器版本不对

```md

OpenVoice 可能推荐 Python 3.8 或 3.9，但 numpy==1.22.0 可能只支持特定子版本。

建议：降级到 Python 3.8 或使用 OpenVoice 官方推荐的 Python 版本
```

### pip版本不对

```md
pip 25.1 是最新版本，可能和某些旧包不兼容。

解决方法：降级 pip 到较稳定的版本（如 pip 22.x）：

pip install pip==22.3.1

### 点击链接，找不到checkpoints包

* 从github 讨论的地方去查找
* 提issue

```

:::

## 通过控制面板卸载python版本

::: details

```md
Win + R → 输入 appwiz.cpl → 回车，打开 程序和功能。

找到 Python 3.9.9（或你的当前版本），右键 卸载。

确保所有相关的 Python 条目都被删除（如 Python Launcher）
```

:::