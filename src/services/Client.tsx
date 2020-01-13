import axios from 'axios'

class Client {
  static getAxios = () => {
    return axios.create({
      baseURL: 'http://www.mocky.io/v2'
    });
  }
  
  static getUsers = async () => {
    let requestUrl = '/5e0de1893300002b00aa88f3';

    try {
      let result = await Client.getAxios().get(requestUrl);
      return { status: true, data: result.data }
    } catch (error) {
      return { status: false, data: error.response }
    }
  }
}
export {Client}