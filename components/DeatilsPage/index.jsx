"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { setEditListing } from "@/lib/store/slices/listingEdit.reducer";
import { deleteListing } from "@/lib/store/slices/listingUpload.reducer";
import { selectCurrentUser } from "@/lib/store/slices/user.reducer";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";

const DetailsPage = ({ listing }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const thumbnailContainerRef = useRef();

  const [mainImage, setMainImage] = useState(0);

  const currentUser = useAppSelector(selectCurrentUser);

  const getStatusColor = (status = listing.stage) => {
    switch (status.toLowerCase()) {
      case "review":
        return "#FFD700";
      case "active":
        return "#18BB48";
      case "declined":
        return "#FF0303";
      default:
        return "gray"; // Default color if status doesn't match any case
    }
  };
  const [options, setOptions] = useState(false);

  const getPrimaryImage = useCallback(() => {
    return (
      listing.images.find((image) => image.fullPath === listing.primaryImage) ||
      listing.images[0]
    );
  }, [listing.images, listing.primaryImage]);

  const formatPrice = (price) => {
    // Remove any non-numeric characters except for the decimal point
    const cleanedPrice = price.replace(/[^0-9.]/g, "");

    // Split the integer and decimal parts
    const [integerPart, decimalPart] = cleanedPrice.split(".");

    // Format the integer part with commas
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    // Reassemble the price with the formatted integer part and decimal part
    return decimalPart
      ? `${formattedIntegerPart}.${decimalPart}`
      : formattedIntegerPart;
  };

  const renderListItems = (array) => {
    let listItems = [];

    if (array.length === 1) {
      listItems = Array(3).fill("");
    } else if (array.length === 2) {
      listItems = Array(2).fill("");
    } else if (array.length === 3) {
      listItems = Array(1).fill("");
    } else {
      listItems = Array(0).fill("");
    }

    return listItems.map((item, index) => <li key={index}>{item}</li>);
  };

  const startEditing = () => {
    dispatch(setEditListing(listing));
    router.push(`/dashboard/listings/edit?listing=${listing.id}`);
  };

  const handleDeleteListing = () => {
    dispatch(
      deleteListing({
        email: currentUser.email,
        id: listing.id,
      })
    );
    setOptions(false);
  };

  useEffect(() => {
    // Calculate 100vw - 40px
    setMainImage(getPrimaryImage().url);
  }, [getPrimaryImage]);

  const handleMouseEnterThumbnail = (url) => {
    setMainImage(url);
  };

  return (
    <div className="b-property-page">
      <div className="header">
        <a href="/listings" className="back">
          <img src="/left-back.svg" alt="Back" />
          Back
        </a>
        <div className="heading">
          <div className="intro">
            <h1>{listing.details.title}</h1>
            <p className="location">
              <img src="/location.svg" alt="Location" className="icon" />
              Ikeja, Lagos
            </p>
          </div>
          <div className="buttons">
            <button onClick={null}>
              <img src="/edit.svg" /> Save
            </button>
            <button onClick={null}>
              <img src="/edit.svg" /> Share
            </button>
            <div
              className="more-options"
              id="mobile"
              onClick={() => {
                setOptions((prev) => !prev);
              }}
              style={{
                border: options ? "2px solid #88b6f3" : "1px solid #ddd",
              }}
            >
              <img src="/dots.svg" alt="More options" />

              {options && (
                <div className="options">
                  <span id="mobile" onClick={startEditing}>
                    <img
                      src="/edit-b.svg"
                      alt=""
                      style={{ marginRight: "8px" }}
                    />
                    Edit Listing
                  </span>
                  <span onClick={handleDeleteListing}>
                    <img src="/deactivate.svg" alt="" />
                    De-activate
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="gallery">
          <div className="main-image">
            <img src={mainImage} alt="Main property" />
          </div>
          <div className="thumbnail-images">
            {listing.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${index === 0 ? "active" : ""}`}
                style={{
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => handleMouseEnterThumbnail(image.url)}
              />
            ))}
          </div>
        </div>

        <div className="desc">
          <div className="specifics">
            <span>
              <img src="/beds.svg" alt="" />
              {listing.details.bedrooms} bed(s)
            </span>
            <span>
              <img src="/baths.svg" alt="" />
              {listing.details.baths} bath(s)
            </span>
          </div>
          <h2>Property Overview</h2>
          <p>{listing.details.description}</p>
        </div>

        <div className="details">
          <p className="price">
            <b style={{ fontSize: "42px" }}>₦</b>
            {formatPrice(listing.details.price)} <span>{listing.details.paymentType}</span>{" "}
          </p>
          {/* <div className="specifics">
                <span>
                    <img src="/beds.svg" alt="" />
                    {listing.details.bedrooms} bed(s)
                </span>
                <span>
                    <img src="/baths.svg" alt="" />
                    {listing.details.baths} bath(s)
                </span>
                </div> */}
        </div>

        <div className="amenities">
          <h2>Amenities</h2>
          <ul className="amenities-list">
            {listing.details.amenities.map((amenity, index) => (
              <li key={index} className="amenity-item">
                {amenity}
              </li>
            ))}

            {renderListItems(listing.details.amenities)}
          </ul>
        </div>
      </div>
      <div className="contact">
        <div className="contact-cont">
          <div className="agent-card">
            <div className="agent-header">
              <div className="id">
                <div
                  className="img"
                  style={{
                    backgroundImage: `url(${listing.contact?.url?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "50%",
                    width: "70px",
                    height: "70px",
                    overflow: "hidden",
                    // display: "flex",
                    // justifyContent: "center",
                    // alignItems: "center"
                  }}
                />
                <div className="text">
                    <p  >{listing.contact.name}</p>

                    <a href="#" className="view-more">
                        View more properties from Israel ventures
                    </a>
                </div>
              </div>

              {/* <h3>Israel Ventures</h3> */}
            </div>
            <div className="agent-contact">
              <button className="phone-btn">{listing.contact.phone}</button>
              <a className="whatsapp-btn">WhatsApp</a>
            </div>
          </div>

          <div className="safety-tips-card">
            <h4>Safety Tips</h4>
            <ul>
              <li>1. 
                Do not pay an inspection fee without seeing the agent and
                property.
              </li>
              <li>2.
                Pay any fee or any upfront payment after you verify from the
                Landlord.
              </li>
              <li>3. Ensure you meet the Agent in an open location.</li>
              <li>4.
                The Agent does not represent Oga Landlord and Oga Landlord is
                not liable for any monetary transaction between you and the
                Agent.
              </li>
              <li>5. Make payment only when you are satisfied.</li>
            </ul>
          </div>
        </div>
        {/* <h1>CONTACT</h1> */}
      </div>
    </div>
  );
};

export default DetailsPage;
