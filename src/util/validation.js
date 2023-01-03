function validateIsFilled(value) {
  return value ? "" : "빈칸을 채워주세요.";
}

function validateUrl(value) {
  const checkIsFilled = validateIsFilled(value);

  if (checkIsFilled) {
    return checkIsFilled;
  }

  if (
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
      value
    )
  ) {
    return "";
  }

  return "올바르지 않은 URL 형식입니다.";
}

function validateOver1(value) {
  return value && value >= 1
    ? ""
    : "비어있거나 1 이상의 숫자인지 확인해주세요.";
}

const validateEmail = (str) => {
  if (!str) {
    return "이메일을 입력해주세요.";
  }

  if (
    !/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(
      str
    )
  ) {
    return "이메일 형식이 올바르지 않습니다.";
    // https://fightingforalostcause.net/content/misc/2006/compare-email-regex.php 를 참고한 정규표현식입니다.
  }

  return "";
};

const validatePassword = (str) => {
  if (!str) {
    return "비밀번호를 입력해주세요.";
  }

  if (str.length < 6) {
    return "비밀번호는 6자 이상이여야 합니다.";
  }

  return "";
};

const validateUsername = (str) => {
  if (!str) {
    return "사용자 이름을 입력해주세요.";
  }

  if (str.length < 2 || str.length > 10) {
    return "2~10자 이내여야 합니다.";
  }

  if (str.includes(" ")) {
    return "공백을 포함할 수 없습니다.";
  }

  return "";
};

const validateAccountname = (str) => {
  if (!str) {
    return "계정 ID를 입력해주세요.";
  }

  if (/[^a-zA-Z0-9._]/.test(str)) {
    return "영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.";
  }

  return "";
};

export {
  validateEmail,
  validatePassword,
  validateIsFilled,
  validateOver1,
  validateUrl,
  validateUsername,
  validateAccountname,
};
