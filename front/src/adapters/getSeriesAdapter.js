function getSeriesAdapter(response) {
    const adaptedData = response.map((item) => {
        const { id, name: title, poster_path: poster, first_air_date: date } = item;
        return { id, title, poster, date };
    });
    return adaptedData;
};
export { getSeriesAdapter };