'use strict'

const axios = require('axios')

const request = axios.create({
  baseURL: 'https://api.branch.io/v1'
})

const branch = ({
  appId,
  branchKey
}) => {

  if (!appId && !branchKey) {
    throw new Error('Initialize branch sdk with either appId or branchKey')
  }

  const credentials = {
    api_id: appId,
    branch_key: branchKey
  }

  return {
    link (linkData) {
      return request({
        url: '/url',
        method: 'post',
        body: {
          ...credentials,
          ...linkData,
        }
      })
    },
  }
}

module.exports = branch
