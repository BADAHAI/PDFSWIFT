function openToolModal(toolId) {
  const modal = document.getElementById("tool-modal");
  const content = document.getElementById("tool-content");

  content.innerHTML = document.getElementById(toolId).innerHTML;

  modal.classList.remove("hidden");
}

function closeToolModal() {
  document.getElementById("tool-modal").classList.add("hidden");
}
