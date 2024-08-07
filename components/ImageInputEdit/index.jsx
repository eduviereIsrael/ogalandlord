"use client"

import React,{useState, useEffect} from 'react'
import  { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { saveImage, selectImages, deleteImage, selectPrimaryImage,clearPrimaryImage, updatePrimaryImage, selectLoading } from '@/lib/store/slices/listingEdit.reducer'


const ImageInputEdit = () => {
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectImages);
  const primaryImage = useAppSelector(selectPrimaryImage);
  const loading = useAppSelector(selectLoading);

  const [imageUpload, setImageUpload] = useState(null);

  // useEffect(() => {
  //   console.log(imageUpload)
  // }, [imageUpload])

  const handleImageUpload = (e) => {
    console.log(e.target.files)
    const files = [...e.target.files];
    console.log(files)
    if(files.length > 0) {  
      files.forEach(file => dispatch(saveImage(file)))
    }
    // for (let i = 0; i < files.length; i++) {
    //   dispatch(saveImage(files[i]));
    // }
  }

  const handleDeleteImage = (path) => {
    dispatch(deleteImage(path));
    
  }

  const handleSetPrimaryImage = (path) => {
    dispatch(updatePrimaryImage(path));

    if(primaryImage === path){
      dispatch(clearPrimaryImage())
    }
  }

  return (
    <div className='image-input' >
      {
        images.length > 0 && <div className="img-cont">
          {images.map(image =>(
            <div className="image" key={image.id} >
              <div className="img-div">

                <img src={image.url} alt={"image"} />
              </div>
              <div className="controls">
                <button onClick={() => handleSetPrimaryImage(image.fullPath)} style={{ backgroundColor:  primaryImage === image.fullPath?  "#000" : '#fff', color: primaryImage === image.fullPath?  "#fff" : "#000" }} >  Primary image</button>
                <button  className='delete' onClick={() => handleDeleteImage(image.fullPath)} >Delete</button>
              </div>
            </div>
          ))}
        </div>
      }
        <div className="add-img-card">
            <img src="/add-img.svg" alt="" />
            {/* <span>Add Photos</span> */}
            <div className="input">
            <label htmlFor="images">
              {loading && <span className='spinner' ></span>}
              Add Photos
              <input multiple id='images' type="file" onChange={handleImageUpload} />
            </label>
            </div>
        </div>
    </div>
  )
}

export default ImageInputEdit