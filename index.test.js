'use strict'

const nock = require('nock')
const branch = require('./index')
const { expect, use } = require('chai')
const chaiAsPromised = require('chai-as-promised')

use(chaiAsPromised)

const DEMO_KEY = 'key_test_jfOnkcPx2jzFr49QopofGngetqbfVE1w'
const APP_ID = '579211172058779805'

describe('Branch Sdk', () => {
  let client

  before(() => {
    client = branch({ branchKey: DEMO_KEY })
  })

  it('should throw an error if neither appId or branchKey is passed', () => {
    expect(() => branch({})).to.throw('Initialize branch sdk with either appId or branchKey')
  })

  describe('link()', () => {
    let linkData

    before(() => {
      linkData = {
        alias: '',
        stage: 'new user',
        channel: 'facebook',
        feature: 'dashboard',
        campaign: 'content 123',
        tags: [ 'tag1', 'tag2', 'tag3' ],
        data: {
          'custom_bool': true,
          '$og_title': 'Title',
          '$og_description': 'Description',
          '$og_image_url': 'https://lorempixel.com/400/400'
        }
      }

      nock('https://api.branch.io')
        .post('/v1/url', {
          ...linkData,
          branch_key: DEMO_KEY
        })
        .reply(200, { url: 'https://example.app.link/xwIqrtYopcvbNzXc' })
    })

    it('it should return a function', () => {
      expect(client.link).to.be.a('Function')
    })

    it('it should create a deep link', () => {
      return expect(client.link(linkData)).to.eventually.eql({ url: 'https://example.app.link/xwIqrtYopcvbNzXc' })
    })
  })
})
