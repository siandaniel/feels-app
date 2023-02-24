import axios from 'axios';

const feelsApi = axios.create({
    baseURL: "https://feels-api.onrender.com/api"
})

export const getOneUser = (username: String) => {
    let apiQuery = `/users/${username}`;

    return feelsApi.get(apiQuery)
    .then(({data}) => {
        return data.user;
    })
}

export const getUserMoods = (username: String) => {
    let apiQuery = `/mood_data/${username}`;

    return feelsApi.get(apiQuery)
    .then(({data}) => {
        return data.moodData;
    })
}

export const updateUserMood = (username: String, body: Object) => {
    let apiQuery = `/mood_data/${username}`;

    return feelsApi.patch(apiQuery, body)
    .then(({data}) => {
        return data.updatedMoodData.mood_data;
    })
}