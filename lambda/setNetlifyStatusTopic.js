require("dotenv").config();
import fetch from "node-fetch";

exports.handler = function(event, context, callback) {
  // Your Creds
  const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN;
  const SLACK_TOKEN = process.env.SLACK_TOKEN;

  // Slack Channel To Update
  const CHANNEL_ID = process.env.CHANNEL_ID;

  // Parse Netlify Site IDs Into An Array
  const SITES = process.env.NETLIFY_SITES;
  const sitesArray = SITES.split(",");

  // Pass / Fail Emojis
  const ready = process.env.EMOJI_READY || ":white_check_mark:";
  const failed = process.env.EMOJI_FAILED || ":red_circle:";

  // Get the passed Netlify site's latest deploy status
  const getStatus = async site => {
    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${site}/deploys?access_token=${NETLIFY_TOKEN}`
    );
    const body = await response.json();

    return `${body[0].url.split("https://")[1]} ${
      body[0].state == "ready" ? ready : failed
    }`;
  };

  // Get the current topic from your Slack channel
  const getCurrentTopic = async () => {
    const response = await fetch(
      `https://slack.com/api/channels.info?token=${SLACK_TOKEN}&channel=${CHANNEL_ID}`
    );
    const body = await response.json();

    return body.channel.topic.value;
  };

  // Build up the new topic from the array of Netlify sites
  // and their returned statuses
  const buildNewTopic = Promise.all(
    sitesArray.map(site => getStatus(site))
  ).then(arrayOfStatuses => arrayOfStatuses.join(", "));

  // Check to see if the new topic differs from the old one
  // if it does then send the new topic to your slack Channel
  const postTopic = async () => {
    const currentTopic = await getCurrentTopic();
    const newTopic = await buildNewTopic;

    if (newTopic != currentTopic)
      fetch(`https://slack.com/api/channels.setTopic`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SLACK_TOKEN}`,
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          channel: CHANNEL_ID,
          topic: newTopic
        })
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => {
          console.log(err);
          return callback(err);
        });

    return callback(null, {
      statusCode: 200
    });
  };

  // Execute the function
  postTopic();
};
