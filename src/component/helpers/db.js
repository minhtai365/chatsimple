import { auth, db } from "../services/firebase";

async function getMe(uid) {
    const dtb = await db
      .ref("user/" + auth().currentUser.uid)
      .get()
      .then((dt) => {
        return dt.val();
      });
    return dtb;
  }

