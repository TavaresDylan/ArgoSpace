import { Request, Response, NextFunction } from 'express';
import * as firebase from 'firebase-admin';

const firebaseParams = {};

const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert(
    firebaseParams as firebase.ServiceAccount
  ),
  databaseURL: 'https://argolightspace.firebaseio.com',
});

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization;
  console.log(bearerToken);
  if (bearerToken != null && bearerToken != '') {
    const token = bearerToken.replace('Bearer ', '');
    firebaseApp
      .auth()
      .verifyIdToken(token)
      .then(() => {
        next();
      })
      .catch((error: Error) => {
        return res.status(401).send({ error: error.message });
      });
  } else {
    return res.status(401).send({ error: 'Unauthorized' });
  }
};
