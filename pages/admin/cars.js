import Head from 'next/head'
import styles from '../../styles/Login.module.css'

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios'


export default function Cars() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [file, setFile] = useState('');
  const [photo, setPhoto] = useState('');
  const [price, setPrice] = useState('');
  const [carQ, setCarQ] = useState('');
  const [car, setCar] = useState();

  const route = useRouter()
  const { id } = route.query

  const backToAdmin = () => {
    route.push('/admin')
  }

  const carData = {
    name,
    brand,
    photo,
    model,
    price
  }

  const handleUploadFile = (e) => {
    setFile(e.target.files[0])

    const formData = new FormData()
    formData.append('image', file)

    if (!file) {
      return
    }

    axios.put(`${process.env.API_URL}/files/`, formData)
    .then(response => {
      setPhoto(response.data.key)
    }).catch(e => {
      console.log("error", e)
    });    
  }

  const handleClick = () => {
    if (id) {
      const result = axios.patch(`${process.env.API_URL}/cars/?id=${id}`, carData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
      })
      backToAdmin()
      return 
    }

    axios.post(`${process.env.API_URL}/cars/`, carData, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    })
    backToAdmin()
  }

  const handleDelete = () => {
    const { id } = route.query
    axios.delete(`${process.env.API_URL}/cars/?id=${id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log(response.data)
      backToAdmin()
    }).catch(e => {
      console.log("error")
    });
  } 

  useEffect(() => {
    if(id) {
      axios.get(`${process.env.API_URL}/cars/?id=${id}`)
      .then(response => {
        setCar(response.data)
      }).catch(e => {
        console.log(e)
      })
    }

    setName(car?.name)
    setBrand(car?.brand)
    setModel(car?.model)
    setPrice(car?.price)

    console.log(name)

  }, [id])

  return (
    <div className={styles.container}>
      <Head>
        <title>Cars</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* ["name", "brand", "model", "photo", "price"] */}
      <main className={styles.container_login}>
        <div className={styles.login}>
            <input onChange={(e) => setName(e.target.value)} value={name} placeholder='name'/>
            <input onChange={(e) => setBrand(e.target.value)} value={brand} placeholder='brand'/>
            <input onChange={(e) => setModel(e.target.value)} value={model} placeholder='model'/>
            <input onChange={(e) => handleUploadFile(e)} type='file' />
            <input onChange={(e) => setPrice(e.target.value)} type='number' value={price} placeholder='price'/>
        </div>
        <div className={styles.btns}>
          <button onClick={handleClick} className={styles.btn_save}>save</button>
          <button onClick={handleDelete} className={styles.btn_delete}>delete</button>
          <button onClick={backToAdmin} className={styles.btn_cancel}>cancel</button>
        </div>
      </main>
    </div>
  )
}
