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
import RecoveryPassword from '../app/controllers/recoveryPassword';
import showAccount from '../app/controllers/showClubAccont';
import playerAccountByClubController from '../app/controllers/playerByClub';
import showPlayerAccountController from '../app/controllers/showPlayerAccount';

import middleware from '../middleware/authentication';

import Storage from '../configs/multer';
const upload = multer(Storage);
const routes = new Router();

routes.post('/auth', AuthenticationController.store);

routes.get('/accounts', AccountController.index);
routes.post('/account', AccountController.store);
routes.get('/account/:id', AccountController.show);
routes.put('/account/:id', AccountController.update);
routes.delete('/account/:id', AccountController.remove);

routes.get('/players', PlayerController.index);
routes.get('/player/:id', PlayerController.show);
routes.post('/player', upload.single('file'), PlayerController.store);
routes.put('/player/:id', upload.single('file'), PlayerController.update);
routes.delete('/player/:id', PlayerController.remove);

routes.get('/clubs', ClubController.index);
routes.get('/club/:id', ClubController.show);
routes.post('/club', upload.single('file'), ClubController.store);
routes.put('/club/:id', upload.single('file'), ClubController.update);
routes.delete('/club/:id', ClubController.remove);

routes.get('/favoritesclubs/:id', FavoriteClubController.index);
routes.get('/favoritesclub/:id', FavoriteClubController.show);
routes.post('/favoritesclub', FavoriteClubController.store);
routes.put('/favoritesclub/:id', FavoriteClubController.update);
routes.delete('/favoritesclub/:id', FavoriteClubController.remove);

routes.get('/favoritesplayers/:id', FavoritePlayerController.index);
routes.get('/favoritesplayer/:id', FavoritePlayerController.show);
routes.post('/favoritesplayer', FavoritePlayerController.store);
routes.put('/favoritesplayer/:id', FavoritePlayerController.update);
routes.delete('/favoritesplayer/:id', FavoritePlayerController.remove);

routes.post('/playerby-club', upload.single('file'), playerAccountByClubController.store);

routes.get('/playervideos/:id', PlayerVideoController.index);
routes.get('/playervideo/:id', PlayerVideoController.show);
routes.post('/playervideo', upload.single('file'), PlayerVideoController.store);
routes.put('/playervideo/:id', upload.single('file'), PlayerVideoController.update);
routes.delete('/playervideo/:id', PlayerVideoController.remove);

routes.get('/showclub/:id', showAccount.show);
routes.get('/showplayer/:id', showPlayerAccountController.show);

routes.post('/search-players', SearchPlayersController.index);
routes.post('/recovery-password', RecoveryPassword.update);

export default routes;
