const SuperHero = (function () {
  const superHeroDetailContainer = document.querySelector(".super-hero-detail");

  /* Get query parameters from the URL */
  function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function renderSuperHeroDetails(data) {
    Common.hideLoader();
    if (!data) {
      superHeroDetailContainer.innerHTML =
        "Can not laod the superhero, please try again!";
      return;
    }
    superHeroDetailContainer.innerHTML = `
                                          <img src=${data.results[0].thumbnail.path}/portrait_xlarge.${data.results[0].thumbnail.extension} alt="" />
                                          <h1>${data.results[0].name}</h1>
                                          <h3>${data.results[0].description}</h3>
                                          <div class="character-stats">
                                            <div><span> Number of Comics </span> <span> ${data.results[0].comics.available}</span></div>
                                            <div><span> Number of Series </span> <span> ${data.results[0].series.available}</span></div>
                                            <div><span> Number of events </span> <span> ${data.results[0].events.available}</span></div>
                                            <div><span> Number of Stories </span> <span> ${data.results[0].stories.available}</span></div>
                                          </div>
                                        `;
  }

  /* Fetch data of a superhero with character id as 'id' */
  async function fetchSuperHeroData(id) {
    const url = Common.apiUrl;

    try {
      const data = await Common.apiRequest(`${url}&id=${id}`);

      if (data.success) {
        renderSuperHeroDetails(data.data.data);
      } else {
        renderSuperHeroDetails(null);
      }
    } catch (error) {
      console.log("error", error);
      renderSuperHeroDetails(null);
    }
  }

  /* Initialize the module */
  function init() {
    const heroId = getQueryParameter("id");
    Common.showLoader();

    fetchSuperHeroData(heroId);
  }

  return {
    init,
  };
})();
