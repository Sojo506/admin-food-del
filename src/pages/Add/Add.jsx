import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description:
      'Food provides essential nutrients for overall health and well-being',
    price: '',
    category: '',
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: '',
        description:
          'Food provides essential nutrients for overall health and well-being',
        price: '',
        category: data.category,
      });
      setImage(false);

      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>

          <label htmlFor='image'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt='upload area'
            />
          </label>

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type='file'
            id='image'
            name='image'
            hidden
            required
          />
        </div>

        <div className='add-product-name flex-col'>
          <label htmlFor='name'>Product name</label>

          <input
            onChange={onChangeHandler}
            value={data.name}
            type='text'
            name='name'
            id='name'
            placeholder='Type here'
            required
          />
        </div>

        <div className='add-product-description flex-col'>
          <label htmlFor='description'>Product description</label>

          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            id='description'
            rows='6'
            placeholder="Write product's description here"
            required
          ></textarea>
        </div>

        <div className='add-product-category-price'>
          <div className='add-product-category flex-col'>
            <label htmlFor='category'>Product category</label>

            <select
              onChange={onChangeHandler}
              name='category'
              id='category'
              required
            >
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Desserts'>Desserts</option>
              <option value='Sandwiches'>Sandwiches</option>
              <option value='Cakes'>Cakes</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>

          <div className='add-product-price flex-col'>
            <label htmlFor='price'>Product price</label>

            <input
              onChange={onChangeHandler}
              value={data.price}
              type='number'
              name='price'
              id='price'
              placeholder='$21'
              required
              max={999}
              min={0}
            />
          </div>
        </div>

        <button type='submit' className='add-button'>
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
