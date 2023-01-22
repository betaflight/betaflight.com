/* eslint-disable */

const https = require('https')
const fs = require('fs')

const githubUsers = [
  'Asizon',
  'blckmn',
  'borisbstyle',
  'chmelevskij',
  'daleckystepan',
  'DieHertz',
  'ctzsnooze',
  'haslinghuis',
  'JyeSmith',
  'KarateBrot',
  'klutvott123',
  'limonspb',
  'McGiverGim',
  'SteveCEvans',
  'sugaarK',
  'wind0r',
]

const filepath = 'src/json/team.json'
const userAgent = 'betaflight.com-gh-action'

function getUserInfo() {
  let userData = []

  githubUsers.forEach((username) => {
    https
      .get(
        {
          host: 'api.github.com',
          path: `/users/${username}`,
          headers: { 'User-Agent': userAgent },
        },
        (res) => {
          let body = ''

          res.on('data', (chunk) => {
            body += chunk
          })

          res.on('end', () => {
            userData.push(JSON.parse(body))
            if (userData.length === githubUsers.length) {
              writeToFile(userData)
            }
          })
        },
      )
      .on('error', (err) => {
        console.log(`Error: ${err.message}`)
      })
  })
}

function writeToFile(data) {
  fs.writeFile(filepath, JSON.stringify(data), (err) => {
    if (err) {
      console.log(`Error writing to file: ${err}`)
    } else {
      console.log('User information saved to file.')
    }
  })
}

getUserInfo()
