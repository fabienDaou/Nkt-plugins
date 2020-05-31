# Nkt-plugins
![Deploy Nkt plugins](https://github.com/fabienDaou/Nkt-plugins/workflows/Deploy%20Nkt%20plugins/badge.svg?branch=master)

This a list of plugins compatible with [Nkt chat](https://github.com/qr7hur/nkt).

## Deploying plugins from Github
Develop a new plugin or edit an existing one in a branch and request a merge. 
If it is accepted, the commit on master will trigger some checks and plugins will be automatically deployed to Nkt chat.

## Deploying plugins from Nkt
Use PluginV2 plugin command in Nkt chat to post a request to Azure function (see commit-function folder). It will checkout the repository and commit the changes if they are valid. Then [deploy Github action](#nkt-deployment) will take over to update Nkt chat with the new version of the plugin.


## Nkt deployment
A first github action runs some code analysis on plugins. 
ONLY MODIFIED plugins are copied to the **out** directory using the local module **copyPlugins** in **ci** folder.
This is to prevent redeploying plugins that did not change and thus spamming the chat.