import express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { makeAccessToken, verifyRefreshToken } from '../util/token-util';
import { HttpStatusCode } from 'axios';

const router = express.Router();

// /token is used to get a new access token using a refresh token
// =================================================================================================
router.put('/token', async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken)
    return res.status(HttpStatusCode.Unauthorized).send();

  try {
    const data: JwtPayload | null = await verifyRefreshToken(refreshToken);
    if (!data) return res.status(HttpStatusCode.Unauthorized).send();
    const accessToken = makeAccessToken(data.id);
    return res.status(HttpStatusCode.Ok).json({ accessToken });
  } catch (err) {
    return res.status(HttpStatusCode.Unauthorized).send();
  }
});

export default router;
