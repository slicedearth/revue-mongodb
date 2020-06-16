import Api from '@/services/Api';

export default {
  getAlbums() {
    return Api().get('api/albums');
  },
  postAlbums(albums, token) {
    return Api().post('api/albums', albums, {
      headers: { 'x-auth-token': token },
    });
  },
  getAlbumById(albumId, token) {
    return Api().get(`api/albums/${albumId}`, {
      headers: { 'x-auth-token': token },
    });
  },
  putAlbumById(albumId, albums, token) {
    return Api().put(`api/albums/${albumId}`, albums, {
      headers: { 'x-auth-token': token },
    });
  },
  deleteAlbum(albumId, token) {
    return Api().delete(`api/albums/${albumId}`, {
      headers: { 'x-auth-token': token },
    });
  },
};
