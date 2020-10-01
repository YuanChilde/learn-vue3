/**  跟应用全局相关的静态配置放在这里  */
import { message } from "ant-design-vue"

// 防止弹出大量消息
message.config({
  duration: 2,
  maxCount: 1
});

const AppConfig = {
  $message: message
}
export { AppConfig }
