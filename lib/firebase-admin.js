import {
  getApp,
  getApps,
  applicationDefault,
  initializeApp,
} from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

if (getApps().length === 0) {
  initializeApp({
    credential: applicationDefault(),
  })
}
const adminApp = getApp()

export const adminAuth = getAuth(adminApp)
