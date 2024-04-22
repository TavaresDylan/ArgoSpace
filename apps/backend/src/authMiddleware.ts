import { Request, Response, NextFunction } from 'express';
import { FirebaseAdminApp } from '@argolight-space/firebase-admin';

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken != null && bearerToken != '') {
    const token = bearerToken.replace('Bearer ', '');
    FirebaseAdminApp.auth()
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
