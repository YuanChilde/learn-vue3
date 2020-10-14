import Mock from 'mockjs'

import Test from './test'

Mock.mock(/\/test\/get\//, 'get', Test.getTestData)
