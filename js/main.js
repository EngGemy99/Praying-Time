let cards = document.querySelector(".cards");
let dateText = document.querySelector(".date");
let cityText = document.querySelector(".city");
let select = document.querySelector("select");

select.addEventListener("change", function (e) {
  cityText.innerHTML = this.options[this.selectedIndex].text;
  getData(this.value);
});

getData();
function getData(city = "Al Qāhirah") {
  axios
    .get(`http://api.aladhan.com/v1/timingsByCity?country=EG&city=${city}`)
    .then((response) => {
      const datecontent = response.data.data.date.readable;
      const weekday = response.data.data.date.hijri.weekday.ar;
      dateText.innerHTML = weekday + " " + datecontent;
      console.log(datecontent);
      let FajrTime = document.querySelector(".Fajr");
      let SunriseTime = document.querySelector(".Sunrise");
      let DhuhrTime = document.querySelector(".Dhuhr");
      let AsrTime = document.querySelector(".Asr");
      let MaghribTime = document.querySelector(".Maghrib");
      let IshaTime = document.querySelector(".Isha");
      const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } =
        response.data.data.timings;
      console.log(Maghrib.split(":")[0] - 12);
      FajrTime.innerHTML = Fajr;
      SunriseTime.innerHTML = Sunrise;
      DhuhrTime.innerHTML = Dhuhr;
      AsrTime.innerHTML =
        Asr.split(":")[0] > 12
          ? Asr.split(":")[0] - 12 + ":" + Asr.split(":")[1]
          : Asr;
      MaghribTime.innerHTML =
        Maghrib.split(":")[0] > 12
          ? Maghrib.split(":")[0] - 12 + ":" + Maghrib.split(":")[1]
          : Maghrib;
      IshaTime.innerHTML =
        Isha.split(":")[0] > 12
          ? Isha.split(":")[0] - 12 + ":" + Isha.split(":")[1]
          : Isha;
    });
}
