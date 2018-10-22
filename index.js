'use strict'

const axios = require('axios')
const { required } = require('./utils')

const request = axios.create({
  json: true,
  baseURL: 'https://api.branch.io/v1/url'
})

const branch = ({
  key,
  appId,
  secret
}) => {

  if (!appId && !key) {
    throw new Error('Initialize branch sdk with either appId or branchKey')
  }

  const credentials = {
    app_id: appId,
    branch_key: key,
    branch_secret: secret
  }

  return {
    async link (linkData) {
      const { data } = await request({
        method: 'post',
        data: {
          ...linkData,
          app_id: appId,
          branch_key: key
        }, 
      })
      return data
    },

    async bulkLinks (linksData) {
      const { data } = await request({
        method: 'post',
        data: linksData,
        url: `/bulk/${key || appId}`
      })
      return data
    },

    async readLink (deepLink = required('deepLink')) {
      const { data } = await request({
        params: { 
          url: deepLink,
          app_id: appId,
          branch_key: key
        }
      })
      return data
    },

    async updateLink ({ 
      data = required('data'),
      deepLink = required('deepLink')
    }) {
      const { data: response } = await request({
        method: 'put',
        data: {
          ...data,
          ...credentials
        },
        params: {
          url: deepLink
        },
      })

      return response
    }
  }
}

module.exports = branch
