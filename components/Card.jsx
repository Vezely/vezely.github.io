import React from 'react';
import styles from '../styles/Card.module.css';
import Image from 'next/image';

const Card = ({ data }) => {
	// console.log(data);
	return (
		<div className={styles.cardContainer}>
			<div className={styles.photo}>
				<Image src={`${data.src}`} priority={true} alt={data.alt} width={data.width} height={data.height} className={styles.avatar} />
			</div>

			<h3 className={styles.cardTitle}>{data.title}</h3>
			<p className={styles.cardDescription}>{data.description}</p>
			<button className={styles.button}>Suivre</button>
		</div>
	);
};

export default Card;
