
export const getEmotionList = function (arr, _this) {
    if (arr.length) {
        let filterArr = arr.filter(ele => {
            return !ele.is_recycle && !ele.is_draft
        })
        _this.emotionList = formatData(JSON.parse(JSON.stringify(filterArr)));
    } else {
        _this.emotionList = []
    }
}

export const formatData = function (arr) {
    arr.forEach(ele => {
        ele.create_time = formatDate(ele.create_time);
    });
    let map = {};
    let dest = [];
    for (let i = 0; i < arr.length; i++) {
        let ele = arr[i];
        if (!map[ele.create_time]) {
            dest.unshift({
                create_time: ele.create_time,
                emotion: [
                    {
                        _id: ele._id,
                        user_id: ele.user_id,
                        user_name: ele.user_name,
                        user_avatar: ele.user_avatar,
                        text: ele.text,
                        html: ele.html,
                        delta: ele.delta
                    }
                ]
            });
            map[ele.create_time] = ele;
        } else {
            for (let j = 0; j < dest.length; j++) {
                let eles = dest[j];
                if (eles.create_time == ele.create_time) {
                    eles.emotion.push({
                        _id: ele._id,
                        user_id: ele.user_id,
                        user_name: ele.user_name,
                        user_avatar: ele.user_avatar,
                        text: ele.text,
                        html: ele.html,
                        delta: ele.delta
                    });
                    break;
                }
            }
        }
    }
    return dest;

    /**
     * format Date
     * */


}

function formatDate(timestamps) {
    var date = new Date(timestamps);
    var Y = date.getFullYear() + "-";
    var M =
        date.getMonth() + 1 < 10
            ? "0" + date.getMonth()
            : date.getMonth() + "-";
    var D = date.getDate();
    return Y + M + D;
}