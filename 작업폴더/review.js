const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDBkNGZmNDI4Mjg1YjljM2FjNDg2MjlhN2I5MmUyYSIsInN1YiI6IjY0NzVmMWMxMWJmMjY2MDQzZWNkZGVjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.77Z9bbZ2GcnUfrheuoGpUoNsHgqTF7l_7GkEI9gDFQY",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    const mvrow = data["results"];
    const list = document.getElementById("Mvposter");

    function showList(val = "") {
      list.innerHTML = "";

      const movie = mvrow.find((movie) =>
        movie.title.toLowerCase().includes(val.toLowerCase())
      );

      if (movie) {
        const movieElement = document.createElement("div");
        movieElement.className = "movieCard";
        movieElement.innerHTML = `
        <div onclick="movieId(${movie.id})">
        <div class="movie-info">
        <h4>${movie.title}</h4>
          <p>release_date: ${movie.release_date}</p>
          <p>Rating: ${movie.vote_average}</p>
        </div>
        <div class="movie-image">
          <img id="image" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}">
        </div>
        <div class="movie-overview">
          <p>${movie.overview}</p>
        </div>
      </div>
        `;

        list.appendChild(movieElement);
      }
    }

    showList();

    const mvInput = document.getElementById("mvInput");
    const mvsearch = document.getElementById("mvsearch");

    mvsearch.addEventListener("click", (e) => {
      e.preventDefault();
      const val = mvInput.value;
      showList(val);
    });
  })
  .catch((err) => console.error(err));

// const movieId = (id) => alert(`영화 id: ${id}`);
