import { Router } from 'express';

import multer from 'multer';

import AccountController from '../app/controllers/account';
import PlayerController from '../app/controllers/playerAccounts';
import ClubController from '../app/controllers/clubAccounts';
import FavoriteClubController from '../app/controllers/favoriteClub';
import FavoritePlayerController from '../app/controllers/favoritePlayers';
import PlayerVideoController from '../app/controllers/playerVideos';
import AuthenticationController from '../app/controllers/authentication';
import SearchPlayersController from '../app/controllers/searchPlayers';

import middleware from '../middleware/authentication';

import Storage from '../configs/multer';

const upload = multer(Storage);
const routes = new Router();

routes.post('/auth', AuthenticationController.store);

routes.get('/accounts', middleware, AccountController.index);
routes.post('/account', AccountController.store);
routes.get('/account/:id', middleware, AccountController.show);
routes.put('/account/:id', AccountController.update);
routes.delete('/account/:id', AccountController.remove);

routes.get('/players', middleware, PlayerController.index);
routes.get('/player/:id', middleware, PlayerController.show);
routes.post('/player', upload.single('file'), PlayerController.store);
routes.put('/player/:id', upload.single('file'), PlayerController.update);
routes.delete('/player/:id', PlayerController.remove);

routes.get('/clubs', middleware, ClubController.index);
routes.get('/club/:id', middleware, ClubController.show);
routes.post('/club', upload.single('file'), ClubController.store);
routes.put('/club/:id', upload.single('file'), ClubController.update);
routes.delete('/club/:id', ClubController.remove);

routes.get('/favoritesclubs/:id', middleware, FavoriteClubController.index);
routes.get('/favoritesclub/:id', middleware, FavoriteClubController.show);
routes.post('/favoritesclub', FavoriteClubController.store);
routes.put('/favoritesclub/:id', FavoriteClubController.update);
routes.delete('/favoritesclub/:id', FavoriteClubController.remove);

routes.get('/favoritesplayers/:id', middleware, FavoritePlayerController.index);
routes.get('/favoritesplayer/:id', middleware, FavoritePlayerController.show);
routes.post('/favoritesplayer', FavoritePlayerController.store);
routes.put('/favoritesplayer/:id', FavoritePlayerController.update);
routes.delete('/favoritesplayer/:id', FavoritePlayerController.remove);

routes.get('/playervideos', middleware, PlayerVideoController.index);
routes.get('/playervideo/:id', middleware, PlayerVideoController.show);
routes.post('/playervideo', upload.single('file'), PlayerVideoController.store);
routes.put('/playervideo/:id', upload.single('file'), PlayerVideoController.update);
routes.delete('/playervideo/:id', PlayerVideoController.remove);

routes.get('/search-players', SearchPlayersController.index);

export default routes;
