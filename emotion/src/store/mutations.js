//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation  传参(state,value)
import * as types from './mutation-types'

const mutations = {

    [types.set_user_info](state, value) {
        state.user_info = value
    },
    [types.set_emotion_list](state, value) {
        state.emotion_list = value
    },
    [types.set_current_emotion](state, value) {
        state.current_emotion = value
    }
    
}

export default mutations
