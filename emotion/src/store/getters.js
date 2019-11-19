//获取状态的唯一方法 是  getters  (value)

export const get_user_info = state => {
    return state.user_info;
}

export const get_emotion_list = state => {
    return state.emotion_list
}

export const get_current_emotion = state => {
    return state.current_emotion;
}
