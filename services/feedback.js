import { firestore, timestamp } from "@/services/fireinit.js"

const firebaseRef = firestore.collection("feedback")

export default ({ text, author, email }) => {
  const payload = {
    author,
    text,
    email,
    date: new timestamp.fromDate(new Date())
  }
  firebaseRef.add(payload)
}
