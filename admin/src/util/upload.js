
import axios from "axios";
export function upload(path, userForm) {
  const params = new FormData();
  for (let i in userForm) {
    params.append(i, userForm[i]);
  }

  // 以form表单的格式发送数据
  return axios.post(path, params, {
    headers: {
      "Content-Type":"multipart/form-data"
    }
  }).then(res => res.data)
}