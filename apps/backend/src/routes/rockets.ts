import express from 'express';
import Rocket from '../controllers/rocket';

const RocketsRouter = express.Router();

RocketsRouter.get('/', Rocket.getRockets);

export { RocketsRouter };
