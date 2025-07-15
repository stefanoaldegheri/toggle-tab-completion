# Toggle Tab Completion

A simple but powerful VS Code extension to quickly enable or disable all code completions—both standard tab completions and "ghost text" inline suggestions— for GitHub Copilot with a single command.

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=StefanoAldegheri.toggle-tab-completion">
    <img src="https://img.shields.io/visual-studio-marketplace/v/StefanoAldegheri.toggle-tab-completion.svg?color=blue&label=Marketplace" alt="Visual Studio Marketplace Version">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=StefanoAldegheri.toggle-tab-completion">
    <img src="https://img.shields.io/visual-studio-marketplace/i/StefanoAldegheri.toggle-tab-completion.svg?color=green" alt="Visual Studio Marketplace Installs">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=StefanoAldegheri.toggle-tab-completion">
    <img src="https://img.shields.io/visual-studio-marketplace/r/StefanoAldegheri.toggle-tab-completion.svg?color=yellow" alt="Visual Studio Marketplace Rating">
  </a>
</p>

## Overview

Modern code editors and AI assistants provide amazing autocompletion features. However, sometimes you need to focus or prevent suggestions from appearing. Manually toggling two separate settings (`editor.tabCompletion` and `editor.inlineSuggest.enabled`) is tedious. This extension solves that by binding both settings to a single, convenient status bar button and hotkey.

## Features

-   **One-Click Status Bar Toggle**: A clear icon in your status bar shows you if completions are active (`✔`) or inactive (`✘`). Just click it to toggle.
-   **Synchronized Settings**: Instantly enables or disables both standard Tab Completion and Ghost Text (inline suggestions) together.
-   **Smart Scope Detection**: The extension intelligently updates your settings at the Global level and, if a Workspace setting already exists, at the Workspace level.
-   **Customizable Hotkey**: Comes with a convenient default hotkey (`Ctrl+q Ctrl+tab`), which can be easily changed in VS Code's Keyboard Shortcuts editor.

## Installation

1.  Launch Visual Studio Code.
2.  Go to the **Extensions** view (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3.  Search for **Toggle Completion**.
4.  Click **Install**.

## Usage

Once installed, you can toggle completions in two ways:

1.  **Status Bar**: Click the **`✔ All Completions`** or **`✘ All Completions`** text in the status bar (usually in the bottom-right corner).
2.  **Command Palette**: Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`), search for **"Toggle All Completions"**, and press Enter.
3.  **Keyboard Shortcut**: Use the default hotkey `Ctrl+q Ctrl+tab` (or `Cmd+q Cmd+tab` on macOS).

### Customizing the Hotkey

You can change the default keyboard shortcut by going to **File > Preferences > Keyboard Shortcuts** (or `Ctrl+K Ctrl+S`) and searching for the command `toggle-tab-completion.toggle`.

## Extension Settings

This extension does not add its own unique settings. Instead, it modifies the following built-in VS Code settings:

-   `editor.tabCompletion` (values: "on" or "off")
-   `editor.inlineSuggest.enabled` (values: true or false)

## Release Notes

For detailed release notes, please see the [CHANGELOG.md](CHANGELOG.md) file.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.