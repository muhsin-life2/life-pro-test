"use client"
import Image from "next/image";
import { useEffect } from "react";
import { useState, useRef, Fragment } from "react";
import 'flowbite'
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import OtpField from "react-otp-field";
import Countdown from "react-countdown";
import { useTimer } from "use-timer";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Modal, ModalOptions, modalPlacement } from 'flowbite'
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper'
import 'swiper/css';
import 'swiper/css/pagination';
import Example from "./categories-accordion";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";
import MenuLanguage from "./auth-modal";
// import MyModal from "./modals-comp";

const Navbar = ({ data, brands_data, sessionServ }) => {
  const { data: session } = useSession()

  const [searchData, setData] = useState({
    results: [
      {
        hits: [
          {
            title: "",
            images: {
              featured_image: "https://www.life-me.com/wp-content/themes/LifePharmacy/assets/images/life-pharmacy-logo-white.png"
            },
            query: ""
          }
        ]
      },

    ]


  })
  const [phoneNumber, setPhoneNumber] = useState('');
  const [signInUsing, signInSet] = useState("");
  const [isPhoneNumberValid, setPhoneNumberValidState] = useState(false);
  const [isEmailValid, setEmailValidState] = useState(false);
  const [state, setState] = useState('');
  const [phoneNumberforOTP, setPhoneNumberforOtp] = useState('');
  const [showElement, setShowElement] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [overlayVisible, setOverlay] = useState(false);
  const [searchClosebtn, setVisibility] = useState(false);
  const [otpPageVisibility, setOtpPageVisibility] = useState(false);
  const [notValidOTPPageVisib, setnotValidOTPPageVisib] = useState(false);
  const [welcomeBackPopUp, setwelcomeBackPopUp] = useState(false);
  const [addNewAddress, setaddNewAddress] = useState(false);
  const [addNewAddressClick, setAddNewAddressClick] = useState(true);

  const [addnewAddressFormVisibility, setaddnewAddressFormVisibility] = useState(false);
  const [availableAddresses, setavailableAddresses] = useState(true);
  const [authModal, setauthModal] = useState(false);
  const [countrySet, setCountry] = useState("https://www.lifepharmacy.com/images/svg/flag-ae.svg")
  const [locationModal, setLocationModal] = useState(false)
  const [sidebarState, setSideBarState] = useState(false)
  // const [formData, setFormData] = useState({
  //   emirate: "",
  //   s_addr: "",
  //   villa: "",
  //   bldg: "",
  //   f_name: "",
  //   city: ""
  // });

  // const validateAddressEntry = () => {
  //   const errors = {};

  //   if (!formData.username) {
  //     errors.username = "Username is required";
  //   }

  //   if (!formData.password) {
  //     errors.password = "Password is required";
  //   }

  //   return errors;
  // };
  // const [formErrors, setFormErrors] = useState({});

  // const handleSubmitAddress = (e) => {
  //   e.preventDefault();

  //   const errors = validate();

  //   if (Object.keys(errors).length === 0) {
  //     // Submit form data
  //   } else {
  //     setFormErrors(errors);
  //   }
  // };

  // const [counterVariable, setcounterVariable] = useState(60)
  // const timer1Ended = startTimer();
  const [showDropdown, setShowDropdown] = useState(false);
  const [AddressDataIndex, setAddressDataIndex] = useState(0);
  const [AddressData, setAddressData] = useState(null);

  const dropdown = useRef(null);
  useEffect(() => {

    if (!showDropdown) return;
    function handleClick(event) {
      // if (dropdown.current && !dropdown.current.contains(event.target)) {
      //   setShowDropdown(false);
      // }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);

  }, [showDropdown]);

  const handleChange = (state) => setState(state);

  // const [seconds, setSeconds] = useState(59);
  const [countDownVisible, setCountDownVisible] = useState(false);

  const { time, start, pause, reset, status } = useTimer({
    initialTime: 59,
    timerType: 'DECREMENTAL',
  });

  function startTimer() {
    start();
    setCountDownVisible(true);
  }

  const stopTimer = () => {
    setCountDownVisible(false);
    reset();
  }


  function isValidCredentials(value) {
    if (value != null) {
      if (isValidPhoneNumber(value)) {
        setPhoneNumberValidState(true);
        setFormData({ ...formData, phone: value });
        signInSet("Phone");
      }
      else {
        setPhoneNumberValidState(false);
      }
    }
  }

  function isValidEmail(e) {
    // var phoneNo = isValidPhoneNumber(document.getElementsByClassName("PhoneInputInput")[0].value)
    // var emailAddress = document.getElementById("emailInput").value;
    var emailAddress = e.target.value
    if (emailAddress != null) {
      if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress))) {
        setEmailValidState(true);
        signInSet("Email");
      }
      else {
        setEmailValidState(false);

      }
    }
  }

  function setFocus() {
    (document.getElementById("sm-searchbox") as HTMLInputElement).focus();
  }

  var i = 1;

  function shopByCatOnMouseOver() {
    (document.getElementById("BeautyCareele") as HTMLInputElement).classList.remove("hidden");
    (document.getElementById("BeautyCarebtn") as HTMLInputElement).classList.add("text-blue-400", "border-l-4", "border-blue-500", "bg-blue-100");
    i = 1;
  }

  function ulListTrigger(e, itemName) {
    var elements = document.getElementsByClassName("list-elements")
    for (var ele of elements) {
      if (!ele.classList.contains("hidden")) {
        ele.classList.add("hidden");
      }
    }
    if (i === 1 && itemName == "BeautyCareele") {
      (document.getElementById("BeautyCarebtn") as HTMLInputElement).classList.remove("text-blue-400", "border-l-4", "border-blue-500", "bg-blue-100");
    }
    if (i === 1 && itemName != "BeautyCareele") {
      (document.getElementById("BeautyCareele") as HTMLInputElement).classList.add("hidden");
      (document.getElementById("BeautyCarebtn") as HTMLInputElement).classList.remove("text-blue-400", "border-l-4", "border-blue-500", "bg-blue-100");
      (document.getElementById(itemName) as HTMLInputElement).classList.remove("hidden");
    }
    else {
      (document.getElementById(itemName) as HTMLInputElement).classList.remove("hidden");
    }
    i++
  }

  function searchButtonOnClick(e) {
    if (window.innerWidth <= 767) {
      document.getElementsByClassName("lg-screen-searchsuggestion-sm")[0].classList.remove("hidden");
      var searchText = (document.getElementById("sm-searchbox") as HTMLInputElement).value

    }
    else {
      document.getElementsByClassName("lg-screen-searchsuggestion-lg")[0].classList.remove("hidden");
      e.currentTarget.classList.add("rounded-t-xl");
      e.currentTarget.classList.remove("rounded-xl");
      var searchText = (document.getElementById("lg-searchbox") as HTMLInputElement).value

    }
    searchButtonOnMouseEnter(searchText)
  }
  function searchBoxClear() {
    (document.getElementById("sm-searchbox") as HTMLInputElement).value = "";
    setVisibility(false);
  }
  function searchButtonOnMouseEnter(query) {
    var myHeaders = new Headers();
    myHeaders.append("X-Algolia-API-Key", "c54c5f0fc2e6bd0c3b97cfa5b3580705");
    myHeaders.append("X-Algolia-Application-Id", "WHCXS2GWOG");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "requests": [
        {
          "indexName": "products",
          "params": "query=" + query
        },
        {
          "indexName": "products_query_suggestions",
          "params": "query=" + query
        }
      ],
      "strategy": "none"
    });

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const res = fetch("https://WHCXS2GWOG-dsn.algolia.net/1/indexes/*/queries", requestOptions)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.log('error while fetching search data', error));

    if (query != "") {
      setVisibility(true);
    }
    else {
      setVisibility(false);

    }
  }
  const refreshData = (asPath: string) => {
    router.replace(asPath);
  }
  function sendOTPtoPhoneNo(pHNumber, type) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw
    if (type === "phone") {
      raw = JSON.stringify({
        "phone": pHNumber
      });
    }
    else if (type === "email") {
      raw = JSON.stringify({
        "email": pHNumber
      });
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    console.log(pHNumber);
    setPhoneNumberforOtp(pHNumber)
    const res = fetch("https://prodapp.lifepharmacy.com/api/auth/request-otp", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error while fetching search data', error));

  }

  function isValidPhoneNoInput(SetOtpVisb) {

    if (SetOtpVisb) {
      (document.getElementById("loginOrSignup") as HTMLInputElement).classList.add("hidden")
      setOtpPageVisibility(true);

      setState('');
      startTimer();

      if (signInUsing === "Phone") {
        const phoneNo = ((document.getElementById("phoneInputOTP") as HTMLInputElement).value).replace(/\+|\s/g, "").trim()
        sendOTPtoPhoneNo(phoneNo, "phone");
      }
      else {
        const emailId = (document.getElementById("emailInput") as HTMLInputElement).value

        // document.getElementById("emailInput").value
        sendOTPtoPhoneNo(emailId, "email");
      }
    }
    else {
      (document.getElementById("loginOrSignup") as HTMLInputElement).classList.remove("hidden")
      setOtpPageVisibility(false);
      stopTimer()
    }
  }

    async function otpIsValid(otpValue) {
      if (signInUsing === "Phone") {
        await signIn('credentials', { phone: phoneNumberforOTP, code: otpValue, isPhone: "true", redirect: false })
          .then(async (res) => {
            if (res?.ok) {
              // setModalAction("authentication-modal", "close")
              await refreshData(router.asPath).then(() => {
                setaddNewAddress(true);
              })
            }
            else {
              // console.log(error)
              setnotValidOTPPageVisib(true)
            }
          })
      }
      else {
        await signIn('credentials', { email: phoneNumberforOTP, code: otpValue, isPhone: "false", redirect: false })
        .then(async (res) => {
        if (res?.ok) {
          await refreshData().then(() => {
            setaddNewAddress(true);
          })

        }
     
       
          else {
            // console.log(error)
            setnotValidOTPPageVisib(true)
          }
      

      })
  //for the address we use the same hook 
  setPhoneNumberValidState(false)
    }
  }

  // function setModalAction(idOfModal:string, modalActions:string) {
  //   var $modalElement = document.getElementById(idOfModal) as HTMLElement;
  //   const modalOptions = {

  //     backdrop: 'dynamic',
  //     backdropClasses: 'hello',
  //     closable: true,
  //     onHide: () => {
  //       console.log('modal is hidden');
  //     },
  //     onShow: () => {
  //       console.log('modal is shown');
  //     },
  //     onToggle: () => {
  //       console.log('modal has been toggled');
  //     }
  //   }

  //   const modal = new Modal($modalElement, modalOptions);
  //   switch (modalActions) {
  //     case "close":
  //       modal.hide()
  //       break;
  //     case "show":
  //       modal.show()
  //       $modalElement.classList.remove("hidden")
  //       break;
  //     default:
  //       console.log("Error Modal Option")
  //       break;
  //   }
  // }

  function addrBlockOnClick(eleId) {
    debugger;
    let addrssBlocks = document.getElementsByClassName("addressBlock")
    for (let addBlock of addrssBlocks) {
      if (addBlock.classList.contains("!bg-blue-500")) {
        addBlock.classList.remove("!bg-blue-500", "!text-white")
        if ((addBlock.querySelector('svg') as SVGSVGElement).classList.contains("!fill-white")) {
          (addBlock.querySelector('svg') as SVGSVGElement).classList.remove("!fill-white")
          // addBlock.querySelector('svg').classList.add("hidden")
        }
      }
    }
    let addressBlock = (document.getElementById(eleId) as HTMLElement)
    addressBlock.classList.add("!bg-blue-500", "!text-white");
    document.getElementsByClassName(eleId)[0].classList.add("!fill-white")
    let indx = eleId.replace("addr", '')
    setAddressDataIndex(indx)
  }
  function saveAddresstoDb() {
    debugger

    // var raw = JSON.stringify({
    //   addressDatas
    // });

    // var requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${session.token.token}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData)
    // };
    // console.log(requestOptions);
    // const res = fetch("https://prodapp.lifepharmacy.com/api/user/save-address", requestOptions)
    //   .then(response => {
    //     if (response.ok) {
    //       setAddressDataIndex(0);
    //       setaddNewAddress(false);
    //       refreshData();
    //       return response.json();
    //     } else {
    //       throw new Error('Request failed');
    //     }
    //   })
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error while fetching search data', error));


  }
  var addressId = sessionServ ? (sessionServ.length != 0 ? (sessionServ[sessionServ.length - 1]?.id) + 1 : 12345 + 1) : ""
  const [formData, setFormData] = useState({
    id: addressId,
    entity_id: 1462724,
    name: "",
    phone: "",
    longitude: "55.272887000000000",
    latitude: "25.219370000000000",
    type: "Home",
    country: "United Arab Emirates",
    state: "",
    city: "",
    area: "Satwa/Badaa",
    street_address: "",
    building: "",
    flat_number: "",
    suitable_timing: "0",
    created_at: "2023-03-16T08:09:22.000000Z",
    updated_at: "2023-03-16T08:09:22.000000Z",
    google_address: "Al Satwa - Dubai - United Arab Emirates",
    additional_info: "",
    belongs_to: "user",
    deleted_at: null,
    is_validated: 1
  });

  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  // const refreshData = async () => {
  //   router.replace(router.asPath);
  // }
  const formDatahandleChange = (e) => {
    debugger
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addressFormOnSubmit = (e) => {
    e.preventDefault();


    // setAddressData(formData)
    // console.log(AddressData);
    saveAddresstoDb()
    console.log(formData);
    // setaddNewAddress(false)

    console.log(AddressDataIndex);

  }

  // function displayedAddress(displayAddressData) {
  //   // console.log(sessionServ);

  //   return `${displayAddressData.building}, ${displayAddressData.flat_number} - ${displayAddressData.street_address} - ${displayAddressData.city} - ${displayAddressData.area} - ${displayAddressData.state} - ${displayAddressData.country}`.substring(0, 30) + '...'
  // }


  // function locationOnClickHandle(sessionData) {
  //   debugger
  //   if (session != null) {
  //     setaddNewAddress(true)

  //     if (sessionData.length > 0) {
  //       setavailableAddresses(true)
  //     }
  //     else if (sessionData.length == 0) {
  //       setAddNewAddressClick(true)
  //     }
  //   }
  //   else {

  //   }

  // }
  const countrySelect = (e) => {
    debugger
    const imgElement = e.target.parentElement.querySelector('img');
    const src = imgElement.getAttribute('src');
    setCountry(src)
  }
  return (
    <>
      <div className="grid grid-flow-col  bg-pink-800 text-white  text-xs px-4 py-2 md:hidden ">
        <a href="#" className="flex justify-start">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" className="w-5 h-7 mr-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <div className="my-auto text-md">Highest Rated Pharmacy App in UAE </div>
        </a>

        <div className="text-end text-md my-auto">Download</div>
      </div>
      <div className="sticky top-0  z-50 bg-white mx-auto opacity-95">

        <div className="bg-[#002579]  backdrop-blur backdrop-filter ">
          <div className="mx-auto flex max-w-[1440px] gap-5  px-4 py-4">
            <Link href={`/home`} className="my-auto">
              <Image src="https://www.lifepharmacy.com/images/logo-white.svg" alt=""
                className=" bg-[#002579] filter md:flex hidden" width={380} height={250} />
              {/* <div onClick={() => { setSideBarState(true) }} className="my-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" data-modal-target="headlessui-dialog-12" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7 lg:hidden md:hidden my-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </div> */}


              <Image className="mr-auto w-7 lg:hidden md:hidden" src="https://www.lifepharmacy.com/images/life.svg" alt="" width={100} height={100} />


            </Link>

            <form className="flex items-center w-full ">
              <label htmlFor="simple-search-lg" className="sr-only">Search</label>
              <div className="relative w-full">

                <div className="relative group-search bg-white  rounded-xl " id="lg-screen-search" onMouseDown={(e) => { searchButtonOnClick(e) }} onInput={(e) => { searchButtonOnMouseEnter((e.target as HTMLInputElement).value) }}  >
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor"
                      viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"></path>
                    </svg>
                  </div>

                  {/* large screen search bar */}
                  < input type="search" id="lg-searchbox"
                    className="  focus:ring-0 focus:ring-offset-0 hidden md:block bg-gray-100 border-gray-200 p-2 border text-gray-900 text-sm rounded-lg  block w-full pl-10 p-3"
                    placeholder="Search for Products..." required />


                  <div className="shadow-xl py-1 pt-4 px-3 lg-screen-searchsuggestion-lg scale-100 hidden absolute top-13  right-0 left-0  bg-white border-gray-200 overflow-auto search-suggestion-height rounded-t-0 rounded-b-md ">
                    {searchData.results[1] ?
                      <>
                        <div className="mb-5 group-search">
                          {searchData?.results[1]?.hits[0] ?
                            <>
                              <h5 className="text-sky-500 text-xs ">SUGGESTIONS</h5>
                              <div className="flex my-2 flex-wrap text-[13px] text-gray-700 group-search">
                                {searchData.results[1].hits.slice(0, 10).map(sug_data => (
                                  <a href="#" className="rounded-xl bg-gray-200 hover:bg-gray-300  py-1 px-3 mb-2 mr-2">{sug_data.query}</a>
                                ))}
                              </div></>

                            : ""}
                        </div>
                        <div className="text-gray-600 text-xs group-search">
                          <h5 className="text-sky-500 text-xs ">PRODUCTS</h5>
                          {searchData.results[0].hits[0] ? searchData.results[0].hits.map(pro_data => (
                            <a href="#" className="p-2 rounded-lg flex  group-search hover:bg-gray-100 w-full h-16">
                              <Image placeholder="blur" blurDataURL="https://www.lifepharmacy.com/images/default-product-image.png" src={pro_data.images.featured_image} height={40} width={40} alt={pro_data.title}></Image>
                              <p className="ml-1  my-auto">{pro_data.title} </p>
                            </a>
                          )) : <div>No Products Found</div>}
                        </div>
                      </> : <div role="status" className="max-w-full animate-pulse">
                        <div className="group-search mb-5">
                          <h5 className="text-xs text-sky-500">SUGGESTIONS</h5>
                          <div className="group-search my-2 flex flex-wrap text-[13px] text-gray-700">
                            <span className="sr-only">Loading...</span>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                          </div>
                          <div className="group-search text-xs text-gray-600">
                            <h5 className="mb-3 text-xs text-sky-500">PRODUCTS</h5>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-3/4">
                                <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-full bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-3/4">
                                <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-full bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>

                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-3/4">
                                <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-full bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>

                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-3/4">
                                <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-full bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>

                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-3/4">
                                <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-full bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>

                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-3/4">
                                <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-full bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>

                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-3/4">
                                <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-full bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>

                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-3/4">
                                <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-full bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>

                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-3/4">
                                <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-full bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-3/4">
                                <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-full bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>


                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  {/* small screen search bar  */}
                  < input type="button" onClick={() => { setFocus() }} data-modal-target="defaultModalsm" data-modal-toggle="defaultModalsm"
                    className=" cursor-pointer text-left md:hidden block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full pl-10 p-3  rounded-full"
                    value="Search for Products..." />

                </div>
              </div>
            </form>

            <div className="grid grid-flow-col w-100 gap-5 md:flex lg:flex my-auto">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className=" flex flex-col md:flex lg:flex" onClick={() => { setauthModal(true) }}>
                  <Image src={countrySet} alt=""
                    className=" rounded-2xl my-auto  h-10 w-10" width={100} height={100} />
                  <div className="text-[11px] text-center text-white">Arabic</div>
                </Menu.Button>
                <MenuLanguage countrySelect={countrySelect} />

              </Menu>
              {/* {session ? <><a href="#" ref={dropdown} onClick={() => { setShowDropdown(!showDropdown) }} className=" flex-col md:hidden lg:flex hidden" id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown">
              <img src="https://cdn-icons-png.flaticon.com/512/309/309748.png?w=740t=st=1678711444~exp=1678712044~hmac=9fdd9608d210eeffcc5069fd9c6888bb3fcb3407e24160947ac7f3c7a85ca203" className="w-9 h-9 my-auto mx-auto" />


              <div className="text-[11px] text-center text-white">Account</div>

            </a>
              {showDropdown ?
                <div id="mega-menu-dropdown" className="hidden lg:flex mt-[70px] absolute z-10  w-auto  text-sm bg-gradient-to-r from-pink-100 to-teal-100 border  border-gray-100 shadow-md    ">
                  <div className="p-4 pb-0 text-gray-900 md:pb-4 ">
                    <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                      <li>
                        <a href="#" className=" text-lg text-gray-800  hover:text-blue-600  ">
                          Signed in as <br /><span className="font-bold">{session.token.name}</span>
                        </a>
                      </li>
                      {session.token.email ? <li>
                        <a href="#" className="text-md  hover:text-blue-600  flex items-center gap-4">

                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 fill-orange-300 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                          {(session.token.email).substring(0, 16) + '...'}
                        </a>

                      </li> : ""}
                      {session.token.phone ?
                        <li>
                          <a href="#" className="text-md  hover:text-blue-600  flex items-center gap-4">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 fill-green-600 text-green-600">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>

                            {session.token.phone}
                          </a>

                        </li> : ""}

                      <li>
                        <a href="#" className="  hover:text-blue-600  flex items-center gap-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 fill-blue-300">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                          </svg>
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a href="#" className="  hover:text-blue-600   flex items-center gap-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 fill-gray-300">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                          Orders
                        </a>
                      </li>
                      <li>
                        <a href="#" className=" hover:text-blue-600  flex items-center gap-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" className="w-6 h-6 text-blue-600 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                          </svg>
                          Return Options
                        </a>
                      </li>
                      <li>
                        <a href="#" className="  hover:text-blue-600  flex items-center gap-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 fill-orange-200">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Wallet
                          <span className="bg-indigo-600 px-2 rounded-lg text-white">$ {session.token.wallet_balance}</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className=" hover:text-blue-600  flex items-center gap-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 fill-green-300 text-gray-800">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                          </svg>
                          Appointments
                        </a>
                      </li>
                      <li>
                        <a href="#" className=" hover:text-blue-600  flex items-center gap-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 fill-gray-300 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                          </svg>
                          Chat with Us
                        </a>
                      </li>
                      <li>
                        <a href="#" onClick={(e) => {
                          e.preventDefault()
                          signOut()
                          refreshData()
                        }} className=" hover:text-blue-600  flex items-center gap-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="w-6 h-6 text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                          </svg>
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                : ""}</> : <a href="#" className=" flex-col md:hidden lg:flex hidden" onClick={() => { setLocationModal(true) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className=" my-auto text-white w-8 h-8 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>

              <div className="text-[11px] text-center text-white">Account</div>
            </a>} */}

              <a href="#" className="flex flex-col md:hidden lg:flex hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="my-auto  text-white w-8 h-8 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <div className="text-[11px] text-center text-white">Cart</div>

              </a>
              <a href="#" className="flex flex-col md:hidden lg:flex hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="my-auto  text-white w-8 h-8 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <div className="text-[11px] text-center text-white">WishList</div>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4  hidden lg:flex md:flex bg-white">
            <div onMouseOver={() => setOverlay(true)} onMouseLeave={() => { setOverlay(false) }} className="group inline-block shop-by-cat ">
              <button
                onMouseOver={() => shopByCatOnMouseOver()} className="group-hover:bg-blue-500 py-[5px]  group-hover:text-white hover:text-white transition-color duration-500 dropdown BeautyCareele  border-r border-gray-500"
                id="dropdownDefaultButton" data-dropdown-toggle="dropdown">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="w-6 h-6 my-2 float-left ml-3">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <div className="text-start mt-2 float-left mr-10 text-sm group-1 ml-2 ">Shop by Category</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="h-6 float-right mt-2 w-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <div className="flex justify-start absolute bg-white  scale-0 group-hover:scale-100 left-0 right-0 ">
                <div className="z-30  bg-white">
                  <ul className="text-sm text-gray-700  rounded-sm transform scale-0 group-hover:scale-100  
              transition duration-100 ease-in-out origin-top bg-white w-[234px] h-full flex flex-wrap border-r-[0.1px] border-gray-400" id="catgories-element">
                    {data.data.map((item, i) => (
                      <li key="{item.name}" onMouseOver={(e) => { ulListTrigger(e, (item.name + "ele").replace(/\s/g, '')) }} className={" group-btn w-full list" + i}>
                        <button id={(item.name + "btn").replace(/\s/g, '')} className="single-btn w-full py-3 transition-all duration-100 ease-in-out pl-5 text-left flex pr-2" >
                          <span className="flex-1 mr-3">  {item.name}   </span>
                          <span className="mr-auto my-auto"> <svg className="fill-current h-4 w-4 transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"> <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>


                <div className="bg-white shadow-lg transform scale-0 group-hover:scale-100  
              z-10 transition duration-150 ease-in-out origin-top text-black  overflow-auto h-[30rem]  w-full hello py-4" >
                  <div className="mx-auto md:w-full xl:w-full mb-5" >
                    <div className="font-bold lg:text-2xl text-center mb-3" >TOP BRANDS</div>
                    <Swiper
                      className="my-6 "
                      slidesPerView={6}
                      onSlideChange={() => console.log('slide change')}
                      autoplay={{
                        delay: 10,
                        disableOnInteraction: false,
                      }}
                      speed={3000}
                      modules={[Autoplay]}
                      loop={true}
                      breakpoints={{
                        // when window width is >= 640px
                        1024: {
                          width: 1024,
                          slidesPerView: 7,
                        },
                        // when window width is >= 768px
                        768: {
                          width: 768,
                          slidesPerView: 6
                        },
                      }}
                    >

                      {brands_data.data.brands.map(bd => (
                        <SwiperSlide className="cursor-grab">
                          <div >
                            <Image className="mx-auto md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-24 xl:h-24 rounded-full border border-gray-300 " width={150} height={150} src={bd.images.logo} alt="" />
                          </div>
                        </SwiperSlide>
                      ))}

                    </Swiper>
                  </div>
                  {data.data.map((item) => (
                    <div className="w-full hidden list-elements" id={(item.name + "ele").replace(/\s/g, '')} onMouseOver={() => { (document.getElementById((item.name + "btn").replace(/\s/g, '')) as HTMLElement).classList.add("text-blue-500", "border-l-4", "border-blue-500", "bg-blue-100") }} onMouseLeave={() => { ((document.getElementById((item.name + "btn").replace(/\s/g, '')) as HTMLElement)).classList.remove("text-blue-500", "border-l-4", "border-blue-500", "bg-blue-100") }}>

                      <ul className={"right-0 u-list bg-white rounded-sm top-0 hover-menu  h-[35rem] ul-list-hover w-full " + (item.name + "ele").replace(/\s/g, '')} >

                        <li key="" className="">

                          <div className=" mb-9 ">
                            <div className="flex justify-between  w-full flex-wrap">

                              <div className="  lg:order-none md:w-full">

                                <Example acc_data={item.children} />

                              </div>


                              {/* <div className="mx-auto md:w-full xl:w-full ">
                                <div className="font-bold lg:text-xl text-center mb-6">TOP BRANDS</div>
                                <div className="grid xl:grid-cols-4 md:grid-cols-4  lg:grid-cols-3  gap-x-0 gap-y-3 ">
                                  {brands_data.data.brands.map(bd => (
                                    <div className="">
                                      <Image className="mx-auto md:w-3/5 rounded-full border border-gray-200 border-2" width={150} height={150} src={bd.images.logo} alt="" />
                                    </div>
                                  ))}
                                </div>
                              </div> */}
                            </div>
                          </div>                            {/* <div className="md:order-last  xl:order-first order-last md:w-full xl:w-fit">
                              <div className="grid xl:grid-cols-2 md:grid-cols-4 grid-cols-4 gap-x-3 gap-y-3 cat-elements">
                                {categoryChildrenData(item.children)}
                              </div>
                            </div> */}

                          {/* <div className="w-full xl:w-fit">
                              <div className="xl:grid xl:grid-cols-2 xl:gap-3 md:flex md:justify-center">
                                {item.children.slice(0, 6).map(ch => ch.sections.slice(0, 1).map(ch_d => (
                                  <div className="mr-2 my-6">
                                    <Image className="xl:w-full  mx-auto border border-orange-300 rounded-full border-4" width={120} height={120} src={ch_d.images.logo} alt="" />
                                  </div>
                                )
                                ))}
                              </div>
                            </div> */}
                          {/* <div className="flex justify-between mb-8 md:overflow-x-auto  lg:overflow-x-hidden ">
                            <img src="https://lifeadmin-app.s3.me-south-1.amazonaws.com/images/wKrhVokNa5xAvYMcytO6VYHqFXeCS2xYTEgdG6Wo.png?format=webp&quality=85" width="23%" height="30%" className="rounded-2xl h-23 mr-2 md:w-[17rem] lg:w-1/4" />
                            <img src="https://lifeadmin-app.s3.me-south-1.amazonaws.com/images/YEmBjxI1WX7Ru8Q6sqTZqoce9w7Sg6GWUnPmWvox.png?format=webp&quality=85" width="23%" height="30%" className="rounded-2xl h-23 mr-2 md:w-[17rem] lg:w-1/4" />
                            <img src="https://lifeadmin-app.s3.me-south-1.amazonaws.com/images/0zDwx4Jk2dRxRkfvkP5WUQg3145T9fcty9W8fX9D.jpg?format=webp&quality=85" width="23%" height="30%" className="rounded-2xl h-23 mr-2 md:w-[17rem] lg:w-1/4" />
                            <img src="https://lifeadmin-app.s3.me-south-1.amazonaws.com/images/0XOZfkxB4f3FtPxW6JOaVgTpGedzxeVj8UowQIDz.jpg?format=webp&quality=85" width="23%" height="30%" className="rounded-2xl h-23 mr-2 md:w-[17rem] lg:w-1/4" />
                          </div> */}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            <div className="flex space-x-6 bg-white ">
              <div className="group inline-block mr-2">
                <button className="hover:text-blue-500 ml-7 py-1" data-dropdown-toggle="dropdown2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="w-6 h-6 my-2 float-left mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                  <div className=" text-start mt-2 float-left font-bold uppercase">Brands</div>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className=" h-6 float-left mt-2 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg> */}
                </button>
                <ul
                  className="bg-white shadow-lg transform scale-0 group-hover:scale-100 absolute 
                z-10 transition duration-150 ease-in-out origin-top hidden group-hover:flex flex-col absolute left-0 px-5 py-0 text-black left-0 right-0 overflow-auto h-[30rem]">
                  <li>
                    <div className="grid grid-cols-5 gap-5" id="brands-section">
                      {brands_data.data.brands.map(bd => (
                        <div className="grid-flow-row mb-5"> <div className="flex flex-col mr-5">
                          <Image className="mx-auto rounded-full border border-white bg-white shadow-md" width={150} height={150} src={bd.images.logo} alt="" />
                          <h5 className="text-center mt-3">{bd.name} </h5>
                        </div></div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
              <div className="group inline-block mr-2">
                <button className="hover:text-blue-500 mt-1 py-1 group"
                  data-dropdown-toggle="dropdown8">

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="float-left mt-1 w-4 h-6 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>

                  <div className=" text-start mt-1 float-left uppercase font-bold">Offers</div>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className=" h-6 float-left mt-1 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg> */}

                </button>
                <ul className="py-2 text-sm text-gray-700  border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 bg-white z-10">
                  <ul className="py-2 text-sm text-gray-700  " aria-labelledby="dropdownDefaultButton">
                    <li>
                      <p className="block pr-20 pl-5 py-2 font-bold">Offer Details</p>
                    </li>
                    <li>
                      <a href="#" className="block pr-20 pl-5 py-2 hover:text-blue-400">Clearance
                        Sale</a>
                    </li>
                    <li>

                      <a href="#" className="block pr-20 pl-5 py-2 hover:text-blue-400">Sports
                        Nutrition</a>
                    </li>
                    <li>
                      <a href="#" className="block pr-20 pl-5 py-2  hover:text-blue-400">Preventive
                        Care</a>
                    </li>
                    <li>
                      <a href="#" className="block pr-20 pl-5 py-2 hover:text-blue-400">First
                        Aid</a>
                    </li>
                    <li>
                      <a href="#" className="block pr-20 pl-5 py-3 hover:text-blue-400">Sunshine
                        Nutrition</a>
                    </li>
                  </ul>
                </ul>
              </div>

              <button className="hover:text-blue-500 mb-3 py-1" data-dropdown-toggle="dropdown4">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="w-6 h-6 mt-1 float-left mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                </svg> */}

                <div className="text-start mt-2 float-left uppercase font-bold">Health Packages</div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className=" h-6 float-left mt-2 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg> */}
              </button>
            </div>
          </div>
        </div>



      </div>
      {/* <div className="bg-pink-700">
          <div className="grid grid-cols-2 py-1 px-4 max-w-[1440px] mx-auto text-white lg:flex md:flex hidden  text-xs " >
            <div className="my-auto"> Highest Rated Pharmacy App in UAE | Rating | Download </div>
            <div className="text-end ml-auto"> <span className="font-bold">DELIVER TO:</span> {sessionServ && sessionServ?.length != 0 ? (displayedAddress(sessionServ[AddressDataIndex])) : "Select a Location"}
                <button

                  className="bg-white text-black rounded px-3 ml-3 py-1">CHANGE</button>
              </div>
          </div>
        </div> */}

      <div className="sm:visible md:hidden ">

        {/* <div className="px-4 py-2 flex ">
            <Image className="mr-auto w-7" src="https://www.lifepharmacy.com/images/life.svg" alt="" width={100} height={100} />
            <form className="flex items-center w-3/4">
              <label for="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <input type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-4     dark:focus:border-blue-500"
                  placeholder="Search for Products..." required />
              </div>
            </form>
            <div className="ml-auto mt-auto">
              <Image src="https://www.lifepharmacy.com/images/svg/flag-ae.svg" alt=""
                className="bg-pink-700 my-auto rounded-lg w-fit" width={100} height={100} />
              <div className="text-sm">Arabic</div>
            </div>
          </div> */}

        <div className="grid grid-flow-col  bg-indigo-900 text-white text-xs px-4 py-2">
          <div>DELIVER TO: Business Bay, Dubai </div>
          <button className="bg-white rounded text-pink-700 w-20 ml-auto">CHANGE</button>
        </div>
      </div>
      {showElement ? (
        <div className="rounded-xl sm:py-5 py-3   fixed bottom-28 inset-x-0 md:px-5 px-2 mx-2 border border-gray-300 flex justify-between md:text-xs bg-white sm:visible lg:w-6/12 lg:ml-auto bg-white z-20 text-[10px]">
          <div className="text-indigo-900 font-bold sm:text-[12px] text-[8px] my-auto">Add your location to get an accurate delivery time</div>
          <div className="flex justify-evenly">
            <button onClick={() => setIsOpen(true)} className="text-pink-900 font-semibold sm:text-xs text-[9px] my-auto">Select your area</button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" className="sm:w-4 sm:h-4 w-3 h-3  ml-2 mr-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <button onClick={() => setShowElement(!showElement)} aria-label="Close Show Element">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" className="sm:w-6 sm:h-6  w-3 h-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : ""}


      {/* {isOpen && (
          <div id="modal-new" className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50 top-1/2">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative w-full h-full max-w-lg min-w-sm mx-auto h-auto">
              <div className="relative bg-white rounded-lg shadow ">
                <div className="flex items-center justify-between rounded-t ">
                  <button type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
                    data-modal-hide="medium-modal">
                    <button onClick={() => setIsOpen(false)}>
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                      </svg>
                    </button>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <h3 className="text-2xl font-medium text-blue-400  text-center">
                    Where do you want the delivery?
                  </h3>
                  <p className="text-base leading-relaxed text-gray-500  text-center">
                    By knowing your area, we will be able to provide instant delivery from the nearest Life
                    store around you! </p>
                  <button className="ml-auto bg-blue-400 p-3 text-white rounded-xl w-full">Detect My Location</button>
                  <h3 className="text-xl font-medium  text-center">
                    OR
                  </h3>
                  <div className="flex">
                    <select id="states"
                      className=" flex-shrink-0 rounded-l-lg bg-gray-50 text-gray-900 text-sm  block  p-2.5   ">
                      <option selected>Ship To</option>
                      <option value="CA">UAE</option>
                      <option value="TX">KSA</option>
                    </select>
                    <label for="states" className="sr-only">Type Location</label>
                    <input type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 border-l-2  block w-full p-2.5     " placeholder="Type a Location" />
                  </div>
                  <a href="#"><h3 className="text-xl font-medium text-blue-400  text-center underline mt-16">
                    Or Login Now
                  </h3></a>
                  <p className="text-base leading-relaxed text-gray-500  text-center">
                    Get access to My Address, Orders & Prescriptions in your profile section.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )} */}


      {/* <button  className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
          Toggle modal
        </button> */}



      <div id="location-modal" aria-hidden="true" className="hidden fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto h-modal justify-center items-center" >
        <div id="overlay" className=" fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
        </div>

        <div className="relative w-full h-full max-w-lg md:h-auto">

          <div className="relative bg-white rounded-lg shadow  mt-3">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  " >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <div className="relative bg-white rounded-lg shadow ">
                {/* <div className="flex items-center justify-between rounded-t ">
                    <button type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
                      data-modal-hide="medium-modal">
                  
                    </button>
                  </div> */}
                <div className="p-3 space-y-6 mt-3">
                  <h3 className="text-2xl font-semibold text-blue-500  text-center mt-6">
                    Where do you want the delivery?
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500  text-center">
                    By knowing your area, we will be able to provide instant delivery from the nearest Life
                    store around you! </p>
                  <button className="flex items-center ml-auto bg-blue-400 p-3 text-white rounded-xl w-full justify-center">

                    <span><Image src={"  https://www.lifepharmacy.com/images/svg/location-white.svg"} className="w-5 h-5 mr-5" alt="location" height={50} width={50}></Image></span>
                    Detect My Location</button>
                  <h3 className="text-xl font-medium  text-center">
                    OR
                  </h3>
                  <div className="flex">
                    <select id="states"
                      className=" flex-shrink-0 rounded-l-lg border-none border bg-gray-50 text-gray-900 text-sm  block  p-2.5   ">
                      <option selected>Ship To</option>
                      <option value="CA">UAE</option>
                      <option value="TX">KSA</option>
                    </select>
                    <label className="sr-only">Type Location</label>
                    <input type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-300 border-l-2  block w-full p-2.5     " placeholder="Type a Location" />
                  </div>
                  <a href="#"><h3 className="text-xl font-medium text-blue-400  text-center underline mt-8"  >
                    Or Login Now
                  </h3></a>
                  <p className="text-base leading-relaxed text-gray-500  text-center">
                    Get access to My Address, Orders & Prescriptions in your profile section.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="defaultModalsm" aria-hidden="true"
        className=" fixed top-0 right-0 left-0 z-50 flex items-start justify-center  hidden "
        role="dialog" aria-modal="true" data-headlessui-state="open" >
        <div className="fixed inset-0 bg-slate-900/25 opacity-80 backdrop-blur transition-opacity"></div>
        <div className="relative  w-full scale-100 transform opacity-100 transition-all ">
          <div className="relative bg-white w-full  p-2 px-3">
            <div className="flex w-full py-2 ">
              <button type="button"
                className="mr-3  text-gray-800 bg-transparent  rounded-lg text-sm     "
                data-modal-hide="defaultModalsm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="flex-1 overflow-hidden rounded-sm  px-1"
                id="headlessui-dialog-panel-23" data-headlessui-state="open">
                <div className="relative ">
                  {/* <svg className="pointer-events-none absolute top-2 left-4 h-6 w-6 fill-slate-400"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z">
                    </path>
                  </svg> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" fill-slate-400 pointer-events-none absolute top-1 left-4 w-4 h-6">
                    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
                  </svg>

                  <input type="text" id="sm-searchbox"
                    className="placeholder:text-sm border-none bg-gray-100 rounded-full  block w-full  focus:ring-0  py-[5px] pl-12   text-slate-900 placeholder:text-slate-500 sm:text-sm sm:leading-6 pr-10"
                    placeholder="Search for products . . ." onInput={(e) => { searchButtonOnMouseEnter((e.target as HTMLInputElement).value) }} />

                  {searchClosebtn ? <button onClick={() => { searchBoxClear() }} type="button"
                    className="text-gray-800    text-center   rounded-lg text-sm   absolute top-[5px] right-2"
                  >
                    {/* <svg aria-hidden="true" stroke-width="0.5" className="w-5 h-5 fill-gray-800 rounded-full " fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                      </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <span className="sr-only">Close modal</span>
                  </button> : ""}



                </div>
              </div>
            </div>


            <div className=" pt-6 px-4 lg-screen-searchsuggestion-sm scale-100 hidden absolute top-15  right-0 left-0  bg-white  overflow-auto  rounded-t-0 rounded-b-md ">
              {searchData.results[1] ?
                <>
                  <div className="mb-5 group-search">
                    {searchData.results[1]?.hits[0] ?
                      <>
                        <h5 className="text-sky-500 text-xs ">SUGGESTIONS</h5>
                        <div className="flex my-2 flex-wrap text-[13px] text-gray-700 group-search">
                          {searchData.results[1].hits.slice(0, 10).map(sug_data => (
                            <a href="#" className=" rounded-xl bg-gray-200 hover:bg-gray-300  py-1 px-3 mb-2 mr-2">{sug_data.query}</a>
                          ))}
                        </div></>

                      : ""}
                  </div>
                  <div className="text-gray-600 text-xs group-search">
                    <h5 className="text-sky-500 text-xs ">PRODUCTS</h5>
                    {searchData.results[0].hits[0] ? searchData.results[0].hits.map(pro_data => (
                      <a href="#" className="sugg-pro group-search">
                        <Image src={pro_data.images.featured_image} height={40} width={40} alt={pro_data.title}></Image>
                        <p className="ml-1  my-auto">{pro_data.title} </p>
                      </a>
                    )) : <div className="py-12 text-center"><i>No Products Found</i></div>}
                  </div>
                </> : <div role="status" className="max-w-full animate-pulse">
                  <div className="group-search mb-5">
                    <h5 className="text-xs text-sky-500">SUGGESTIONS</h5>
                    <div className="group-search my-2 flex flex-wrap text-[13px] text-gray-700">
                      <span className="sr-only">Loading...</span>
                      <div className="loading-style"></div>
                      <div className="loading-style"></div>
                      <div className="loading-style"></div>
                      <div className="loading-style"></div>
                      <div className="loading-style"></div>
                      <div className="loading-style"></div>
                    </div>
                    <div className="group-search text-xs text-gray-600">
                      <h5 className="mb-3 text-xs text-sky-500">PRODUCTS</h5>

                      <div role="status" className="mb-3 flex">
                        <div className="loading-img"></div>
                        <div className="h-10 w-3/4">
                          <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                          <div className="mb-4 h-5 w-3/4 bg-gray-200 "></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div role="status" className="mb-3 flex">
                        <div className="loading-img"></div>
                        <div className="h-10 w-3/4">
                          <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                          <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div role="status" className="mb-3 flex">
                        <div className="loading-img"></div>
                        <div className="h-10 w-3/4">
                          <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                          <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div role="status" className="mb-3 flex">
                        <div className="loading-img "></div>
                        <div className="h-10 w-3/4">
                          <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                          <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div role="status" className="mb-3 flex">
                        <div className="loading-img"></div>
                        <div className="h-10 w-3/4">
                          <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                          <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div role="status" className="mb-3 flex">
                        <div className="loading-img"></div>
                        <div className="h-10 w-3/4">
                          <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                          <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div role="status" className="mb-3 flex">
                        <div className="loading-img"></div>
                        <div className="h-10 w-3/4">
                          <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                          <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div role="status" className="mb-3 flex">
                        <div className="loading-img"></div>
                        <div className="h-10 w-3/4">
                          <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                          <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div role="status" className="mb-3 flex">
                        <div className="loading-img "></div>
                        <div className="h-10 w-3/4">
                          <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                          <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div role="status" className="mb-3 flex">
                        <div className="loading-img"></div>
                        <div className="h-10 w-3/4">
                          <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                          <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div role="status" className="mb-3 flex">
                        <div className="loading-img"></div>
                        <div className="h-10 w-3/4">
                          <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                          <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={locationModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => { setLocationModal(false) }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div id="loginOrSignup">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold  text-blue-500  mb-3"
                    >
                      <h3>Login Or SignUp</h3>
                    </Dialog.Title>

                    <form className="space-y-6" action="#" >
                      <div className="mt-3 flex-1">
                        <Tabs value="phone" className="border-none ">
                          <TabsHeader >
                            <Tab key="phone" value="phone">
                              Using Phone
                            </Tab>
                            <Tab key="email" value="email">
                              Using Email
                            </Tab>
                          </TabsHeader>
                          <TabsBody >
                            <TabPanel key="phone" value="phone" >
                              <div>
                                <label className=" block mb-2 font-medium text-gray-900
 ">Enter your mobile number <span className="text-red-500">*</span></label>
                                <div className="relative border border-gray-300 pl-3 rounded-lg">
                                  <PhoneInput
                                    placeholder="Enter phone number"
                                    value={phoneNumber}
                                    onChange={isValidCredentials}
                                    international
                                    defaultCountry="AE"
                                    id="phoneInputOTP"
                                  />
                                  {isPhoneNumberValid ?
                                    <div
                                      className="absolute top-[21px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
                                    >
                                      <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                      </svg>

                                    </div> : ""}

                                </div>
                              </div>
                            </TabPanel>
                            <TabPanel key="email" value="email" >
                              <div className="relative">
                                <label className="block mb-2  font-medium text-gray-900
">Please enter your email <span className="text-red-500">*</span></label>
                                <input onChange={isValidEmail} id="emailInput" type="text" name="email" className="text-md font-semibold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5" placeholder="Your Email Address" required />
                                {isEmailValid ?
                                  <div
                                    className="absolute top-[60px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                                    <i className="">
                                      <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                      </svg>
                                    </i>
                                  </div> : ""}
                              </div>
                            </TabPanel>
                          </TabsBody>
                        </Tabs>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between mb-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                            </div>
                            <div className="text-sm  text-gray-500 ">
                              By continuing, I agree to the <span><a href="#" className="text-blue-500">Terms of Use</a></span> & <span><a href="#" className="text-blue-500">Privacy Policy</a></span>
                            </div>
                          </div>
                        </div>
                        <button type="button" disabled={isPhoneNumberValid || isEmailValid ? false : true} onClick={() => { isValidPhoneNoInput(true) }} className={"bg-blue-500 disabled:bg-blue-300" + (" flex justify-center w-full text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ")}>
                          <p className="mr-4">PROCEED</p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                  {otpPageVisibility ?

                    <div className="" id="otpPage">
                      <h3 className="mb-3 text-2xl font-bold text-blue-500 ">OTP Code</h3>
                      <label className="block mb-2 font-medium text-gray-900
">Please check your {signInUsing} and enter the OTP code  <span className="text-red-500">*</span></label>

                      <form className="space-y-6" action="#" >

                        <OtpField
                          value={state}
                          onChange={handleChange}
                          numInputs={4}
                          classNames={"flex justify-center "}
                          inputProps={{ className: 'sm:!w-[90px] w-[60px]  mr-5 text-3xl text-center font-bold h-[60px] border-blue-400 focus:ring-0 border-b-4 border-t-0 border-x-0 bg-transparent' }}
                        />


                        <div className="flex justify-between">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                            </div>
                            {/* {countDownVisible  ? <div className="text-sm  text-gray-500" id="seconds-count">
                                Didn't Receive Code? <div className="flex">Request again in {time != 0 ? time : stopTimer()} seconds</div>
                              </div> : <button onClick={() => { isValidPhoneNoInput(true) }} type="button" className="bg-white hover:bg-blue-600 px-3 py-2 rounded-lg border text-blue-500 border-blue-500  hover:text-white text-xs tracking-widest" >RESEND OTP</button>
                              } */}

                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button onClick={() => { isValidPhoneNoInput(false) }} className="bg-white border border-gray-600  justify-center w-1/2 flex items-center focus:bg-black active:text-white focus:text-white hover:bg-gray-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            <p className="ml-4">Back</p>
                          </button>
                          <button type="button" onClick={(e) => {
                            e.preventDefault()
                            // otpIsValid(state)
                          }} disabled={state.length === 4 ? false : true} className={" disabled:bg-blue-300 bg-blue-500  items-center flex justify-center w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "}>
                            <p className="mr-4">PROCEED</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </button>
                        </div>
                      </form>
                    </div> : null}



                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


      {notValidOTPPageVisib ? <>

        <div id="popup-modal" className="z-100 shadow-md  fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50  overflow-y-auto overflow-x-hidden p-4  md:h-auto h-[calc(100%-1rem)] ">

          <div className="shadow-lg relative h-full w-full max-w-md md:h-auto bg-white rounded-3xl">
            {/* <button type="button" className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900  " data-modal-hide="popup-modal">
                  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button> */}
            <div className="rounded-t-3xl bg-red-500 p-6 text-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-auto h-28 w-28">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className=" p-5 text-center">
              <h3 className="mb-5 text-center text-3xl font-bold">Oops</h3>
              <p className=" font-semibold text-gray-600">Something went wrong!</p>
              <p className=" font-semibold text-gray-600">Invalid code. Please enter the correct code.</p>
              <button onClick={() => { setnotValidOTPPageVisib(false) }} type="button" className="mt-10 rounded-lg border border-gray-200 bg-red-500 px-5 py-1.5 text-sm font-medium text-white hover:bg-red-700 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 ">OK</button>
            </div>

          </div>
        </div>
      </>
        : ""}
      {/* {successOTP ? <>
          <div id="popup-modal" tabindex="-1" className="z-100 fixed top-1/2 left-1/2 z-50 h-[calc(100%-1rem)]  -translate-y-1/2 -translate-x-1/2 overflow-y-auto overflow-x-hidden p-4 shadow-md md:h-auto w-96 rounded-b-3xl">
            <div className="relative h-full w-full max-w-md  bg-white md:h-auto rounded-3xl">
              <button type="button" className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900  " data-modal-hide="popup-modal"></button>
              <div className="rounded-t-3xl bg-green-400 p-6 text-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-36 h-36 relative mx-auto">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-auto h-10 w-10 absolute inset-0 top-[75px]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="p-5 text-center">
                <h3 className="mb-5 text-center text-3xl font-bold">Verified Device</h3>
                <p className="font-semibold text-gray-600">Sign in Successfull</p>

                <button type="button" onClick={() => { setOTPSucessState(false) }} className="mt-10 rounded-lg border border-gray-200 bg-green-400 px-5 py-1.5 text-sm font-medium text-white hover:bg-green-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200">OK</button>
              </div>
            </div>
          </div>


        </>
          :""} */}
      {sessionServ && addNewAddress ?
        <div id="addNewAddressModal" aria-hidden="true" className=" fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)]  flex justify-center items-center no-scrollbar">
          <div id="overlay" className=" fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          </div>
          {sessionServ.length === 0 && addNewAddressClick ? <div className="relative w-full h-full max-w-2xl md:h-auto ">
            <div className=" bg-white rounded-lg shadow  h-full overflow-y-auto no-scrollbar">
              <div className="flex items-start justify-between ">

                <button type="button" className="text- bg-transparent  hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto absolute -right-4 -top-4 inline-flex items-center  " onClick={() => { setaddNewAddress(false) }}>
                  <svg aria-hidden="true" className="w-6 h-6 bg-red-400 rounded-full p-1 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="px-6 py-3 space-y-6">
                <img src="https://www.lifepharmacy.com/images/map.svg" alt="" className="w-36" />
                {/* <Map address={'1600 Amphitheatre Parkway, Mountain View, CA'} /> */}

                <div className="py-5">
                  <h5 className="text-indigo-800 font-bold pb-1">You have no saved Addresses</h5>
                  <p className="text-gray-400 text-sm py-1">Start by adding a new address</p>
                </div>
              </div>
              <div className="flex items-center px-5 pb-2 space-x-2 border-t border-gray-200 rounded-b  sticky bottom-0">
                <button type="button" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full px-5 py-2.5 text-center text-xs" onClick={() => {
                  setAddNewAddressClick(false)
                  setaddnewAddressFormVisibility(true)
                }}>ADD NEW ADDRESS</button>
              </div>
            </div>
          </div> :
            ""}

          {sessionServ.length > 0 && availableAddresses ? <div className="relative h-full  w-full max-w-4xl  ">
            <div className="h-fit overflow-y-auto overflow-x-hidden rounded-lg bg-white shadow  no-scrollbar ">
              <div className="flex items-start justify-between">
                <button onClick={() => {
                  setaddNewAddress(false)
                  setavailableAddresses(false)
                }} type="button" className=" absolute -right-4 -top-4 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm hover:text-gray-900  ">
                  <svg className="h-6 w-6 rounded-full bg-red-400 p-1 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fill-rule="evenodd" clip-rule="evenodd"></path></svg><span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="space-y-3 px-6 py-5 ">
                <div className="flex justify-between">
                  <div className="flex space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <h5 className=" font-bold text-indigo-800">Addresses</h5>
                  </div>
                  <button className="rounded-lg bg-blue-500 px-3 py-2 text-sm uppercase text-white" onClick={() => {
                    setavailableAddresses(false)
                    setaddnewAddressFormVisibility(true)
                  }}>Add New Address</button>
                </div>

                <h5 className="rounded-full bg-blue-300 px-2 py-1 text-sm font-bold text-indigo-800">SELECTED ADDRESS</h5>

                {sessionServ.map((addr, indx) => (

                  <div className={(indx === 0 ? "!bg-blue-500 !text-white " : "") + "text-gray-500 flex justify-between space-x-2  px-4 py-4 cursor-pointer rounded-lg addressBlock border-2 border-gray-200"} id={indx + "addr"} onClick={() => { addrBlockOnClick(indx + "addr") }}>


                    {/* <input type="radio" className="mb-auto m-1 focus:ring-0 w-3 h-3" /> */}
                    <div className="">
                      <div className="flex space-x-4">
                        <div className="flex-col flex  font-bold text-sm">
                          <h5 className="  ">NAME:</h5>
                          <h5 className="  ">ADDRESS:</h5>
                          <h5 className="">PHONE:</h5>
                        </div>
                        <div className="text-sm">
                          <h5 className="  font-medium ">{addr.name}</h5>
                          <h5 className="  font-medium">{addr.area} - {addr.state} - {addr.country}</h5>
                          <h5 className="  font-medium">{addr.phone}</h5>
                        </div>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={(indx === 0 ? "!fill-white" : "") + " w-6 h-6 fill-gray-200 my-auto  " + (indx + 'addr')}>
                      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                    </svg>
                  </div>
                ))}


                <div className="flex bg-pink-100 p-2 text-xs text-blue-800 ">Changing your delivery address might affect the availability of some items in your cart, please remember to review you cart if or one you switch addresses.</div>


              </div>
              <div className="w-full bg-white px-6 py-3 sticky bottom-0">
                <button className="text-[11px]  px-3 py-2 w-full text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => { setaddNewAddress(false) }} >CONFIRM ADDRESS</button>
              </div>
            </div>

          </div> : ""}



          {addnewAddressFormVisibility ?
            <div className="max-w-4xl relative h-full w-full ">
              <div className="relative   rounded-lg h-fit overflow-y-auto no-scrollbar bg-white">
                <div className="absolute top-3 left-2.5 flex">
                  <button type="button" className=" ml-auto inline-flex items-center rounded-lg bg-white bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900  " onClick={() => {
                    setaddNewAddress(false)
                    setaddnewAddressFormVisibility(false)
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="h-4 w-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>

                    <span className="sr-only">Close modal</span>
                  </button>
                  <h3 className="ml-3 text-sm font-bold text-indigo-800  p-1.5">Your Address</h3>

                </div>


                <div className="px-6 pt-16 pb-4 bg-white">
                  <form className="space-y-3 " onSubmit={addressFormOnSubmit}>
                    <div>
                      <label className="mb-3 block w-fit rounded-full bg-indigo-800 px-3 py-1 text-[10px] font-semibold text-white ">PERSONAL DETAILS</label>
                      <input type="text" name="name" value={formData.name} onChange={formDatahandleChange} onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={"focus:outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500      addressFormInputEle"} placeholder="Full Name *"
                        required />

                    </div>
                    <div>
                      <label className=" text-sm block mb-2 font-medium text-gray-90 file: ">Enter your mobile number <span className="text-red-500">*</span></label>
                      <div className="relative border border-gray-300 pl-3 rounded-lg">
                        <PhoneInput
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={isValidCredentials}
                          international
                          defaultCountry="AE"
                          id="phoneInputOTPAddress"
                          name="phone"
                          required
                        />
                        {isPhoneNumberValid ?
                          <div
                            className="absolute top-[16px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
                          >
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>

                          </div> : ""}
                      </div>
                    </div>
                    <div>
                      <label className="mb-3 block w-fit rounded-full bg-indigo-800 px-3 py-1 text-[10px] font-semibold text-white ">ADDRESS DETAILS</label>

                      <div className="flex w-1/2">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900    ">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                          </svg>
                        </span>

                        <select id="type" name="type" value={formData.type} onChange={formDatahandleChange} className="focus:outline-none block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm">
                          <option selected value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex space-x-6 ">
                      <input type="text" name="state" value={formData.state} onChange={formDatahandleChange} onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={" addressFormInputEle focus:outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 formTextBox"} placeholder="Emirates *" required />

                      <input type="text" name="city" value={formData.city} onChange={formDatahandleChange} onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={"focus:outline-none addressFormInputEle block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 formTextBox"} placeholder="City *" required />
                    </div>


                    <input type="text" name="street_address" value={formData.street_address} onChange={formDatahandleChange} onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} placeholder="Street Address *" className={"focus:outline-none addressFormInputEle block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "}
                      required />

                    <div className="flex space-x-6">
                      <input name="flat_number" value={formData.flat_number} onChange={formDatahandleChange} type="text" onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={"focus:outline-none addressFormInputEle block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"} placeholder="Flat / Villa *" required />
                      <input name="building" value={formData.building} onChange={formDatahandleChange} type="text" onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={"focus:outline-none addressFormInputEle block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"} placeholder="Building *"
                        required />
                    </div>


                    <div className="flex ">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900    ">
                        Country
                      </span>

                      <select id="country" name="country" value={formData.country} onChange={formDatahandleChange} className="focus:outline-none block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm">
                        <option selected value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                      </select>
                    </div>
                    <textarea name="additional_info" value={formData.additional_info} onChange={formDatahandleChange} className="w-full border-gray-300 rounded-lg border p-2.5 focus:outline-none text-sm" rows={1} placeholder="Additional information (eg. Area, Landmark)"></textarea>

                    <div className=" sticky bottom-2  border-0 rounded-lg">
                      <button type="submit" className=" w-full rounded-full bg-blue-500  py-1.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 " >SAVE ADDRESS</button>
                    </div>

                  </form>

                </div>
              </div>
            </div> : ""}


        </div> : ""
      }




      {/* <button data-modal-target="yourAddressForm" data-modal-toggle="yourAddressForm" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
          Toggle modal
        </button> */}

      {/* <div id="yourAddressForm" tabindex="-1" aria-hidden="true" className="hidden fixed top-0 left-0 right-0 z-50 h-[calc(100%-1rem)] w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 ">
          <div className="max-w-4xl relative h-full w-full md:h-auto">
  
          </div>
        </div> */}


      {welcomeBackPopUp ?
        <div id="popup-modal1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full flex justify-center items-center">
          <div id="overlay" className=" fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          </div>
          <div className="relative w-full h-full max-w-md md:h-auto">
            <div className="relative bg-white rounded-lg shadow ">

              <div className="p-6 text-center">

                <img src="https://cdn-icons-png.flaticon.com/512/309/309748.png?w=740t=st=1678711444~exp=1678712044~hmac=9fdd9608d210eeffcc5069fd9c6888bb3fcb3407e24160947ac7f3c7a85ca203" className="w-20 h-20 my-auto mx-auto mb-5" />

                {/* {session.token.is_customer === 1 ? <h3 className="mb-5  text-gray-700 font-bold text-2xl ">Welcome Back {session ? session.token.name : ""}</h3> : <h3 className="mb-5  text-gray-700 font-bold text-2xl ">Welcome {session ? session.token.name : ""}</h3>} */}
                <button onClick={() => { setwelcomeBackPopUp(false) }} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2 text-center mr-2">
                  Start Exploring
                </button>

              </div>
            </div>
          </div>
        </div> : ""}

      {/* <div id="
        {/* <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto h-modal ">
          <div className="relative w-full h-full max-w-xl md:h-auto">
            <div className="relative bg-white rounded-lg shadow  ">
              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  " data-modal-hide="authentication-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button> */}

      {overlayVisible ? <div id="overlay" className=" fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
      </div>
        : null}



    </>
  );
};

export default Navbar;
