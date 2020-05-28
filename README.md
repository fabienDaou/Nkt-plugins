# Nkt-plugins
![Check Nkt-plugins](https://github.com/fabienDaou/Nkt-plugins/workflows/Check%20Nkt-plugins/badge.svg?branch=master)

This a list of plugins compatible with [Nkt chat](https://github.com/qr7hur/nkt).

Develop a new plugin or edit an existing one in a branch and request a merge. 
If it is accepted, the commit on master will trigger some checks and plugins will be automatically deployed to Nkt chat.

## How does the deployment work?
A first github action runs some code analysis on plugins. 
ONLY MODIFIED plugins are copied to the **out** directory using the local module **copyPlugins** in **ci** folder.
This is to prevent redeploying plugins that did not change and thus spamming the chat.