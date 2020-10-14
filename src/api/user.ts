import Axios from '@/libs/axios'

const BASE_URL = '/api/test'

class UserService {
  static getTest(username: string, data: any) {
    //${username}
    return Axios.get(`${BASE_URL}/test/`, {
      message: { show: true }
    })
  }
}
export default UserService
