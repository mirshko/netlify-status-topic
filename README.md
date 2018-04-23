# netlify-slack-topic
Set a Slack channel's topic with emojis based on your Netlify sites deploy statuses

## How to use

So you *could* run this on AWS Lambda on its own on a schedule, or you could go fancy schmancy and add this to your [Netlify project as a lambda function](https://www.netlify.com/docs/functions/) and set up a build status notification to post to the lambda function endpoint on your site and run this if something happens.