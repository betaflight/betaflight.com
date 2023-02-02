import https from 'https';
import fs from 'fs';
import git from 'simple-git';

function Sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const g = git();

const githubUsers = [
  'Asizon',
  'blckmn',
  'borisbstyle',
  'chmelevskij',
  'ctzsnooze',
  'daleckystepan',
  'DieHertz',
  'freasy',
  'haslinghuis',
  'JyeSmith',
  'KarateBrot',
  'klutvott123',
  'limonspb',
  'McGiverGim',
  'nerdCopter',
  'SteveCEvans',
  'sugaarK',
  'SupaflyFPV',
  'VitroidFPV',
  'wind0r',
]

const filepath = 'src/json/team.json'
const userAgent = 'betaflight.com-gh-action'

function getUserInfo() {
  let userData = []

  return githubUsers.forEach((username) => {
    return https
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

while (!(await g.status()).modified.includes(filepath)) {
  await Sleep(200);
  continue;
}

g.add(filepath);
