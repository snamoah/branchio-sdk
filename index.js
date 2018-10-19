'use strict'

const axios = require('axios')
const { required } = require('./utils')

const request = axios.create({
  json: true,
  baseURL: 'https://api.branch.io/v1/url'
})

const branch = ({
  appId,
  branchKey
}) => {

  if (!appId && !branchKey) {
    throw new Error('Initialize branch sdk with either appId or branchKey')
  }

  const credentials = {
    app_id: appId,
    branch_key: branchKey
  }

  return {
    async link (linkData) {
      const { data } = await request({
        method: 'post',
        data: {
          ...linkData,
          ...credentials,
        }, 
      })
      return data
    },

    async bulkLinks (linksData) {
      const { data } = await request({
        method: 'post',
        data: linksData,
        url: `/bulk/${branchKey || appId}`
      })
      return data
    },

    async readLink (deepLink = required('deepLink')) {
      const { data } = await request({
        params: { 
          url: deepLink,
          ...credentials
        }
      })
      return data
    }
  }
}

module.exports = branch
