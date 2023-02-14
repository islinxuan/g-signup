// 是否新建 Gmail
const textContentOpts = {
  currEmail: {
    placeholder: "Your email address",
    tips: "You'll need to confirm that this email belongs to you",
    tgl: "Create a new Gmail address instead",
  },
  newGmail: {
    placeholder: "Username",
    tips: "You can use letters, numbers & periods",
    tgl: "Use my current email address instead",
  },
};

const [gInputEmail, tips4Email, tglEmail] = document.querySelector(".form-control__account").children;
const [, fakePlaceholder, emailDomain] = gInputEmail.children;

tglEmail.addEventListener("click", () => {
  if (tglEmail.classList.toggle("gmail")) {
    ({
      placeholder: fakePlaceholder.textContent,
      tips: tips4Email.textContent,
      tgl: tglEmail.textContent,
    } = textContentOpts.newGmail);
    gInputEmail.appendChild(emailDomain);
  } else {
    ({
      placeholder: fakePlaceholder.textContent,
      tips: tips4Email.textContent,
      tgl: tglEmail.textContent,
    } = textContentOpts.currEmail);
    emailDomain.remove();
  }
});

// 是否显示密码
const inputPwds = document.querySelectorAll("[type='password']");
const showPwd = document.querySelector("#showpwd");

showPwd.addEventListener("click", () => {
  for (const input of inputPwds) {
    input.type = showPwd.checked ? "text" : "password";
  }
});

// TODO: 切换为 Googl 帐号登录页面
document.querySelector("#signin").addEventListener("click", () => {});

// TODO: 自定义表单验证
document.querySelector(".next").addEventListener("click", () => {});

// 模拟 <select> 元素 💪
const [selLang, , optList] = document.querySelector(".form-control__select").children;
const optItems = document.querySelectorAll("[role='option']");

const getIndex = [].indexOf.bind(optItems);
let lastFocusPos = 0;

const updateSelected = (newSelection) => {
  const selected = document.querySelector("[aria-selected='true']");

  if (newSelection !== selected) {
    selected.removeAttribute("aria-selected");
    newSelection.ariaSelected = "true";
    optList.setAttribute("aria-activedescendant", newSelection.id);
    selLang.value = newSelection.textContent;
  }
};

const scrollFocus = (nextFocusPos, onKey = false) => {
  optItems[lastFocusPos].classList.remove("focus");
  optItems[nextFocusPos].classList.add("focus");
  if (onKey) optItems[nextFocusPos].scrollIntoView({ block: "nearest" });

  lastFocusPos = nextFocusPos;
};

selLang.addEventListener("click", () => {
  selLang.classList.add("active");
  optList.focus();
});

optList.addEventListener("focus", () => {
  const selected = document.querySelector("[aria-selected='true']");
  selected.classList.add("focus");
  selected.scrollIntoView({ block: "center" });
  lastFocusPos = getIndex(selected);
});

optList.addEventListener("blur", () => {
  optItems[lastFocusPos].classList.remove("focus");
  selLang.classList.remove("active");
});

optList.addEventListener("click", (event) => {
  updateSelected(event.target);
  selLang.classList.remove("active");
});

optList.addEventListener("mousemove", (event) => {
  if (event.target !== optList) {
    scrollFocus(getIndex(event.target));
  }
});

optList.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") event.preventDefault();

  if (event.key === "ArrowDown" && lastFocusPos < optItems.length - 1) {
    scrollFocus(lastFocusPos + 1, true);
  } else if (event.key === "ArrowUp" && lastFocusPos > 0) {
    scrollFocus(lastFocusPos - 1, true);
  } else if (event.key === " ") {
    updateSelected(optItems[lastFocusPos]);
    selLang.classList.remove("active");
  }
});
