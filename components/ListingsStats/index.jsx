import React from 'react'

const ListingsStats = ({uploaded, active, inReview, declined}) => {
  return (
    <div className='l-stats-cont' >
        <div className="card" style={{ backgroundColor: "#FFFDE8" }}  >
            <img src="/uploads.svg" alt="" />
            <div className="stat">
                <h4>{uploaded}</h4>
                <span>Uploaded Listings</span>
            </div>
        </div>
        <div className="card" style={{ backgroundColor: "#EFFFF4" }}  >
            <img src="/active-uploads.svg" alt="" />
            <div className="stat">
                <h4>{active}</h4>
                <span>Active Listings</span>
            </div>
        </div>
        <div className="card" style={{ backgroundColor: "#FDFFEA" }}  >
            <img src="/uploads-in-review.svg" alt="" />
            <div className="stat">
                <h4>{inReview}</h4>
                <span>Listings In-review</span>
            </div>
        </div>
        <div className="card" style={{ backgroundColor: "#FFF9EC" }}  >
            <img src="/uploads-declined.svg" alt="" />
            <div className="stat">
                <h4>{declined}</h4>
                <span>Declined Listings</span>
            </div>
        </div>
    </div>
  )
}

export default ListingsStats