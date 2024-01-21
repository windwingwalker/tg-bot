# Telegram Bot

![license-badge](https://img.shields.io/github/license/windwingwalker/tg-bot)
![release-badge](https://img.shields.io/github/v/release/windwingwalker/tg-bot?display_name=tag)

## Background

This is a Telegram bot for my personal use. It can:

- Receive csv files and store them in Amazon S3.
- Receive markdown files, phrase them into JSON format and store them in Amazon DynamoDB.
- Santa role distribution for Chrismas present exchange game. 

## Misc

There are two type of version: application version and infrastructure version

- Application version = Repository release tag = package.json version = Docker image version
- Infrastructure version = Helm chart version

## Architecture

![architecture-diagram](architecture.png)

## Tech stack

- Runtime:
  - Language: ![typescript-badge](https://img.shields.io/badge/-TypeScript-grey?style=flat&logo=typescript)
  - Framework: ![nodejs-badge](https://img.shields.io/badge/-Node.js-grey?style=flat&logo=nodedotjs)
- Hosting: Local ![k8s-badge](https://img.shields.io/badge/-Kubernetes-grey?style=flat&logo=kubernetes) cluster
- DevOps: ![docker-badge](https://img.shields.io/badge/-Docker-grey?style=flat&logo=docker)
- Unit test:
  - ![mocha-badge](https://img.shields.io/badge/-Mocha-grey?style=flat&logo=mocha)
  - ![chai-badge](https://img.shields.io/badge/-Chai-grey?style=flat&logo=chai)
- Package managers:
  - For Kubernetes: ![helm-badge](https://img.shields.io/badge/-Helm-grey?style=flat&logo=helm)
  - For JavaScript: ![npm-badge](https://img.shields.io/badge/-Npm-grey?style=flat&logo=npm)
- Process manager (optinal): ![pm2-badge](https://img.shields.io/badge/-PM2-grey?style=flat&logo=pm2)

## Get started

If you want to:

- Run program in development mode: `npm run dev`
- (Optional) Compile TS code into JS and store *.js in `dist/`: `npm run build`
- Run program in production mode: `npm run prod`
  - If you execute`npm run prod` directly through terminal, the program will be tighted to the terminal session, i.e. if you close your terminal, the program will stop
  - To solve this, you need a process manager like PM2, do the following:
    - `npm install pm2 -g`
    - `pm2 start npm --name "tg-bot" -- run prod`, such that "tg-bot" is the name specified in `package.json`

## References

- https://simpleicons.org/
- https://shields.io/

### Beginner Guide

- [Supported Message Type](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/273e685e53e543a74750a00403a1fc337787d6ce/types/node-telegram-bot-api/index.d.ts#L43-L69)
- [Existing Bots](https://influencermarketinghub.com/top-telegram-bots/)
- [Telegram Bot (1) 懶得自己做的事就交給機器人吧](https://z3388638.medium.com/telegram-bot-1-%E6%87%B6%E5%BE%97%E8%87%AA%E5%B7%B1%E5%81%9A%E7%9A%84%E4%BA%8B%E5%B0%B1%E4%BA%A4%E7%B5%A6%E6%A9%9F%E5%99%A8%E4%BA%BA%E5%90%A7-c59004dc6c7b)
- [Telegram Bot API](https://core.telegram.org/bots/api#available-methods)
- [從零開始的 Telegram Bot | Sean's Note](https://blog.sean.taipei/2017/05/telegram-bot)
- [[TG 機器人] Group Help Bot 歡迎詞設定!準備好這些東西,5分鐘搞定它](https://mobilefoto.info/2020/02/23/2184/)
- [[ChatOps] 簡單介紹如何開發一個 Telegram Bot](https://godleon.github.io/blog/ChatOps/howto-develop-telegram-chatbot/)
- https://zaoldyeck.medium.com/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E6%80%8E%E9%BA%BC%E6%89%93%E9%80%A0-telegram-bot-a7b539c3402a
- [Telegram Bot (1) 懶得自己做的事就交給機器人吧](https://z3388638.medium.com/telegram-bot-1-%E6%87%B6%E5%BE%97%E8%87%AA%E5%B7%B1%E5%81%9A%E7%9A%84%E4%BA%8B%E5%B0%B1%E4%BA%A4%E7%B5%A6%E6%A9%9F%E5%99%A8%E4%BA%BA%E5%90%A7-c59004dc6c7b)
- [（一）一步步打造 Telegram Bot](https://zaoldyeck.medium.com/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E6%80%8E%E9%BA%BC%E6%89%93%E9%80%A0-telegram-bot-a7b539c3402a)

### Telegraf Wizard and Sence

- [Wizard and Scene examples endorsed officially](https://github.com/telegraf/telegraf/issues/705)
- [High Quality example and explanation](https://dev.to/maklut/telegraf-vs-node-telegram-bot-api-36fk)
- https://github.com/feathers-studio/telegraf-docs/blob/4feffcd893a86ed1fcc761279d17328beb4a2f21/examples/wizards/wizard.ts
- https://github.com/telegraf/telegraf/issues/1319