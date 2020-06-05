const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Clean up Board if there are no users present
exports.cleanup = functions.database
  .ref("status/")
  .onDelete(async (snapshot, context) => {
    const original = snapshot.val();
    const originalBoard = original[Object.keys(original)[0]]["board"];
    await admin
      .database()
      .ref("status/")
      .once(
        "value",
        (snapshot) => {
          if (snapshot.val()) {
            const value = snapshot.val();
            const allKeys = Object.keys(value);
            allKeys.forEach((key) => {
              const { board } = value[key];
              if (board === originalBoard) {
                return false;
              }
            });
            admin.database().ref(`boards/${originalBoard}`).remove();
            console.log(`Removed ${originalBoard}`);
            return true;
          } else {
            admin.database().ref(`boards/${originalBoard}`).remove();
            console.log(`Removed ${originalBoard}`);
          }
        },
        (error) => console.log("Failure", error.code)
      );
    return true;
  });
