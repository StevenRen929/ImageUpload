//封装axios
import axios from 'axios';
//80 端口 webserver
// // 这段代码创建了一个 Axios 实例。使用 axios.create 方法可以创建一个自定义配置的 Axios 实例，其中：

// baseURL 是你请求的基础 URL。在这里，所有使用这个实例发出的请求都会以 http://localhost:80 作为基础路径。
//80 端口是webserver
const instance = axios.create({baseURL:'http://localhost:80'});

// 这行代码设置了默认的 HTTP 头部，Content-Type 设置为 multipart/form-data。这表明请求的主体内容是表单数据（通常用于文件上传）。不过，需要注意的是，
// 当你使用 FormData 对象时，Axios 会自动处理这个头部，所以通常不需要手动设置。
instance.defaults.headers.common["Content-Type"] = "multipart/form-data";
export default instance;

// //封装axios
// import axios from 'axios';

// const instance = axios.create({ baseURL: 'http://localhost:80' });

// export default instance;