const form = document.querySelector("#project-form");
const fileInput = document.querySelector("#pdf-files");
const fileList = document.querySelector("#file-list");
const dropzone = document.querySelector("#dropzone");

let selectedFiles = [];

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function renderFiles() {
  fileList.replaceChildren();
  selectedFiles.forEach((file, index) => {
    const row = document.createElement("div");
    row.className = "file-item";

    const name = document.createElement("strong");
    name.textContent = file.name;

    const meta = document.createElement("span");
    meta.className = "file-meta";
    meta.textContent = formatBytes(file.size);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "제거";
    remove.setAttribute("aria-label", `${file.name} 제거`);
    remove.style.cssText = "border:0;background:transparent;color:#7c86a4;cursor:pointer;font:inherit;margin-left:12px";
    remove.addEventListener("click", () => {
      selectedFiles.splice(index, 1);
      renderFiles();
    });

    const right = document.createElement("div");
    right.append(meta, remove);
    row.append(name, right);
    fileList.append(row);
  });
}

function addFiles(fileCollection) {
  const incoming = Array.from(fileCollection || []);
  const valid = incoming.filter(file => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
  const invalidCount = incoming.length - valid.length;

  valid.forEach(file => {
    const duplicate = selectedFiles.some(existing =>
      existing.name === file.name && existing.size === file.size && existing.lastModified === file.lastModified
    );
    if (!duplicate) selectedFiles.push(file);
  });

  renderFiles();
  if (invalidCount) alert("PDF 파일만 선택할 수 있습니다.");
}

fileInput.addEventListener("change", event => addFiles(event.target.files));

["dragenter", "dragover"].forEach(type => {
  dropzone.addEventListener(type, event => {
    event.preventDefault();
    dropzone.classList.add("dragover");
  });
});
["dragleave", "drop"].forEach(type => {
  dropzone.addEventListener(type, event => {
    event.preventDefault();
    dropzone.classList.remove("dragover");
  });
});
dropzone.addEventListener("drop", event => addFiles(event.dataTransfer.files));

form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = Object.fromEntries(new FormData(form).entries());
  sessionStorage.setItem("draftProject", JSON.stringify(data));

  document.querySelector("#upload-section").scrollIntoView({ behavior: "smooth", block: "start" });
  alert("평가 정보가 이 브라우저에 임시 저장되었습니다. 다음 개발 단계에서 프로젝트 생성 및 안전한 PDF 업로드를 연결합니다.");
});

// 이 초기 버전은 개인정보 보호를 위해 파일을 서버로 전송하지 않습니다.
// 실제 업로드는 서버 인증, 비공개 저장소, 파일 크기 검증을 구현한 뒤 연결합니다.
