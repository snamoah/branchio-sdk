'use strict'

const axios = require('axios')
const { required } = require('./utils')

const request = axios.create({
  json: true,
  baseURL: 'https://api.branch.io/v1'
})

const branch = ({ key, appId, secret }) => {
  if (!appId && !key) {
    throw new Error('Initialize branch sdk with either appId or branchKey')
  }

  const credentials = {
    app_id: appId,
    branch_key: key,
    branch_secret: secret
  }

  return {
    async link(linkData) {
      const { data } = await request({
        url: '/url',
        method: 'post',
        data: {
          ...linkData,
          app_id: appId,
          branch_key: key
        }
      })
      return data
    },

    async bulkLinks(linksData) {
      const { data } = await request({
        method: 'post',
        data: linksData,
        url: `url/bulk/${key || appId}`
      })
      return data
    },

    async readLink(deepLink = required('deepLink')) {
      const { data } = await request({
        url: '/url',
        params: {
          url: deepLink,
          app_id: appId,
          branch_key: key
        }
      })
      return data
    },

    async updateLink({
      data = required('data'),
      deepLink = required('deepLink')
    }) {
      const { data: response } = await request({
        url: '/url',
        method: 'put',
        data: {
          ...data,
          ...credentials
        },
        params: {
          url: deepLink
        }
      })

      return response
    },

    async createReferralRule(ruleDetails = {}) {
      const { data: response } = await request({
        url: '/eventresponse',
        method: 'post',
        data: {
          ...ruleDetails,
          ...credentials
        }
      })
      return response
    },

    async redeem({ identity, amount, bucket }) {
      const { data: response } = await request({
        url: '/redeem',
        method: 'post',
        data: {
          amount,
          bucket,
          identity,
          ...credentials
        }
      })

      return response
    },

    async credits({ identity }) {
      const { data: response } = await request({
        url: '/credits',
        method: 'get',
        params: {
          identity,
          ...credentials
        }
      })

      return response
    }
  }
}

module.exports = branch
