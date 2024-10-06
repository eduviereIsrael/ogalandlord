"use client"

import React, { useEffect, useState } from 'react'
import { Navbar } from '@/components'
import { selectAllListings, setAllListings, selectFilteredListings, setLocationFilter, selectFilters, updateOtherFilter } from '@/lib/store/slices/listings.reducer';
import { selectAmenitiesList } from '@/lib/store/slices/listingUpload.reducer';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { BuyersListingContainer } from '@/components';

const nigerianStatesAndLGAs = {
  Abia: [
    "Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", 
    "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", 
    "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", 
    "Ukwa East", "Ukwa West", "Umuahia North", 
    "Umuahia South", "Umu Nneochi"
  ],
  Adamawa: [
    "Demsa", "Fufore", "Ganye", "Gayuk", "Gombi", "Grie", 
    "Hong", "Jada", "Lamurde", "Madagali", "Maiha", 
    "Mayo Belwa", "Michika", "Mubi North", "Mubi South", 
    "Numan", "Shelleng", "Song", "Toungo", "Yola North", 
    "Yola South"
  ],
  "Akwa Ibom": [
    "Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", 
    "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo Asutan", 
    "Ibiono Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene", 
    "Ini", "Itu", "Mbo", "Mkpat Enin", "Nsit Atai", 
    "Nsit Ibom", "Nsit Ubium", "Obot Akara", "Okobo", 
    "Onna", "Oron", "Oruk Anam", "Udung Uko", "Ukanafun", 
    "Uruan", "Urue Offong/Oruko", "Uyo"
  ],
  Anambra: [
    "Aguata", "Anambra East", "Anambra West", "Anaocha", 
    "Awka North", "Awka South", "Ayamelum", "Dunukofia", 
    "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", 
    "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", 
    "Onitsha North", "Onitsha South", "Orumba North", 
    "Orumba South", "Oyi"
  ],
  Bauchi: [
    "Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", 
    "Dass", "Ganjuwa", "Giade", "Itas/Gadau", "Jama'are", 
    "Katagum", "Kirfi", "Misau", "Ningi", "Shira", 
    "Tafawa Balewa", "Toro", "Warji", "Zaki"
  ],
  Bayelsa: [
    "Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", 
    "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"
  ],
  Benue: [
    "Ado", "Agatu", "Apa", "Buruku", "Gboko", "Guma", 
    "Gwer East", "Gwer West", "Katsina-Ala", "Konshisha", 
    "Kwande", "Logo", "Makurdi", "Obi", "Ogbadibo", 
    "Ohimini", "Oju", "Okpokwu", "Oturkpo", "Tarka", 
    "Ukum", "Ushongo", "Vandeikya"
  ],
  Borno: [
    "Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", 
    "Chibok", "Damboa", "Dikwa", "Gubio", "Guzamala", 
    "Gwoza", "Hawul", "Jere", "Kaga", "Kala/Balge", 
    "Konduga", "Kukawa", "Kwaya Kusar", "Mafa", "Magumeri", 
    "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", 
    "Nganzai", "Shani"
  ],
  "Cross River": [
    "Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", 
    "Biase", "Boki", "Calabar Municipal", "Calabar South", 
    "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", 
    "Odukpani", "Ogoja", "Yakuur", "Yala"
  ],
  Delta: [
    "Aniocha North", "Aniocha South", "Bomadi", "Burutu", 
    "Ethiope East", "Ethiope West", "Ika North East", 
    "Ika South", "Isoko North", "Isoko South", "Ndokwa East", 
    "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", 
    "Patani", "Sapele", "Udu", "Ughelli North", "Ughelli South", 
    "Ukwuani", "Uvwie", "Warri North", "Warri South", "Warri South West"
  ],
  Ebonyi: [
    "Abakaliki", "Afikpo North", "Afikpo South (Edda)", "Ebonyi", 
    "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", 
    "Izzi", "Ohaozara", "Ohaukwu", "Onicha"
  ],
  Edo: [
    "Akoko-Edo", "Egor", "Esan Central", "Esan North-East", 
    "Esan South-East", "Esan West", "Etsako Central", 
    "Etsako East", "Etsako West", "Igueben", "Ikpoba-Okha", 
    "Orhionmwon", "Oredo", "Ovia North-East", "Ovia South-West", 
    "Owan East", "Owan West", "Uhunmwonde"
  ],
  Ekiti: [
    "Ado-Ekiti", "Efon", "Ekiti East", "Ekiti South-West", 
    "Ekiti West", "Emure", "Gbonyin", "Ido Osi", 
    "Ijero", "Ikere", "Ikole", "Ilejemeje", "Irepodun/Ifelodun", 
    "Ise/Orun", "Moba", "Oye"
  ],
  Enugu: [
    "Aninri", "Awgu", "Enugu East", "Enugu North", 
    "Enugu South", "Ezeagu", "Igbo Etiti", "Igbo Eze North", 
    "Igbo Eze South", "Isi Uzo", "Nkanu East", "Nkanu West", 
    "Nsukka", "Oji River", "Udenu", "Udi", "Uzo Uwani"
  ],
  "FCT - Abuja": [
    "Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"
  ],
  Gombe: [
    "Akko", "Balanga", "Billiri", "Dukku", "Funakaye", 
    "Gombe", "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"
  ],
  Imo: [
    "Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", 
    "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", 
    "Isiala Mbano", "Isu", "Mbaitoli", "Ngor Okpala", 
    "Njaba", "Nkwerre", "Nwangele", "Obowo", "Oguta", 
    "Ohaji/Egbema", "Okigwe", "Onuimo", "Orlu", "Orsu", 
    "Oru East", "Oru West", "Owerri Municipal", "Owerri North", 
    "Owerri West"
  ],
  Jigawa: [
    "Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", 
    "Dutse", "Gagarawa", "Garki", "Gumel", "Guri", 
    "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", 
    "Kaugama", "Kazaure", "Kiri Kasama", "Kiyawa", "Maigatari", 
    "Malam Madori", "Miga", "Ringim", "Roni", "Sule Tankarkar", 
    "Taura", "Yankwashi"
  ],
  Kaduna: [
    "Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", 
    "Jaba", "Jema'a", "Kachia", "Kaduna North", "Kaduna South", 
    "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau", "Kudan", 
    "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", 
    "Zangon Kataf", "Zaria"
  ],
  Kano: [
    "Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", 
    "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", 
    "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", 
    "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", 
    "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", 
    "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", 
    "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", 
    "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", 
    "Warawa", "Wudil"
  ],
  Katsina: [
    "Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", 
    "Charanchi", "Dandume", "Danja", "Dan Musa", "Daura", 
    "Dutsi", "Dutsin Ma", "Faskari", "Funtua", "Ingawa", 
    "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", 
    "Katsina", "Kurfi", "Kusada", "Mai'Adua", "Malumfashi", 
    "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", 
    "Safana", "Sandamu", "Zango"
  ],
  Kebbi: [
    "Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", 
    "Birnin Kebbi", "Bunza", "Dandi", "Fakai", "Gwandu", 
    "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski", 
    "Sakaba", "Shanga", "Suru", "Wasagu/Danko", "Yauri", "Zuru"
  ],
  Kogi: [
    "Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", 
    "Idah", "Igalamela Odolu", "Ijumu", "Kabba/Bunu", "Kogi", 
    "Lokoja", "Mopa Muro", "Ofu", "Ogori/Mangongo", "Okehi", 
    "Okene", "Olamaboro", "Omala", "Yagba East", "Yagba West"
  ],
  Kwara: [
    "Asa", "Baruten", "Edu", "Ekiti (Araromi/Opin)", 
    "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", 
    "Irepodun", "Isin", "Kaiama", "Moro", "Offa", 
    "Oke Ero", "Oyun", "Pategi"
  ],
  Lagos: [
    "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", 
    "Apapa", "Badagry", "Epe", "Eti Osa", "Ibeju-Lekki", 
    "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", 
    "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", 
    "Oshodi-Isolo", "Shomolu", "Surulere"
  ],
  Nasarawa: [
    "Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", 
    "Kokona", "Lafia", "Nasarawa", "Nasarawa Egon", 
    "Obi", "Toto", "Wamba"
  ],
  Niger: [
    "Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", 
    "Edati", "Gbako", "Gurara", "Katcha", "Kontagora", 
    "Lapai", "Lavun", "Magama", "Mariga", "Mashegu", 
    "Mokwa", "Munya", "Paikoro", "Rafi", "Rijau", "Shiroro", 
    "Suleja", "Tafa", "Wushishi"
  ],
  Ogun: [
    "Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", 
    "Egbado North", "Egbado South", "Ewekoro", "Ifo", 
    "Ijebu East", "Ijebu North", "Ijebu North East", 
    "Ijebu Ode", "Ikenne", "Imeko Afon", "Ipokia", 
    "Obafemi Owode", "Odeda", "Odogbolu", "Ogun Waterside", 
    "Remo North", "Shagamu"
  ],
  Ondo: [
    "Akoko North-East", "Akoko North-West", "Akoko South-East", 
    "Akoko South-West", "Akure North", "Akure South", 
    "Ese Odo", "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", 
    "Irele", "Odigbo", "Okitipupa", "Ondo East", "Ondo West", 
    "Ose", "Owo"
  ],
  Osun: [
    "Aiyedaade", "Aiyedire", "Atakunmosa East", "Atakunmosa West", 
    "Boluwaduro", "Boripe", "Ede North", "Ede South", 
    "Egbedore", "Ejigbo", "Ife Central", "Ife East", 
    "Ife North", "Ife South", "Ifedayo", "Ifelodun", 
    "Ila", "Ilesa East", "Ilesa West", "Irepodun", "Irewole", 
    "Isokan", "Iwo", "Obokun", "Odo Otin", "Ola Oluwa", 
    "Olorunda", "Oriade", "Orolu", "Osogbo"
  ],
  Oyo: [
    "Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", 
    "Ibadan North", "Ibadan North-East", "Ibadan North-West", 
    "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", 
    "Ibarapa East", "Ibarapa North", "Ido", "Irepo", 
    "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", 
    "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", 
    "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", 
    "Ori Ire", "Oyo East", "Oyo West", "Saki East", 
    "Saki West", "Surulere"
  ],
  Plateau: [
    "Bokkos", "Barkin Ladi", "Bassa", "Jos East", "Jos North", 
    "Jos South", "Kanam", "Kanke", "Langtang North", 
    "Langtang South", "Mangu", "Mikang", "Pankshin", 
    "Qua'an Pan", "Riyom", "Shendam", "Wase"
  ],
  Rivers: [
    "Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", 
    "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", 
    "Emohua", "Etche", "Gokana", "Ikwerre", "Khana", 
    "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", 
    "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", 
    "Tai"
  ],
  Sokoto: [
    "Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", 
    "Gudu", "Gwadabawa", "Illela", "Isa", "Kebbe", "Kware", 
    "Rabah", "Sabon Birni", "Shagari", "Silame", "Sokoto North", 
    "Sokoto South", "Tambuwal", "Tangaza", "Tureta", 
    "Wamako", "Wurno", "Yabo"
  ],
  Taraba: [
    "Ardo Kola", "Bali", "Donga", "Gashaka", "Gassol", 
    "Ibi", "Jalingo", "Karim Lamido", "Kumi", "Lau", 
    "Sardauna", "Takum", "Ussa", "Wukari", "Yorro", "Zing"
  ],
  Yobe: [
    "Bade", "Bursari", "Damaturu", "Fika", "Fune", 
    "Geidam", "Gujba", "Gulani", "Jakusko", "Karasuwa", 
    "Machina", "Nangere", "Nguru", "Potiskum", "Tarmuwa", 
    "Yunusari", "Yusufari"
  ],
  Zamfara: [
    "Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", 
    "Bungudu", "Gummi", "Gusau", "Kaura Namoda", 
    "Maradun", "Maru", "Shinkafi", "Talata Mafara", 
    "Chafe", "Zurmi"
  ]
};
const stateKeys = Object.keys(nigerianStatesAndLGAs);  
const lgaKeys = Object.values(nigerianStatesAndLGAs).flat();  

const findItemWithState = (item) => {
  // Convert the item to lowercase
  const lowerCaseItem = item.toLowerCase();

  let filteredAdress = []
  
  // Iterate over the object entries to find the matching state and LGA
  if(!item) {
    return ["Enter a state or LGA"];
  }
  for (const [state, lgas] of Object.entries(nigerianStatesAndLGAs)) {
    // Convert each LGA and state to lowercase for case-insensitive comparison
    const lowerCaseState = state.toLowerCase();
    const lowerCaseLGAs = lgas.map(lga => lga.toLowerCase());
    for (const lga of lowerCaseLGAs){

      if (lga.includes(lowerCaseItem)) {
        // return `${item}, ${state}`;
        // console.log("hello")
        filteredAdress.unshift(`${lga}, ${state}`)
      }
    }
  }
  
  // If the item is not found, return a not found message
  return filteredAdress.length? filteredAdress : ["Not found"];
};

const ListingsPage = () => {
  
  const dispatch = useAppDispatch()
  const allListings = useAppSelector(selectAllListings)
  const filteredListings = useAppSelector(selectFilteredListings)
  const filters = useAppSelector(selectFilters)
  const amenities = useAppSelector(selectAmenitiesList)
  // const shomoluPlaces = findItemWithState("shom")

  const [showSearchOutput, setShowSearchOutput] = useState(false)
  const [amenitiesOutput, setAmenitiesOutput] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [searchValue, setsearchValue] = useState("s")
  const [searchOutput, setSearchOutput] = useState([])
  const [chosenState, setChosenState] = useState('');
  const [chosenLga, setChosenLga] = useState([]);
  const [chosenAmenities, setChosenAmenities] = useState([]);

  const handleChosenLga = (newLga) => {
    setChosenLga((prevLgas) => {
      if (prevLgas.includes(newLga)) {
        // Remove the string from the array if it already exists
        return prevLgas.filter(lga => lga !== newLga);
      } else {
        // Add the string to the array if it doesn't exist
        return [...prevLgas, newLga];
      }
    });
  };

  const handleChoosenAmen = (amenity) => {
    // setChosenAmenities((prevLgas) => {
      if (filters.amenitiesSelected.includes(amenity)) {
        // Remove the string from the array if it already exists
        dispatch(updateOtherFilter({key: "amenitiesSelected", value: filters.amenitiesSelected.filter(amen => amen !== amenity)}))

        // return prevLgas.filter(amen => amen !== amenity);
      } else {
        // Add the string to the array if it doesn't exist
        
        dispatch(updateOtherFilter({key: "amenitiesSelected", value: [...filters.amenitiesSelected, amenity]}))
        
        // return [...prevLgas, amenity];
      }
    // }); 
  }
  const handleChosenState = (newState) => {
    setChosenState(newState);
  };

  const handleSetLocations = () => {
    dispatch(setLocationFilter({
      lga: chosenLga,
      state: chosenState,
    }))
    setChosenLga([])
    setChosenState('');
    setShowSearchOutput(false)
  }

    
  const handleInputChange = (event) => {
    const {name, value} = event.target
    // setstoredLocation({...storedLocation, [name]: value})
    dispatch(updateOtherFilter({key: name, value: value}))
  }

  const dispatchAmenities = () => {
    console.log("dispatching amenities")
    dispatch(updateOtherFilter({key: "amenitiesSelected", value: chosenAmenities}))
  }
  
  const places = findItemWithState(searchValue)

  useEffect(() => {
    console.log("filteredListings",filteredListings)
    // console.log("filteredLocations",shomoluPlaces)
  }, [filteredListings])

  return (
    <div className='page listings-page' >
        <Navbar />
        <div className="page-container">
          <h1> Apartment Listings</h1>
          <div className="filter" id='desktop' >
              <label htmlFor="search" className="search" onClick={() => {
                setShowSearchOutput(true);
              }} >
                <img src="/search.svg" alt=""  onClick={null} />
                <p>{filters.location.state? filters.location.state : "search by location"}</p>
                <input
                  type="text"
                  id="search"
                  // disabled={true}
                  placeholder="search by location" onClick={null} 
                  value={chosenState}
                  style={{display: "none"}}
                />
        
              </label>
              
              <label htmlFor="listingType" className="filter-item">
                <img src="/house-icon.svg" alt="" />
                <select onChange={handleInputChange} name="listingType" id="listingType">
                  <option value="">Listing type</option>
                  <option value={"sell"}>For Sale</option>
                  <option value="rent">For Rent</option>
                  <option value="shortlet">Shortlet</option>
                </select>
              </label>

              <label htmlFor="propertyType" className="filter-item">
                <img src="/house-icon.svg" alt="" />
                <select onChange={handleInputChange} name="propertyType" id="propertyType">
                  <option value="">Property type</option>
                  <option value="selfCon">Self Contain</option>
                  <option value="flat">Flat</option>
                  <option value="duplex">Duplex</option>
                </select>
              </label>

              <label htmlFor="Bedrooms" className="filter-item">
                <img src="/beds.svg" alt="" />
                <select onChange={handleInputChange} name="bedrooms" id="Bedrooms">
                <option value={""}>Number of rooms</option>
                <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>
              </label>

              <label htmlFor="Bathrooms" className="filter-item">
                <img src="/bathroom.svg" alt="" />
                <select onChange={handleInputChange} name="bathrooms" id="Bathrooms">
                <option value={""}>Number of baths</option>
                <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>

              <label htmlFor="minMax " className="filter-item">
                <img src="/price-icon.svg" alt="" />
                <select onChange={handleInputChange} name="minMaxPrice" id="minMax ">
                  <option value={""}>Min-Max price</option>
                  <option value={[300000]}>below 300k</option>
                  <option value={[300000, 500000]}>300k - 500k</option>
                  <option value={[500000, 1000000]}>500k - 1m</option>
                  <option value={[1000000, 2000000]}>1m - 2m</option>
                  <option value={[2000000, 4000000]}>2m - 4m</option>
                  <option value={[4000000]}>4m and above</option>
                 
                </select>
              </label>
              <label htmlFor="amenities" className="search" onClick={() => {
                setAmenitiesOutput(true);
              }} >
                <img src="/house-icon.svg" alt=""  onClick={null} />
                <p>{"Amenities"}</p>
                <input
                  type="text"
                  id="amenities"
                  // disabled={true}
                  placeholder="Amenities" onClick={null} 
                  value={"Gym"}
                  style={{display: "none"}}
                />
        
              </label>
              

              { showSearchOutput &&    <div className="search-output">
                  {/* {
                    places.map((place, index) => (
                      <div key={index}>{place}</div>
                    ))
                  } */}

                  <div className="locations">
                    <div className="header">
                      <h3>{!chosenState? `Select a state` : `Select LGA's in ${chosenState}`}</h3>
                      <img src="/close.svg" alt="" onClick={() => {
                        setShowSearchOutput(false)
                      }} />
                    </div>
                    <div className="container">
                      {
                        !chosenState? stateKeys.map((state, index) => (
                          <div key={index} onClick={() => handleChosenState(state)}>
                            {state}
                          </div>
                        )) : 
                        nigerianStatesAndLGAs[chosenState].map((lga,  index) => (
                          <div style={{ backgroundColor: chosenLga.includes(lga)? '#e9e9e9' : "" }} key={index} onClick={() => handleChosenLga(lga)}>
                            {lga}
                          </div>
                        ))
                      }
                    </div>
                    <button onClick={handleSetLocations} className='primary-btn' style={{marginTop: "16px"}} >Done</button>
                  </div>
                </div>}

              { amenitiesOutput &&    <div className="search-output">
                  <div className="locations">
                    <div className="header">
                      <h3>{`Select Amenities`}</h3>
                      <img src="/close.svg" alt="" onClick={() => {
                        setAmenitiesOutput(false)
                      }} />
                    </div>
                    <div className="container">
                      {
                        amenities.map((amenity,  index) => (
                          <div key={index} onClick={() => handleChoosenAmen(amenity)}>
                            {amenity}
                            {
                              filters.amenitiesSelected.includes(amenity) && <img src="/checked.svg" style={{marginLeft: "auto"}} alt="" />
                            }
                          </div>
                        ))
                      }
                    </div>
                    <button onClick={() => {
                        setAmenitiesOutput(false)
                        // dispatchAmenities()

                      }} className='primary-btn' style={{marginTop: "16px"}} >Done</button>
                  </div>
                </div>}

          </div>
          <div id='mobile' className="mobile-filter">
            <label htmlFor="search" className="search" onClick={() => {
                  setShowSearchOutput(true);
                }} >
                  <img src="/search.svg" alt=""  onClick={null} />
                  <p>{filters.location.state? filters.location.state : "search by location"}</p>
                  <input
                    type="text"
                    id="search"
                    // disabled={true}
                    placeholder="search by location" onClick={null} 
                    value={chosenState}
                    style={{display: "none"}}
                  />
          
              </label>

            <div className="filter-icon" onClick={() => {
              setShowMobileFilters(prev => !prev)
            }} >
              <img src="/filter-icon.svg" alt="" />
            </div>

              {
                showMobileFilters && <div className="filter-options">
                <img src="/close.svg" className='close' alt="" onClick={() => {
                                  setShowMobileFilters(false)
                                }} />
                <label htmlFor="listingType" className="filter-item">
                  <img src="/house-icon.svg" alt="" />
                  <select onChange={handleInputChange} name="listingType" id="listingType">
                    <option value="">Listing type</option>
                    <option value={"sell"}>For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="shortlet">Shortlet</option>
                  </select>
                </label>

                <label htmlFor="propertyType" className="filter-item">
                  <img src="/house-icon.svg" alt="" />
                  <select onChange={handleInputChange} name="propertyType" id="propertyType">
                    <option value="">Property type</option>
                    <option value="selfCon">Self Con</option>
                    <option value="flat">Flat</option>
                    <option value="duplex">Duplex</option>
                  </select>
                </label>

                <label htmlFor="Bedrooms" className="filter-item">
                  <img src="/beds.svg" alt="" />
                  <select onChange={handleInputChange} name="bedrooms" id="Bedrooms">
                  <option value={""}>Number of rooms</option>
                  <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                  </select>
                </label>

                <label htmlFor="Bathrooms" className="filter-item">
                  <img src="/bathroom.svg" alt="" />
                  <select onChange={handleInputChange} name="bathrooms" id="Bathrooms">
                  <option value={""}>Number of baths</option>
                  <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </label>

                <label htmlFor="minMax " className="filter-item">
                  <img src="/price-icon.svg" alt="" />
                  <select onChange={handleInputChange} name="minMaxPrice" id="minMax ">
                    <option value={""}>Min-Max price</option>
                    <option value={[300000]}>below 300k</option>
                    <option value={[300000, 500000]}>300k - 500k</option>
                    <option value={[500000, 1000000]}>500k - 1m</option>
                    <option value={[1000000, 2000000]}>1m - 2m</option>
                    <option value={[2000000, 4000000]}>2m - 4m</option>
                    <option value={[4000000]}>4m and above</option>
                  
                  </select>
                </label>
                <label htmlFor="amenities" className="filter-item" onClick={() => {
                  console.log("clicked")
                  setAmenitiesOutput(true);
                }} >
                  <img src="/house-icon.svg" alt=""  style={{marginRight: "16px"}} onClick={null} />
                  <p>{"Amenities"}</p>
                <input
                  type="text"
                  id="amenities"
                  // disabled={true}
                  placeholder="Amenities" onClick={null} 
                  value={"Gym"}
                  style={{display: "none"}}
                />
        
              </label>
                <button onClick={() => {
                  setShowMobileFilters(false)
                }} className='primary-btn' style={{marginTop: "16px"}} >Done</button>

              </div>
              }

              { showSearchOutput &&    <div className="search-output">
                {/* {
                  places.map((place, index) => (
                    <div key={index}>{place}</div>
                  ))
                } */}

                <div className="locations">
                  <div className="header">
                    <h3>{!chosenState? `Select a state` : `Select LGA's in ${chosenState}`}</h3>
                    <img src="/close.svg" alt="" onClick={() => {
                      setShowSearchOutput(false)
                    }} />
                  </div>
                  <div className="container">
                    {
                      !chosenState? stateKeys.map((state, index) => (
                        <div key={index} onClick={() => handleChosenState(state)}>
                          {state}
                        </div>
                      )) : 
                      nigerianStatesAndLGAs[chosenState].map((lga,  index) => (
                        <div style={{ backgroundColor: chosenLga.includes(lga)? '#e9e9e9' : "" }} key={index} onClick={() => handleChosenLga(lga)}>
                          {lga}
                        </div>
                      ))
                    }
                  </div>
                  <button onClick={handleSetLocations} className='primary-btn' style={{marginTop: "16px"}} >Done</button>
                </div>
              </div>}

              
              { amenitiesOutput &&    <div className="search-output">
                  <div className="locations">
                    <div className="header">
                      <h3>{`Select Amenities`}</h3>
                      <img src="/close.svg" alt="" onClick={() => {
                        setAmenitiesOutput(false)
                      }} />
                    </div>
                    <div className="container">
                      {
                        amenities.map((amenity,  index) => (
                          <div key={index} onClick={() => handleChoosenAmen(amenity)}>
                            {amenity}
                            {
                              chosenAmenities.includes(amenity) && <img src="/checked.svg" style={{marginLeft: "auto"}} alt="" />
                            }
                          </div>
                        ))
                      }
                    </div>
                    <button onClick={() => {
                        setAmenitiesOutput(false)
                        dispatchAmenities()

                      }} className='primary-btn' style={{marginTop: "16px"}} >Done</button>
                  </div>
                </div>}
              
              
          </div>
          <div style={{width: "100%"}} >

          <BuyersListingContainer listings={filteredListings}  />
          </div>
        </div>
      
    </div>
  )
}

export default ListingsPage