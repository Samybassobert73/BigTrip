import React, {useState} from 'react';
import {BiShow, BiHide} from 'react-icons/bi'
import {set} from 'react-hook-form';

type PasswordProps = {
	id: string;
	label: string;
	value: string;
	errors: any;
};

const Password: React.FC<PasswordProps> = ({id, label, value, errors}) => {
	const [valuePassword, setValue] = useState<any>(value || null);
	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = () => {
		setShowPassword(!showPassword);
	};
	
	return (
		<>
			<div className="relative">
				<div className="text-red">{errors?.message}</div>
				<input
					type={showPassword ? 'text' : 'password'}
					id={id}
					name={id}
					placeholder="Créez votre mot de passe"
					value={valuePassword}
				/>
				<i className="absolute top-3 right-5 text-3xl cursor-pointer" onClick={togglePassword}>{showPassword ?
					<BiHide/> : <BiShow/>}</i>
			</div>
		</>
	)
}

export default Password;
