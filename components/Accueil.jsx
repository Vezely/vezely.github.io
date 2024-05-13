'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../styles/index.module.css';
import Card from './Card';
import FormAdd from './FormAdd';
import { data } from '../components/tab';

export default function Accueil() {
	return (
		<div className={styles.container}>
			<h1>Lorem ipsum dolor sit amet consectetur.</h1>
			<div className={styles.cardContainer}>
				{data.map((data, index) => (
					<Card data={data} key={index} />
				))}
			</div>
			<FormAdd data={data} />
		</div>
	);
}
