import React, {useState} from 'react';
import styles from './InputCustom.module.css';

interface IInputCustom {
	labelName: string;
	typeInput: string;
	placeholder: string;
	onValueChange?: (value: any) => void;
	value: any;
	onBlur?: (value: any) => void;
	// onChange:any,
	error:any,
}

const InputComponent: React.FC<IInputCustom> = ({ labelName, placeholder, typeInput, onValueChange, value, onBlur, error }: IInputCustom) => {
	const [inputValue,setInputValue] = useState(value || null)

	
	function toUpperCase(text: string): string {
		return text.charAt(0).toUpperCase() + text.slice(1);
	}
	
	return (
		<div className={styles.containerInput}>
			<label htmlFor="city">{ toUpperCase(labelName) }</label>
			{/*<input type="text" id="voice-search"*/}
			{/*			 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
			{/*			 placeholder="Ville"*/}
			{/*			 required*/}
			<input type={typeInput} id="city"
				className={`${styles.inputCustom} border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
				placeholder={placeholder}
				value={value}
				onBlur={(e) => {
					e.preventDefault();
					if (onBlur) onBlur(e.target.value);
				}}

				onChange={(e) => {
					e.preventDefault();
					if (onValueChange) onValueChange(e.target.value);
				}}
			/>
			{error && (
				<p className='mt-2 text-red-600'>{error?.message}</p>
			)}
		</div>
	);
};

export default InputComponent;
