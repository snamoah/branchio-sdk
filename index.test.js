'use strict'

const nock = require('nock')
const branch = require('./index')
const { expect, use } = require('chai')
const chaiAsPromised = require('chai-as-promised')

use(chaiAsPromised)

const DEMO_KEY = 'key_live_ihVdjoBF3dvzx77A00XJhnohrAdlIz9i'

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

  describe('bulkLinks()', () => {
    let linksData

    before(() => {
      linksData = [
        {
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
        },
        {
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
      ]

      nock('https://api.branch.io')
        .post(`/v1/url/bulk/${DEMO_KEY}`, linksData)
        .reply(200, [
          { url: 'https:/example.app.link/erTweDt' },
          { url: 'https://example.app.link/xUrsD0P' }
        ])
    })

    it('should return a function', () => {
      expect(client.bulkLinks).to.be.a('Function')
    })

    it('should create a deep link', () => {
      const expectedLinks = [
        { url: 'https:/example.app.link/erTweDt' },
        { url: 'https://example.app.link/xUrsD0P' }
      ]
      return expect(client.bulkLinks(linksData)).to.eventually.eql(expectedLinks)
    })
  })
})
