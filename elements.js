const hideAllSvg = `<svg style="width:16px;height:16px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#182c4e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`;
const showAllSvg = `<svg style="width:16px;height:16px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#182c4e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;

const headerBtn = document.createElement("div");
headerBtn.innerHTML = hideAllSvg;
headerBtn.style.cursor = "pointer";
headerBtn.style.display = "flex";
headerBtn.style.justifyContent = "center";
headerBtn.style.alignItems = "center";
headerBtn.style.width = "32px";
headerBtn.style.height = "32px";
headerBtn.style.borderRadius = "3px";
headerBtn.style.background = "transparent";
headerBtn.style.transition = "background 85ms ease";
headerBtn.onmouseenter = () => { headerBtn.style.background = "#091E4224"; }
headerBtn.onmouseleave = () => { headerBtn.style.background = "transparent"; }
headerBtn.dataset.visibility = "hide";

// ============================================================================

const hideListSvg = `<svg style="width:16px;height:16px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b6c2cf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`;
const showListSvg = `<svg style="width:16px;height:16px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b6c2cf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;

function createListBtn() {
    const listBtn = document.createElement("div");
    listBtn.innerHTML = hideListSvg;
    listBtn.classList.add("treview");
    listBtn.style.display = "flex";
    listBtn.style.justifyContent = "center";
    listBtn.style.alignItems = "center";
    listBtn.style.width = "32px";
    listBtn.style.height = "32px";
    listBtn.onmouseenter = () => { listBtn.style.background = "#A6C5E229"; }
    listBtn.onmouseleave = () => { listBtn.style.background = "transparent"; }
    listBtn.style.borderRadius = "8px";
    listBtn.style.background = "transparent";
    listBtn.style.transition = "background 85ms ease";
    listBtn.dataset.visibility = "hide";
    return listBtn;
}
