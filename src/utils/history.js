import { reactive } from "vue";

const MAX_HISTORY_LENGTH = 15;

const historyArray = reactive(JSON.parse(localStorage.getItem('tb_history')) || []);

//push history to local storage
const pushHistory = (history) => {
    historyArray.push(history);
    let temp = [...new Set(historyArray)];
    historyArray.splice(0, historyArray.length)
    historyArray.push(...temp)

    // if history array is greater than MAX_HISTORY_LENGTH, remove the oldest historys
    if (historyArray.length > MAX_HISTORY_LENGTH) {
        historyArray.splice(0, historyArray.length - MAX_HISTORY_LENGTH);
    }

    localStorage.setItem('tb_history', JSON.stringify(historyArray));
}

// remove all history
const removeAllHistory = () => {
    historyArray.splice(0, historyArray.length);
    localStorage.setItem('tb_history', JSON.stringify(historyArray));
}

// remove history by index
const removeHistory = (index) => {
    historyArray.splice(index, 1);
    localStorage.setItem('tb_history', JSON.stringify(historyArray));
}

export { pushHistory, removeAllHistory, removeHistory, historyArray };