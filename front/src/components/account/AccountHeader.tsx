import React from 'react';
import styles from './AccountHeader.module.css';

const AccountHeader = () => {
	return (
		<>
			<div className={styles.containerTabNav}>
				<div>
					<a href="" className="underline-black">Compte</a>
				</div>
				<div className="h-[30px] w-[1px] bg-[#D7E2EE]"></div>
				<div>
					<a href="">Historique</a>
				</div>
				<div className="h-[30px] w-[1px] bg-[#D7E2EE]"></div>
				<div>
					<a href="">Paiement</a>
				</div>
			</div>
		</>
	);
};

export default AccountHeader;