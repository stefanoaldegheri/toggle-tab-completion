import {
  window,
  workspace,
  ExtensionContext,
  StatusBarAlignment,
  StatusBarItem,
  ThemeColor,
  ConfigurationTarget,
  commands
} from 'vscode';

let statusBarItem: StatusBarItem;
// The refactored command ID from package.json
const commandId = 'toggle-tab-completion.toggle';

function updateUI() {
  if (!statusBarItem) { return; }
  const config = workspace.getConfiguration('editor');
  const tabCompletionState = config.get('tabCompletion');
  const inlineSuggestState = config.get('inlineSuggest.enabled');

  const isEffectivelyEnabled = tabCompletionState !== 'off' && inlineSuggestState === true;

  if (isEffectivelyEnabled) {
    statusBarItem.text = `$(check) All Completions`;
    statusBarItem.color = new ThemeColor('statusBar.foreground'); // Use default color for "on"
    statusBarItem.tooltip = 'Completions are ON. Click or use shortcut (Default: Ctrl+`) to disable.';
  } else {
    statusBarItem.text = `$(x) All Completions`;
    statusBarItem.color = new ThemeColor('statusBarItem.errorForeground'); // Use error color for "off"
    statusBarItem.tooltip = 'Completions are OFF. Click or use shortcut (Default: Ctrl+`) to enable.';
  }
}

export function activate(context: ExtensionContext) {
  const toggleCommandHandler = async () => {
  const config = workspace.getConfiguration('editor');
  const currentTabState = config.get('tabCompletion');
  const currentInlineState = config.get('inlineSuggest.enabled');
  
  const isCurrentlyOn = currentTabState !== 'off' && currentInlineState === true;
  
  const newTabState = isCurrentlyOn ? 'off' : 'on';
  const newInlineState = isCurrentlyOn ? false : true;

  const updatePromises: Promise<void>[] = [];
  let updatedWorkspace = false;

  updatePromises.push(Promise.resolve(config.update('tabCompletion', newTabState, ConfigurationTarget.Global)));
  updatePromises.push(Promise.resolve(config.update('inlineSuggest.enabled', newInlineState, ConfigurationTarget.Global)));

  const tabDetails = config.inspect('tabCompletion');
  if (tabDetails?.workspaceValue !== undefined) {
    updatePromises.push(Promise.resolve(config.update('tabCompletion', newTabState, ConfigurationTarget.Workspace)));
    updatedWorkspace = true;
  }

  const inlineDetails = config.inspect('inlineSuggest.enabled');
  if (inlineDetails?.workspaceValue !== undefined) {
    updatePromises.push(Promise.resolve(config.update('inlineSuggest.enabled', newInlineState, ConfigurationTarget.Workspace)));
    updatedWorkspace = true;
  }

  try {
    await Promise.all(updatePromises);
    const scopeMessage = updatedWorkspace ? '(Global & Workspace)' : '(Global)';
    const stateMessage = newTabState === 'on' ? 'ON' : 'OFF'; // Use the new state for the message
    window.showInformationMessage(`All completions are now ${stateMessage} ${scopeMessage}.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    window.showErrorMessage(`Failed to update settings: ${message}`);
  }
};

  context.subscriptions.push(commands.registerCommand(commandId, toggleCommandHandler));
  
  statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 100);
  statusBarItem.command = commandId;
  context.subscriptions.push(statusBarItem);
  statusBarItem.show();

  context.subscriptions.push(workspace.onDidChangeConfiguration(event => {
    if (
      event.affectsConfiguration('editor.tabCompletion') || 
      event.affectsConfiguration('editor.inlineSuggest.enabled')
    ) {
      updateUI();
    }
  }));

  updateUI();
}

export function deactivate() {}