require('dotenv').config()
const fetch = require('node-fetch')

const CHANNEL_ID = process.env.CHANNEL_ID
const SLACK_TOKEN = process.env.SLACK_TOKEN
const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN

const SLACK_BASE_URL = 'https://slack.com/api/channels.setTopic'
const NETLIFY_BASE_URL = 'https://api.netlify.com/api/v1'

const netlifyApi = (endpoint) => `${NETLIFY_BASE_URL}/${endpoint}?access_token=${NETLIFY_TOKEN}`

const SITES = 'a183788d-445a-489e-afc2-0ba97fba1fd9,0aa8341b-e1c8-40ae-97d5-e46a8d920eb1,5f587095-7f5c-4651-bf7b-fb8851293403,2b4a868c-da54-45e8-be82-84b64f60b287'

const payload = {
  token: SLACK_TOKEN,
  channel: CHANNEL_ID,
  topic: 'Set From API'
}

// console.log(payload)

// fetch(netlifyApi('sites'))
//   .then(res => res.json())
//   .then(body => body.forEach(site => {
//   	console.log(site.name)

//   	fetch(netlifyApi(`sites/${site.id}/deploys`))
//   	  .then(res => res.json())
//   	  .then(body => console.log(body[0].state))
//   }));


function getStatus (site) {
	fetch(netlifyApi(`sites/${site}/deploys`))
	  	.then(res => res.json())
	  	.then(body => {
	  		return `${body[0].name.split('ctf-marketing-website-')[1]} ${body[0].state == 'ready' ? ':white_check_mark:' : ':red_circle:'}, `
	  	})
}


SITES.split(',').forEach(site => {
	console.log(getStatus(site))
})



