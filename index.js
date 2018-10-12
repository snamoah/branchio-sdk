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
    app_id: appId,
    branch_key: branchKey
  }

  return {
    async link (linkData) {
      try {
       const { data } = await request({
         json: true,
         url: '/url',
         method: 'post',
         data: {
           ...linkData,
           ...credentials,
         }, 
        })
        return data
      } catch (error) {
        throw error
      }
    },

    async bulkLinks (linksData) {
      try {
        const { data } = await request({
          json: true,
          method: 'post',
          data: linksData,
          url: `/url/bulk/${branchKey || appId}`
        })

        console.log('===> data', data)
        return data
      } catch (error) {
        console.log(error.response.data)
        throw error
      }
    }
  }
}

module.exports = branch
