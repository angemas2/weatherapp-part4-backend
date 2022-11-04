function checkBody(body) {
  let isValid = Object.values(body).every(
    (value) => value !== null && value !== ""
  );

  if (isValid && Object.values(body).length === 2) {
    return true;
  } else {
    return false;
  }
}

module.exports = { checkBody };
