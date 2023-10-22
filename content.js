window.addEventListener("load", mainWrapper, false);

const PREFIX = "treview_";
const TOGGLE_PREFIX = PREFIX + "btn_";
const SHOW = "show";
const HIDE = "hide";

let board = null;
let lists = null;
let boardHeaderBtns = null;
let interval = null;
let state = {};
let boardKey = PREFIX + "all";

function mainWrapper() {
    interval = setInterval(main, 100);
}

function main() {
    lists = document.querySelectorAll('[data-testid="list-wrapper"]');
    boardHeaderBtns = document.querySelector(".board-header-btns");
    if (lists == null || boardHeaderBtns == null) return;

    clearInterval(interval);

    // Update UI to Match Theme
    const boardName = document.querySelector('[data-testid="board-name-display"]');
    const boardColor = window.getComputedStyle(boardName).getPropertyValue("color");
    hideAllSvg = setHideSvgWithColor(boardColor);
    showAllSvg = setShowSvgWithColor(boardColor);
    headerBtn.onclick = toggleAll;
    boardHeaderBtns.insertBefore(headerBtn, boardHeaderBtns.children[0]);

    const listName = document.querySelector('[data-testid="list-name"]');
    const listUiColor = window.getComputedStyle(listName).getPropertyValue("color");
    hideListSvg = setHideSvgWithColor(listUiColor);
    showListSvg = setShowSvgWithColor(listUiColor);

    // Set Keys in State and update UI
    const boardId = window.location.pathname.split("/")[2];
    boardKey = PREFIX + boardId;

    const listHeaders = document.querySelectorAll('[data-testid="list-header"]');
    const listKeys = [boardKey];

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
        const allState = res[boardKey];
        delete res[boardKey];
        if (allState === HIDE) {
            headerBtn.innerHTML = showAllSvg;
            hideLists();
        } else {
            headerBtn.innerHTML = hideAllSvg;
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
    const currState = state[boardKey] ?? SHOW;

    if (currState === SHOW) {
        this.innerHTML = showAllSvg;
        state[boardKey] = HIDE;
        hideLists(true);
    } else if (currState === HIDE) {
        this.innerHTML = hideAllSvg;
        state[boardKey] = SHOW;
        showLists(true);
    } else {
        console.log(`[Treview] Invalid State on ALL`);
    }
}

function hideLists(update = false) {
    for (const key in state) {
        if (key === boardKey) continue;
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
        chrome.storage.local.set({ [boardKey]: HIDE }).then(() => {
            console.log(`[Treview] Set all to hide`);
        })
    }
}

function showLists(update = false) {
    for (const key in state) {
        if (key === boardKey) continue;
        const listId = key.substring(PREFIX.length);
        const listBtn = document.querySelector(`[data-list-id="${TOGGLE_PREFIX + listId}"]`);
        listBtn && (listBtn.style.display = "flex");

        const value = state[key];
        if (value === HIDE) {
            const list = document.querySelector(`[data-list-id="${listId}"]`);
            list && (list.style.display = "block");
        }
    }

    if (update) {
        chrome.storage.local.set({ [boardKey]: SHOW }).then(() => {
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
    if (!list) return;
    const toggle = list.querySelector(`[data-list-id="${TOGGLE_PREFIX + listId}"]`);
    toggle.innerHTML = showListSvg;
    state[PREFIX + listId] = HIDE;
    list.style.filter = "brightness(0.5)";
    list.style.transition = "filter 85ms ease";

    if (update) {
        const key = PREFIX + listId;
        chrome.storage.local.set({ [key]: HIDE });
    }
}

function markVisible(listId, update = false) {
    const list = document.querySelector(`[data-list-id="${listId}"]`);
    if (!list) return;
    const toggle = list.querySelector(`[data-list-id="${TOGGLE_PREFIX + listId}"]`);
    toggle.innerHTML = hideListSvg;
    state[PREFIX + listId] = SHOW;
    list.style.filter = "brightness(1)";
    delete list.style.transition;
    list.onmouseenter = () => { }
    list.onmouseleave = () => { }

    if (update) {
        const key = PREFIX + listId;
        chrome.storage.local.set({ [key]: SHOW });
    }
}

