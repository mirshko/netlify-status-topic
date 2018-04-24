# netlify-status-topic
Set a Slack channel's topic with emojis based on your Netlify sites deploy statuses

## Setup

To set this up you'll need:

- Slack API token (either a `bot` token, or a user with the scopes: `channels:read`, `channels:write`, `post`, `read`)
- Slack Channel ID ([this guide](https://stackoverflow.com/questions/40940327/what-is-the-simplest-way-to-find-a-slack-team-id-and-a-channel-id) shows you how to easily find that)
- [Netlify personal access token](https://app.netlify.com/account/applications/personal)
- A list of the Netlify sites you want to report status on, comma separated, no space. (you can find the Site ID / A.K.A. API ID under *Site information* on the General settings panel of your site)

Follow this pattern or change them to your liking in the source code and set them up in your site's build environmental variables block

```
CHANNEL_ID=
SLACK_TOKEN=
NETLIFY_TOKEN=
NETLIFY_SITES=
```

Now that you have your info the best way to get this into your code-base is to follow Netlify's instructions for using their [Functions](https://www.netlify.com/docs/functions/) feature.

## Running

Once you have your lambda function set up and running with Netlify, the best way to start to use it is to create an outgoing webhook Deploy notification that hits the Netlify provided endpoint for your lambda function in production! Whenever your site deploy fails or succeeds have it hit the lambda function and you have a lovely little topic of your site's status in your Slack Channel of choice!

## Customization

You can customize the `ready` and `failed` state emojis for the topic by adding two new environmental variables to your .env file or your build environmental variables block.

```
EMOJI_READY=:partyparrot:
EMOJI_FAILED=:fire:
```