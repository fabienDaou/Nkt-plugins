var eventHorizon = {
    lineId: "EventHorizon",
    onBlur: function () {
        const chat = document.getElementById("chat");
        if (chat.childNodes) {
            const lineNode = document.createElement("hr");
            lineNode.setAttribute("id", this.lineId);
            lineNode.style.display = "none";
            chat.prepend(lineNode);
        }
    },
    onFocus: function () {
        const lineNode = document.getElementById(this.lineId);
        if (!lineNode) return;
        if (lineNode.parentNode.firstChild != lineNode) {
            lineNode.style.display = "block";
            lineNode.scrollIntoView({ behavior: "smooth", block: "center" });
            lineNode.style.opacity = "0";
            lineNode.style.transition = "visibility 0s 2s, opacity 2s linear";
            setTimeout(() => {
                lineNode.remove();
            }, 2000);
        } else {
            lineNode.remove();
        }
    },
};
$.plugin({
    name: "EventHorizon",
    init: function () {
        window.addEventListener("blur", eventHorizon.onBlur);
        window.addEventListener("focus", eventHorizon.onFocus);
    },
    stop: function () {
        window.removeEventListener("blur", eventHorizon.onBlur);
        window.removeEventListener("focus", eventHorizon.onFocus);
    },
});
