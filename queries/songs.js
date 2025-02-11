const db = require('../db/dbConfig');

const getAllSongs = async () => {
    try {
        const songs = await db.any('SELECT * FROM songs');
        return songs
    }
    catch(err) {
        return err;
    }
}

const createSong = async (song) => {
    try{
    const newSong = await db.one(
        "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [song.name, song.artist, song.album, song.time, song.is_favorite]
    );
        return newSong;
    } catch (error) {
        return error;
    }
}

const getSong = async (id) => {
    try {
        const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id)
        return oneSong;
    } catch (error) {
        return error;
    }
}

const deleteSong = async (id) => {
    try {
        const deletedSong = await db.one(
            "DELETE FROM songs WHERE id=$1 RETURNING *", id
        )
        return deletedSong;
    } catch (error) {
        throw error;
    }
    
}

const updateSong = async (id, song) => {
    try{
        const {name, artist, album, time, is_favorite} = song;
        const changedSong = await db.one(
            "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
            [name, artist, album, time, is_favorite, id]
        );
        return changedSong;
    } catch (error) {
        return error
    }
}

module.exports = { getAllSongs , createSong, getSong, deleteSong , updateSong};