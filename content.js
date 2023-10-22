window.addEventListener("load", mainWrapper, false);

let board = null;
let lists = null;
let boardHeaderBtns = null;
let interval = null;
let state = {};
const PREFIX = "treview_";
const TOGGLE_PREFIX = PREFIX + "btn_";
const ALL_KEY = PREFIX + "all";
const SHOW = "show";
const HIDE = "hide";

function mainWrapper() {
    interval = setInterval(main, 1000);
}

function main() {
    lists = document.querySelectorAll('[data-testid="list-wrapper"]');
    boardHeaderBtns = document.querySelector(".board-header-btns");
    if (lists == null || boardHeaderBtns == null) return;

    clearInterval(interval);
    headerBtn.onclick = toggleAll;
    boardHeaderBtns.insertBefore(headerBtn, boardHeaderBtns.children[0]);

    const listHeaders = document.querySelectorAll('[data-testid="list-header"]');
    const listKeys = [ALL_KEY];

    for (let i = 0; i < lists.length; i++) {
        const list = lists[i];
        const listId = list.dataset.listId;
        listKeys.push(PREFIX + listId);
        state[PREFIX + listId] = SHOW;
        const header = listHeaders[i];
        const listBtn = createListBtn();
        listBtn.dataset.listId = TOGGLE_PREFIX + listId;
        listBtn.onclick = toggleList;
        header.insertBefore(listBtn, header.children[1]);
    }

    chrome.storage.local.get(listKeys).then((res) => {
        state = { ...state, ...res };
        const allState = res[ALL_KEY];
        delete res[ALL_KEY];
        if (allState === HIDE) {
            headerBtn.innerHTML = hideAllSvg;
            hideLists();
        } else {
            headerBtn.innerHTML = showAllSvg;
            showLists();
        }


        for (const key in res) {
            const value = res[key];
            if (value === HIDE) {
                const listId = key.substring(PREFIX.length);
                markHidden(listId);
            }
        }
    })
}

function toggleAll() {
    const currState = state[ALL_KEY] ?? SHOW;
    console.log(currState);

    if (currState === SHOW) {
        this.innerHTML = showAllSvg;
        state[ALL_KEY] = HIDE;
        hideLists(true);
    } else if (currState === HIDE) {
        this.innerHTML = hideAllSvg;
        state[ALL_KEY] = SHOW;
        showLists(true);
    } else {
        console.log(`[Treview] Invalid State on ALL`);
    }
}

function hideLists(update = false) {
    for (const key in state) {
        if (key === ALL_KEY) continue;
        const listId = key.substring(PREFIX.length);
        const listBtn = document.querySelector(`[data-list-id="${TOGGLE_PREFIX + listId}"]`);
        listBtn && (listBtn.style.display = "none");

        const value = state[key];
        if (value === HIDE) {
            const list = document.querySelector(`[data-list-id="${listId}"]`);
            list && (list.style.display = "none");
        }
    }

    if (update) {
        chrome.storage.local.set({ [ALL_KEY]: HIDE }).then(() => {
            console.log(`[Treview] Set all to hide`);
        })
    }
}

function showLists(update = false) {
    for (const key in state) {
        if (key === ALL_KEY) continue;
        const listId = key.substring(PREFIX.length);
        const listBtn = document.querySelector(`[data-list-id="${TOGGLE_PREFIX + listId}"]`);
        listBtn && (listBtn.style.display = "flex");

        const value = state[key];
        if (value === HIDE) {
            const list = document.querySelector(`[data-list-id="${listId}"]`);
            console.log(listId, list);
            list && (list.style.display = "block");
        }
    }

    if (update) {
        chrome.storage.local.set({ [ALL_KEY]: SHOW }).then(() => {
            console.log(`[Treview] Set all to show`);
        })
    }
}

function toggleList() {
    const listId = this.dataset.listId.substring(TOGGLE_PREFIX.length);
    const currState = state[PREFIX + listId] ?? SHOW;

    if (currState === SHOW) {
        markHidden(listId, true);
    } else if (currState === HIDE) {
        markVisible(listId, true);
    } else {
        console.log(`[Treview] Invalid State. List Id: ${listId}`);
    }
}

function markHidden(listId, update = false) {
    const list = document.querySelector(`[data-list-id="${listId}"]`);
    const toggle = list.querySelector(`[data-list-id="${TOGGLE_PREFIX + listId}"]`);
    toggle.innerHTML = showListSvg;
    state[PREFIX + listId] = HIDE;
    list.style.filter = "brightness(0.5)";
    list.style.transition = "filter 85ms ease";

    if (update) {
        const key = PREFIX + listId;
        chrome.storage.local.set({ [key]: HIDE }).then(() => {
            console.log(`[Treview] Set ${listId} to hide`);
        })
    }
}

function markVisible(listId, update = false) {
    const list = document.querySelector(`[data-list-id="${listId}"]`);
    const toggle = list.querySelector(`[data-list-id="${TOGGLE_PREFIX + listId}"]`);
    toggle.innerHTML = hideListSvg;
    state[PREFIX + listId] = SHOW;
    list.style.filter = "brightness(1)";
    delete list.style.transition;
    list.onmouseenter = () => { }
    list.onmouseleave = () => { }

    if (update) {
        const key = PREFIX + listId;
        chrome.storage.local.set({ [key]: SHOW }).then(() => {
            console.log(`[Treview] Set ${listId} to show`);
        })
    }
}

