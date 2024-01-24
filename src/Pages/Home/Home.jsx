// import "./Home.module.css"
import Cards from "../../components/Cards/Cards";
function Home() {

  const hotels = [
    {
      name: "Hotel San Pedro Del Fuerte",
      address:
        "Cl. 46 #80-23, La Floresta, Medell¡n, La Am‚rica, Medell¡n, Antioquia",
      address_url:
        "https://www.google.com/maps/place/Hotel+San+Pedro+del+Fuerte/@6.2562671,-75.5986832,17z/data=!3m1!4b1!4m9!3m8!1s0x8e442973235257f9:0x10d96217b7ef00b4!5m2!4m1!1i2!8m2!3d6.2562671!4d-75.5986832!16s%2Fg%2F1tjs5_6_?entry=ttu",
      price: 50,
      email: "reservas@hotelsanpedrodelfuerte.com",
      image:
        "https://hotelsanpedrodelfuerte.com/wp-content/uploads/2022/02/Hotel_san_Pedro_del_fuerte_hoteles_en_medellin63.jpg",
      countryId: 5,
    },
    {
      name: "Hotel Estelar La Fontana",
      address: "Avenida 127, Nº 15A – 10 / Bogotá",
      address_url:
        "https://www.google.com/maps/place/ESTELAR+La+Fontana+Hotel/@4.7046015,-74.0461594,17z/data=!3m1!4b1!4m9!3m8!1s0x8e3f9ab2e9565caf:0x10d0ddf59c02d2e1!5m2!4m1!1i2!8m2!3d4.7045962!4d-74.0435845!16s%2Fg%2F1tf495xl?entry=ttu",
      price: 120,
      email: "reservas@hotelestelarlafontana.com",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/16131364.jpg?k=a1e6f064c6b24726cef2fc81db21367925627b348b1c530932a39b8ddbe3e5b1&o=&hp=1",
      countryId: 5,
    },
    {
      name: "Hotel Irotama Resort",
      address: "Calle 115 No. 2-60, Bello Horizonte, Santa Marta, Magdalena",
      address_url:
        "https://www.google.com/maps/place/Irotama+Resort/@11.1487537,-74.2311001,16z/data=!4m9!3m8!1s0x8ef45958adc4b245:0xebb9ad3a60955a7f!5m2!4m1!1i2!8m2!3d11.1495761!4d-74.2250101!16s%2Fg%2F1tzzwkr5?entry=ttu",
      price: 260,
      email: "reservas@irotama.com",
      image:
        "https://s16847.pcdn.co/wp-content/uploads/2023/02/Plan-Irotama-op2.jpg",
      countryId: 5,
    },
  ]

  return (
    <div>
      <h1>estamos en el home</h1>
      <Cards allHotels={hotels} />
    </div>
  )
}

export default Home;
