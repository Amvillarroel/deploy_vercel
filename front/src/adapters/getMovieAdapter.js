function getMovieAdapter(responseMovie) {
    const { results } = responseMovie.data;
  
    const adaptedData = results.map((item) => {
      const { id, title, poster_path, release_date, overview } = item;
      return { id, title, poster_path, release_date, overview };
    });
  
    return adaptedData; // Devuelve el arreglo directamente, sin envolverlo en un objeto
  }
  
  export { getMovieAdapter }