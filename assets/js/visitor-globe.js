(() => {
  const root = document.querySelector("[data-visitor-stats]");
  if (!root) return;

  const config = window.qscVisitorStats || {};
  const endpoint = normaliseEndpoint(config.endpoint);
  const globeElement = root.querySelector("[data-visitor-globe]");
  const statusElement = root.querySelector("[data-stats-status]");
  const countryListElement = root.querySelector("[data-country-list]");
  const updatedElement = root.querySelector("[data-stats-updated]");
  const totalElement = root.querySelector("[data-stat-total]");
  const countriesElement = root.querySelector("[data-stat-countries]");
  const visitsElement = root.querySelector("[data-stat-visits]");

  const naturalEarthRevision = "ca96624a56bd078437bca8184e78163e5039ad19";
  const naturalEarthBase = `https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@${naturalEarthRevision}/geojson`;
  const countryShapesUrl = `${naturalEarthBase}/ne_110m_admin_0_countries.geojson`;
  const tinyCountriesUrl = `${naturalEarthBase}/ne_110m_admin_0_tiny_countries.geojson`;
  const numberFormat = new Intl.NumberFormat("zh-CN");
  const countryNames = typeof Intl.DisplayNames === "function"
    ? new Intl.DisplayNames(["zh-CN"], { type: "region" })
    : null;

  function normaliseEndpoint(value) {
    if (!value) return "";
    try {
      const url = new URL(value);
      return url.href.replace(/\/$/, "");
    } catch (error) {
      return "";
    }
  }

  function setStatus(message, state = "loading") {
    statusElement.textContent = message;
    statusElement.dataset.state = state;
  }

  function countryCode(feature) {
    const properties = feature.properties || {};
    const candidates = [properties.ISO_A2_EH, properties.ISO_A2, properties.POSTAL];
    return candidates.find((code) => /^[A-Z]{2}$/.test(code || "")) || "XX";
  }

  function countryName(feature) {
    const properties = feature.properties || {};
    return properties.NAME_ZH || properties.NAME_EN || properties.ADMIN || "未知地区";
  }

  function displayCountryName(code) {
    if (code === "XX") return "未知地区";
    try {
      return countryNames ? countryNames.of(code) : code;
    } catch (error) {
      return code;
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderCountryList(countries) {
    countryListElement.replaceChildren();

    if (!countries.length) {
      const empty = document.createElement("li");
      empty.className = "visitor-country-list__empty";
      empty.textContent = "还没有记录到访客。第一位访客将点亮自己的国家或地区。";
      countryListElement.append(empty);
      return;
    }

    countries.slice(0, 18).forEach((country, index) => {
      const item = document.createElement("li");
      item.className = "visitor-country-list__item";

      const rank = document.createElement("span");
      rank.className = "visitor-country-list__rank";
      rank.textContent = String(index + 1).padStart(2, "0");

      const name = document.createElement("span");
      name.className = "visitor-country-list__name";
      name.textContent = displayCountryName(country.code);

      const count = document.createElement("strong");
      count.className = "visitor-country-list__count";
      count.textContent = `${numberFormat.format(country.visitors)} 人`;

      item.append(rank, name, count);
      countryListElement.append(item);
    });
  }

  function palette() {
    const dark = document.documentElement.hasAttribute("data-theme");
    return dark
      ? {
          ocean: "#202327",
          empty: "rgba(122, 132, 144, 0.34)",
          border: "rgba(243, 244, 246, 0.48)",
          active: [224, 122, 104]
        }
      : {
          ocean: "#e9edf2",
          empty: "rgba(135, 146, 158, 0.32)",
          border: "rgba(255, 255, 255, 0.85)",
          active: [184, 74, 58]
        };
  }

  function activeColour(count, maxCount, colours) {
    if (!count) return colours.empty;
    const strength = maxCount <= 1 ? 1 : Math.log(count + 1) / Math.log(maxCount + 1);
    const alpha = 0.48 + strength * 0.48;
    return `rgba(${colours.active.join(", ")}, ${alpha.toFixed(2)})`;
  }

  function labelHtml(name, count) {
    return `<div class="visitor-globe-tooltip"><span>${escapeHtml(name)}</span><strong>${numberFormat.format(count)} 人</strong></div>`;
  }

  async function getJson(url) {
    const response = await fetch(url, { credentials: "omit" });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json();
  }

  async function initialise() {
    if (!endpoint) {
      setStatus("统计服务尚未启用", "error");
      countryListElement.innerHTML = '<li class="visitor-country-list__empty">统计后端部署完成后，这里会自动显示真实访客数据。</li>';
      globeElement.classList.add("visitor-globe--empty");
      globeElement.textContent = "等待统计服务连接";
      return;
    }

    try {
      const [stats, countryShapes, tinyCountries] = await Promise.all([
        getJson(`${endpoint}/api/stats`),
        getJson(countryShapesUrl),
        getJson(tinyCountriesUrl)
      ]);

      const countries = Array.isArray(stats.countries) ? stats.countries : [];
      const countByCountry = new Map(countries.map((country) => [country.code, Number(country.visitors) || 0]));
      const maxCount = Math.max(1, ...countByCountry.values());

      totalElement.textContent = numberFormat.format(Number(stats.totalVisitors) || 0);
      countriesElement.textContent = numberFormat.format(countries.filter((country) => country.code !== "XX" && country.visitors > 0).length);
      visitsElement.textContent = numberFormat.format(Number(stats.totalVisits) || 0);
      updatedElement.textContent = stats.generatedAt
        ? `${new Date(stats.generatedAt).toLocaleString("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })} 更新`
        : "刚刚更新";
      renderCountryList(countries.filter((country) => country.visitors > 0));

      if (typeof window.Globe !== "function") {
        throw new Error("WebGL globe library is unavailable");
      }

      const colours = palette();
      const globe = window.Globe()(globeElement)
        .backgroundColor("rgba(0, 0, 0, 0)")
        .showAtmosphere(true)
        .atmosphereColor(colours.active[0] === 224 ? "#e07a68" : "#b84a3a")
        .atmosphereAltitude(0.14)
        .polygonsData(countryShapes.features)
        .polygonCapColor((feature) => activeColour(countByCountry.get(countryCode(feature)) || 0, maxCount, colours))
        .polygonSideColor(() => colours.empty)
        .polygonStrokeColor(() => colours.border)
        .polygonAltitude((feature) => countByCountry.get(countryCode(feature)) ? 0.012 : 0.004)
        .polygonLabel((feature) => {
          const count = countByCountry.get(countryCode(feature)) || 0;
          return labelHtml(countryName(feature), count);
        })
        .pointsData(tinyCountries.features)
        .pointLat((feature) => feature.geometry.coordinates[1])
        .pointLng((feature) => feature.geometry.coordinates[0])
        .pointAltitude(0.018)
        .pointRadius((feature) => countByCountry.get(countryCode(feature)) ? 0.32 : 0.18)
        .pointColor((feature) => activeColour(countByCountry.get(countryCode(feature)) || 0, maxCount, colours))
        .pointLabel((feature) => labelHtml(countryName(feature), countByCountry.get(countryCode(feature)) || 0));

      const material = globe.globeMaterial();
      material.color.set(colours.ocean);
      material.transparent = true;
      material.opacity = 0.96;

      const controls = globe.controls();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      controls.autoRotate = !reduceMotion;
      controls.autoRotateSpeed = 0.34;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 165;
      controls.maxDistance = 380;

      globe.pointOfView({ lat: 24, lng: 108, altitude: 2.15 }, 0);

      const resize = () => {
        globe.width(globeElement.clientWidth);
        globe.height(globeElement.clientHeight);
      };
      new ResizeObserver(resize).observe(globeElement);
      resize();

      globe
        .onPolygonHover((feature) => {
          globeElement.style.cursor = feature ? "pointer" : "grab";
          controls.autoRotate = !feature && !reduceMotion;
        })
        .onPointHover((feature) => {
          globeElement.style.cursor = feature ? "pointer" : "grab";
          controls.autoRotate = !feature && !reduceMotion;
        });

      new MutationObserver(() => {
        const nextColours = palette();
        material.color.set(nextColours.ocean);
        globe
          .polygonCapColor((feature) => activeColour(countByCountry.get(countryCode(feature)) || 0, maxCount, nextColours))
          .polygonSideColor(() => nextColours.empty)
          .polygonStrokeColor(() => nextColours.border)
          .pointColor((feature) => activeColour(countByCountry.get(countryCode(feature)) || 0, maxCount, nextColours))
          .atmosphereColor(nextColours.active[0] === 224 ? "#e07a68" : "#b84a3a");
      }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

      setStatus(countries.length ? "实时汇总" : "等待第一位访客", "ready");
    } catch (error) {
      setStatus("暂时无法读取统计", "error");
      globeElement.classList.add("visitor-globe--empty");
      globeElement.textContent = "地球仪加载失败，请稍后再试";
      countryListElement.innerHTML = '<li class="visitor-country-list__empty">访问数据暂时不可用。</li>';
    }
  }

  initialise();
})();
