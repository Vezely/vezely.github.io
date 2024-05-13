import Image from 'next/image';
import styles from './page.module.css';
import Accueil from '@/components/Accueil';

export default function Home() {
	return (
		<main className={styles.main}>
			<Accueil />
		</main>
	);
}
