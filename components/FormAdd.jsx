import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../styles/FormAdd.module.css';

const FormAdd = ({ data }) => {
	const [imageSrc, setImageSrc] = useState(null);
	const [attendre, setAttendre] = useState(false);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setImageSrc(e.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		setAttendre(true);
		const formData = new FormData(event.target);

		const datas = Object.fromEntries(formData.entries());

		console.log(datas);
		try {
			const response = await fetch(`/api/upload?chemin=${'images/test'}`, {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				const result = await response.json();
				console.log(result);
				data.push({
					src: `/images/test/${result.fileName}`,
					width: result.width,
					height: result.height,
					alt: 'image',
					description: datas.description,
					title: datas.title,
				});
			} else {
				const errorData = await response.json();
				console.error('Error:', errorData.error);
			}
		} catch (error) {
			console.error('An error occurred:', error);
			// Ajoutez ici la logique à exécuter en cas d'erreur inattendue
		} finally {
			setAttendre(false);
		}
	};
	console.log(data);
	return (
		<div className={styles.expedition}>
			<form className={styles.form} onSubmit={onSubmit}>
				<label>
					<input accept='image/*' type='file' name='photo' onChange={handleImageChange} required className={styles.input} />
					<span>Changer la photo</span>
				</label>
				<label>
					<span>Titre</span>
					<input type='text' name='title' className={styles.input} />
				</label>
				<label>
					<span>Description</span>
					<textarea name='description' className={styles.input}></textarea>
				</label>
				{imageSrc && (
					<div className={styles.photoProfile}>
						<img src={imageSrc} alt={'image du produit'} />
					</div>
				)}

				{attendre ? (
					<div className={styles.submit}>
						{/* <Spinner /> */}
						Spinner
					</div>
				) : (
					<button className={styles.submit}>Ajouter</button>
				)}
			</form>
		</div>
	);
};

export default FormAdd;
