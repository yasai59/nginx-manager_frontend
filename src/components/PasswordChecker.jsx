import "./passwordChecker.css";

const evaluatePassword = (password) => {
  let note = 0;

  if (password.length > 5) {
    note++;
  }
  if (password.match(/[a-z]+/)) {
    note++;
  }
  if (password.match(/[A-Z]+/)) {
    note++;
  }
  if (password.match(/[0-9]+/)) {
    note++;
  }
  if (password.match(/[$@#&!]+/)) {
    note += 2;
  }

  return Math.floor((note / 6) * 10);
};

const color = (note) => {
  let color = "red";
  if (note >= 3) {
    color = "orange";
  }
  if (note >= 5) {
    color = "yellow";
  }
  if (note >= 7) {
    color = "green";
  }
  return color;
};

const comment = (note) => {
  let comment = "Weak";
  if (note >= 3) {
    comment = "Medium";
  }
  if (note >= 5) {
    comment = "Good";
  }
  if (note >= 7) {
    comment = "Strong";
  }
  if (note === 0) {
    comment = "None";
  }
  return comment;
};

export const PasswordChecker = ({ password }) => {
  const note = evaluatePassword(password);

  return (
    <div id="passwordChecker">
      <div
        id="passwordStrength"
        style={{
          width: note + "0%",
          backgroundColor: color(note),
        }}
      ></div>
      <p
        style={{
          color: color(note),
          visibility: note === 0 ? "hidden" : "visible",
        }}
      >
        {comment(note)}
      </p>
    </div>
  );
};
