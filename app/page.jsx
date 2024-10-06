"use client";

import Image from "next/image";
import { Login } from "@/components/AuthModals";
import {
  setSigninModal,
  selectSignInModal,
  setSignupModal,
  selectCurrentUser,
} from "@/lib/store/slices/user.reducer";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { BPropertyCard, Navbar, Footer } from "@/components";
import { useState } from "react";
import { selectAllListings, setLocationFilter, updateOtherFilter } from "@/lib/store/slices/listings.reducer";

export default function Home() {
  const Faq = [
    {
      question: "How trustworthy are your agents?",
      answer:
        "Our agents have been duly verified, so, we are confident in their services",
    },
    {
      question:
        "Are the apartment displayed on the site the same as the one to be paid for?",
      answer:
        "With the help of our agents, all apartments displayed can be inspected by customers before making payment",
    },
    {
      question: "How do I become an Agent on the website?",
      answer:
        "Follow the necessary verification steps on the website and you are a step closer to being an agent",
    },
    {
      question: "How trustworthy are your agents?",
      answer:
        "Our agents have been duly verified, so, we are confident in their services",
    },
    {
      question:
        "Are the apartment displayed on the site the same as the one to be paid for?",
      answer:
        "With the help of our agents, all apartments displayed can be inspected by customers before making payment",
    },
    {
      question: "How do I become an Agent on the website?",
      answer:
        "Follow the necessary verification steps on the website and you are a step closer to being an agent",
    },
  ];
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signInModalOpen = useAppSelector(selectSignInModal);
  const currentUser = useAppSelector(selectCurrentUser);
  const [clickedFaqs, setClickedFaq] = useState([]);
  const allListings = useAppSelector(selectAllListings);
  const [showSearchOutput, setShowSearchOutput] = useState(false)
  const [chosenState, setChosenState] = useState('');
  const [chosenLga, setChosenLga] = useState([]);


  const testimonialSegments = [0, 2, 4, 6];
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const toggleFaq = (x) => {
    let clickedFaq = clickedFaqs.includes(x);

    if (!clickedFaq) {
      setClickedFaq([...clickedFaqs, x]);
    } else {
      let newClickedFaq = clickedFaqs.filter((faq) => faq !== x);
      setClickedFaq([...newClickedFaq]);
    }
  };
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

  

  const handleLoginClick = () => {
    dispatch(setSigninModal(true));
    // console.log(signInModalOpen);
  };

  const openSignupModal = () => {
    dispatch(setSignupModal(true));
    // console.log(signInModalOpen);
  };

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

  const testimonials = [
    {
      name: "Sophia Richards",
      testimonial:
        "The service was outstanding, and the team made everything seamless. I couldn't have asked for a better experience!",
    },
    {
      name: "Michael Thompson",
      testimonial:
        "I'm truly impressed with the level of detail and professionalism. Highly recommended!",
    },
    {
      name: "Isabella Carter",
      testimonial:
        "This was exactly what I needed. The support team went above and beyond to meet my expectations.",
    },
    {
      name: "James Anderson",
      testimonial:
        "I've never encountered such fast and reliable service. Absolutely phenomenal!",
    },
    {
      name: "Emily Bennett",
      testimonial:
        "The user experience is exceptional. Everything was smooth, and the end result exceeded my expectations.",
    },
    {
      name: "David Wilson",
      testimonial:
        "They really know how to deliver quality. I was blown away by the attention to detail and efficiency.",
    },
    {
      name: "Olivia Martin",
      testimonial:
        "A fantastic experience from start to finish! Their team is friendly, professional, and incredibly knowledgeable.",
    },
    {
      name: "Daniel Hughes",
      testimonial:
        "Top-notch service! They kept me informed every step of the way and delivered exceptional results.",
    },
  ];

  const increment = () => {
    console.log("Incre", testimonialIndex);
    if (testimonialIndex === 3) {
      setTestimonialIndex(0);
      return;
    }
    setTestimonialIndex((prev) => prev + 1);
  };

  const decrement = () => {
    console.log("Decre", testimonialIndex);
    if (testimonialIndex === 0) {
      setTestimonialIndex(3);
      return;
    }
    setTestimonialIndex((prev) => prev - 1);
  };

      
  const handleInputChange = (event) => {
    const {name, value} = event.target
    // setstoredLocation({...storedLocation, [name]: value})
    dispatch(updateOtherFilter({key: name, value: value}))
  }

  return (
    <div className="page">
      <Navbar />
      <div className="hero">
        <div className="contain">
          <div className="auto-service-container">
            <h1>
              Discover Your Next <span>Home</span> Effortlessly
            </h1>
            <p>
              Oga Landlord will help you to easily search, compare, and secure
              your dream apartment with our user-friendly platform.
            </p>
          </div>
        </div>
      </div>
      <div className="search-tab">
        <div className="contain">
          <div className="switch">
            <span>Rent</span>
            <span>Buy</span>
          </div>
          <div className="filter">
            <div className="filter-grp">
              <h3>Property Type</h3>
              {/* <p>Select Property Type</p> */}
              <label htmlFor="propertyType" className="filter-item">
                {/* <img src="/house-icon.svg" alt="" /> */}
                <select onChange={handleInputChange} name="propertyType" id="propertyType">
                  <option value="">Select Property type</option>
                  <option value="selfCon">Self Contain</option>
                  <option value="flat">Flat</option>
                  <option value="duplex">Duplex</option>
                </select>
              </label>
            </div>
            <div className="filter-grp">
              <h3>Location</h3>
              <p onClick={() => {
                setShowSearchOutput(true)
              }} >Select Location</p>
            </div>
            <div className="filter-grp">
              <h3>Price</h3>
              {/* <p>Minimum - Maximum Price</p> */}
              <label htmlFor="minMax " className="filter-item">
                {/* <img src="/price-icon.svg" alt="" /> */}
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
            </div>
            <button onClick={() => router.push("/listings")} >Find Property</button>
          </div>
        </div>
      </div>
      <div className="numbers">
        <div className="contain">
          <div className="number">
            <span className="big-text">100+</span>
            <p>24/7 online sales/rentals</p>
          </div>
          <div className="number">
            <span className="big-text">100+</span>
            <p>24/7 online sales/rentals</p>
          </div>
          <div className="number">
            <span className="big-text">100+</span>
            <p>24/7 online sales/rentals</p>
          </div>
          <div className="number">
            <span className="big-text">100+</span>
            <p>24/7 online sales/rentals</p>
          </div>
        </div>
      </div>
      <div className="how">
        <div className="contain">
          <div className="heading">
            <h2>How It Works</h2>
            <p>
              Get familiar with how Oga Landlord works in order to rent or sell
              a property
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="img" style={{ backgroundColor: "#C6F6FF" }}>
                <img src="/how-search.svg" alt="" />
              </div>
              <h4>Search Property</h4>
              <p>
                Search through our listings for rent or sale to get your desired
                property{" "}
              </p>
            </div>
            <div className="step">
              <div className="img" style={{ backgroundColor: "#DEC6FF" }}>
                <img src="/how-register.svg" alt="" />
              </div>
              <h4>Register</h4>
              <p>Sign up with your details to make use of our platform </p>
            </div>
            <div className="step">
              <div className="img" style={{ backgroundColor: "#AEFFB5" }}>
                <img src="/how-connect.svg" alt="" />
              </div>
              <h4>Connect</h4>
              <p>Connect with our trusted sellers within the platform.</p>
            </div>
            <div className="step">
              <div className="img" style={{ backgroundColor: "#FFE6B7" }}>
                <img src="/how-inspect.svg" alt="" />
              </div>
              <h4>Inspect</h4>
              <p>
                Inspect apartments with your connected agents before making
                payments.
              </p>
            </div>
            <div className="step">
              <div className="img" style={{ backgroundColor: "#FFAAFB" }}>
                <img src="/how-kyc.svg" alt="" />
              </div>
              <h4>Complete Kyc</h4>
              <p>Sign up with your details to make use of our platform </p>
            </div>
            <div className="step">
              <div className="img" style={{ backgroundColor: "#FF9EA0" }}>
                <img src="/how-upload.svg" alt="" />
              </div>
              <h4>Upload</h4>
              <p>
                Snap and upload clear property for listing without watermark.
              </p>
            </div>
          </div>

          <div className="f-l-heading">
            <h2>Featured Listings</h2>
            <p>Checkout our listings for your desired property</p>
          </div>

          <div className="f-l">
            {allListings.map((listing, index) => (
              <BPropertyCard key={listing.id} listing={listing} />
            ))}
          </div>

          <div className="faq-heading">
            <h2>Frequently Asked Questions</h2>
            <p>Here are the various questions we get from our customers</p>

            <div className="faq-cont">
              {Faq.map((item, i) => (
                <div
                  className={
                    clickedFaqs.includes(i) ? "faq-card faq-show" : "faq-card"
                  }
                  key={i}
                >
                  <div
                    className="f-c-header"
                    onClick={() => {
                      toggleFaq(i);
                    }}
                  >
                    <span>{item.question}</span>
                    <img src="/faq.svg" alt="faq" />
                  </div>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="banner">
        <div className="contain">
          <h2>
            Subscribe now to be updated about our listings and amazing deals
            that might be available
          </h2>
          <form className="banner-form">
            <input type="email" placeholder="Enter your E-mail " />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="how">
        <div className="contain">
          <div className="heading">
            <h2>Having a Doubt? Hear From Our Customers</h2>
            <p>
              Hear from our amazing customers how our platform have helped them
              in getting their desired apartments
            </p>
          </div>

          <div className="testimonial-cont">
            <span className="left" onClick={decrement}>
              <img src="/left.svg" alt="" />
            </span>
            <div className="testimonials">
              <div className="t-card">
                <div className="head">
                  <p className="name">
                    {testimonials[testimonialSegments[testimonialIndex]].name}
                  </p>
                  {/* <img src="" alt="" className="pfp" /> */}
                </div>
                <div className="content">
                  <p>
                    {`Finding our dream home felt like an overwhelming task until we discovered Oga Landlord. The user-friendly interface made it easy to filter through options based on our specific needs, and the detailed property descriptions and high-quality photos gave us confidence in our choices. We especially appreciated the real-time updates and notifications about new listings. Within weeks, we found the perfect home in the perfect neighborhood. The process was seamless, and we couldn’t be happier with our new place. Oga Landlord made what could have been a stressful experience truly enjoyable!"`}
                  </p>
                  <p>
                    {
                      testimonials[testimonialSegments[testimonialIndex]]
                        .testimonial
                    }
                  </p>
                </div>
              </div>
              <div className="t-card">
                <div className="head">
                  <p className="name">
                    {
                      testimonials[testimonialSegments[testimonialIndex] + 1]
                        .name
                    }
                  </p>
                  {/* <img src="" alt="" className="pfp" /> */}
                </div>
                <div className="content">
                  <p>
                    {`Finding our dream home felt like an overwhelming task until we discovered Oga Landlord. The user-friendly interface made it easy to filter through options based on our specific needs, and the detailed property descriptions and high-quality photos gave us confidence in our choices. We especially appreciated the real-time updates and notifications about new listings. Within weeks, we found the perfect home in the perfect neighborhood. The process was seamless, and we couldn’t be happier with our new place. Oga Landlord made what could have been a stressful experience truly enjoyable!"`}
                  </p>
                  <p>
                    {
                      testimonials[testimonialSegments[testimonialIndex] + 1]
                        .testimonial
                    }
                  </p>
                </div>
              </div>
            </div>
            <span className="right" onClick={increment}>
              <img src="/right.svg" alt="" />
            </span>
          </div>
          <div className="testimonials-mobile">
            <div className="testimonials">
            <div className="t-card">
                <div className="head">
                  <p className="name">
                    {testimonials[testimonialIndex].name}
                  </p>
                  {/* <img src="" alt="" className="pfp" /> */}
                </div>
                <div className="content">
                  <p>
                    {`Finding our dream home felt like an overwhelming task until we discovered Oga Landlord. The user-friendly interface made it easy to filter through options based on our specific needs, and the detailed property descriptions and high-quality photos gave us confidence in our choices. We especially appreciated the real-time updates and notifications about new listings. Within weeks, we found the perfect home in the perfect neighborhood. The process was seamless, and we couldn’t be happier with our new place. Oga Landlord made what could have been a stressful experience truly enjoyable!"`}
                  </p>
                  <p>
                    {
                      testimonials[testimonialIndex]
                        .testimonial
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* <Login /> */}
      {showSearchOutput && (
        <div className="search-output">
          {/* {
                    places.map((place, index) => (
                      <div key={index}>{place}</div>
                    ))
                  } */}

          <div className="locations">
            <div className="header">
              <h3>
                {!chosenState
                  ? `Select a state`
                  : `Select LGA's in ${chosenState}`}
              </h3>
              <img
                src="/close.svg"
                alt=""
                onClick={() => {
                  setShowSearchOutput(false);
                }}
              />
            </div>
            <div className="container">
              {!chosenState
                ? stateKeys.map((state, index) => (
                    <div key={index} onClick={() => handleChosenState(state)}>
                      {state}
                    </div>
                  ))
                : nigerianStatesAndLGAs[chosenState].map((lga, index) => (
                    <div
                      style={{
                        backgroundColor: chosenLga.includes(lga)
                          ? "#e9e9e9"
                          : "",
                      }}
                      key={index}
                      onClick={() => handleChosenLga(lga)}
                    >
                      {lga}
                    </div>
                  ))}
            </div>
            <button
              onClick={handleSetLocations}
              className="primary-btn"
              style={{ marginTop: "16px" }}
            >
              Done
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
