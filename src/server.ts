import { serverHttp } from "./app"

serverHttp.listen(3000, () => {
    console.log('listening on port 3000')
})