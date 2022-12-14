import Head from 'next/head'
import React, { useState } from 'react';

import styles from '../styles/Login.module.css'


import axios from 'axios'
import { Router, useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const route = useRouter()

  const handleClick = () => {
    axios.post(`${process.env.API_URL}/login/`, {
      password: password,
      email: email
    })
    .then(response => {
      const status = response.status
      if (status == 200) {
        window.localStorage.setItem('token', response.data.token)
        route.push('/admin')
      }       
    }).catch(e => {
      console.log("error")
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container_login}>
        <div className={styles.login}>
            <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='e-mail'/>
            <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password'/>
            <button onClick={handleClick}>login</button>
        </div>
      </main>
    </div>
  )
}
