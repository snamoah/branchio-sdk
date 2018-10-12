'use strict'

const branch = require('./index')
const { expect } = require('chai')

const DEMO_KEY = 'key_test_xe52xcvbbBQpYRjHlkUAcQc'

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
        campaign: 'content 123',
        channel: 'facebook',
        feature: 'dashboard',
        stage: 'new user',
        tags: [ 'tag1', 'tag2', 'tag3' ],
        alias: '',
        data: {
          'custom_bool': true,
          '$og_title': 'Title',
          '$og_description': 'Description',
          '$og_image_url': 'https://lorempixel.com/400/400'
        }
      }
    })

    it('it should return a function', () => {
      expect(client.link).to.be.a('Function')
    })

    it('it should create a deep link', () => {
      return expect(client.link(linkData)).to.eventually.eql({ url: 'https://example.app.link/' })
    })
  })
})
